type Todo = {
    id: number;
    title: string;
    description: string;
    due_date: number;
    priority: string;
    projectTitle: string;
}

type Project = {
    id: number;
    todos: Todo[];
    title: string;
}

type editInfo = {
    projectTitle: string;
    projectId: number;
    projectTodos: Todo[];
    todoTitle: string;
    todoId: number;
    description: string;
    date: string;
    priority: string;
}

export type { Project, Todo, editInfo }