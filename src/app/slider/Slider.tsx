"use client";

import "./slider.scss";
import { useEffect, useRef, useState } from "react";

const imageFiles = ["img1.png", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

export default function Slider() {
  const [itemActive, setItemActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    startAutoSlide();

    return () => {
      window.removeEventListener("resize", checkMobile);
      stopAutoSlide();
    };
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setItemActive((prev) => (prev + 1) % imageFiles.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleNext = () => {
    setItemActive((prev) => (prev + 1) % imageFiles.length);
    resetInterval();
  };

  const handlePrev = () => {
    setItemActive((prev) => (prev - 1 + imageFiles.length) % imageFiles.length);
    resetInterval();
  };

  const resetInterval = () => {
    stopAutoSlide();
    startAutoSlide();
  };

  const handleThumbnailClick = (index: number) => {
    setItemActive(index);
    resetInterval();
  };

  return (
    <>
      <header>
        <div className="logo">Logo</div>
        <ul className="menu">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </header>

      <div className="slider">
        <div className="list">
          {imageFiles.map((fileName, index) => (
            <div
              key={index}
              className={`item ${index === itemActive ? "active" : ""}`}>
              <img src={`/image/${fileName}`} alt={`Slide ${index + 1}`} />
              <div className="content">
                <p>Adventure</p>
                <h2>Image {index + 1}</h2>
                <p>Slide description here</p>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button id="prev" onClick={handlePrev}>
            &lt;
          </button>
          <button id="next" onClick={handleNext}>
            &gt;
          </button>
        </div>

        <div className="thumbnail">
          {imageFiles.map((fileName, index) => (
            <div
              key={index}
              className={`item ${index === itemActive ? "active" : ""}`}
              onClick={() => handleThumbnailClick(index)}
              style={{
                display: isMobile
                  ? index >= itemActive - 1 && index <= itemActive + 1
                    ? "block"
                    : "none"
                  : "block",
              }}>
              <img src={`/image/${fileName}`} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
