class Todo {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: string;

    constructor(title: string, description: string, dueDate: Date, priority: string, id: number) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id;
    }
}

class Project {
    todos: Todo[];
    title: string;
    id: number;

    constructor(title: string, id: number) {
        this.todos = [];
        this.title = title;
        this.id = id;
    }

    addTodo(todo: Todo) {
        this.todos.push(todo);
        this.todos = this.todos.sort(function(a: Todo, b: Todo) {
            return (a.dueDate).getTime() - (b.dueDate).getTime();
        });
    }

    removeTodo(todo: Todo) {
        const i = this.todos.indexOf(todo);
        this.todos.splice(i, 1);
    }

    equals(project : Project) {
        if (this.title != project.title) {
            return false;
        }
        return true;
    }
}

export {Project, Todo}