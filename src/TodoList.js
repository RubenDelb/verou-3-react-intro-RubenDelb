import Todo from "./Todo"


function TodoList({ todos, toggleChecked }) {
  return (
    todos.map(todo => {
      return <Todo todo={todo} key={todo.id} complete={todo.complete} toggleChecked={toggleChecked} />
    })
    
  )
}

export default TodoList