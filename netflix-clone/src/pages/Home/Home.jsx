import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import axiosInstance from "../../util/axios"; //

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const res = await axiosInstance.get(
          `/movie/popular?language=en-US&page=1`,
        );
        const data = res.data;

        const randomIndex = Math.floor(Math.random() * data.results.length);
        const movie = data.results[randomIndex];
        setHeroMovie(movie);
      } catch (error) {
        console.error("Error fetching hero movie:", error);
      }
    };

    fetchHeroMovie();
  }, []);

  return (
    <div className="home">
      <Navbar />

      <div className="hero">
        {heroMovie && (
          <>
            <img
              src={`${IMAGE_BASE_URL}${heroMovie.backdrop_path}`}
              alt={heroMovie.title}
              className="banner-img"
            />
            <div className="hero-caption">
              <h1 className="caption-title">{heroMovie.title}</h1>
              <p>{heroMovie.overview}</p>
              <div className="hero-btns">
                <button
                  className="btn"
                  onClick={() => navigate(`/player/${heroMovie.id}`)}
                >
                  <PlayArrowIcon />
                  Play
                </button>

                <button
                  className="btn dark-btn"
                  onClick={() => setShowInfo(true)}
                >
                  <InfoOutlineIcon />
                  More Info
                </button>
              </div>
              <TitleCards title={"Now Playing"} category={"now_playing"} />
            </div>
          </>
        )}
      </div>

      {showInfo && heroMovie && (
        <div className="movie-modal">
          <div className="movie-modal-content">
            <span className="close-btn" onClick={() => setShowInfo(false)}>
              &times;
            </span>
            <img
              src={`${POSTER_BASE_URL}${heroMovie.poster_path}`}
              alt={heroMovie.title}
              className="modal-poster"
            />
            <div className="modal-details">
              <h2>{heroMovie.title}</h2>
              <p>
                <strong>Release Date:</strong>{" "}
                {heroMovie.release_date
                  ? new Date(heroMovie.release_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )
                  : ""}
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {heroMovie.vote_average}/10
              </p>
              <p>{heroMovie.overview}</p>
            </div>
          </div>
        </div>
      )}

      <div className="more-cards">
        <TitleCards title={"Popular"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Rated"} category={"top_rated"} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
