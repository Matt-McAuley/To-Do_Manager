from flask import Flask, request, render_template
import json
from db import db
from db import Project
from db import Todo

app = Flask(__name__)
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

@app.route('/', methods=["GET"])
def base():
  return render_template("index.html")

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
  body = json.loads(request.data)
  title = body.get("title")
  if title is None:
    return failure_response("Incorrect formatting!")
  project = Project(title=title)
  db.session.add(project)
  db.session.commit()
  return success_response(project.serialize(), 201)

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


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8000, debug=True)