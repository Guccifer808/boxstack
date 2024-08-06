'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { constructHref } from '@/lib/constructHref'

const BrandsCard = ({ brand, t, lang }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className="flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className="relative flex w-full flex-col rounded-3xl p-6 shadow-md ring-1 ring-blue-950/5 transition-all duration-300 sm:p-8">
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage: `url(${brand.image.src.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isHovered ? '0.25' : '0',
            zIndex: -1,
          }}
        ></div>
        <Link href={constructHref(lang, brand?.href)}>
          <Image
            {...brand.logo}
            className="w-32 object-contain"
            alt={brand?.client}
          />
        </Link>
        <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
          <time dateTime={brand?.date} className="font-semibold">
            {t(brand?.service)}
          </time>
          <span className="text-blue-300" aria-hidden="true">
            /
          </span>
          <span>{t(brand?.date)}</span>
        </p>
        <Link href={constructHref(lang, brand?.href)}>
          <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
            {t(brand?.title)}
          </p>
        </Link>
        <p className="mt-4 line-clamp-3 text-base text-neutral-600">
          {t(brand?.overview)}
        </p>
      </article>
    </div>
  )
}

export default BrandsCard
