const Input = ({ placeHolder, inputValue }) => {
    return (
        <input className="border-2 p-1 m-1 rounded" type="text" placeholder={placeHolder} ref={inputValue} />
    )
}

export default Input