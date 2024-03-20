import { Todo } from "../Classes"
import styled from '@emotion/styled'

const Container = styled.div`
    display:flex;
    justify-content:space-between;
    margin: 10px;
    padding: 10px;
    border: 2px solid black;
`;

type Props = {
    todo: Todo;
}

const TodoContainer = (props: Props) => {
    const todo = props.todo;

    return (
        <Container>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            <div>{todo.dueDate.toString()}</div>
            <div>{todo.priority}</div>
        </Container>
    );
}

export default TodoContainer;