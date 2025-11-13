// components/EmblaCarousel.tsx
"use client"

import type React from "react"
import { useCallback, useEffect, useRef } from "react"
import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { NextButton, PrevButton, usePrevNextButtons } from "@/components/CarouselArrows"
import { DotButton, useDotButton } from "@/components/CarouselDoButtons"
import Image from "next/image"
import Link from "next/link"

const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type SlideData = {
  id: number
  title: string
  slug: string
  images: string[]          // 👈 ahora es un arreglo
  description: string
  guests: number
  amenities: string[]
  size: string
}

type PropType = {
  slides: SlideData[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla-slide-content") as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === "scroll"

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          })
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const scale = numberWithinRange(tweenValue, 0, 1).toString()
        const tweenNode = tweenNodes.current[slideIndex]
        if (tweenNode) {
          tweenNode.style.transform = `scale(${scale})`
        }
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)
    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale)
  }, [emblaApi, tweenScale, setTweenNodes, setTweenFactor])

  return (
    <div id="habitaciones" className=" bg-[url('/img/bg2.webp')] mx-auto px-4 py-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 touch-pan-y">
          {slides.map((slide) => {
            const cover = slide.images?.[0] ?? "/placeholder.svg" // 👈 primera imagen
            return (
              <div
                className="flex-[0_0_80%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
                key={slide.id}
              >
                <Link
                  href={`/habitaciones/${slide.slug}`}
                  className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                >
                  <div className="embla-slide-content relative h-[35rem] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={cover}
                      alt={slide.title}
                      title={`Habitación ${slide.title} - Gaviana Resort`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                      priority={slide.id === 1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 space-y-3 text-white">
                      <h3 className="text-2xl font-bold">{slide.title}</h3>
                      <p className="text-sm/6 line-clamp-2 opacity-95">
                        {slide.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="px-2 py-1 text-xs rounded-full bg-white/15 backdrop-blur">
                          {slide.guests} huésped{slide.guests !== 1 ? "es" : ""}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-white/15 backdrop-blur">
                          {slide.size}
                        </span>
                        {slide.amenities?.map((amenity, idx) => (
                          <span
                            key={`${slide.id}-amenity-${idx}`}
                            className="px-2 py-1 text-xs rounded-full bg-white/10 backdrop-blur"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mt-8">
        <div className="flex gap-4">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-3 h-3 rounded-full border transition-all ${
                index === selectedIndex
                  ? "bg-primary border-primary w-8"
                  : "bg-gray-300 border-gray-400 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
