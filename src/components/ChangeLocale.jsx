'use client'
import { usePathname, useRouter } from 'next/navigation'

import uaFlag from '@/images/misc/ua.png'
import enFlag from '@/images/misc/en.png'
import Image from 'next/image'

const ChangeLocale = () => {
  const router = useRouter()
  const pathname = usePathname()
  const currentPath = pathname

  const changeLocale = (locale) => {
    // Remove any existing locale prefix from the current path
    const basePath = currentPath.replace(/^\/[a-z]{2}/, '')

    // Construct the new URL with the selected locale
    const newUrl = `/${locale}${basePath}`

    // Navigate to the new URL
    router.push(newUrl)
  }

  return (
    <div className="flex select-none flex-row justify-center ">
      <div className="flex flex-row items-center gap-3">
        <button
          className="flex flex-row items-center rounded-full border border-gray-300 p-2 text-sm font-medium text-gray-700 hover:bg-blue-200 focus:bg-gray-200 focus:outline-none"
          onClick={(e) => changeLocale('uk')}
        >
          <span className="text-md"></span>
          <span className="">
            <Image src={uaFlag} className="h-5 w-5" alt="ukrainian flag" />
          </span>
        </button>

        <button
          className="flex flex-row items-center rounded-full border border-gray-300 p-2 text-sm font-medium text-gray-700 hover:bg-blue-200 focus:bg-gray-200 focus:outline-none "
          onClick={(e) => changeLocale('en')}
        >
          <span className="text-md"></span>
          <span className="">
            <Image src={enFlag} className="h-5 w-5" alt="british flag" />
          </span>
        </button>
      </div>
    </div>
  )
}

export default ChangeLocale
