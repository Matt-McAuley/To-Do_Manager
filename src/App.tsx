import styled from '@emotion/styled'
import { useState } from 'react';
import { Todo, Project, editInfo, edits } from './Types';
import ProjectDisplay from './components/ProjectDisplay'
import Sidebar from './components/Sidebar';
import { TodoListContext } from './TodoListContext';
import PopupArea from './components/PopupArea';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 15% 85%;
  grid-template-columns: 15% 85%;
  text-align: center;
  overflow: hidden;
  font-family: "DM Sans";
`;
const Header = styled.header`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  background-color: #5680E9;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight: bold;
  font-size: 85px;
`;

function App() {
  
  const [projects, setProjects] = useState<Project[]>([{
    // id: 1,
    title: "Example",
    todos: [{
      // id: 1,
      title: "Fold Laundry",
      description: "You must fold your laundry today",
      due_date: new Date("1/1/2024"),
      priority: "low",
    }]
  }]);
  const [currentProject, setCurrentProject] = useState<Project>(projects[0]);
  const [editInfo, setEditInfo] = useState<editInfo>({
    projectTitle: "",
    projectTodos: [],
    todoTitle: "",
    description: "",
    date: "",
    priority: ""
  });
  const [popupID, setPopupID] = useState(-1);
  const [recentEdits, setRecentEdits] = useState<edits>({
    project: null,
    todo: null,
  })

  const notify = (text: string) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
      pauseOnHover: false,
    });
  }

  // useEffect(() => {
  //   fetch('http://localhost:8000/api/visited/', {
  //     method: "GET",
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     if (!data.visited) {
  //       fetch('http://localhost:8000/api/projects/', {
  //         method: "POST",
  //         body: JSON.stringify({title: "Example"})
  //         });
  //         console.log("first visit")
  //         const title = "Fold Laundry";
  //         const description = "You must fold your laundry today";
  //         const due_date = new Date("1/1/2024");
  //         const priority = "low";
  //         addNewTodo(title, description, due_date, priority);
  //     }
  //     else {
  //       fetch('http://localhost:8000/api/projects/', {
  //         method: "GET",
  //         })
  //         .then(response => response.json())
  //         .then(data => {
  //           console.log(data.projects);
  //           data.projects.forEach((project : project_db) => {
  //             console.log("reload")
  //             console.log(project);
  //             const title = project.title;
  //             const id = project.id;
  //             const todos = project.todos;
  //             const newProject = new Project(title, id);
  //             todos.forEach(todo => {
  //               const todo_id = todo.id;
  //               const name = todo.title;
  //               const description = todo.description;
  //               const due_date = new Date(todo.due_date);
  //               const priority = todo.priority;
  //               newProject.addTodo(new Todo(name, description, due_date, priority, todo_id));
  //             });
  //             setProjects([...projects, newProject]);
  //           });
  //         })
  //     }
  //   });
  // }, [])

  const addNewTodo = ((title:string, description:string, date:Date, priority:string) => {
    for (let i = 0; i < currentProject.todos.length; i++) {
      if (currentProject.todos[i].title == title) {
        if (recentEdits.todo != null) {
          const todo = recentEdits.todo;
          addNewTodo(todo.title, todo.description, todo.due_date, todo.priority);
          recentEdits.todo = null;
        }
        notify('Cannot have two todos with the same name in one project!');
        return false;
      }
    }
    const localDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);

    // console.log("adding")
    // fetch(`http://localhost:8000/api/projects/${currentProject.id}/todo`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: name,
    //     description,
    //     due_date: localDate.valueOf(),
    //     priority,
    //   })
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("added")
    //     const newTodo = new Todo(name, description, localDate, priority, data.id);
    //     currentProject.addTodo(newTodo);
    //     setCurrentTodos([...(currentProject.todos)]);
    //     console.log(currentProject);
    //   })
    const new_project : Project = {
      // id: currentProject.id,
      title: currentProject.title,
      todos: [...currentProject.todos, {
        // id: data.id,
        title,
        description,
        due_date: localDate,
        priority,
      }].sort((a, b) => a.due_date.valueOf() - b.due_date.valueOf()),
    };
    const new_projects = projects.filter((project) => project.title != currentProject.title);
    setProjects([...new_projects, new_project]);
    setCurrentProject(new_project);
    recentEdits.todo = null;
  });

  const addNewProject = ((title:string, todos: Todo[] = []) => {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].title.toLocaleLowerCase() == title.toLocaleLowerCase()) {
        if (recentEdits.project != null) {
          const project = recentEdits.project;
          addNewProject(project.title, project.todos);
          recentEdits.project = null;
        }
        // setAlertPopup("Cannot have two projects with the same name!")
        notify('Cannot have two projects with the same name!');
        return false;
      }
    }
    
    // fetch(`http://localhost:8000/api/projects/`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: name,
    //   })
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     const newProject = new Project(name, data.id);
    //     setProjects([...projects, newProject]);
    //     setCurrentProject(newProject);
    //     setCurrentTodos(currentProject.todos);
    //   })
    const new_project : Project = {
      // id: data.id 
      title,
      todos,
    };
    setProjects([...projects, new_project]);
    setCurrentProject(new_project);
    recentEdits.project = null;
  });

  return (
    <TodoListContext.Provider 
      value={{
        projects,
        setProjects,
        currentProject,
        setCurrentProject,
        addNewTodo,
        addNewProject,
        popupID,
        setPopupID,
        editInfo,
        setEditInfo,
        recentEdits,
        setRecentEdits,
        notify,
      }}
    >
      <ToastContainer/>
      <Container>
        <Sidebar/>
        <Header>
          Todo Manager
        </Header>
        <ProjectDisplay/>
      </Container>
      <PopupArea/>
    </TodoListContext.Provider>
  )
}

export default App
