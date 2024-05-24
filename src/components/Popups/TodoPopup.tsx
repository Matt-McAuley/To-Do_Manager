import styled from '@emotion/styled'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { TodoListContext, TodoListContextType } from '../../TodoListContext';
import { useContext } from 'react';

const Container = styled.form`
  width: 65%;
  height: 60%;
  position: absolute;
  background-color:white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  border: 2px solid black;
  display: grid;
  grid-template-rows: 80% 20%;
  grid-template-columns: 100%;
  font-family: "DM Sans";
`;

const InputArea = styled.div`
  display: grid;
  grid-template-rows: 25% 75%;
  grid-template-columns: 40% 40% 20%;
  grid-row: 1/2;
  grid-column: 1/2;
`

const Title = styled.input`
  grid-row: 1/2;
  grid-column: 1/2;
  font-family: "DM Sans";
  padding-left: 10px;
  font-size: 20px;
`

const Description = styled.textarea`
  grid-row: 2/3;
  grid-column: 1/3;
  max-width: 99%;
  font-family: "DM Sans";
  font-size: 18px;
  padding: 12px;
  resize: none;
`

const DateInput = styled.input`
  grid-row: 1/2;
  grid-column: 2/3;
  font-family: "DM Sans";
  font-size: 20px;
`

const PriorityLabel = styled.label`
  font-size: 25px;
  border: 1px solid black;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  grid-row: 1/2;
  grid-column: 3/4;
`

const Button = styled.button`
  grid-row: 2/3;
  grid-column: 1/2;
  font-family: "DM Sans";
  font-size: 30px;
  font-weight: bold;
  background-color: lightgray;
  cursor: pointer;
`

const TodoPopup = () => {

    const { editInfo, setEditInfo, setPopupID, addNewTodo } = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container onSubmit={(evt) => {
            evt.preventDefault;
            
            addNewTodo(editInfo.todoTitle, editInfo.description, new Date(editInfo.date), editInfo.priority);
            setEditInfo({
                ...editInfo,
                todoTitle : "",
                description : "",
                date : "",
                priority : ""
            })
            setPopupID(-1);
            }}>
            <InputArea>
                <Title id="outlined-basic" placeholder='Title' 
                onChange={(evt) => setEditInfo({...editInfo, todoTitle : (evt.target.value)})} 
                value={editInfo.todoTitle} required/>
                <Description id="outlined-basic" placeholder='Description' 
                onChange={(evt) => setEditInfo({...editInfo, description : (evt.target.value)})} 
                value={editInfo.description} required/>
                <PriorityLabel id="demo-radio-buttons-group-label">Priority</PriorityLabel>
                <RadioGroup
                    style={{"gridRow" : "2/3", "gridColumn" : "3/4", "paddingLeft" : "20px", 
                    "display" : "flex", "flexDirection" : "column", "justifyContent" : "space-around"}}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={editInfo.priority}
                    onChange={(evt) => setEditInfo({...editInfo, priority : evt.target.value})}
                >
                    <FormControlLabel value="low" control={<Radio />} label="low" required/>
                    <FormControlLabel value="medium" control={<Radio />} label="medium" />
                    <FormControlLabel value="high" control={<Radio />} label="high" />
                </RadioGroup>
                <DateInput type="Date" onChange={(evt) => setEditInfo({...editInfo, date : evt.target.value})} 
                value={editInfo.date} required/>
            </InputArea>
            <Button type="submit">Submit</Button>
        </Container> 
    );

}

export default TodoPopup;