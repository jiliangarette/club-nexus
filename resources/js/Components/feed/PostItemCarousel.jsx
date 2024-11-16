import { useState, useRef } from "react";

export default function PostItemCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleSwipe = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 50) {
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-64 overflow-hidden ml-16 "
      onTouchStart={(e) => (touchStartX.current = e.changedTouches[0].screenX)}
      onTouchEnd={(e) => {
        touchEndX.current = e.changedTouches[0].screenX;
        handleSwipe();
      }}
    >
      {/* Carousel Image Container */}
      <div
        className="flex transition-transform duration-500 ease-out "
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={`http://127.0.0.1:8000${src}`}
            alt={`Slide ${index + 1}`}
            className="w-full flex-shrink-0 rounded-lg"
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation Buttons - Only show on larger screens */}
      <div className="absolute left-0 right-0 bottom-8 justify-between px-4 hidden ">
        <button onClick={prevSlide} className="btn btn-circle">
          ❮
        </button>
        <button onClick={nextSlide} className="btn btn-circle">
          ❯
        </button>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-[2px] mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`font-bold text-xl ${
              index === currentIndex
                ? "text-slate-600 text-[25px]"
                : "text-slate-400"
            }`}
          >
            •
          </button>
        ))}
      </div>
    </div>
  );
}
