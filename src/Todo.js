

function Todo({ todo }) {
  return (
    <label className="my-2">
      <input className="mx-1" type="checkbox" checked={todo.complete}/>
      {todo.name}
    </label>
  )
}

export default Todo