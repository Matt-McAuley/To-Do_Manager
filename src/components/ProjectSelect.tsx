import { Project } from "../Classes"
import styled from '@emotion/styled'
import DeleteIcon from "../assets/delete.svg"
import { Button } from '@mui/material'

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

type Props = {
    projects: Project[];
    setCurrentProject: React.Dispatch<React.SetStateAction<Project>>;
}

const ProjectSelect = (props: Props) => {
    const {projects, setCurrentProject} = {...props};

    return (
        <Container>
            {projects.map((project) => (
                <Proj key={project.title}>
                    <Button onClick={() => {
                            setCurrentProject(project)
                        }
                    }> {project.title}</Button>
                    <Image src={DeleteIcon}/>
                </Proj>
            ))}
        </Container>
    );
}

export default ProjectSelect;