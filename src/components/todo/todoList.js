import React from 'react';
import {TodoItem} from './todoItem';

export const TodoList = (props) => (
    <div className='Todo-List'>  
        <ul>
            {props.todos.map(todo =>
            <TodoItem handleToggle={props.handleToggle} 
                      handleRemove={props.handleRemove} 
                      key={todo.id} 
                      {...todo} />)}
        </ul>
    </div>
)

TodoList.propTypes ={
    todos: React.PropTypes.array.isRequired
}