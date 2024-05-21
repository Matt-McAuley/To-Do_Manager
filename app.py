from flask import Flask, request, render_template
import json
from db import db
import os

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

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8000, debug=True)