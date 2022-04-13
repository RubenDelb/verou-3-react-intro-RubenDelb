import React, { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import Input from './Input';
import Button from './Button';
// import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  

  return (
    <div className='grid justify-center text-center'>
      <Header />
      <Input placeHolder={"Enter todo here..."}/>
      <Button btnName={"Add"} />
      <Button btnName={"Remove completed todos"} />
      <TodoList todoName={"testtt"}/>
    </div>
  );
}

export default App;
