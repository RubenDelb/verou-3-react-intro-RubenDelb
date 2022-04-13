import { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList";
import { v4 } from 'uuid';
import Header from './Header';
import Input from './Input';
import Button from './Button';
// import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  // create a todolist with useState 
  const [todos, setTodos] = useState([])
  // catch any input that's given with useRef
  const inputRef = useRef()

  // Set new todo in the "todos"-array with the value of what's been inputted in the inputfield 
  const addTodo = () => {
    const inputName = inputRef.current.value // catch inputvalue
    if (inputName === "") return
    setTodos(prevTodos => {
      return [...prevTodos, {id: v4(), name: inputName, complete: false}]
    })
    // Make the inputfield empty again after adding the todo
    inputRef.current.value = ""
  }

  return (
    <div className='grid justify-center text-center'>
      <Header headerTitle={"My Todo-List"} />
      <Input placeHolder={"Enter todo here..."} inputValue={inputRef} />
      <Button btnName={"Add"} btnFunction={addTodo}/>
      <Button btnName={"Remove completed todos"} />
      <TodoList todos={todos}/>
    </div>
  );
}

export default App;
