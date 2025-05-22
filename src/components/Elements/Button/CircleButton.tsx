import clsx from 'clsx'
import { Spinner } from '../Spinner'

const sizes = {
  sm: 'size-[30px]',
  md: 'size-[40px]',
  lg: 'size-[50px]',
}

const variants = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary-hover',
  secondary:
    'bg-secondary text-on-secondary hover:bg-secondary-hover hover:text-on-secondary-hover',
  outlined:
    'bg-transparent text-on-secondary border-1 dark:border-2 border-secondary hover:bg-secondary-hover hover:text-on-secondary-hover',
  text: 'bg-transparent text-on-secondary',
  darkfocus: 'bg-blue-900 text-yellow-400 hover:opacity-80',
}

type CircleButtonProps = {
  className?: string
  isLoading?: boolean
  onClick: () => void
  size?: keyof typeof sizes
  variant?: keyof typeof variants
  children: React.ReactNode
}

export const CircleButton = ({
  size = 'md',
  variant = 'secondary',
  onClick,
  isLoading,
  className,
  children,
}: CircleButtonProps) => {
  return (
    <button
      disabled={isLoading}
      className={clsx(
        'pointer-events-auto inline-flex cursor-pointer items-center justify-center rounded-full text-center',
        sizes[size],
        variants[variant],
        className,
        isLoading ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'
      )}
      onClick={onClick}>
      {isLoading ? <Spinner size="small" /> : children}
    </button>
  )
}
