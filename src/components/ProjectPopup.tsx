import styled from '@emotion/styled'
import { TextField} from '@mui/material'
import { TodoListContext, TodoListContextType } from '../TodoListContext';
import { useContext } from 'react';

const Container = styled.form`
  width: 70%;
  height 70%;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProjectPopup = () => {

    const { editInfo, setEditInfo, projectPopup, setProjectPopup, addNewProject } = useContext(TodoListContext) as TodoListContextType;

    return projectPopup ? (
        <Container onSubmit={(evt) => {
            evt.preventDefault;
            addNewProject(editInfo.projectTitle);
            setEditInfo({...editInfo, projectTitle : ""});
            setProjectPopup(false);
            }}>
            <TextField id="outlined-basic" label="Title" variant="outlined" placeholder='Title' 
            onChange={(evt) => setEditInfo({...editInfo, projectTitle: evt.target.value})} value={editInfo.projectTitle} required/>
            <button type="submit">Submit</button>
        </Container>
    ) : null;

}

export default ProjectPopup;