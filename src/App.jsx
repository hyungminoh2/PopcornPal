import { useState, useEffect } from "react";
import { useMovies } from "./hooks/useMovies.js";
import { useLocalStorageState } from "./hooks/useLocalStorageState.js";

import NavBar from "./components/layout/NavBar.jsx";
import Box from "./components/layout/Box.jsx";
import Main from "./components/layout/Main.jsx";
import WatchedButton from "./components/layout/WatchedButton.jsx";

import MovieDetails from "./components/movies/MovieDetails.jsx";
import MovieList from "./components/movies/MovieList.jsx";

import WatchedMovieList from "./components/watched/WatchedMovieList.jsx";
import WatchedSummary from "./components/watched/WatchedSummary.jsx";
import NumResults from "./components/search/NumResults.jsx";
import Search from "./components/search/Search.jsx";

import Loader from "./components/ui/Loader.jsx";
import ErrorMessage from "./components/ui/ErrorMessage.jsx";
/* eslint-disable react/prop-types */

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [showWatched, setShowWatched] = useState(false);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(movieId) {
    setSelectedId(selectedId === movieId ? null : movieId);
    setShowWatched(false); // Close watched view when selecting a movie
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function handleToggleWatched() {
    setShowWatched((show) => !show);
    setSelectedId(null); // Close movie details when opening watched
  }

  // Go back to movielist from moviedetails when query changes
  useEffect(() => {
    if (query.length > 0) {
      setSelectedId(null);
    }
  }, [query]);

  return (
    <>
      <NavBar>
        {showWatched ? (
          <div style={{ flexGrow: 1 }}></div>
        ) : (
          <Search query={query} setQuery={setQuery} />
        )}
        <div className="nav-right">
          <NumResults movies={movies} />
          <span className="nav-divider">|</span>
          <WatchedButton
            onToggle={handleToggleWatched}
            isActive={showWatched}
            watched={watched}
          />
        </div>
      </NavBar>
      <Main>
        {/* Conditionally render only ONE box */}
        {showWatched ? (
          // WATCHED BOX
          <Box>
            <WatchedSummary watched={watched} />
            <WatchedMovieList
              watched={watched}
              onDeleteWatched={handleDeleteWatched}
            />
          </Box>
        ) : (
          // MOVIES BOX
          <Box>
            {isLoading && <Loader />}
            {!isLoading && !error && (
              <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
            )}
            {error && <ErrorMessage message={error} />}

            {/* Movie details appear in the same box when selected */}
            {selectedId && (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            )}
          </Box>
        )}
      </Main>
    </>
  );
}
