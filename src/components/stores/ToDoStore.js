import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

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
    handleActions(action){
        switch(action.type){
            case "CREATE_TODO":{
                console.log('creating');
                this.createToDo(action.text);
            }
            default:{
                break;
            }
        }
    }
}

const toDoStore = new ToDoStore();
dispatcher.register(toDoStore.handleActions.bind(toDoStore));
window.dispatcher=dispatcher;
export default toDoStore;