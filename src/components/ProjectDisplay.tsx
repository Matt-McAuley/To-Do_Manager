import {Todo, Project} from "../Classes";
import TodoContainer from "./TodoContainer";
import styled from '@emotion/styled'
import TodoPopup from '../components/TodoPopup';

const Container = styled.div`
  grid-column: 2 \ 3;
  grid-row: 2 / 3;
  background-color: yellow;
  display:flex;
  flex-direction:column;
  justify-content:start;
  align-items:center;
  overflow: scroll;
  position: relative;
`;

type Props = {
    todos: Todo[];
    project: Project;
}

const ProjectDisplay = (props: Props) => {
    const todos = props.todos;
    const project = props.project;

    return (
        <Container>
            <h1>
            {project.title}
            </h1>
            {todos.map((todo) => (
                <TodoContainer key={todo.title} todo={todo}/>
            ))}
            <TodoPopup/>
        </Container>
    );
}

export default ProjectDisplay;