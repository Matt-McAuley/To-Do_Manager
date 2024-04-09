import { createContext } from "react";
import { Project } from "./Classes";

export type TodoListContextType = {
    projects : Project[];
    setProjects : React.Dispatch<React.SetStateAction<Project[]>>;
    currentProject : Project;
    setCurrentProject : React.Dispatch<React.SetStateAction<Project>>;
    addNewTodo : (name: string, description: string, date: Date, priority: string) => void;
    addNewProject : (name: string) => void;
    todoPopup : boolean;
    setTodoPopup : React.Dispatch<React.SetStateAction<boolean>>;
    projectPopup : boolean;
    setProjectPopup : React.Dispatch<React.SetStateAction<boolean>>;
    expandPopup : boolean;
    setExpandPopup : React.Dispatch<React.SetStateAction<boolean>>;
    alertPopup : string;
    setAlertPopup : React.Dispatch<React.SetStateAction<string>>;
    editProjectPopup : boolean;
    setEditProjectPopup : React.Dispatch<React.SetStateAction<boolean>>;
    editInfo : {projectTitle: string; todoTitle: string; description: string; date: string; priority: string;};
    setEditInfo : React.Dispatch<React.SetStateAction<{
        projectTitle: string;
        todoTitle: string;
        description: string;
        date: string;
        priority: string;
    }>>;
}

export const TodoListContext = createContext<TodoListContextType | null>(null);