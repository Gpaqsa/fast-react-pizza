import React  from 'react'
import { Link } from 'react-router-dom'
const Button = ({ children, disabled, to, type }) => {
  const base = " bg-yellow-400 uppercase font-semibold tracking-wide rounded-full text-stone-800 inline-block  hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed;"
 
  const styles = {
    primary: base + ' px-4 py-3 md:px-5 md:py-3.5',
    small: base + " px-4 py-2 text-xs md:px-4 md:py-2.5",
    secondary: 'border-2 border-stone-300 px-4 py-3 md:px-6 md:py-4 py-2.5 md:py-3.5  uppercase font-semibold tracking-wide rounded-full text-stone-800 inline-block  hover:bg-stone-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed;'
  }
 
  if (to) return <Link to={to} className={styles[type]}>{children}</Link>
  return (
    <button disabled={disabled} className={styles[type]}>{ children}</button>
  )
}

export default Button