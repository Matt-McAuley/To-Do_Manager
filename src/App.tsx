import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { useState } from 'react';
import { Project, Todo } from './Classes';
import ProjectDisplay from './components/ProjectDisplay'
import ProjectSelect from './components/ProjectSelect'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 20% 80%;
  grid-template-columns: 20% 80%;
  text-align: center;
  overflow: hidden;
`;
const Sidebar = styled.div`
  grid-column: 1 \ 2;
  grid-row: 1 / 3;
  background-color: red;
  display:flex;
  flex-direction:column;
  justify-content:start;
  align-items:center;
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
  const [projects, setProjects] = useState([new Project("All Todos")])
  const [currentProject, setCurrentProject] = useState(projects[0])
  const [todos, setTodos] = useState(currentProject.todos)

  const addNewTodo = ((name:string, description:string, date:Date, priority:number) => {
    const newTodo = new Todo(name, description, date, priority);
    currentProject.addTodo(newTodo);
    setTodos([...currentProject.todos]);
  })

  const addNewProject = ((name:string) => {
    const newProject = new Project(name);
    setProjects([...projects, newProject]);
  })

  return (
    <Container>
      <Sidebar>
        <Button variant='outlined'>All Todos</Button>
        <Button variant="outlined" 
          onClick={() => {addNewTodo("hi","hi",new Date("1/1/23"),2)}}
        >Add Todo</Button>
        <ProjectSelect projects={projects} setCurrentProject={setCurrentProject}/>
        <Button variant='outlined'
          onClick={() => {addNewProject("hi")}}
        >Add Project</Button>
      </Sidebar>
      <Header>
        Todo Manager
      </Header>
      <ProjectDisplay key={todos.toString()} todos={todos}/>
    </Container>
  )
}

export default App
