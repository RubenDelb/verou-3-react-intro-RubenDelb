

function Todo({ todoName }) {
  return (
    <label className="my-2">
      <input className="mx-1" type="checkbox" />
      {todoName}
    </label>
  )
}

export default Todo