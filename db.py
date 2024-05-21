from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Project(db.Model):
  """
  Project Model
  """

  id = db.Column(db.Integer, autoincrement=True, primary_key=True)
  title = db.Column(db.String, nullable=False, unique=True)
  todos = db.relationship("Todo", cascade="delete")

  def __init__(self, **kwargs):
    """
    Create a project object
    """
    __tablename__ = "project"
    self.title = kwargs.get("title", "")

  def serialize(self):
    """
    Serialize a project object
    """
    return {
      "id": self.id,
      "title": self.title,
      "todos": [t.simple_serialize() for t in self.todos]
    }

class Todo(db.Model):
  """
  Todo Model
  """

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  title = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=False)
  due_date = db.Column(db.Integer, nullable=False)
  priority= db.Column(db.String, nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey("project.id"), nullable=False)

  def __init__(self, **kwargs):
    """
    Create a todo object
    """
    __tablename__ = "todo"
    self.title = kwargs.get("title", "")
    self.description = kwargs.get("description", "")
    self.due_date = kwargs.get("due_date", 0)
    self.priority = kwargs.get("priority", "")
    self.project_id = kwargs.get("project_id", 0)

  def serialize(self):
    """
    Serialize a todo object
    """
    return {
      "title": self.title,
      "description": self.description,
      "due_date": self.due_date,
      "priority": self.priority,
      "project_id": self.project_id,
    }
  
  def simple_serialize(self):
    """
    Serialize a todo object without project field
    """
    return {
      "title": self.title,
      "description": self.description,
      "due_date": self.due_date,
      "priority": self.priority,
    }
  