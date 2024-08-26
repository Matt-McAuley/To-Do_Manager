import styled from '@emotion/styled'
import { TodoListContext, TodoListContextType } from '../../TodoListContext';
import { useContext } from 'react';

const Container = styled.form`
    width: 35%;
    height: 20%;
    position: absolute;
    background-color:white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    border: 2px solid black;
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 100%;
    font-family: "DM Sans";
`;

const Title = styled.input`
  grid-row: 1/2;
  font-family: "DM Sans";
  grid-column: 1/2;
  font-size: 22px;
  padding: 10px;
`

const Button = styled.button`
  grid-row: 2/3;
  grid-column: 1/2;
  font-family: "DM Sans";
  font-size: 30px;
  font-weight: bold;
  background-color: lightgray;
  cursor: pointer;
`

const ProjectPopup = () => {

    const { editInfo, setEditInfo, setPopupID, addNewProject } = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container onSubmit={(evt : React.FormEvent) => {
            evt.preventDefault;
            addNewProject(editInfo.projectTitle, editInfo.projectTodos);
            setEditInfo({...editInfo, projectTitle : "", projectTodos: [],});
            setPopupID(-1);
            }}>
            <Title id="outlined-basic" placeholder='Title' 
            onChange={(evt : React.ChangeEvent<HTMLInputElement>) => setEditInfo({...editInfo, projectTitle: evt.target.value})} value={editInfo.projectTitle} required/>
            <Button type="submit">Submit</Button>
        </Container>
    );

}

export default ProjectPopup;