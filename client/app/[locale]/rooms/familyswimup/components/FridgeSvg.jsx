import React from 'react'

const FridgeSvg = ({className,width,height}) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
  <path d="M14.9999 1.66699H4.99992C4.08075 1.66699 3.33325 2.41449 3.33325 3.33366V16.667C3.33325 17.5862 4.08075 18.3337 4.99992 18.3337H14.9999C15.9191 18.3337 16.6666 17.5862 16.6666 16.667V3.33366C16.6666 2.41449 15.9191 1.66699 14.9999 1.66699ZM14.9999 3.33366L15.0008 7.50033H8.33325V5.83366H6.66659V7.50033H4.99992V3.33366H14.9999ZM4.99992 16.667V9.16699H6.66659V11.667H8.33325V9.16699H15.0008L15.0016 16.667H4.99992Z" fill="black"/>
</svg>
    </div>
  )
}

export default FridgeSvg
