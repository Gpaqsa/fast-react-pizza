import React  from 'react'
import { Link } from 'react-router-dom'
const Button = ({ children, disabled, to }) => {
  const className = "md:px-6 md:py-3 bg-yellow-400 uppercase font-semibold tracking-wide rounded-full text-stone-800 py-3 px-4 inline-block  hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed;"
  if (to) return <Link to={to} className={className}>{children }</Link>
  return (
    <button disabled={disabled} className={className}>{ children}</button>
  )
}

export default Button