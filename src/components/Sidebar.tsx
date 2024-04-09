import styled from '@emotion/styled'
import { useContext} from 'react';
import ProjectSelect from '../components/ProjectSelect'
import {TodoListContext, TodoListContextType} from '../TodoListContext';

const Container = styled.div`
  font-family: "DM Sans";
  grid-column: 1 \ 2;
  grid-row: 1 / 3;
  background-color: #5680E9;
  display:flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  width: 100%;
  height: 50%;
  background-color: #5680E9;
  cursor: pointer;
  font-size: 22px;
  &:hover {
    background-color: #678deb;
  }
  &:active {
    border: 1px solid black;
  }
  margin-top: 2px;
  margin-bottom: 2px;
`

const Buttons = styled.div`
  margin-top : 30px;
  margin-bottom: 5px;
  height: 20%;
`;


const Sidebar = () => {
  const { setProjectPopup, setTodoPopup  } = useContext(TodoListContext) as TodoListContextType;

  return (
    <Container>
      <Buttons>
        <Button 
          onClick={() => {
            setTodoPopup(true)
          }}
        >Add Todo
        </Button>
        <Button
          onClick={() => {setProjectPopup(true)}}
        >Add Project
        </Button>
      </Buttons>
      <ProjectSelect/>
    </Container>
  );
}

export default Sidebar