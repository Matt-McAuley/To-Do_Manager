import {Todo} from "../Classes";
import TodoContainer from "./TodoContainer";
import styled from '@emotion/styled'
import TodoPopup from '../components/TodoPopup';
import ProjectPopup from "./ProjectPopup";
import { TodoListContext, TodoListContextType } from "../TodoListContext";
import { useContext } from "react";

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


const ProjectDisplay = () => {

    const { currentProject } = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container>
            <h1>
            {currentProject.title}
            </h1>
            {currentProject.todos.map((todo: Todo) => (
                <TodoContainer key={todo.title} todo={todo}/>
            ))}
            <TodoPopup/>
            <ProjectPopup/>
        </Container>
    );
}

export default ProjectDisplay;