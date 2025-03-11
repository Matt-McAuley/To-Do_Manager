import { Todo, Project } from "../Types"
import styled from '@emotion/styled'
import DeleteIcon from "../assets/delete.svg"
import EditIcon from "../assets/note-edit.svg"
import { useContext } from "react"
import moment from 'moment'
import { TodoListContext, TodoListContextType } from "../TodoListContext"
import {backendURL} from "../constants.ts";

const Image = styled.img`
    width: 40px;
    cursor: pointer;
    padding-left: 15px;
    padding-right: 15px;
    &:hover {
        background-color: #54ACDA;
    }
    &:active {
        border: 1px solid black;
    }
`

const Item = styled.div`
    padding-left: 5px;
    padding-right: 5px;
    font-size: 30px;
`

const Title = styled.div`
    width: 45%;
    height: 2rem;
    font-weight: 700;
    font-size: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Icons = styled.div`
    width: 21%;
`

const ProjectTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    padding-right: 10px;
    padding-left: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
`

type Props = {
    todo: Todo;
}

const TodoContainer = (props: Props) => {
    const todo = props.todo;
    const { setCurrentProject, projects, setProjects, currentProject, setEditTodoInfo, setPopupID } = useContext(TodoListContext) as TodoListContextType;

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
                           priority : todo.priority
                       })
                       setPopupID(4);
                   }}>
            <Title>{todo.title}</Title>
            <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Item>{moment(todo.due_date).format('dddd: MM/DD/YYYY')}</Item>
                {moment(todo.due_date).dayOfYear() < moment().dayOfYear() ? <Item style={(todo.priority === 'high') ? {color: 'white', fontWeight: 'bolder'} : {color: 'red', fontWeight: 'bolder'}}>Overdue!</Item> : null}
                {moment().dayOfYear() === moment(todo.due_date).dayOfYear() ? <Item style={(todo.priority === 'high') ? {color: 'white', fontWeight: 'bolder'} : {color: 'red', fontWeight: 'bolder'}}>Due Today!</Item> : null}
            </div>
            <Icons>
                {(currentProject.id === -1)
                    ? (
                    <ProjectTitle>
                        {todo.projectTitle}
                    </ProjectTitle>
                    )
                    : (
                    <>
                    <Image src={EditIcon} onClick={(e) => {
                        e.stopPropagation();
                        setEditTodoInfo({
                            id: todo.id,
                            title : todo.title,
                            description : todo.description,
                            date : moment(todo.due_date).format('YYYY-MM-DD'),
                            priority : todo.priority
                        });
                        setPopupID(1);
                    }}/>
                    <Image src={DeleteIcon} onClick={(e) => {
                        e.stopPropagation();
                        fetch(`${backendURL}/api/todo/${todo.id}/`, {
                            method: "DELETE",
                            credentials: "include",
                        });
                        const new_project : Project = {
                            id: currentProject.id,
                            title: currentProject.title,
                            todos: currentProject.todos.filter((ele) => ele.title != todo.title),
                        };
                        const new_projects = projects.filter((proj) => proj.title != currentProject.title);
                        setProjects([...new_projects, new_project]);
                        setCurrentProject(new_project);
                    }}/>
                    </>
                )}
            </Icons>
        </Container>
    );
}

export default TodoContainer;