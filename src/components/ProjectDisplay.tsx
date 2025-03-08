import { Todo } from "../Types";
import TodoContainer from "./TodoContainer";
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { TodoListContext, TodoListContextType } from "../TodoListContext";
import { useContext } from "react";
import { PropTypes } from "@mui/material";

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

const LoadingContainer = styled.div`
    background-color: #C1C8E4;
    display:flex;
    height:100vh;
    widht:100%;
    justify-content:center;
    align-items:center;
`

const LoadingWave = styled.div`
    width: 300px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`

const LoadingWaveAnimation = keyframes`
    0% {
        height: 10px;
    }

    50% {
        height: 50px;
    }

    100% {
        height: 10px;
    }
`

const LoadingBar = styled.div`
    width: 20px;
    height: 10px;
    margin: 0 5px;
    background-color: #5680E9;
    border-radius: 5px;
    animation: ${LoadingWaveAnimation} 1s ease-in-out infinite;
    &:nth-child(2) {
        animation-delay: 0.1s;
    }
    &:nth-child(3) {
        animation-delay: 0.2s;
    }
    &:nth-child(4) {
        animation-delay: 0.3s;
    }
`

type PropTypes = {
    loading : boolean;
}

const ProjectDisplay = (props : PropTypes) => {

    const { currentProject } = useContext(TodoListContext) as TodoListContextType;

    return props.loading 
    ? (
        <LoadingContainer>
            <LoadingWave>
                <LoadingBar/>
                <LoadingBar/>
                <LoadingBar/>
                <LoadingBar/>
            </LoadingWave>
        </LoadingContainer>
    )
    : (
        <Container>
            {currentProject.todos.map((todo: Todo, index: number) => (
                <TodoContainer key={index} todo={todo}/>
            ))}
        </Container>
    );
}

export default ProjectDisplay;