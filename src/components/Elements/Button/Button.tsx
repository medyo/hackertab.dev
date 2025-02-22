import clsx from 'clsx'
import React from 'react'
import './Button.css'

const sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}
type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
  className?: string
  size?: keyof typeof sizes
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}
export const Button = ({
  size = 'medium',
  onClick,
  className,
  startIcon,
  endIcon,
  children,
}: ButtonProps) => {
  return (
    <button className={clsx('button', sizes[size], className)} onClick={onClick}>
      {startIcon}
      {children}
      {endIcon}
    </button>
  )
}
