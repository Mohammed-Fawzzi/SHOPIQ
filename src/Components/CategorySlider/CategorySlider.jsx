import axios from "axios";
import React from "react";
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
  function getCategorySlider() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const filterCategories = (categories) => {
    const filteredCategories = categories.filter((category) =>
      ["Mobiles", "Electronics"].includes(category.name)
    );
    // Repeat the sequence of categories 3 times
    const repeatedCategories = [];
    for (let i = 0; i < 3; i++) {
      repeatedCategories.push(...filteredCategories);
    }
    return repeatedCategories;
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

  // Combine custom images first and then API data
  const combinedData = [...customImages, ...(data || [])];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="container">
        <div className="mb-3 row">
          <Slider {...settings}>
            {combinedData.map((category) => (
              <img
                src={category.image}
                alt={category.name}
                className="w-100"
                height={300}
                key={category._id}
                loading="lazy"
              />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
