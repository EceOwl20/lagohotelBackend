import React from 'react'

const AreaSvg = ({className,width,height}) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
  <path d="M2.5 4.16667V15.8333C2.5 16.7525 3.2475 17.5 4.16667 17.5H15.8333C16.7525 17.5 17.5 16.7525 17.5 15.8333V4.16667C17.5 3.2475 16.7525 2.5 15.8333 2.5H4.16667C3.2475 2.5 2.5 3.2475 2.5 4.16667ZM15.835 15.8333H4.16667V4.16667H15.8333L15.835 15.8333Z" fill="black"/>
  <path d="M12.4999 9.99967H14.1666V5.83301H9.99992V7.49967H12.4999V9.99967ZM9.99992 12.4997H7.49992V9.99967H5.83325V14.1663H9.99992V12.4997Z" fill="black"/>
</svg>
    </div>
  )
}

export default AreaSvg
