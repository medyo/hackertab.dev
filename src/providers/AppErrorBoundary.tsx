import { AiFillBug } from 'react-icons/ai'
import { WiRefresh } from 'react-icons/wi'

type AppErrorBoundaryProps = {
  error: unknown
  resetError: () => void
}
export const AppErrorBoundary = ({ error, resetError }: AppErrorBoundaryProps) => {
  return (
    <div className="Page appError">
      <AiFillBug size={64} />
      <p>Sorry there was a problem loading this page.</p>
      <p>{String(error)}</p>
      <button onClick={resetError}>
        <WiRefresh size={32} className={'buttonIcon'} /> Try again
      </button>
    </div>
  )
}
