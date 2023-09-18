import React from 'react'

const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <button className={` ${customClasses} flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900`} disabled={disabled} onClick={onClick} type={type}>
        {children?(
            <>
                <span>{text}</span>
                {children}
            </>
        ):(
            text
        )}
    </button>
  )
}

export default IconBtn