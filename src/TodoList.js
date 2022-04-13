import Todo from "./Todo"


function TodoList({ todos }) {
  return (
    todos.map(todo => {
      return <Todo todo={todo} key={todo.id} complete={todo.complete}/>
    })
    
  )
}

export default TodoList