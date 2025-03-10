import styled from '@emotion/styled'
import { TodoListContext, TodoListContextType } from '../../TodoListContext';
import { useContext } from 'react';

const Container = styled.form`
    width: 50%;
    height: 70%;
    position: absolute;
    background-color:white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    font-family: "DM Sans", serif;
    padding: 20px;
`;

const ExitButton = styled.button`
    font-size: 20px;
    padding: 10px;
    font-weight: bold;
    color: white;
    background-color: #ca5757;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: none;
    &:hover {
        background-color: #9a4242;
    }
    float: right;
`

const Description = styled.div`
    border: 1px solid black;
    font-size: 20px;
    overflow: auto;
    padding: 10px;
    height: 85%;
    overflow-wrap: break-word;
`

const Title = styled.label`
    font-size: 40px;
    font-weight: bold;
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Date = styled.label`
    font-size: 40px;
    font-weight: bold;
    padding: 10px;
    margin-right: 30px;
`

const ExpandPopup = () => {

    const { setEditInfo, editInfo, setPopupID} = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container>
            <ExitButton onClick={() => {
                setPopupID(-1);
                setEditInfo({
                    todoTitle: "",
                    todoId: -1,
                    projectTitle: "",
                    projectId: -1,
                    projectTodos: [],
                    date: "",
                    priority: "",
                    description: "",
                })
                }}>X</ExitButton>
            <div style={{padding: '10px', paddingBottom: '20px', height: '95%', display: 'flex', flexDirection: "column", justifyContent: 'space-between'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Title>{editInfo.todoTitle}</Title>
                    <Date>{editInfo.date}</Date>
                </div>
                <Description>{editInfo.description}</Description>
            </div>
        </Container> 
    );

}

export default ExpandPopup;