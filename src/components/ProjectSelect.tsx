import styled from '@emotion/styled'
import DeleteIcon from "../assets/delete.svg"
import EditIcon from "../assets/note-edit.svg"
import { TodoListContext, TodoListContextType } from "../TodoListContext"
import { useContext } from 'react'

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
`;

const Image = styled.img`
    width: 25px;
    cursor: pointer;
    &:hover {
        background-color: #6cc1ec;
    }
    &:active {
        border: 1px solid black;
    }
`

const Button = styled.button`
    font-family: "DM Sans";
    border: none;
    background-color: #5AB9EA;
    cursor: pointer;
    font-size: 20px;
    &:hover {
        background-color: #6cc1ec;
    }
    &:active {
        border: 1px solid black;
    }
`

const Proj = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    background-color: #5AB9EA;
    display: flex;
    justify-content: end;
    overflow: hidden;
`

const ProjectSelect = () => {
    const { setAlertPopup, editInfo, setEditInfo, projects, setProjects, setCurrentProject, setEditProjectPopup} = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container>
            {projects.map((project) => (
                <Proj key={project.title}>
                    <Button onClick={() => {
                            setCurrentProject({
                                // id: project.id
                                title: project.title,
                                todos: project.todos,
                            });
                        }
                    }> {project.title}</Button>
                    <Image src={EditIcon} onClick={() => {
                        setCurrentProject({
                            // id: project.id
                            title: project.title,
                            todos: project.todos,
                        });
                        setEditInfo({...editInfo, projectTitle : project.title});
                        setEditProjectPopup(true);
                    }}/>
                    <Image src={DeleteIcon} onClick={() => {
                        if (projects.length > 1) {
                            const index = projects.indexOf(project);
                            setProjects(projects.filter((_, i) => i != index));
                            setCurrentProject(projects[0]);
                        }
                        else {
                            setAlertPopup("Must have at least one project");
                        }
                    }}/>
                </Proj>
            ))}
        </Container>
    );
}

export default ProjectSelect;