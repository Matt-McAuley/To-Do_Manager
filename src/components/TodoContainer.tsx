import { Todo } from "../Types"
import styled from '@emotion/styled'
import { useContext } from "react"
import moment from 'moment'
import { TodoListContext, TodoListContextType } from "../TodoListContext"

const Item = styled.div`
    padding-left: 5px;
    padding-right: 5px;
    font-size: 30px;
`

const Date = styled.div`
    width: 25%;
    font-size: 25px;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.div`
    width: 50%;
    height: 2rem;
    font-weight: 700;
    font-size: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ProjectTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    padding-right: 25px;
    padding-left: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
`

type Props = {
    todo: Todo;
}

const TodoContainer = (props: Props) => {
    const todo = props.todo;
    const { currentProject, setEditTodoInfo, setPopupID } = useContext(TodoListContext) as TodoListContextType;

    const Container = styled.div`
    display:flex;
    justify-content:space-between;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border: 2px solid black;
    width: 85%;
    height: 80px;
    border-radius: 7px;
    font-size: 22px;
    transition: all ease-in-out 300ms;
    cursor: pointer;
    ${todo.priority === 'low' ? 'background-color: lightgreen;' : todo.priority === 'medium' ? 'background-color: yellow;' : 'background-color: orangered;'}
    ${todo.priority === 'low' ? '&:hover {background-color: #FFFFFF;}' : todo.priority === 'medium' ? '&:hover {background-color: #FFFFFF;}' : '&:hover {background-color: #FFFFFF;}'}
`;

    return (
        <Container onClick={() => {
                       setEditTodoInfo({
                           id: todo.id,
                           title : todo.title,
                           description : todo.description,
                           date : moment(todo.due_date).format('MM/DD/YYYY'),
                           priority : todo.priority,
                           projectId : todo.projectId,
                           projectTitle : todo.projectTitle
                       })
                       setPopupID(4);
                   }}>
            <Title>{todo.title}</Title>
            <Date style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Item>{moment(todo.due_date).format('dddd: MM/DD/YYYY')}</Item>
                {moment(todo.due_date).dayOfYear() < moment().dayOfYear() ? <Item style={(todo.priority === 'high') ? {color: 'white', fontWeight: 'bolder'} : {color: 'red', fontWeight: 'bolder'}}>Overdue!</Item> : null}
                {moment().dayOfYear() === moment(todo.due_date).dayOfYear() ? <Item style={(todo.priority === 'high') ? {color: 'white', fontWeight: 'bolder'} : {color: 'red', fontWeight: 'bolder'}}>Due Today!</Item> : null}
            </Date>
            {(currentProject.id === -1)
                ? (
                <ProjectTitle>
                    {todo.projectTitle}
                </ProjectTitle>
                )
                : null}
        </Container>
    );
}

export default TodoContainer;