import React, { useRef, useState, useEffect } from 'react';
import { PageView } from "../PageView";
import { IconButton } from "../../buttons/IconButton";
import { arrow_left, arrow_right } from '../../constants/Icons';

export const MainCarousel = ({
  children,
  h,
  w,
  className,
  mainColor = 'bg-primary',
  liteColor = 'bg-primaryLite',
  loop = false,
  auto = false,
  duration = 3000,
  draggable = true,
  onIndexChange,
}) => {
  const pageViewRef = useRef();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateControls = () => {
    if (!pageViewRef.current) return;
    const index = pageViewRef.current.selectedIndex
    setSelectedIndex(index)
    setSelectedIndex(pageViewRef.current.selectedIndex)
    setCanPrev(pageViewRef.current.canScrollPrev)
    setCanNext(pageViewRef.current.canScrollNext)
    onIndexChange?.(index)
  };

  useEffect(() => {
    const interval = setInterval(updateControls, 100);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="w-full relative">
      <PageView ref={pageViewRef} h={h} w={w} className={className} loop={loop} auto={auto} duration={duration} draggable={draggable}>
        {children}
      </PageView>

      {React.Children.count(children) > 1 && (
        <>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
            <IconButton
              path={arrow_left}
              background={mainColor}
              iconColor='fill-white'
              floating={true}
              enabled={canPrev}
              onClick={() => canPrev && pageViewRef.current.scrollPrev()}
            />
          </div>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
            <IconButton
              path={arrow_right}
              background={mainColor}
              iconColor="fill-white"
              floating={true}
              enabled={canNext}
              onClick={() => canNext && pageViewRef.current.scrollNext()}
            />
          </div>

          <div className="absolute bottom-2 left-2 right-2 flex justify-center items-center gap-2">
            {React.Children.map(children, (_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ease-in-out hover:scale-[93%] active:scale-[88%] shadow-md shadow-black/25 cursor-pointer w-3 h-3 flex items-center ${i === selectedIndex ? mainColor : liteColor}`}
                onClick={() => pageViewRef.current.scrollTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
