import React, { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import {BrowserRouter, Routes, Route} from "react-router-dom";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value
    if (name === '') return 
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    console.log(name);
    todoNameRef.current.value = null
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  const amountTodos = todos.filter(todo => !todo.complete).length;
  let textForAmountTodos;
  if (todos.filter(todo => !todo.complete).length === 0) {
    textForAmountTodos = "nothing more"
  } else if (todos.filter(todo => !todo.complete).length === 1) {
    textForAmountTodos = "1 thing"
  } else {
    textForAmountTodos = amountTodos + " things"
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input className='border-2 p-1 rounded' placeholder='Enter todo here...' ref={todoNameRef} type="text" />
      <button className='border-2 p-1 mx-2 rounded bg-teal-800' onClick={handleAddTodo}>Add Todo</button>
      <button className='border-2 p-1 mx-2 rounded bg-teal-800' onClick={handleClearTodos}>Clear Completed Todos</button>
      <div className='text-3xl'> You have {textForAmountTodos} to do </div>
    </>
  );
}

export default App;
