# To-Do Manager

## Contents

- [Description](#description)
- [Online Hosting](#online-hosting)
- [Images](#images)
- [Running Locally](#running-locally)
- [Authors](#authors)

## Description

This is a personal project where I created a website to manage a user's 'To-Dos' which are
contained within projects. This was one of the first websites I ever developed and I have continued to iterate and improve upon
it over time after learning new technologies and concepts. For the most recent iteration, Each 'To-Do' has a title, description, 
due date, and priority and each project has a title. To-Dos can be expanded to view a popup of all their information. Both
To-Dos and Projects can be edited or deleted. Clicking the add buttons creates a popup form for the user
to input the information for whichever they are creating. Toasts are used to notify the user of successful or failed actions
as they are less intrusive than popups which I originally used.

This project initially just consisted of a static HTML, CSS, and JS website that can be seen at [this link](https://matt-mcauley.github.io/todo-list/).
After learning about modern frontend web development, I decided to refactor the project to use React and Typescript being that it is more in line with the
industry standard to use a frontend framework. After learning the React basics through a YouTube tutorial by [Jack Herrington](https://www.youtube.com/@jherr), I decided to jump headfirst into this project
to reinforce the information and get a better understanding of how to use React in a real-world application. The components and structure
are listed under the src/ directory, and @emotion/styled CSS in TS was used to keep the CSS and its respective component tied together neatly. I had
difficulty with the functional nature of React at first, but I was taking a class on functional programming at the time which helped me grasp the concepts
and after some trial and error I was able to successfully recreate the website. Recently, I decided to add the ability for users to sign in so that
the website could be hosted online and have actual functionality. This required me to learn about React Router to implement client side routing between
the sign-up, login, and home pages.

The backend API for persisting user data and logging in is done with Flask and the database is SQLAlchemy which is all contained under the backend/ directory. 
I learned about using both of these tools through following along with the [Cornell AppDev](https://www.youtube.com/@CornellAppDev) backend tutorials on YouTube.
The SQLAlchemy ORM was used to allow for easy object-oriented python implementation of the database with models for Projects and Todos at first and then eventually Users when I added
authentication. The API is RESTful and has endpoints for creating, reading, updating, and deleting Projects and Todos. It also uses the build folder created by the React frontend
to serve the HTML, CSS, and JS to the user upon visiting the root URL. For authentication, the DB uses bcrypt to hash the user's password
and check against it when logging in. The API handles authenticating a user with flask-jwt-extended and stores the JWT in a cookie to keep the user logged in.

I then decided to host the website on an Oracle Cloud Infrastructure (OCI) instance to get more experience with cloud computing outside of AWS. I created a Dockerfile to containerize the project
that was very similar to the one used for my [Exercise Engine](https://matt-mcauley.github.io/projects/Exercise_Engine/) project as they have very similar structures. I created an always free ARM instance
on OCI and used PuTTY to SSH into the instance and run the container. I had to open the necessary ports and configure the security group to allow for incoming traffic to the website, as well as installing
vim and Docker on the VM to get the container running. The process was very similar to AWS so it was much more straightforward this time with the only difference being that I had to use Docker buildx to build
for a different architecture.

This project is something I'm very proud of because I've been developing it over many months, and I've learned a lot about web development in the process. Starting with a simple static website
and then continuing to add new technologies and concepts as I learned them has been a great way to reinforce my understanding. There were many design decisions that I had to make along the way, and I'm happy with how the
website turned out in the end. I'm excited to continue to work on this project and add new features as I learn about them. Overall, this project taught me about building a React frontend, using Typescript, client side vs
server side routing, creating a Flask API, using SQLAlchemy and ORMs, user authentication, and hosting a website on the cloud.

## Online Hosting
The website is hosted on an [OCI Instance](http://150.136.36.76/).

Email: test@gmail.com

Password: password

## Images

#### Home Page
<img src="https://mattmcauley.com/assets/projects/To-Do_Manager/home.png" alt="Image" style="width: 95%">

#### Sign Up Page
<img src="https://mattmcauley.com/assets/projects/To-Do_Manager/signup.png" alt="Image" style="width: 95%">

#### Login Page
<img src="https://mattmcauley.com/assets/projects/To-Do_Manager/login.png" alt="Image" style="width: 95%">

#### Form to add To-Do
<img src="https://mattmcauley.com/assets/projects/To-Do_Manager/form.png" alt="Image" style="width: 95%">

## Running locally

#### Step 1: Download the source code
Clone or download a zip file of the source code onto your device

#### Step 2: Set up a virtual environment
Create a virtual environment in Python (or using conda if more familiar):

Run `python -m venv <virtual_env_name>` in your project directory to create a new virtual environment, remember to change <virtual_env_name> to your preferred environment name.

#### Step 3: Install dependencies
You need to install dependencies by running `python -m pip install -r requirements.txt` in the backend folder.

#### Step 4: Command to run project locally:
```python backend/app.py```

## Authors

<table style="border-collapse: collapse; border:none;">
  <tr  style="border:none;">
    <td style="border:none;"><strong>Matthew McAuley</strong></td>
  </tr>
  <tr style="border:none;">
    <td style="border:none;">mwm223@cornell.edu</td>
  </tr>
</table>
