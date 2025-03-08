import { Todo, Project } from "../Types"
import styled from '@emotion/styled'
import DeleteIcon from "../assets/delete.svg"
import ExpandIcon from "../assets/dots-horizontal.svg"
import EditIcon from "../assets/note-edit.svg"
import { useContext } from "react"
import { format } from 'date-fns'
import { TodoListContext, TodoListContextType } from "../TodoListContext"
import {backendURL} from "../constants.ts";

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
    transition: all ease-in-out 300ms;
`;

const Image = styled.img`
    width: 30px;
    cursor: pointer;
    padding-left: 8px;
    padding-right: 8px;
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
`

const Title = styled.div`
    width: 60%;
    height: 2rem;
    font-weight: 700;
    font-size: 25px;
    overflow: hidden;
`

const Icons = styled.div`
    width: 21%;
`

type Props = {
    todo: Todo;
}

const TodoContainer = (props: Props) => {
    const todo = props.todo;
    const { setCurrentProject, projects, setProjects, editInfo, currentProject, setEditInfo, setPopupID, setRecentEdits } = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container style={(todo.priority === 'low') ? {backgroundColor: 'lightgreen'} : (todo.priority === 'medium') ? {backgroundColor : 'yellow'} : {backgroundColor : 'orangered'}}>
            <Title>{todo.title}</Title>
            <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Item>Due On:{" " + format(todo.due_date, 'MM/dd/yyyy')}</Item>
                {Math.floor(todo.due_date / (24 * 60 * 60 * 1000)) < Math.floor(Date.now() / (24 * 60 * 60 * 1000)) ? <Item style={(todo.priority === 'high') ? {color: 'white', fontWeight: 'bolder'} : {color: 'red', fontWeight: 'bolder'}}>Overdue!</Item> : null}
                {Math.floor(todo.due_date / (24 * 60 * 60 * 1000)) === Math.floor(Date.now() / (24 * 60 * 60 * 1000)) ? <Item style={(todo.priority === 'high') ? {color: 'white', fontWeight: 'bolder'} : {color: 'red', fontWeight: 'bolder'}}>Due Today!</Item> : null}
            </div>
            <Icons>
                <Image src={ExpandIcon} onClick={() => {
                    setEditInfo({
                        ...editInfo,
                        todoTitle : todo.title,
                        description : todo.description,
                        date : format(todo.due_date, 'MM/dd/yyyy'),
                        priority : todo.priority
                    })
                    setPopupID(2);
                }}/>
                {(currentProject.id === -1) ? null : (
                    <>
                    <Image src={EditIcon} onClick={() => {
                        setRecentEdits({
                            project: null,
                            todo: {
                              id: todo.id,
                              title: todo.title,
                              description: todo.description,
                              due_date: todo.due_date,
                              priority: todo.priority,
                            },
                          });
                        setEditInfo({
                            ...editInfo,
                            todoTitle : todo.title,
                            description : todo.description,
                            date : format(todo.due_date, 'yyyy-MM-dd'),
                            priority : todo.priority
                        })
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
                        setPopupID(0);
                    }}/>
                    <Image src={DeleteIcon} onClick={() => {
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