import React, { useContext, useState, useEffect } from 'react';
import { FaCcVisa, FaCcApplePay } from "react-icons/fa";
import { useParams } from "react-router";
import axios from "axios";
import Slider from "react-slick";

//components
import MovieHero from '../components/MovieHero/MovieHero.component';
import Cast from "../components/Cast/Cast.component";
import PosterSlider from "../components/PosterSlider/PosterSlider.component";

//Config
import TempPosters from "../Config/TempPosters.config";

// context
import { MovieContext } from "../Context/movie.context";

const Movie = () => {

    const { id } = useParams();
    const { movie } = useContext(MovieContext);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        const requestCast = async () => {
            const getCast = await axios.get(`/movie/${id}/credits`);
            setCast(getCast.data.cast);
        };
        requestCast();
    }, [id]);

    useEffect(() => {
        const requestSimilarMovies = async () => {
          const getSimilarMovies = await axios.get(`/movie/${id}/similar`);
          setSimilarMovies(getSimilarMovies.data.results);
        };
    
        requestSimilarMovies();
      }, [id]);
    
      useEffect(() => {
        const requestRecommendedMovies = async () => {
          const getRecommendedMovies = await axios.get(
            `/movie/${id}/recommendations`
          );
          setRecommended(getRecommendedMovies.data.results);
        };
    
        requestRecommendedMovies();
      }, [id]);


    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const settingsCast = {
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
              infinite: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      };

    return (
        <>
            <MovieHero />
            <div className="my-12 container px-4 lg:w-2/3 ml-20">
                <div className="flex flex-col gap-3 items-start">
                    <h2 className="text-gray-800 font-bold text-2xl">About the movie</h2>
                    <p>
                        {movie.overview}
                    </p>
                </div>
                <div className="my-8">
                    <hr />
                </div>
                <div className="my-8">
                    <h2 className="text-gray-800 font-bold text-2xl mb-3">Applicable offers</h2>
                    <div className="flex flex-col gap-3 lg:flex-row">
                        <div className="flex items-start gap-2 bg-yellow-200 p-3 border-yellow-100 border-dashed border-2 rounded-md">
                            <div className="w-8 h-8">
                                <FaCcVisa className="w-full h-full" />
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="text-gray-700 text-xl font-bold">Visa Stream Offer</h3>
                                <p className="text-gray-600">Get 50% off up to INR 150 on all Visa Card</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 bg-yellow-200 p-3 border-yellow-100 border-dashed border-2 rounded-md">
                            <div className="w-8 h-8">
                                <FaCcApplePay className="w-full h-full" />
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="text-gray-700 text-xl font-bold">Filmy Pass</h3>
                                <p className="text-gray-600">Get Rs.75 off on 3 movies you buy/rent on scream</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-8">
                    <hr />
                </div>
                <div className="my-8">
                    <h2 className="text-gray-800 font-bold text-2xl mb-4">Cast and Crew</h2>
                    
                        <Slider {...settingsCast}>
                        {cast.map((castdata) => (
                            <Cast
                                image={`https://image.tmdb.org/t/p/original/${castdata.profile_path}`}
                                castName={castdata.original_name}
                                role={castdata.character}
                            />
                        ))}
                        </Slider>
                    
                </div>
                <div className="my-8">
                    <hr />
                </div>
                <div className="my-8">
                    <PosterSlider
                        config={settings}
                        images={similarMovies}
                        title="You might also like"
                        isDark={false} />
                </div>
                <div className="my-8">
                    <hr />
                </div>
                <div className="my-8">
                    <PosterSlider
                        config={settings}
                        images={recommended}
                        title="BMS XCLSIVE"
                        isDark={false} />
                </div>
            </div>
        </>
    )
};

export default Movie;