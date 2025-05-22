import clsx from 'clsx'
import React from 'react'
import { Spinner } from '../Spinner'

const sizes = {
  sm: 'py-1 px-2 text-xs',
  md: 'py-3 px-4 text-base',
  lg: 'py-4 px-8 text-xl',
}

const types = {
  primary: 'bg-primary text-on-primary ',
  secondary:
    'bg-secondary text-on-secondary hover:bg-secondary-hover hover:text-on-secondary-hover',
  danger: 'bg-danger text-on-danger ',
  success: 'bg-success text-on-success ',
  warning: 'bg-warning text-on-warning ',
  text: 'bg-transparent text-on-background',
}

interface ButtonProps {
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void
  className?: string
  type?: keyof typeof types
  size?: keyof typeof sizes
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  isLoading?: boolean
  tagId?: string
}
export const Button = ({
  onClick,
  type = 'secondary',
  className,
  size = 'md',
  startIcon,
  endIcon,
  children,
  isLoading = false,
  tagId,
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
      disabled={isLoading}
      data-target-id={tagId}>
      {isLoading ? <Spinner size="small" /> : startIcon}
      {children}
      {endIcon}
    </button>
  )
}
