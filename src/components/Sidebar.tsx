import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { useContext} from 'react';
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
  const { setAlertPopup, allTodos, projects, setCurrentProject, setProjectPopupDisplayed, setTodoPopupDisplayed, currentProject  } = useContext(TodoListContext) as TodoListContextType;

  return (
    <Container>
      <Button variant='outlined'
        key={"allTodos"}
        onClick={() => {
          setCurrentProject(allTodos);
        }}
      >All Todos
      </Button>
      <Button variant="outlined" 
        onClick={() => {
          if (currentProject.equals(allTodos)) {
            setAlertPopup("Please select a project");
            return false;
          }
          setTodoPopupDisplayed(true)
        }}
      >Add Todo
      </Button>
      <ProjectSelect projects={projects} setCurrentProject={setCurrentProject}/>
      <Button variant='outlined'
        onClick={() => {setProjectPopupDisplayed(true)}}
      >Add Project
      </Button>
    </Container>
  );
}

export default Sidebar