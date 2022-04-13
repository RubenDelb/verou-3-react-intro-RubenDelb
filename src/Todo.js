

function Todo({ todo, toggleChecked }) {
  const handleChecked = () => {
    toggleChecked(todo.id)
  }

  return (
    <label className="my-2">
      <input className="mx-1" type="checkbox" checked={todo.complete} onChange={handleChecked}/>
      {todo.name}
    </label>
  )
}

export default Todo