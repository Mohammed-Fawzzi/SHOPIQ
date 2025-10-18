import React, { useRef } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import Image1 from "../../assets/ps5.webp";
import Image2 from "../../assets/pixma.webp";
import Image3 from "../../assets/wh.webp";
import Image4 from "../../assets/Group-1269-935x701.webp";
import Image5 from "../../assets/airbods.webp";
import Image6 from "../../assets/Group-10194-470x457.webp";
import Image7 from "../../assets/Group-1270-935x701.webp";
import Image8 from "../../assets/Group-10202-470x457.webp";

export default function CategorySlider() {
  const sliderRef = useRef(null);

  function getCategorySlider() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const filterCategories = (categories) => {
    const filteredCategories = categories.filter((category) =>
      ["Mobiles", "Electronics"].includes(category.name)
    );
    const shuffled = filteredCategories.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
  };

  let { data } = useQuery("categorySlider", getCategorySlider, {
    select: (data) => filterCategories(data.data.data),
  });

  const customImages = [
    { _id: "custom1", name: "Custom Image 1", image: Image1 },
    { _id: "custom2", name: "Custom Image 2", image: Image2 },
    { _id: "custom3", name: "Custom Image 3", image: Image3 },
    { _id: "custom4", name: "Custom Image 4", image: Image4 },
    { _id: "custom5", name: "Custom Image 5", image: Image5 },
    { _id: "custom6", name: "Custom Image 6", image: Image6 },
    { _id: "custom7", name: "Custom Image 7", image: Image7 },
    { _id: "custom8", name: "Custom Image 8", image: Image8 },
  ];

  const combinedData = [...customImages, ...(data || [])];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary m-0 category-title">
          Explore <span className="text-primary">Top Categories</span>
        </h3>

        <div className="d-flex gap-2">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center arrow-btn"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center arrow-btn"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {combinedData.map((category) => (
          <div key={category._id} className="px-2">
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
              height={300}
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
