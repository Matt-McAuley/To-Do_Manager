import {Todo} from "../Classes";
import TodoContainer from "./TodoContainer";
import styled from '@emotion/styled'

const Container = styled.div`
  grid-column: 2 \ 3;
  grid-row: 2 / 3;
  background-color: yellow;
  display:flex;
  flex-direction:column;
  justify-content:start;
  align-items:center;
  overflow: scroll;
`;

type Props = {
    todos: Todo[];
}

const ProjectDisplay = (props: Props) => {
    const todos = props.todos;
    return (
        <Container>
            {todos.map((todo) => (
                <TodoContainer todo={todo}/>
            ))}
        </Container>
    );
}

export default ProjectDisplay;