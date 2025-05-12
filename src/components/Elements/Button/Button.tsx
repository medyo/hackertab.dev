import clsx from 'clsx'
import React from 'react'
import { Spinner } from '../Spinner'

const sizes = {
  small: 'py-1 px-2 text-xs',
  medium: 'py-3 px-4 text-base',
  large: 'py-4 px-8 text-xl',
}

const types = {
  primary: 'bg-bg-primary text-on-primary ',
  secondary:
    'bg-bg-secondary text-on-secondary hover:bg-bg-secondary-hover hover:text-on-secondary-hover',
  danger: 'bg-bg-danger text-on-danger ',
  success: 'bg-bg-success text-on-success ',
  warning: 'bg-bg-warning text-on-warning ',
}

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
  type?: keyof typeof types
  size?: keyof typeof sizes
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  isLoading?: boolean
}
export const Button = ({
  onClick,
  type = 'secondary',
  className,
  size = 'medium',
  startIcon,
  endIcon,
  children,
  isLoading = false,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full text-center',
        types[type],
        sizes[size],
        className,
        isLoading ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'
      )}
      onClick={onClick}
      disabled={isLoading}>
      {isLoading ? <Spinner size="small" /> : startIcon}
      {children}
      {endIcon}
    </button>
  )
}
