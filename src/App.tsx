import styled from '@emotion/styled'
import { useState } from 'react';
import { Project, Todo } from './Classes';
import ProjectDisplay from './components/ProjectDisplay'
import Sidebar from './components/Sidebar';
import {TodoListContext} from './TodoListContext';
import TodoPopup from './components/TodoPopup';
import ProjectPopup from './components/ProjectPopup';
import AlertPopup from './components/AlertPopup';

const Container = styled.div`
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 20% 80%;
  grid-template-columns: 20% 80%;
  text-align: center;
  overflow: hidden;
`;
const Header = styled.header`
  grid-column: 1 \ 3;
  grid-row: 1 / 2;
  background-color: lightblue;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size: x-large;
`;
const Backdrop = styled.div`
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color:rgba(0,0,0,0.3);
  z-index: 1;
`;

function App() {
  const exampleProject = new Project("Example");
  const exampleTodo = new Todo("Fold Laundry", "You must fold your laundry today", new Date("1/1/2024"), "low");
  const allTodosProject = new Project("All Todos");
  allTodosProject.addTodo(exampleTodo);
  exampleProject.addTodo(exampleTodo);

  const [projects, setProjects] = useState([exampleProject]);
  const [currentTodo, setCurrentTodo] = useState(exampleTodo);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [todoPopupDisplayed, setTodoPopupDisplayed] = useState(false);
  const [projectPopupDisplayed, setProjectPopupDisplayed] = useState(false);
  const [expandPopupDisplayed, setExpandPopupDisplayed] = useState(false);
  const [alertPopup, setAlertPopup] = useState("");
  const [editPopup, setEditPopup] = useState("");
  const [deletePopup, setDeletePopup] = useState("");
  const [allTodos, ] = useState(allTodosProject);
  const [editInfo, setEditInfo] = useState({
    title: "",
    description: "",
    date: "",
    priority: ""
  });

  const addNewTodo = ((name:string, description:string, date:Date, priority:string) => {

    for (let i = 0; i < currentProject.todos.length; i++) {
      if (currentProject.todos[i].title == name) {
        setAlertPopup("Cannot have two todos with the same name in one project!")
        return false;
      }
    }
    const localDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
    const newTodo = new Todo(name, description, localDate, priority);
    currentProject.addTodo(newTodo);
    allTodos.addTodo(newTodo);
  });

  const addNewProject = ((name:string) => {
    for (let i = 0; i < projects.length; i++) {
      if (name.toLocaleLowerCase() == "all todos" || projects[i].title.toLocaleLowerCase() == name.toLocaleLowerCase()) {
        setAlertPopup("Cannot have two projects with the same name!")
        return false;
      }
    }

    const newProject = new Project(name);
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
  });

  return (
    <TodoListContext.Provider 
      value={{
        allTodos,
        projects,
        setProjects,
        currentProject,
        setCurrentProject,
        addNewTodo,
        addNewProject,
        todoPopupDisplayed,
        setTodoPopupDisplayed,
        projectPopupDisplayed,
        setProjectPopupDisplayed,
        alertPopup,
        setAlertPopup,
        currentTodo,
        setCurrentTodo,
        editPopup,
        setEditPopup,
        deletePopup,
        setDeletePopup,
        expandPopupDisplayed,
        setExpandPopupDisplayed,
        editInfo,
        setEditInfo
      }}
    >
      <Container>
        <Sidebar/>
        <Header>
          Todo Manager
        </Header>
        <ProjectDisplay/>
      </Container>
      <Backdrop style={{"display": (todoPopupDisplayed || projectPopupDisplayed || 
        alertPopup || expandPopupDisplayed || deletePopup || editPopup) ? "" : "none"}}>
        <TodoPopup/>
        <ProjectPopup/>
        <AlertPopup/>
      </Backdrop>
    </TodoListContext.Provider>
  )
}

export default App
