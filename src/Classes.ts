class Todo {
    title: string;
    description: string;
    dueDate: Date;
    priority: string;

    constructor(title: string, description: string, dueDate: Date, priority: string) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    equals(todo: Todo) {
        if (this.title == todo.title) {
                return true;
            }
        return false;
    }
}

class Project {
    todos: Todo[];
    title: string;

    constructor(title: string) {
        this.todos = [];
        this.title = title;
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