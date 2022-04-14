const Button = ({ btnName, btnFunction }) => {
    return (
        <button className="border-2 bg-gray-100 rounded m-1 p-1" onClick={btnFunction}>{btnName}</button>
    )
}

export default Button