import styled from '@emotion/styled'
import { useState, useEffect } from 'react';
import { Todo, Project, editInfo } from '../Types.ts';
import ProjectDisplay from '../components/ProjectDisplay.tsx'
import Sidebar from '../components/Sidebar.tsx';
import { TodoListContext } from '../TodoListContext.ts';
import PopupArea from '../components/PopupArea.tsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { backendURL } from '../constants.ts';

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
  font-family: "DM Sans", serif;
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
    box-shadow: 0 37px 20px -20px rgba(0,0,0,0.2);
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
    id: 0,
    title: "Loading...",
    todos: []
  }]);
  const [currentProject, setCurrentProject] = useState<Project>(projects[0]);
  const [editInfo, setEditInfo] = useState<editInfo>({
    projectTitle: "",
    projectId: -1,
    projectTodos: [],
    todoTitle: "",
    todoId: -1,
    description: "",
    date: "",
    priority: ""
  });
  const [popupID, setPopupID] = useState(-1);
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
    fetch(`${backendURL}/api/projects/`, {
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
        data.projects.sort((a: Project, b: Project) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        data.projects.forEach((project : Project) => {
          project.todos.map(todo => todo.projectTitle = project.title);
          project.todos.sort((a, b) => a.due_date - b.due_date);
          new_projects = ([...new_projects, project]);
        });
        setProjects(new_projects);
        setCurrentProject(new_projects[0]);
        setLoading(false);
      });
  }, [navigate])

  const addNewTodo = ((title:string, description:string, due_date:number, priority:string, previousID: number) => {
    const filtered_project : Project = {
        id: currentProject.id,
        title: currentProject.title,
        todos: currentProject.todos.filter((ele) => ele.id != previousID),
    }
    for (let i = 0; i < filtered_project.todos.length; i++) {
      if (filtered_project.todos[i].title == title) {
        notify('Cannot have two todos with the same name in one project!');
        return false;
      }
    }
    fetch(`${backendURL}/api/todo/${previousID}/`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      fetch(`${backendURL}/api/projects/${currentProject.id}/todo`, {
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
            const new_project: Project = {
              id: currentProject.id,
              title: currentProject.title,
              todos: [...filtered_project.todos, {
                id: data.id,
                title,
                description,
                due_date: due_date,
                priority,
                projectTitle: currentProject.title,
              }].sort((a, b) => a.due_date - b.due_date),
            };
            setProjects([...projects.filter((proj) => proj.id != currentProject.id), new_project]
                .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())));
            setCurrentProject(new_project);
          })
    });
  });

  const addNewProject = ((title:string,  previousID: number, todos: Todo[] = []) => {
    const filteredProjects = projects.filter((project) => project.id !== previousID);
    for (let i = 0; i < filteredProjects.length; i++) {
      if (filteredProjects[i].title.toLocaleLowerCase() == title.toLocaleLowerCase()) {
        notify('Cannot have two projects with the same name!');
        return false;
      }
    }
    fetch(`${backendURL}/api/projects/${previousID}/`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      fetch(`${backendURL}/api/projects/`, {
        method: "POST",
        body: JSON.stringify({
          title,
          todos,
        }),
        credentials: "include",
      })
          .then(response => response.json())
          .then(data => {
            const new_project: Project = {
              id: data.id,
              title,
              todos: data.todos,
            };
            setProjects([...filteredProjects, new_project].sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())));
            setCurrentProject(new_project);
          })
    });
  });

  const logout = () => {
    fetch(`${backendURL}/api/logout/`, {
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