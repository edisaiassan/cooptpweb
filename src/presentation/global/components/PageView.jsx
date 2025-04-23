import React, { useCallback, useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export const PageView = forwardRef(
  ({ children, h, w = 'w-full', className, loop = false, auto = false, duration = 3000 }, ref) => {
    const [viewportRef, embla] = useEmblaCarousel({ loop, skipSnaps: false })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const intervalRef = useRef(null)

    const onSelect = useCallback(() => {
      if (!embla) return
      setSelectedIndex(embla.selectedScrollSnap())
    }, [embla])

    const startAutoplay = useCallback(() => {
      if (!embla || !auto) return

      clearInterval(intervalRef.current)

      intervalRef.current = setInterval(() => {
        if (embla.canScrollNext()) {
          embla.scrollNext()
        } else if (loop) {
          embla.scrollTo(0)
        }
      }, duration)
    }, [embla, auto, duration, loop])

    const stopAutoplay = useCallback(() => {
      clearInterval(intervalRef.current)
    }, [])

    // Setup embla events
    useEffect(() => {
      if (!embla) return

      embla.on("select", onSelect)
      embla.on("pointerDown", stopAutoplay)
      embla.on("pointerUp", startAutoplay)
      onSelect()

      if (auto) {
        startAutoplay()
      }

      return () => {
        stopAutoplay()
        embla.destroy()
      }
    }, [embla, onSelect, startAutoplay, stopAutoplay, auto])

    // Imperative methods
    useImperativeHandle(ref, () => ({
      scrollTo: (index) => {
        embla?.scrollTo(index)
        resetAutoplay()
      },
      scrollPrev: () => {
        embla?.scrollPrev()
        resetAutoplay()
      },
      scrollNext: () => {
        embla?.scrollNext()
        resetAutoplay()
      },
      selectedIndex,
      canScrollPrev: embla?.canScrollPrev() ?? false,
      canScrollNext: embla?.canScrollNext() ?? false,
      resetAutoplay,
    }))
    
    const resetAutoplay = useCallback(() => {
      if (!auto) return
      stopAutoplay()
      startAutoplay()
    }, [auto, startAutoplay, stopAutoplay])    

    return (
      <div className={`${w} ${h} ${className}`}>
        <div className="overflow-hidden h-full" ref={viewportRef}>
          <div className="flex h-full touch-pan-x">
            {React.Children.map(children, (child, i) => (
              <div key={i} className="flex-shrink-0 w-full h-full">
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
)
