from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Project(db.Model):
  """
  Project Model
  """

  id = db.Column(db.Integer, autoincrement=True, primary_key=True)
  title = db.Column(db.String, nullable=False, unique=True)
  todos = db.relationship("Todo", cascade="delete")
  user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

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
  user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

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
      "id": self.id,
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
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "due_date": self.due_date,
      "priority": self.priority,
    }


  class User(db.Model):
    """
    User Model
    """

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    def __init__(self, **kwargs):
      """
      Create a user object
      """
      __tablename__ = "user"
      self.email = kwargs.get("username", "")
      self.password = kwargs.get("password", "")

    def serialize(self):
      return {
        "id": self.id,
        "email": self.email,
        "password": self.password,
      }