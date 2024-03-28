import styled from '@emotion/styled'
import { TextField} from '@mui/material'
import { TodoListContext, TodoListContextType } from '../TodoListContext';
import { useContext, useState } from 'react';

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

    const [title, setTitle] = useState("");
    const { projectPopupDisplayed, setProjectPopupDisplayed, addNewProject } = useContext(TodoListContext) as TodoListContextType;

    return projectPopupDisplayed ? (
        <Container onSubmit={(evt) => {
            evt.preventDefault;
            addNewProject(title);
            setTitle("");
            setProjectPopupDisplayed(false);
            }}>
            <TextField id="outlined-basic" label="Title" variant="outlined" placeholder='Title' onChange={(evt) => setTitle(evt.target.value)} required/>
            <button type="submit">Submit</button>
        </Container>
    ) : null;

}

export default ProjectPopup;