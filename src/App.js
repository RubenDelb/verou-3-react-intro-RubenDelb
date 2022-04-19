import { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList";
import { v4 } from 'uuid';
import Header from './Header';
import Input from './Input';
import Button from './Button';
import DatePicker from "react-datepicker"
import CalendarFull from './CalendarFull';
import { Routes, Route } from 'react-router-dom';
import { toDate } from 'date-fns';
import NavBar from './NavBar';
import Footer from './Footer';


const LocalStorageKey = "todosForTodoApp" // unique key to store 1 string in user's localstorage

function App() {
  // create a todolist with useState 
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState([])
  // catch any input that's given with useRef
  const titleRef = useRef()
  const startDateRef = useRef()
  const endDateRef = useRef()


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
    const inputName = titleRef.current.value // catch inputvalue
    const startDate = startDateRef.current.props.selected
    const endDate = endDateRef.current.props.selected
    console.log(endDate);
    console.log(toDate(endDate));
    if (inputName === "") return
    setTodos(prevTodos => {
      return [...prevTodos, { id: v4(), title: inputName, complete: false, start: startDate, end: endDate}]
    })
    // Make the inputfield empty again after adding the todo
    titleRef.current.value = null
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

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <div className='flex flex-col h-screen text-center bg-stone-100 text-stone-700'>
        <NavBar />
      <main class="grid justify-center mb-auto">
        <Routes>
          <Route path='/' element={<><Header headerTitle={"My Todo-List"} />
            <Input placeHolder={"Enter todo here..."} inputValue={titleRef} />
            <DatePicker className="border-2 p-1 m-1 rounded"
              placeholderText="Start Date"
              selected={newTodo.start}
              onChange={(start) => setNewTodo({ ...newTodo, start })}
              ref={startDateRef}
              withPortal
              showTimeSelect
              filterTime={filterPassedTime}
              dateFormat="d MMMM yyyy, h:mm aa" />
            <DatePicker className="border-2 p-1 m-1 rounded"
              placeholderText="End Date"
              selected={newTodo.end}
              onChange={(end) => setNewTodo({ ...newTodo, end })}
              ref={endDateRef}
              withPortal
              showTimeSelect
              filterTime={filterPassedTime}
              dateFormat="d MMMM yyyy, h:mm aa" />
            <Button btnName={"Add"} btnFunction={addTodo} />
            <Button btnName={"Remove completed todos"} btnFunction={removeCompletedTodos} />
            <TodoList todos={todos} toggleChecked={toggleChecked} /></>} />
              <Route path='/calendar' element={<CalendarFull todos={todos} />} />
            </Routes>
      </main>
      <Footer />
      </div>
  );
}

export default App;