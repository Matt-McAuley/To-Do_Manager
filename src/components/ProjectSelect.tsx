import { Todo, Project } from "../Classes"
import styled from '@emotion/styled'
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

type Props = {
    projects: Project[];
    setCurrentProject: React.Dispatch<React.SetStateAction<Project>>;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ProjectSelect = (props: Props) => {
    const {projects, setCurrentProject, setTodos} = {...props};

    return (
        <Container>
            {projects.map((project) => (
                <Button onClick={() => {
                        setCurrentProject(project)
                        setTodos([...project.todos])
                    }
                }> {project.title}</Button>
            ))}
        </Container>
    );
}

export default ProjectSelect;