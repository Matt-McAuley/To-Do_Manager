import styled from '@emotion/styled'
import { useState } from 'react';
import { Project, Todo } from './Classes';
import ProjectDisplay from './components/ProjectDisplay'
import Sidebar from './components/Sidebar';

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

const allTodos: Todo[] = [];
const exampleProject = new Project("Example");
const exampleTodo = new Todo("Fold Laundry", "You must fold your laundry today", new Date("1/1/1999"), 1);
allTodos.push(exampleTodo);
exampleProject.addTodo(exampleTodo);

function App() {
  const [todos, setTodos] = useState(allTodos)

  return (
    <Container>
      <Sidebar allTodos={allTodos} exampleProject={exampleProject} setTodos={setTodos}/>
      <Header>
        Todo Manager
      </Header>
      <ProjectDisplay todos={todos}/>
    </Container>
  )
}

export default App
