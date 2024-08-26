import styled from '@emotion/styled'
import { useContext } from 'react';
import { TodoListContext, TodoListContextType } from '../TodoListContext';
import TodoPopup from './Popups/TodoPopup';
import ProjectPopup from './Popups/ProjectPopup';
import ExpandPopup from './Popups/ExpandPopup';

const Backdrop = styled.div`
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color:rgba(0,0,0,0.2);
  z-index: 1;
`;

const PopupArea = () => {

  const { popupID } = useContext(TodoListContext) as TodoListContextType;
  const popups = [<TodoPopup/>, <ProjectPopup/>, <ExpandPopup/>];

  return (popupID >= 0) ? (
      <Backdrop>
        {popups[popupID]}
      </Backdrop>
  ) : null;

}

export default PopupArea;