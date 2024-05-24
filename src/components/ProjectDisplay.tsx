import {Todo} from "../Classes";
import TodoContainer from "./TodoContainer";
import styled from '@emotion/styled'
import { TodoListContext, TodoListContextType } from "../TodoListContext";
import { useContext } from "react";

const Container = styled.div`
  grid-column: 2 \ 3;
  grid-row: 2 / 3;
  background-color: #C1C8E4;
  display:flex;
  flex-direction:column;
  justify-content:start;
  align-items:center;
  position: relative;
  padding: 0;
  overflow-y: auto;
`;

const Header = styled.h2`
    font-size: 45px;
    padding: 0;
    margin: 0;
    height: 12%;
    width: 100%;
    text-align: center;
    background-color: #94a0d0;
`

const ProjectDisplay = () => {

    const { currentTodos, currentProject } = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container>
            <Header>Project:
            {" " + currentProject.title}
            </Header>
            {currentTodos.map((todo: Todo, index: number) => (
                <TodoContainer key={todo.title + currentProject.title + index} todo={todo}/>
            ))}
        </Container>
    );
}

export default ProjectDisplay;