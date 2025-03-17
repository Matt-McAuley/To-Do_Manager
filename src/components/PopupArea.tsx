import styled from '@emotion/styled'
import { useContext } from 'react';
import { TodoListContext, TodoListContextType } from '../TodoListContext';
import AddTodoPopup from './Popups/AddTodoPopup.tsx';
import EditProjectPopup from './Popups/EditProjectPopup.tsx';
import ExpandPopup from './Popups/ExpandPopup';
import EditTodoPopup from "./Popups/EditTodoPopup.tsx";
import AddProjectPopup from "./Popups/AddProjectPopup.tsx";
import AreYouSurePopup from "./Popups/AreYouSurePopup.tsx";

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
  const popups = [<AddTodoPopup/>, <EditTodoPopup/>, <AddProjectPopup/>, <EditProjectPopup/>, <ExpandPopup/>, <AreYouSurePopup/>];

  return (popupID >= 0) ? (
      <Backdrop>
        {popups[popupID]}
      </Backdrop>
  ) : null;

}

export default PopupArea;