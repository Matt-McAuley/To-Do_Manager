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
    font-family: "DM Sans";
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
    font-size: 20px;
    overflow: auto;
    padding: 10px;
    height: 85%;
`

const Title = styled.label`
    font-size: 40px;
    font-weight: bold;
    padding: 10px;
`

const ExpandPopup = () => {

    const { setEditInfo, editInfo, setPopupID} = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container>
            <ExitButton onClick={() => {
                setPopupID(-1);
                setEditInfo({
                    todoTitle: "",
                    projectTitle: "",
                    projectTodos: [],
                    date: "",
                    priority: "",
                    description: "",
                })
                }}>X</ExitButton>
            <div style={{padding: '10px', paddingBottom: '20px', height: '95%', display: 'flex', flexDirection: "column", justifyContent: 'space-between'}}>
                <Title>{editInfo.todoTitle}</Title>
                <Description>{editInfo.description}</Description>
            </div>
        </Container> 
    );

}

export default ExpandPopup;