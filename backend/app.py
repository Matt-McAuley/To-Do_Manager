from flask import Flask, request, render_template
from flask_cors import CORS
import json
from db import db
from db import Project
from db import Todo

app = Flask(__name__)
CORS(app)
db_filename = "todo.db"

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///%s" % db_filename
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

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
  if title is None:
    return failure_response("Incorrect formatting!")
  project = Project(title=title)
  db.session.add(project)
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

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8000, debug=True)