import styled from '@emotion/styled'
import { useState } from 'react';
import { Project, Todo } from './Classes';
import ProjectDisplay from './components/ProjectDisplay'
import Sidebar from './components/Sidebar';
import {TodoListContext} from './TodoListContext';

const Container = styled.div`
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

function App() {
  const exampleProject = new Project("Example");
  const exampleTodo = new Todo("Fold Laundry", "You must fold your laundry today", new Date("1/1/2024"), "low");
  const allTodosProject = new Project("All Todos");
  allTodosProject.addTodo(exampleTodo);
  exampleProject.addTodo(exampleTodo);

  const [projects, setProjects] = useState([exampleProject]);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [todoPopupDisplayed, setTodoPopupDisplayed] = useState(false);
  const [projectPopupDisplayed, setProjectPopupDisplayed] = useState(false);
  const [allTodos, ] = useState(allTodosProject);

  const addNewTodo = ((name:string, description:string, date:Date, priority:string) => {

    for (let i = 0; i < currentProject.todos.length; i++) {
      if (currentProject.todos[i].title == name) {
        alert("Cannot have two todos with the same name in one project!")
        return false;
      }
    }
    
    const newTodo = new Todo(name, description, date, priority);
    currentProject.addTodo(newTodo);
    allTodos.addTodo(newTodo);
  });

  const addNewProject = ((name:string) => {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].title == name) {
        alert("Cannot have two projects with the same name!")
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
        setProjectPopupDisplayed
      }}
    >
      <Container>
        <Sidebar/>
        <Header>
          Todo Manager
        </Header>
        <ProjectDisplay/>
      </Container>
    </TodoListContext.Provider>
  )
}

export default App
