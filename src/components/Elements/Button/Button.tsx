import clsx from 'clsx'
import React from 'react'
import { Spinner } from '../Spinner'

const sizes = {
  sm: 'py-1 px-2 text-xs',
  md: 'py-3 px-4 text-base',
  lg: 'py-4 px-8 text-xl',
}

const types = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-ht-100 text-ht-300 hover:bg-ht-200',
  danger: 'bg-danger text-on-danger ',
  success: 'bg-green-500 text-white hover:bg-green-600',
  warning: 'bg-yellow-400 text-white hover:bg-yellow-500',
  text: 'bg-transparent text-ht-300',
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
