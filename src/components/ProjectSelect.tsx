import styled from '@emotion/styled'
import DeleteIcon from "../assets/delete.svg"
import EditIcon from "../assets/note-edit.svg"
import { Button } from '@mui/material'
import { TodoListContext, TodoListContextType } from "../TodoListContext"
import { useContext } from 'react'

const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:start;
  align-items:center;
  overflow: scroll;
  width: 70%;
  height: 60%;
  background-color:pink;
`;

const Image = styled.img`
    width: 30px;
    cursor: pointer;
    &:hover {
        background-color: red;
    }
    &:active {
        background-color: blue;
    }
`

const Proj = styled.div`
    display: flex;
`

const ProjectSelect = () => {
    const { editInfo, setEditInfo, projects, setCurrentProject, setEditProjectPopup} = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container>
            {projects.map((project) => (
                <Proj key={project.title}>
                    <Button onClick={() => {
                            setCurrentProject(project)
                        }
                    }> {project.title}</Button>
                    <Image src={EditIcon} onClick={() =>{
                        setCurrentProject(project);
                        setEditInfo({...editInfo, projectTitle : project.title});
                        setEditProjectPopup(true);
                    }}/>
                    <Image src={DeleteIcon}/>
                </Proj>
            ))}
        </Container>
    );
}

export default ProjectSelect;