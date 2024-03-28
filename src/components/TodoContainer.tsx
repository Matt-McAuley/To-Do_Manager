import { Todo } from "../Classes"
import styled from '@emotion/styled'
import DeleteIcon from "../assets/delete.svg"
import ExpandIcon from "../assets/dots-horizontal.svg"
import EditIcon from "../assets/note-edit.svg"
import { useContext } from "react"
import { TodoListContext, TodoListContextType } from "../TodoListContext"

const Container = styled.div`
    display:flex;
    justify-content:space-between;
    margin: 10px;
    padding: 10px;
    border: 2px solid black;
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

type Props = {
    todo: Todo;
}

const TodoContainer = (props: Props) => {
    const todo = props.todo;
    const { currentProject, allTodos } = useContext(TodoListContext) as TodoListContextType;

    return currentProject.equals(allTodos) ? (
        <Container>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            <div>{todo.dueDate.toString()}</div>
            <div>{todo.priority}</div>
        </Container>
    ) : (
        <Container>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            <div>{todo.dueDate.toString()}</div>
            <div>{todo.priority}</div>
            <Image src={ExpandIcon}/>
            <Image src={EditIcon}/>
            <Image src={DeleteIcon}/>
        </Container>
    );
}

export default TodoContainer;