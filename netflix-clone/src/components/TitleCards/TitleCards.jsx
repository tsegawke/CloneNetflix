import { useRef, useEffect, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import axiosInstance from "../../util/axios";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  // const handleWheel = (event) => {
  //   event.preventDefault();
  //   cardsRef.current.scrollLeft += event.deltaY;
  // };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axiosInstance.get(
          `/movie/${category ? category : "popular"}?language=en-US&page=1`,
        );
        setApiData(res.data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();

    //   const container = cardsRef.current;
    //   if (container) {
    //     container.addEventListener("wheel", handleWheel, { passive: false });
    //   }

    //   // ✅ cleanup
    //   return () => {
    //     if (container) {
    //       container.removeEventListener("wheel", handleWheel);
    //     }
    //   };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <Link to={`/player/${card.id}`} className="card" key={card.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`}
              alt={card.original_title}
            />
            <div className="card-title">
              <p>{card.original_title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
