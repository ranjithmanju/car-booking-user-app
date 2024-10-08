import React from "react";
import Slider from "react-slick";

interface SlickCarouselProps {
  images: string[]; // Array of image URLs
}

const SlickCarousel: React.FC<SlickCarouselProps> = ({ images }) => {
  const settings = {
    dots: false, // Show dots for navigation
    infinite: true, // Infinite loop sliding
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed
  };

  return (
    <div className="flex justify-center container mx-auto bg-opacity-50 bg-carasoul py-5">
      <Slider
        {...(settings as any)}
        style={{ width: "1200px", height: "300px", overflow: "hidden", }}
      >
        {images.map((image, index) => (
          <div key={index} className="p-3">
            <div
              key={index}
              className="slick-slide"
              style={{ height: "400px", overflow: "hidden" }}
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                className="slick-image"
                loading="lazy" // Lazy loading attribute
                style={{ width: "400px", height: "300px", objectFit: "fill" }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickCarousel;
