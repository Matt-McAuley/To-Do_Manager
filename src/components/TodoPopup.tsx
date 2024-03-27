import styled from '@emotion/styled'
import { TextField, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material'
import { TodoListContext, TodoListContextType } from '../TodoListContext';
import { useContext, useState } from 'react';

const Container = styled.form`
  width: 70%;
  height 70%;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TodoPopup = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("");

    const { todoPopupDisplayed, setTodoPopupDisplayed, addNewTodo } = useContext(TodoListContext) as TodoListContextType;

    return todoPopupDisplayed ? (
        <Container onSubmit={(evt) => {
            evt.preventDefault;
            addNewTodo(title, description, new Date(date), priority);
            setTitle("");
            setDescription("");
            setDate("");
            setPriority("");
            setTodoPopupDisplayed(false);
            }}>
            <TextField id="outlined-basic" value="a" label="Title" variant="outlined" placeholder='Title' onChange={(evt) => setTitle(evt.target.value)} required/>
            <TextField id="outlined-basic" value="a" label="Description" variant="outlined" placeholder='Description' onChange={(evt) => setDescription(evt.target.value)} required/>
            <FormLabel id="demo-radio-buttons-group-label">Priority</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                
                onChange={(evt) => setPriority(evt.target.value)}
            >
                <FormControlLabel checked value="low" control={<Radio />} label="low" required/>
                <FormControlLabel value="medium" control={<Radio />} label="medium" required/>
                <FormControlLabel value="high" control={<Radio />} label="high" required/>
            </RadioGroup>
            <input type="Date" onChange={(evt) => setDate(evt.target.value)} required/>
            <button type="submit">Submit</button>
        </Container>
    ) : null;

}

export default TodoPopup;