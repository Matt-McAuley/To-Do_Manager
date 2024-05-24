import styled from '@emotion/styled'
import { TodoListContext, TodoListContextType } from '../TodoListContext';
import { useContext } from 'react';
import { Project } from '../Types'

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

const EditProjectPopup = () => {

    const { setProjects, setCurrentProject, projects, setAlertPopup, editInfo, setEditInfo, editProjectPopup, setEditProjectPopup, currentProject } = useContext(TodoListContext) as TodoListContextType;

    return editProjectPopup ? (
        <Container onSubmit={(evt) => {
            evt.preventDefault;
            let same = false;
            projects.forEach((project) => {
                if (project.title === editInfo.projectTitle) {
                    same = true;
                }
            })
            if (same) {
                setAlertPopup("Cannot have two projects with the same name!")
                setEditInfo({...editInfo, projectTitle : ""});
                setEditProjectPopup(false);
                return;
            }
            const new_project : Project = {
                // id: currentProject.id,
                title: editInfo.projectTitle,
                todos: currentProject.todos,
            };
            const new_projects = projects.filter((proj) => proj.title != currentProject.title);
            setProjects([...new_projects, new_project]);
            setCurrentProject(new_project);
            setEditInfo({...editInfo, projectTitle : ""});
            setEditProjectPopup(false);
            }}>
            <Title id="outlined-basic" placeholder='Title' 
            onChange={(evt) => setEditInfo({...editInfo, projectTitle: evt.target.value})} value={editInfo.projectTitle} required/>
            <Button type="submit">Submit</Button>
        </Container>
    ) : null;

}

export default EditProjectPopup;