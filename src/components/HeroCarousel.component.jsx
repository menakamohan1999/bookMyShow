import React,{useState,useEffect} from "react";
import HeroSlider from "react-slick";
import axios from "axios";

//Components
import {NextArrow,PrevArrow} from "./Arrows.components";

const HeroCarousel = () =>{

        const [images, setImages] = useState([]);

        useEffect(() => {
        const requestNowPlayingMovies = async () => {
        const getImages = await axios.get("/movie/now_playing");
        setImages(getImages.data.results);
        };
        requestNowPlayingMovies();
        }, []);

    const settingsLg ={
        arrows:true,
        centerMode:true,
        centerPadding:"300px",
        slidesToShow: 1,
        autoplay:true,
        infinite:true,
        slidesToScroll: 1,
        nextArrow:<NextArrow/>,
        prevArrow:<PrevArrow/>,
    };
    const settings = {
        arrows:true,
        centerPadding:"200px",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow:<NextArrow/>,
        prevArrow:<PrevArrow/>,
      };

     
      return (
    <>
    <div className="lg:hidden">
        <HeroSlider {...settings}>
            {images.map((image)=>(
                <div className="w-full h-56 md:h-80 py-3"> 
                <img src={`https://image.tmdb.org/t/p/original${image.backdrop_path}`} 
                alt="testing" 
                className="w-full h-full"/>
                </div>

            ))}
            </HeroSlider>
    </div>
    <div className="hidden lg:block">
    <HeroSlider {...settingsLg}>
            {images.map((image)=>(
                <div className="w-full h-96 px-2 py-3"> 
                <img src={`https://image.tmdb.org/t/p/original${image.backdrop_path}`} 
                alt="testing" 
                className="w-full h-full rounded-md"/>
                </div>

            ))}
            </HeroSlider>
    </div>
    </>
    );
};

export default HeroCarousel;