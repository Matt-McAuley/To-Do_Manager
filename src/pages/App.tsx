import styled from '@emotion/styled'
import { useState, useEffect } from 'react';
import { Todo, Project, editInfo, edits } from '../Types.ts';
import ProjectDisplay from '../components/ProjectDisplay.tsx'
import Sidebar from '../components/Sidebar.tsx';
import { TodoListContext } from '../TodoListContext.ts';
import PopupArea from '../components/PopupArea.tsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

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

const LogoutButton = styled.button`
  border: 1px solid black;
  border-radius: 8px;
  width: 200px;
  height: 50px;
  background-color: #5AB9EA;
  cursor: pointer;
  font-size: 22px;
  &:hover {
    box-shadow: 0px 37px 20px -20px rgba(0,0,0,0.2);
    transform: translate(0px, -5px) scale(1.05);
  }
  transition: all ease-in-out 300ms;
  margin-top: 10px;
  margin-bottom: 18px;
  position: absolute;
  right: 20px;
  top: 10px;
`;

function App() {
  
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([{
    id: 1,
    title: "Example",
    todos: [{
      id: 1,
      title: "Fold Laundry",
      description: "You must fold your laundry today",
      due_date: (new Date("1/1/2024")).valueOf() + (new Date("1/1/2024")).getTimezoneOffset() * 60 * 1000,
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
  });
  const navigate = useNavigate();

  const notify = (text: string) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
      pauseOnHover: false,
    });
  }

  useEffect(() => {
    fetch('/api/projects/', {
      method: "GET",
      credentials: "include",
      })
      .then(response => {
        if (!response.ok) {
          navigate('/');
          return;
        }
        return response.json()
      })
      .then(data => {
        let new_projects : Project[] = [];
        data.projects.sort((a : Project, b : Project) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
        data.projects.forEach((project : Project) => {
          project.todos.sort((a, b) => a.due_date - b.due_date);
          new_projects = ([...new_projects, project]);
        });
        setProjects(new_projects);
        setCurrentProject(new_projects[0]);
        setLoading(false);
      });
  }, [])

  const addNewTodo = ((title:string, description:string, due_date:number, priority:string) => {
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
    fetch(`/api/projects/${currentProject.id}/todo`, {
      method: "POST",
      body: JSON.stringify({
            title,
            description,
            due_date,
            priority,
            }),
      credentials: "include",
      })
      .then(response => response.json())
      .then(data => {
        const new_project : Project = {
          id: currentProject.id,
          title: currentProject.title,
          todos: [...currentProject.todos, {
            id: data.id,
            title,
            description,
            due_date: due_date + (new Date("1/1/2024")).getTimezoneOffset() * 60 * 1000,
            priority,
          }].sort((a, b) => a.due_date - b.due_date),
        };
        const new_projects = projects.filter((project) => project.title != currentProject.title);
        setProjects([...new_projects, new_project]);
        setCurrentProject(new_project);
        recentEdits.todo = null;
      })
  });

  const addNewProject = ((title:string, todos: Todo[] = []) => {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].title.toLocaleLowerCase() == title.toLocaleLowerCase()) {
        if (recentEdits.project != null) {
          const project = recentEdits.project;
          addNewProject(project.title, project.todos);
          recentEdits.project = null;
        }
        notify('Cannot have two projects with the same name!');
        return false;
      }
    }
    fetch(`/api/projects/`, {
      method: "POST",
      body: JSON.stringify({
        title,
        todos,
      }),
        credentials: "include",
      })
      .then(response => response.json())
      .then(data => {
        const new_project : Project = {
          id: data.id,
          title,
          todos: data.todos,
        };
        setProjects([...projects, new_project].sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0)));
        setCurrentProject(new_project);
        recentEdits.project = null;
      })
  });

  const logout = () => {
    fetch('/api/logout/', {
      method: "POST",
      credentials: "include",
    })
    .then(response => {
      if (!response.ok) {
        notify("Failed to logout");
        return;
      }
      navigate('/');
  })};

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
          To-Do Manager
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </Header>
        <ProjectDisplay loading={loading}/>
      </Container>
      <PopupArea/>
    </TodoListContext.Provider>
  )
}

export default App