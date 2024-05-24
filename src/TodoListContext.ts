import { createContext } from "react";
import { Project, Todo } from "./Types";

export type TodoListContextType = {
    projects : Project[];
    setProjects : React.Dispatch<React.SetStateAction<Project[]>>;
    currentProject : Project;
    setCurrentProject : React.Dispatch<React.SetStateAction<Project>>;
    addNewTodo : (name: string, description: string, date: Date, priority: string) => void;
    addNewProject: (title: string, todos?: Todo[]) => false | undefined;
    popupID : number;
    setPopupID: React.Dispatch<React.SetStateAction<number>>;
    editInfo: {
        projectTitle: string;
        projectTodos: Todo[];
        todoTitle: string;
        description: string;
        date: string;
        priority: string;
    }
    setEditInfo: React.Dispatch<React.SetStateAction<{
        projectTitle: string;
        projectTodos: Todo[];
        todoTitle: string;
        description: string;
        date: string;
        priority: string;
    }>>,
    recentEdits: {
        project: null | Project;
        todo: null | Todo;
    },
    setRecentEdits: React.Dispatch<React.SetStateAction<{
        project: null | Project;
        todo: null | Todo;
    }>>
}

export const TodoListContext = createContext<TodoListContextType | null>(null);