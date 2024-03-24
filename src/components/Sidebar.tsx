import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { useContext } from 'react';
import { Todo } from '../Classes';
import ProjectSelect from '../components/ProjectSelect'
import {TodoListContext, TodoListContextType} from '../TodoListContext';

const Container = styled.div`
  grid-column: 1 \ 2;
  grid-row: 1 / 3;
  background-color: red;
  display:flex;
  flex-direction:column;
  justify-content:start;
  align-items:center;
`;

const Sidebar = () => {
  const { allTodos, setTodos, projects, setCurrentProject, addNewProject, setTodoPopupDisplayed  } = useContext(TodoListContext) as TodoListContextType;

  return (
    <Container>
      <Button variant='outlined'
        onClick={() => {
          allTodos.sort(function(a: Todo, b: Todo) {
            return (a.dueDate).getTime() - (b.dueDate).getTime();
        });
          setTodos(allTodos)
        }}
      >All Todos
      </Button>
      <Button variant="outlined" 
        onClick={() => {setTodoPopupDisplayed(true)}}
      >Add Todo
      </Button>
      <ProjectSelect projects={projects} setCurrentProject={setCurrentProject} setTodos={setTodos}/>
      <Button variant='outlined'
        onClick={() => {addNewProject("hi")}}
      >Add Project
      </Button>
    </Container>
  );
}

export default Sidebar