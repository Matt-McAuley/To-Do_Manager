type Todo = {
    // id: number;
    title: string;
    description: string;
    due_date: Date;
    priority: string;
}

type Project = {
    // id: number;
    todos: Todo[];
    title: string;
}

export type { Project, Todo }