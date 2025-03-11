import styled from '@emotion/styled'
import { useContext} from 'react';
import ProjectSelect from '../components/ProjectSelect'
import {TodoListContext, TodoListContextType} from '../TodoListContext';

const Container = styled.div`
  font-family: "DM Sans", serif;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  background-color: #5680E9;
  display:flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Button = styled.button`
  border: 1px solid black;
  border-radius: 8px;
  width: 80%;
  height: 30%;
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
`

const Buttons = styled.div`
  margin-top : 30px;
  margin-bottom: 5px;
  height: 20%;
`;


const Sidebar = () => {
  const { setPopupID, currentProject, notify } = useContext(TodoListContext) as TodoListContextType;

  return (
    <Container>
      <Buttons>
        <Button 
          onClick={() => {
              if (currentProject.id === -1) {
                notify("Please select a project first")
                return;
              }
              setPopupID(0)
          }}
        >Add To-Do
        </Button>
        <Button
          onClick={() => {setPopupID(2)}}
        >Add Project
        </Button>
      </Buttons>
      <ProjectSelect/>
    </Container>
  );
}

export default Sidebar