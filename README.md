# To-Do Manager
## Contents

- [Summary](#summary)
- [Images](#images)
- [Running Locally](#running-locally)
- [Link To Frontend](#link-to-frontend)
- [Authors](#authors)
- [Citations](#citations)

## Summary

This is a personal project where I created a website to manage 'Todos' which are
contained within projects. Each 'Todo' has a title, description, due date, and priority and 
each project has a title. Todos can be expanded to view a popup of all their information. Both
Todos and Projects can be edited or deleted. Clicking the add buttons creates a popup for the user
to input the information for whichever they are creating. Todos are sorted by due date and projects are sorted
alphabetically. The frontend for the project was developed using React, and the components and structure
are listed under the src/ directory. The backend for storing the information is done in Flask and the
database is SQLAlchemy which is all under the backend/ directory. Any action done on the website is stored 
within the database and upon page refresh is reloaded so no data is lost. Once the frontend was finished,
the static files were addedto the backend folder and are SSR by Flask as a template. Fetch was used to
communicate between the frontend and the backend API. This project taught me about Typescript, using React and JS libraries,
creating an API with flask, using SQL and an ORM database, SSR, fetching data, and full-stack software development. It was
very rewarding to develop this website over the course of months, integrating new things that I learned and being able
to produce a full-stack website that is aesthetically pleasing and functional.

## Images

### Main Page
![Main Page Image](/data/main.png)

### Popup
![Popup Image](/data/popup.png)

## Running locally

### Step 1: Download the source code
Clone or download a zip file of the source code onto your device

### Step 2: Set up a virtual environment
Create a virtual environment in Python (or using conda if more familiar):

Run `python -m venv <virtual_env_name>` in your project directory to create a new virtual environment, remember to change <virtual_env_name> to your preferred environment name.

### Step 3: Install dependencies
You need to install dependencies by running `python -m pip install -r requirements.txt` in the backend folder.

### Command to run project locally (in backend folder): 
```python app.py```

## Link to Frontend
[Fronted (doesn't function properly)](https://matt-mcauley.github.io/To-Do-Manager)

## Authors
### Matthew McAuley
mwm223@cornell.edu

## Citations
[Favicon](https://www.freepik.com/icon/emoticon-square-smiling-face-with-closed-eyes_42829)