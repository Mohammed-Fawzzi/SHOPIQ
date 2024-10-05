import React from "react";
import Slider from "react-slick";
import image1 from "../../assets/airppods.webp";
import image2 from "../../assets/smart-watch.webp";
import image3 from "../../assets/headphones.webp";

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="container pt-4 mt-5">
        <div className="row g-0 my-5">
          <div className="col-md-12">
            <Slider {...settings}>
              <img
                src={image1}
                alt="slider-image1"
                className="w-100"
                height={400}
                loading="lazy"
              />
              <img
                src={image2}
                alt="slider-image2"
                className="w-100"
                height={400}
                loading="lazy"
              />
              <img
                src={image3}
                alt="slider-image3"
                className="w-100"
                height={400}
                loading="lazy"
              />
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
