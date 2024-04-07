import { Todo } from "../Classes"
import styled from '@emotion/styled'
import DeleteIcon from "../assets/delete.svg"
import ExpandIcon from "../assets/dots-horizontal.svg"
import EditIcon from "../assets/note-edit.svg"
import { useContext } from "react"
import { format } from 'date-fns'
import { TodoListContext, TodoListContextType } from "../TodoListContext"

const Container = styled.div`
    display:flex;
    justify-content:space-between;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border: 2px solid black;
    background-color: #5AB9EA;
    width: 78%;
    height: 10%;
    border-radius: 7px;
    font-size: 22px;
`;

const Image = styled.img`
    width: 30px;
    cursor: pointer;
    padding-left: 8px;
    padding-right: 8px;
    &:hover {
        background-color: #6cc1ec;
    }
    &:active {
        border: 1px solid black;
    }
`

const Item = styled.div`
    padding-left: 5px;
    padding-right: 5px;
`

const Title = styled.div`
    overflow: scroll;
    width: 60%;
    height: 2rem;
    font-weight: 700;
    font-size: 25px;
`

const Icons = styled.div`
    width: 21%;
`

type Props = {
    todo: Todo;
}

const TodoContainer = (props: Props) => {
    const todo = props.todo;
    const { setExpandPopup, projects, setProjects, editInfo, currentProject, allTodos, setTodoPopup, setEditInfo } = useContext(TodoListContext) as TodoListContextType;

    return currentProject.equals(allTodos) ? (
        <Container>
            <Title>{todo.title}</Title>
            <Item>Due Date:{" " + format(todo.dueDate, 'MM/dd/yyyy')}</Item>
            <Item>Priority:{" " + todo.priority}</Item>
        </Container>
    ) : (
        <Container>
            <Title>{todo.title}</Title>
            <Item>Due Date:{" " + format(todo.dueDate, 'MM/dd/yyyy')}</Item>
            <Item>Priority:{" " + todo.priority}</Item>
            <Icons>  
                <Image src={ExpandIcon} onClick={() => {
                    setEditInfo({
                        ...editInfo,
                        todoTitle : todo.title,
                        description : todo.description,
                        date : format(todo.dueDate, 'MM/dd/yyyy'),
                        priority : todo.priority
                    })
                    setExpandPopup(true);
                }}/>
                <Image src={EditIcon} onClick={() => {
                    setEditInfo({
                        ...editInfo,
                        todoTitle : todo.title,
                        description : todo.description,
                        date : format(todo.dueDate, 'yyyy-MM-dd'),
                        priority : todo.priority
                    })
                    currentProject.removeTodo(todo);
                    allTodos.removeTodo(todo);
                    setTodoPopup(true);
                }}/>
                <Image src={DeleteIcon} onClick={() => {
                    currentProject.removeTodo(todo);
                    allTodos.removeTodo(todo);
                    setProjects([...projects]);
                }}/>
            </Icons> 
        </Container>
    );
}

export default TodoContainer;