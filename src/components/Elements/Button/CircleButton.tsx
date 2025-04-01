import clsx from 'clsx'
import { Spinner } from '../Spinner'

const sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

const variants = {
  primary: 'primary',
  darkfocus: 'dark-focus',
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
        'circle-button',
        sizes[size],
        variants[variant],
        className,
        isLoading && 'disabled'
      )}
      onClick={onClick}>
      {isLoading ? <Spinner size="small" /> : children}
    </button>
  )
}
