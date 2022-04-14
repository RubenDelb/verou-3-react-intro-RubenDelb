import { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList";
import { v4 } from 'uuid';
import Header from './Header';
import Input from './Input';
import Button from './Button';
// import {BrowserRouter, Routes, Route} from "react-router-dom";

const LocalStorageKey = "todosForTodoApp" // unique key to store 1 string in user's localstorage

function App() {
  // create a todolist with useState 
  const [todos, setTodos] = useState([])
  // catch any input that's given with useRef
  const inputRef = useRef()

  // On every page load (*1), Parse the stored todos from localstorage back to an array (*2), 
  // And populate the todolist with that array(*3) 
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LocalStorageKey)) // *2
    if (storedTodos) setTodos(storedTodos) // *3
  }, []) // *1

  // Every time the todo's are modified(*1), it saves the new array of todos as a string in localstorage(*2)
  useEffect(() => {
    localStorage.setItem(LocalStorageKey, JSON.stringify(todos)) //*2
  }, [todos]) // *1

  // Set new todo in the "todos"-array with the value of what's been inputted in the inputfield 
  const addTodo = () => {
    const inputName = inputRef.current.value // catch inputvalue
    if (inputName === "") return
    setTodos(prevTodos => {
      return [...prevTodos, { id: v4(), name: inputName, complete: false }]
    })
    // Make the inputfield empty again after adding the todo
    inputRef.current.value = ""
  }

  const toggleChecked = (id) => {
    const newTodos = [...todos]
    const checkedTodo = todos.find(todo => (todo.id === id))
    checkedTodo.complete = !checkedTodo.complete
    setTodos(newTodos)
  }

  const removeCompletedTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className='grid justify-center text-center'>
      <Header headerTitle={"My Todo-List"} />
      <Input placeHolder={"Enter todo here..."} inputValue={inputRef} />
      <Button btnName={"Add"} btnFunction={addTodo} />
      <Button btnName={"Remove completed todos"} btnFunction={removeCompletedTodos} />
      <TodoList todos={todos} toggleChecked={toggleChecked} />
    </div>
  );
}

export default App;