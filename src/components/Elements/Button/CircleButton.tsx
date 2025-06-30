import clsx from 'clsx'
import { Spinner } from '../Spinner'

const sizes = {
  sm: 'size-[30px]',
  md: 'size-[40px]',
  lg: 'size-[50px]',
}

const variants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-ht-100 text-ht-900 hover:bg-ht-200',
  outlined: 'bg-ht-100 text-ht-900 hover:bg-ht-100',
  text: 'bg-transparent ttext-ht-900',
  darkfocus: 'bg-blue-900 text-yellow-400 hover:opacity-80 dark:bg-ht-100 dark:hover:bg-ht-200',
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
