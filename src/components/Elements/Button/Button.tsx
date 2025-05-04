import React from 'react'
import { Spinner } from '../Spinner'
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
  isLoading?: boolean
}
export const Button = ({
  size = 'medium',
  onClick,
  className,
  startIcon,
  endIcon,
  children,
  isLoading = false,
}: ButtonProps) => {
  return (
    <button 
  className="gap-2 px-4 bg-btn-background-color py-2 rounded-full hover:bg-btn-hover-background-color text-btn-text-color hover:text-btn-hover-text-color cursor-pointer justify-center items-center"
      onClick={onClick}
      disabled={isLoading}>
      {isLoading ? <Spinner size="small" /> : startIcon}
      {children}
      {endIcon}
    </button>
  )
}
