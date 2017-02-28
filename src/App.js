import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';
import ToDoStore from './components/stores/ToDoStore';

class App extends Component {
  state ={
    todos: ToDoStore.getAll(),
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
  componentWillMount(){
    ToDoStore.on('change', ()=>{
      this.setState({
        todos:ToDoStore.getAll()
      });
    })
  }
  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="react logo" />
          <h2>To Do List</h2>
        </header>
        <div className="Todo-App">
            {this.state.errorMessage && 
            <span className='error'>
              {this.state.errorMessage}
            </span>}
            <TodoForm handleSubmit={submitHandler} 
                      currentTodo={this.state.currentTodo} 
                      handleInputChange={this.handleInputChange}/>
            {/*{this.props.children}*/}
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
