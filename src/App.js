import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';

class App extends Component {
  state ={
    todos: [
      {id: 1, name: 'Learn JSX', isComplete: false},
      {id: 2, name: 'Build an awesome app', isComplete: false},
      {id: 3, name: 'Get good at React!', isComplete: false}
      ],
      currentTodo:''
  };
  handleRemove = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos: updatedTodos})
  }
  handleToggle = (id) =>{
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    this.setState({todos: updatedTodos})
  }
  handleSubmit = ( evt ) => {
    evt.preventDefault();
    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete:false};
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
  }
  handleEmptySubmit = ( evt ) => {
    evt.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo item'
    })
  }
  handleInputChange = ( evt ) => {
    this.setState({
      currentTodo: evt.target.value
    });
  } 
  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="react logo" />
          <h2>React Todos</h2>
        </header>
        <div className="Todo-App">
            {this.state.errorMessage && <span className='error'>
              {this.state.errorMessage}
            </span>}
            <TodoForm handleSubmit={submitHandler} 
                      currentTodo={this.state.currentTodo} 
                      handleInputChange={this.handleInputChange}/>
            <TodoList handleToggle={this.handleToggle} 
                      handleRemove={this.handleRemove} 
                      todos={this.state.todos}/>
            <Footer />
        </div>
      </div>
    );
  }
}

export default App;
