import React  from 'react'
import { Link } from 'react-router-dom'
const Button = ({ children, disabled, to, type, onClick }) => {
  const base = " bg-yellow-400 text-sm uppercase font-semibold tracking-wide rounded-full text-stone-800 inline-block  hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed;"
 
  const styles = {
    primary: base + ' px-4 py-3 md:px-5 md:py-3.5',
    small: base + " px-4 py-2 text-xs md:px-4 md:py-2.5",
    round: base + " px-2.5 py-1 text-sm md:px-3.5 md:py-2",
    secondary: 'border-2 text-sm border-stone-300 px-4 py-3 md:px-6 md:py-4 py-2.5 md:py-3.5  uppercase font-semibold tracking-wide rounded-full text-stone-800 inline-block  hover:bg-stone-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed;'
  }
 
  if (to) return <Link to={to} className={styles[type]}>{children}</Link>
  if (onClick) {
    return <button onClick={onClick} disabled={ disabled}  className={styles[type]}>{children}</button>
  }
  
  return (
    <button disabled={disabled} className={styles[type]} >{ children}</button>
  )
}

export default Button