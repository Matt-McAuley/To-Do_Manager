from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import json
from db import *
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, set_access_cookies

app = Flask(__name__)
CORS(app, supports_credentials=True)
db_filename = "todo.db"

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///%s" % db_filename
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["JWT_SECRET_KEY"] = 'ChangeMe'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']

jwt = JWTManager(app)

db.init_app(app)
with app.app_context():
  db.create_all()

def success_response(data, code=200):
  return json.dumps(data), code

def failure_response(message, code=404):
  return json.dumps({"error": message}), code

visited = False

@app.route('/', methods=["GET"])
def base():
  return render_template("index.html")

@app.route('/api/visited/', methods=["GET"])
def check_visited():
  return json.dumps({"visited": visited})

# API
@app.route('/api/projects/', methods=["GET"])
def get_all_projects():
  """
  Route for getting all projects
  """
  return success_response({"projects": [p.serialize() for p in Project.query.all()]})

@app.route('/api/projects/', methods=["POST"])
def create_project():
  """
  Route for creating a project
  """
  global visited
  visited = True
  body = json.loads(request.data)
  title = body.get("title")
  todos = body.get("todos")
  if title is None or todos is None:
    return failure_response("Incorrect formatting!")
  project = Project(title=title)
  db.session.add(project)
  db.session.commit()
  for todo in todos:
    new_todo = Todo(
      id=todo.get("id"),
      title=todo.get("title"), 
      description=todo.get("description"),
      due_date=todo.get("due_date"),
      priority=todo.get("priority"),
      project_id = project.id,
      )
    db.session.add(new_todo)
  db.session.commit()
  return success_response(project.serialize(), 201)

@app.route('/api/projects/<int:project_id>/', methods=["GET"])
def get_todos(project_id):
  """
  Route for getting a specific project
  """
  project = Project.query.filter_by(id=project_id).first()
  if project is None:
    return failure_response("Couldn't find project!")
  return success_response(project.serialize())

@app.route('/api/projects/<int:project_id>/', methods=["DELETE"])
def delete_project(project_id):
  """
  Route for deleting a specific project
  """
  project = Project.query.filter_by(id=project_id).first()
  if project is None:
    return failure_response("Couldn't find project!")
  db.session.delete(project)
  db.session.commit()
  return success_response(project.serialize())

@app.route('/api/projects/<int:project_id>/', methods=["POST"])
def update_project(project_id):
  """
  Route for updating a specific project
  """
  body = json.loads(request.data)
  title = body.get("title")
  if title is None :
    return failure_response("Incorrect formatting!")
  project = Project.query.filter_by(id=project_id).first()
  if project is None:
    return failure_response("Couldn't find project!")
  project.title = title
  db.session.commit()
  return success_response(project.serialize())

@app.route('/api/projects/<int:project_id>/todo/', methods=["POST"])
def add_todo(project_id):
  """
  Route for adding a todo to a project
  """
  project = Project.query.filter_by(id=project_id).first()
  if project is None:
    return failure_response("Couldn't find project!")
  body = json.loads(request.data)
  title = body.get("title")
  description = body.get("description")
  priority = body.get("priority")
  due_date = body.get("due_date")
  if title is None or description is None or priority is None or due_date is None:
    return failure_response("Incorrect formatting for todo!")
  todo = Todo(title=title, description=description, priority=priority, due_date=due_date, project_id=project_id)
  db.session.add(todo)
  db.session.commit()
  return success_response(todo.serialize())

@app.route('/api/todo/<int:todo_id>/', methods=["POST"])
def update_todo(todo_id):
  """
  Route for updating a specific todo
  """
  body = json.loads(request.data)
  title = body.get("title")
  description = body.get("description")
  due_date = body.get("due_date")
  priority = body.get("priority")
  if title is None or description is None or due_date is None or priority is None:
    return failure_response("Incorrect formatting!")
  todo = Todo.query.filter_by(id=todo_id).first()
  if todo is None:
    return failure_response("Couldn't find todo!")
  todo.title = title
  todo.description = description
  todo.due_date = due_date
  todo.priority = priority
  db.session.commit()
  return success_response(todo.serialize())

@app.route('/api/todo/<int:todo_id>/', methods=["DELETE"])
def delete_todo(todo_id):
  """
  Route for deleting a specific todo
  """
  todo = Todo.query.filter_by(id=todo_id).first()
  if todo is None:
    return failure_response("Couldn't find todo!")
  db.session.delete(todo)
  db.session.commit()
  return success_response(todo.serialize())

@app.route('/api/user/', methods=["POST"])
def create_user():
  """
  Route for creating a user
  """
  body = json.loads(request.data)
  email = body.get("email")
  if email is None:
    return failure_response("Incorrect formatting!")
  password = body.get("password")
  if password is None:
    return failure_response("Incorrect formatting!")
  user = User.query.filter_by(email=email).first()
  if user is not None:
      return failure_response("User already exists!")
  user = User(email=email, password=bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()))
  db.session.add(user)
  db.session.commit()
  return success_response(user.serialize())

@app.route('/api/login/', methods=["POST"])
def login():
  """
  Route for logging in
  """
  body = json.loads(request.data)
  email = body.get("email")
  if email is None:
    return failure_response("Incorrect formatting!")
  password = body.get("password")
  if password is None:
    return failure_response("Incorrect formatting!")
  user = User.query.filter_by(email=email).first()
  if user is None:
    return failure_response("User not found!")
  if bcrypt.checkpw(password.encode('utf-8'), user.password):
    access_token = create_access_token(identity=user.email)
    response = jsonify({"user": user.serialize()})
    set_access_cookies(response, access_token)
    return response
  return failure_response("Incorrect password!")

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8000, debug=True)