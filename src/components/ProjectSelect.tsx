import styled from '@emotion/styled'
import DeleteIcon from "../assets/delete.svg"
import EditIcon from "../assets/note-edit.svg"
import { TodoListContext, TodoListContextType } from "../TodoListContext"
import { useContext } from 'react'
import {backendURL} from "../constants.ts";

const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:start;
  align-items:center;
  width: 85%;
  height: 60%;
  background-color: #84CEEB;
  margin: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 5px;
`;

const Image = styled.img`
    width: 25px;
    cursor: pointer;
    &:hover {
        background-color: #54ACDA;
    }
    &:active {
        border: 1px solid black;
    }
`

const Button = styled.button`
    font-family: "DM Sans", serif;
    border: none;
    background-color: #5AB9EA;
    cursor: pointer;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
        background-color: #54ACDA;
    }
    &:active {
        border: 1px solid black;
    }
    flex: 1;
`

const Proj = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    background-color: #5AB9EA;
    justify-content: end;
    overflow: hidden;
    flex-shrink: 0;
    border-bottom: 1px solid black;
`

const ProjectSelect = () => {
    const { editInfo, setEditInfo, projects, setProjects, setCurrentProject, currentProject, setPopupID, notify } = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container>
            <Proj>
                <Button style={(currentProject.id === -1) ? {backgroundColor : '#54ACDA', fontWeight: 'bold'} : {fontWeight: 'bold'}}
                        onClick={() => {
                    setCurrentProject({
                        id: -1,
                        title: "View All",
                        todos: projects.map(project => project.todos).flat().sort((a, b) => a.due_date - b.due_date),
                    });
                }}>View All</Button>
            </Proj>
            {projects.map((project, index) => (
                <Proj key={index}>
                    <Button style={(project.id === currentProject.id) ? {backgroundColor : '#54ACDA'} : {}}
                            onClick={() => {
                            setCurrentProject({
                                id: project.id,
                                title: project.title,
                                todos: project.todos,
                            });
                        }
                    }> {project.title}</Button>
                    <Image src={EditIcon} onClick={() => {
                        setCurrentProject({
                            id: project.id,
                            title: project.title,
                            todos: project.todos,
                        });
                        setEditInfo({...editInfo, projectTitle : project.title, projectId: project.id, projectTodos: project.todos});
                        setPopupID(1);
                    }}/>
                    <Image src={DeleteIcon} onClick={() => {
                        if (projects.length > 1) {
                            const proj_to_delete = projects.find((ele) => ele.id === project.id)!;
                            fetch(`${backendURL}/api/projects/${proj_to_delete.id}/`, {
                                method: "DELETE",
                                credentials: "include",
                            });
                            const new_projects = projects.filter((ele) => ele.id !== project.id);
                            setProjects(new_projects);
                            setCurrentProject(new_projects[0]);
                        }
                        else {
                            notify('Must have at least one project!');
                            return;
                        }
                    }}/>
                </Proj>
            ))}
        </Container>
    );
}

export default ProjectSelect;