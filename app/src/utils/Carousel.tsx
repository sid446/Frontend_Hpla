/* eslint-enable jsx-a11y/alt-text */
import header1 from "../assets/1_1.png";
import header2 from "../assets/5_1.png";
import header3 from "../assets/3_1.png";
import header4 from "../assets/6_1.png";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";

const imageUrls = [
  {
    url: header1,
    alt: "header image 1",
  },
  {
    url: header2,
    alt: "header image 2",
  },
  {
    url: header3,
    alt: "header image 3",
  },
  {
    url: header4,
    alt: "header image 4",
  },
];

function Carousel() {
  let [current, setCurrent] = useState<any>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (true) {
        nextSlide();
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [current]);

  let previousSlide = () => {
    if (current === 0) {
      setCurrent(imageUrls.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  let nextSlide = () => {
    if (current === imageUrls.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-md my-1.5 relative">
        <div
          className={`flex transition ease-out animate-normal duration-500 w-full h-full`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {imageUrls.map(({ url, alt }) => (
            <img src={url} alt={alt} />
          ))}
        </div>
        <div className="flex absolute top-0 h-full w-full justify-between items-center px-10 text-4xl">
          <button className="text-white/60 hover:text-white transition delay-150" onClick={previousSlide}>
            <BsFillArrowLeftCircleFill />
          </button>
          <button className="text-white/60 hover:text-white transition delay-150" onClick={nextSlide}>
            <BsFillArrowRightCircleFill />
          </button>
        </div>
      </div>
    </>
  );
}

export default Carousel;
