import { EventEmitter } from 'events';

class ToDoStore extends EventEmitter {
    constructor(){
        super();
        this.todos = [
            // test data
            // {id: 1, name: 'Learn JSX', isComplete: false},
            // {id: 2, name: 'Build an awesome app', isComplete: false},
            // {id: 3, name: 'Get good at React!', isComplete: false}
        ]
       
    }
     createToDo(text){
        const id = Date.now();
        this.todos.push({
            id,
            text,
            complete: false
        }); 
        this.emit('change');
    }
    getAll(){
        return this.todos;
    }
}

const toDoStore = new ToDoStore();

export default toDoStore;