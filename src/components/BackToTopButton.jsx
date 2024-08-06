import { useScrollToTop } from '@/lib/hooks/useScrollToTop'
import { useEffect, useState } from 'react'

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const scrollToTop = useScrollToTop()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className=" fixed bottom-4 right-4 rounded-full border-[1px] border-gray-100 bg-blue-950 p-3 text-white shadow-lg transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-transparent"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 15l-7-7-7 7"
          />
        </svg>
      </button>
    )
  )
}

export default BackToTopButton
