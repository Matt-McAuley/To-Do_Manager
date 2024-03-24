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
  background-color: blue;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size: x-large;
`;

function App() {
  const allTodos = new Project("All Todos");
  const exampleProject = new Project("Example");
  const exampleTodo = new Todo("Fold Laundry", "You must fold your laundry today", new Date("1/1/1999"), "low");
  allTodos.addTodo(exampleTodo);
  exampleProject.addTodo(exampleTodo);

  const [todos, setTodos] = useState(exampleProject.todos);
  const [projects, setProjects] = useState([exampleProject]);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [todoPopupDisplayed, setTodoPopupDisplayed] = useState(false);

  const addNewTodo = ((name:string, description:string, date:Date, priority:string) => {
    const newTodo = new Todo(name, description, date, priority);
    allTodos.addTodo(newTodo);
    currentProject.addTodo(newTodo);
    setTodos([...currentProject.todos]);
  })

  const addNewProject = ((name:string) => {
    const newProject = new Project(name);
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
    setTodos([...currentProject.todos]);
  })

  return (
    <TodoListContext.Provider 
      value={{
        allTodos,
        todos,
        setTodos,
        projects,
        setProjects,
        currentProject,
        setCurrentProject,
        addNewTodo,
        addNewProject,
        todoPopupDisplayed,
        setTodoPopupDisplayed
      }}
    >
      <Container>
        <Sidebar/>
        <Header>
          Todo Manager
        </Header>
        <ProjectDisplay todos={todos}/>
      </Container>
    </TodoListContext.Provider>
  )
}

export default App
