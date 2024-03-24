import styled from '@emotion/styled'
import { TextField, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material'
import { TodoListContext, TodoListContextType } from '../TodoListContext';
import { useContext, useState } from 'react';

const Container = styled.div`
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

    const { todoPopupDisplayed, setTodoPopupDisplayed } = useContext(TodoListContext) as TodoListContextType;

    const { addNewTodo } = useContext(TodoListContext) as TodoListContextType;

    return todoPopupDisplayed ? (
        <Container>
            <TextField id="outlined-basic" label="Title" variant="outlined" placeholder='Title' onChange={(evt) => setTitle(evt.target.value)}/>
            <TextField id="outlined-basic" label="Description" variant="outlined" placeholder='Description' onChange={(evt) => setDescription(evt.target.value)}/>
            <FormLabel id="demo-radio-buttons-group-label">Priority</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={(evt) => setPriority(evt.target.value)}
            >
                <FormControlLabel value="low" control={<Radio />} label="low" />
                <FormControlLabel value="medium" control={<Radio />} label="medium" />
                <FormControlLabel value="high" control={<Radio />} label="high" />
            </RadioGroup>
            <input type="Date" onChange={(evt) => setDate(evt.target.value)}/>
            <button onClick={() => {
                addNewTodo(title, description, new Date(date), priority);
                setTitle("");
                setDescription("");
                setDate("");
                setPriority("");
                setTodoPopupDisplayed(false);
                }
                }>Submit</button>
        </Container>
    ) : null;

}

export default TodoPopup;