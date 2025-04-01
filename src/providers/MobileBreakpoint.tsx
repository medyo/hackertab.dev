import { useMediaQuery } from 'react-responsive'

export const MobileBreakpoint = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
