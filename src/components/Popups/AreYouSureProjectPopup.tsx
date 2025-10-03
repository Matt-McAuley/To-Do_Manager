import styled from '@emotion/styled'
import { TodoListContext, TodoListContextType } from '../../TodoListContext';
import { useContext } from 'react';

const Container = styled.div`
    width: 40%;
    height: 30%;
    position: absolute;
    background-color:white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    font-family: "DM Sans", serif;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Question = styled.label`
    font-family: "DM Sans", serif;
    font-size: 30px;
    font-weight: bold;
`

const Project = styled.label`
    font-family: "DM Sans", serif;
    font-size: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
`

const NoButton = styled.button`
    font-family: "DM Sans", serif;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    width: 45%;
    background-color: lightcoral;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 1px solid black;
    &:hover {
        background-color: #b3b3b3;
    }
`

const YesButton = styled.button`
    font-family: "DM Sans", serif;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    width: 45%;
    background-color: lightgreen;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 1px solid black;
    &:hover {
        background-color: #b3b3b3;
    }
`

const AreYouSureProjectPopup = () => {

    const { setEditProjectInfo, editProjectInfo, setPopupID, deleteProject} = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container>
            <Question>Are you sure you want to delete this Project?</Question>
            <Project>{editProjectInfo.title}</Project>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <NoButton onClick={() => setPopupID(-1)}>Cancel</NoButton>
                <YesButton onClick={() => {
                    deleteProject(editProjectInfo.id);
                    setEditProjectInfo({
                        id: -1,
                        title: '',
                    });
                    setPopupID(-1);
                }}>Confirm</YesButton>
            </div>
        </Container>
    );

}

export default AreYouSureProjectPopup;