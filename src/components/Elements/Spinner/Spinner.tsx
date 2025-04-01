import clsx from 'clsx'
import './Spinner.css'

const sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export type SpinnerProps = {
  size?: keyof typeof sizes
  className?: string
}

export const Spinner = ({ size = 'medium', className = '' }: SpinnerProps) => {
  return <div className={clsx('spinner', className, sizes[size])}></div>
}
