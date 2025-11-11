import imdbLogo from "../../assets/imdb.png";

/* eslint-disable react/prop-types */
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <img
            src={imdbLogo}
            alt="IMDB"
            style={{
              height: "3em",
              verticalAlign: "middle",
              marginRight: "0.3em",
            }}
          />{" "}
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
export default WatchedMovie;
