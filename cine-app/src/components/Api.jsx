import React, { useState, useEffect } from "react";
import './styles.css'
const Api = () => {
  const [pagina, setPagina] = useState(1);
  const [peliculas, setPeliculas] = useState([]);
  
  const cargarPeliculas = async () => {
    try {
      const respuesta = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`
      );
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        setPeliculas(datos.results);
      } else if (respuesta.status === 401) {
        console.log("Key incorrecta");
      } else if (respuesta.status === 404) {
        console.log("No disponible");
      } else {
        console.log("No tengo idea del error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    cargarPeliculas();
  }, [pagina]);

  const paginaAnterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const paginaSiguiente = () => {
    if (pagina < 1000) {
      setPagina(pagina + 1);
    }
  };

  return (
    <div className="contenedor">
      {peliculas.map((pelicula, index) => (
        <div key={index} className="pelicula">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`}
            alt={pelicula.title}
          />
          <h1 className="titulo">{pelicula.title}</h1>
          <button className="btn-info">Ver Info</button>
        </div>
      ))}
      <div className="paginacion">
        <button id="btnAnterior" onClick={paginaAnterior}>
          Anterior
        </button>
        <button id="btnSiguiente" onClick={paginaSiguiente}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Api;
