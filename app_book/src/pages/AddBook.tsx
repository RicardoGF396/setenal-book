import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Author } from "../interfaces/Author";
import { Book } from "../interfaces/Book";
import { Genre } from "../interfaces/Genre";
import { Serie } from "../interfaces/Serie";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import BookImg from "../assets/bookForm.png";
import { useNavigate } from "react-router-dom";
import BrokenBook from "../assets/brokenBooks.png";
import Demonds from "../assets/bannerBook.jpg";
import clienteAxios from "../config/config";

function AddBook() {
  const [years, setYears] = useState<number[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [series, setSeries] = useState<Serie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [modalOpenSuccess, setModalOpenSuccess] = useState(false);
  const [modalOpenError, setModalOpenError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [nombre, setNombre] = useState("");
  const [anio, setAnio] = useState("");
  const [imagen, setImagen] = useState("");
  const [autorId, setAutorId] = useState("");
  const [generoId, setGeneroId] = useState("");
  const [serieId, setSerieId] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const book = {
    nombre: nombre,
    anio: anio,
    imagen: imagen,
    autorId: autorId,
    generoId: generoId,
    serieId: serieId,
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 1200;
    const yearsArray = [];
    for (let i = currentYear; i >= startYear; i--) {
      yearsArray.push(i);
    }

    const fetchData = async (param: string, setData: any) => {
      const res = await clienteAxios.get(`/${param}`);
      setData(res.data);
    };

    fetchData("autores", setAuthors);
    fetchData("series", setSeries);
    fetchData("generos", setGenres);
    setYears(yearsArray);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!nombre || !anio || !imagen || !autorId || !generoId) {
      setIsEmpty(true);
      setTimeout(() => {
        setIsEmpty(false);
      }, 3000);
    } else {
      try {
        await clienteAxios.post(`/book/create`, book);
        setModalOpenSuccess(true);
      } catch (error) {
        console.log(error);
        setModalOpenError(true);
      }
    }
  };

  const handleClear = (e: any) => {
    formRef.current && formRef.current.reset();
    setNombre("");
    setAnio("");
    setAutorId("");
    setGeneroId("");
    setSerieId(null);
    setImagen("");
    setModalOpenSuccess(false);
    setModalOpenError(false);
  };

  const navigate = useNavigate();

  return (
    <div className="w-full px-6 lg:flex">
      <div className=" lg:w-[50vw] lg:pr-12">
        <Modal
          open={modalOpenSuccess}
          onClose={() => setModalOpenSuccess(false)}
        >
          <div className="w-[80vw] h-[500px] flex flex-col justify-center items-center text-center lg:w-auto lg:px-24">
            <img className="h-[200px]" src={BookImg} alt="book-success" />
            <p className="font-lora text-3xl mt-4">
              Libro añadido <br /> con éxito
            </p>
            <div className="flex flex-col gap-y-4 mt-4">
              <button
                onClick={() => navigate("/home")}
                className="text-white bg-[#191C24] py-4 px-12 rounded-full"
              >
                Regresar a Inicio
              </button>
              <button
                onClick={handleClear}
                className="py-4 px-12 rounded-full border-2 border-[#191C24]"
              >
                Agregar otro libro
              </button>
            </div>
          </div>
        </Modal>
        <Modal open={modalOpenError} onClose={() => setModalOpenError(false)}>
          <div className="w-[80vw] h-[500px] flex flex-col justify-center items-center text-center lg:w-auto lg:px-24">
            <img className="h-[200px]" src={BrokenBook} alt="book-success" />
            <p className="font-lora text-3xl mt-4">
              Error al añadir <br /> el libro
            </p>
            <div className="flex flex-col gap-y-4 mt-4">
              <button
                onClick={() => navigate("/home")}
                className="text-white bg-[#191C24] py-4 px-12 rounded-full"
              >
                Regresar a Inicio
              </button>
              <button
                onClick={handleClear}
                className="py-4 px-12 rounded-full border-2 border-[#191C24]"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </Modal>

        <h1 className="font-lora text-4xl my-8">Agregar libro</h1>
        <p
          className={`text-red-500 mb-4 font-semibold text-lg ${
            isEmpty ? "block" : "hidden"
          }`}
        >
          Uno o más campos están vacíos
        </p>
        <form
          ref={formRef}
          className="w-full flex flex-col gap-y-6"
          action="post"
        >
          <label>
            {" "}
            Nombre del libro
            <input
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              type={"text"}
              className="w-full border-2 border-black rounded-full h-[40px] bg-transparent pl-4"
            ></input>
          </label>

          <label>
            {" "}
            Año de publicación
            <select
              onChange={(e) => setAnio(e.target.value)}
              value={anio}
              className="w-full border-2 border-black rounded-full h-[40px] bg-transparent pl-4"
            >
              <option value={""} disabled={true}>
                Selecciona un año
              </option>
              {years.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label>
            {" "}
            URL de imagen
            <input
              onChange={(e) => setImagen(e.target.value)}
              value={imagen}
              type={"text"}
              className="w-full border-2 border-black rounded-full h-[40px] bg-transparent pl-4"
            ></input>
          </label>

          <label>
            {" "}
            Autores
            <select
              onChange={(e) => setAutorId(e.target.value)}
              value={autorId}
              className="w-full border-2 border-black rounded-full h-[40px] bg-transparent pl-4"
            >
              <option value={""} disabled={true}>
                Selecciona un autor
              </option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {" "}
                  {author.nombre}{" "}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col lg:flex-row gap-6 lg:justify-between">
            <label>
              {" "}
              Géneros
              <select
                onChange={(e) => setGeneroId(e.target.value)}
                value={generoId}
                className="w-full border-2 border-black rounded-full h-[40px] bg-transparent pl-4"
              >
                <option value={""} disabled={true}>
                  Selecciona un género
                </option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {" "}
                    {genre.nombre}{" "}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {" "}
              Series (opcional)
              <select
                onChange={(e) => setSerieId(e.target.value)}
                value={serieId ?? ""}
                className="w-full border-2 border-black rounded-full h-[40px] bg-transparent pl-4"
              >
                <option value={""} disabled={true}>
                  Selecciona una serie
                </option>
                {series.map((serie) => (
                  <option key={serie.id} value={serie.id}>
                    {" "}
                    {serie.nombre}{" "}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="text-white bg-[#191C24] py-4 rounded-full"
            type="submit"
          >
            Guardar libro
          </button>
        </form>
      </div>
      <div className="hidden lg:block lg:absolute top-0 right-0 h-screen w-[45vw] ">
        <img
          className="h-screen w-full object-cover"
          src={Demonds}
          alt="demonds"
        />
        <div className="absolute bottom-16 left-8">
          <h1 className="font-lora text-5xl text-white w-[600px]">
            El único verdadero fracaso es aquel del que no aprendemos nada.
          </h1>
          <p className="text-white mt-4">Henry Ford</p>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
