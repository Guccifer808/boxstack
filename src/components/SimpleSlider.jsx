'use client'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { useState } from 'react'

import logo from '@/images/logoMSG.svg'
import { Button } from './Button'
import { PageIntro } from './PageIntro'

function SimpleSlider({ slides, className, showDots, showArrows }) {
  const [loaded, setLoaded] = useState(new Array(slides.length).fill(false))
  const handleLoadingComplete = (index) => {
    const updatedLoaded = [...loaded]
    updatedLoaded[index] = true
    setLoaded(updatedLoaded)
  }

  const settings = {
    lazyLoad: true,
    dots: showDots,
    arrows: showArrows,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
  }
  return (
    // <div className="slider-container bg-neutral-100 pt-2">
    <div className={`slider-container   bg-transparent ${className}`}>
      <Slider {...settings}>
        {slides?.map((image, index) => (
          <div key={index} className="slide -mb-2">
            <div className="slide relative h-0 w-full pb-[56.25%]">
              <div className="slide absolute inset-0 flex items-center justify-center">
                {!loaded[index] && (
                  <Image
                    src={logo}
                    alt="Placeholder"
                    fill
                    style={{ objectFit: 'contain' }}
                    className="object-fit rounded-4xl "
                  />
                )}

                <Image
                  src={image}
                  alt={`Slide ${index}`}
                  fill
                  priority
                  // style={{ objectFit: 'contain' }}
                  // style={{ objectFit: 'cover' }}
                  className={`object-fit slideItem rounded-4xl transition-opacity duration-500 ${
                    loaded[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoadingComplete={() => handleLoadingComplete(index)}
                  quality={100}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SimpleSlider
