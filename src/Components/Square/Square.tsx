import React from 'react'
import './Square.style.css'

interface valueofColor {
  color: number;
}
function Square({color}:valueofColor) {
  
  return (
    <p className='square-box-text-center'>{" "}</p>
  )
}

export default Square