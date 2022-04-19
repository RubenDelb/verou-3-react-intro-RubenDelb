import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="text-center text-xs py-4 bg-stone-400">
        <div className="text-stone-900"> © 2022 Copyright: <Link to="/" className="italic font-semibold ">Toedoe</Link> </div>
    </footer>
  )
}

export default Footer