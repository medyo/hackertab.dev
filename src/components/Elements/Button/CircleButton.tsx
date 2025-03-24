import clsx from 'clsx'

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
  onClick: () => void
  size?: keyof typeof sizes
  variant?: keyof typeof variants
  children: React.ReactNode
}

export const CircleButton = ({
  size = 'medium',
  variant = 'primary',
  onClick,
  className,
  children,
}: CircleButtonProps) => {
  return (
    <button
      className={clsx('circle-button', sizes[size], variants[variant], className)}
      onClick={onClick}>
      {children}
    </button>
  )
}
