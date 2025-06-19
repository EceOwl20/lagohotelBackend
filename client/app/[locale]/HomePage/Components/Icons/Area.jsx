import React from 'react'

const Area = ({className, width, height}) => {
  return (
    <div className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 17 17" fill="none">
            <path d="M0 3.54167V13.4583C0 14.2396 0.635375 14.875 1.41667 14.875H11.3333C12.1146 14.875 12.75 14.2396 12.75 13.4583V3.54167C12.75 2.76037 12.1146 2.125 11.3333 2.125H1.41667C0.635375 2.125 0 2.76037 0 3.54167ZM11.3348 13.4583H1.41667V3.54167H11.3333L11.3348 13.4583Z" fill="white"/>
            <path d="M8.50065 8.50065H9.91732V4.95898H6.37565V6.37565H8.50065V8.50065ZM6.37565 10.6257H4.25065V8.50065H2.83398V12.0423H6.37565V10.6257Z" fill="white"/>
        </svg>
  </div>
  )
}

export default Area