import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

export const useSticky = (): [
  ref: RefObject<HTMLDivElement> | null,
  isStuck: boolean,
  setIsStuck: (isStuck: boolean) => void
] => {
  const [isStuck, setIsStuck] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cachedRef = ref.current
    if (cachedRef) {
      const observer = new IntersectionObserver(
        ([e]) => setIsStuck(e.boundingClientRect.top < 65),
        {
          threshold: [1],
          rootMargin: `-65px 0px 0px 0px`,
        }
      )
      observer.observe(cachedRef)
      return () => (setIsStuck(false), observer.unobserve(cachedRef))
    }
  }, [ref.current])

  return [ref, isStuck, setIsStuck]
}

export default useSticky
