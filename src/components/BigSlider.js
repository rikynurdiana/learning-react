import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./components.css";

class BigSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listImage: [
        {
          image: '/img/img1.jpg',
          alt: 'image1'
        },
        {
          image: '/img/img2.jpg',
          alt: 'image2'
        },
        {
          image: '/img/img3.jpg',
          alt: 'image3'
        },
        {
          image: '/img/img4.jpg',
          alt: 'image4'
        },
        {
          image: '/img/img5.jpg',
          alt: 'image5'
        }
      ]
    }
  }

  render() {
    const settings = {
      dots: true,
      arrows: true,
      autoplay: true,
      fade: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const displaySlider = this.state.listImage.map((data, index) => {
      return (
        <div key={index}>
          <img src={data.image} alt={data.alt} width="100%" />
        </div>
      );
    })

    return (
      <div>
        <Slider {...settings}>
          {displaySlider}
        </Slider>
      </div>
    );
  }
}

export default BigSlider;