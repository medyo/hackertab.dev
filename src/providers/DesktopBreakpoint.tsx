import { useMediaQuery } from 'react-responsive'

export const DesktopBreakpoint = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 })
  return isDesktop ? children : null
}
