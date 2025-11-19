import { useEffect, useRef, useState } from 'react'

type useLazyListLoadProps =
  | {
      rootMargin?: string
    }
  | undefined

export const useLazyListLoad = (
  { rootMargin }: useLazyListLoadProps = {
    rootMargin: '0px',
  }
) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, isVisible }
}
