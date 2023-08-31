import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import css from './Home.module.css'
import TopBar from "../../components/TopBar/TopBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Posters from "./components/Posters/Posters";
import ExpandButton from "./components/ExpandButton/ExpandButton";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [poster, setPoster] = useState(0);
  const [generos, setGeneros] = useState([])
  const [classificacoes, setClassificacoes] = useState([])
  const [generoButton, setGeneroButton] = useState(false)
  const [classificacaoButton, setClassiButton] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:8080/filmes');
      const data = response.data;
      setMovies(data);

      console.log(data)

      const generosUnicos = [...new Set(data.map(obj => obj.genero))];
      setGeneros(generosUnicos);

      const classificacoesUnicas = [...new Set(data.map(obj => obj.classificacao))];
      setClassificacoes(classificacoesUnicas);
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    try {
      fetchData();

    } catch (error) {
      console.log(error);
    }
  }, []);

  const posterForward = () => {
    if (poster >= (movies.length - 1)) {
      setPoster(0);
    } else {
      setPoster(poster + 1);
    }
  };

  const posterBack = () => {
    if (poster <= 0) {
      setPoster(movies.length - 1);
    } else {
      setPoster(poster - 1);
    }

  };

  const handleGButton = () => {
    setGeneroButton(!generoButton)
    if (classificacaoButton) {
      setClassiButton(false)
    }
  }

  const handleCButton = () => {
    setClassiButton(!classificacaoButton)
    if (generoButton) {
      setGeneroButton(false)
    }
  }

  const filteredMovies = movies.filter((movie) => {
    const genreMatch = selectedGenre ? movie.genero === selectedGenre : true;
    const ratingMatch = selectedRating ? movie.classificacao === selectedRating : true;
    return genreMatch && ratingMatch;
  });

  const handleGenreSelection = (value) => {
    setSelectedGenre(value);
  };

  const handleRatingSelection = (value) => {
    setSelectedRating(value);
  };

  const clearFilters = () => {
    setSelectedRating(null);
    setSelectedGenre(null);
  }

  return (
    <div className={css.container} >
      <TopBar />
      {movies.length > 0 ? ( // Verifica se há filmes carregados antes de renderizar o componente
        <div className={css.posters}>
          <div className={`${css.arrows} ${css.arrow}`} onClick={posterBack}>
            <ArrowBackIosIcon sx={{ fontSize: 80, color: '#ffffff' }} />
          </div>
          <Posters
            nome={movies[poster].titulo}
            classificacao={movies[poster].classificacao}
            sinopse={movies[poster].sinopse}
            video={movies[poster].videoUrl}
            duracao={movies[poster].duracao}
          />
          <div className={`${css.arrows} ${css.arrow}`} onClick={posterForward}>
            <ArrowForwardIosIcon sx={{ fontSize: 80, color: '#ffffff' }} />
          </div>
        </div>
      ) : (
        <div className={css.loading}>
          <p >Erro ao carregar...</p>
        </div>
      )}
      <div className={css.movies}>
        <h1>EM CARTAZ</h1>
        <div className={css.search}>
          <div className={css.options}>
            <button
              className={css.button}
              onClick={handleGButton}
            >Gênero <ExpandMoreIcon />
            </button>
            {generoButton && <ExpandButton
              values={generos}
              onValueSelect={handleGenreSelection}
            />}
          </div>
          <div className={css.options}>
            <button
              className={css.button}
              onClick={handleCButton}
            >
              Classificação <ExpandMoreIcon />
            </button>
            {classificacaoButton && <ExpandButton
              values={classificacoes}
              onValueSelect={handleRatingSelection}
            />}
          </div>
          <button className={css.button} onClick={clearFilters}>Limpar Filtros</button>
        </div>
        <div className={css.movieList}>
          {filteredMovies.length > 0 && filteredMovies.map((movie) => (
            <div className={css.filteredMovie}>
              <div>
                <div className={css.movieInfo}>
                  <h3>{movie.titulo}</h3>  {movie.classificacao}
                </div>
                {movie.genero}
              </div>
              <button
                className={css.selectButton}
                onClick={() => navigate(`/sessoes/${movie.id}`)}
              >
                ver sessões <ArrowForwardIosIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}