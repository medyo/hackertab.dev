import clsx from 'clsx'
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
      className={clsx(
        'button',
        isLoading && 'loading',
        sizes[size],
        className,
        isLoading && 'disabled'
      )}
      onClick={onClick}
      disabled={isLoading}>
      {isLoading ? <Spinner size="small" /> : startIcon}
      {children}
      {endIcon}
    </button>
  )
}
