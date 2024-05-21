from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Project(db.Model):
  """
  Project Model
  """

  id = db.Column(db.Integer, autoincrement=True, primary_key=False)
  title = db.Column(db.String, nullable=False)

  def __init__(self, **kwargs):
    __tablename__ = "project"
    self.title = kwargs.get("title", "")

  def serialize(self):
    """
    Serialize a project object
    """
    return {
      "id": self.id,
      "title": self.title,
    }

