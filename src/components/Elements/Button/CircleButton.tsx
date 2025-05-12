import clsx from 'clsx'
import { Spinner } from '../Spinner'

const sizes = {
  small: 'size-[30px]',
  medium: 'size-[40px]',
  large: 'size-[50px]',
}

const variants = {
  primary:
    'bg-bg-secondary text-on-secondary hover:bg-bg-secondary-hover hover:text-on-secondary-hover',
  darkfocus: 'bg-[#1c2026] text-[#f0c73d] hover:opacity-80',
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
  size = 'medium',
  variant = 'primary',
  onClick,
  isLoading,
  className,
  children,
}: CircleButtonProps) => {
  return (
    <button
      disabled={isLoading}
      className={clsx(
        'inline-flex items-center justify-center rounded-full text-center',
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
