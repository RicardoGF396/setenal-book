import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Author } from "../interfaces/Author";
import { Book } from "../interfaces/Book";
import { Genre } from "../interfaces/Genre";
import { Serie } from "../interfaces/Serie";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import BookImg from "../assets/bookForm.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import BrokenBook from "../assets/brokenBooks.png";
import Demonds from "../assets/bannerBook.jpg";
import clienteAxios from "../config/config";

function AddBook() {
  const { id } = useParams();

  const [years, setYears] = useState<number[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [series, setSeries] = useState<Serie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const [openModal, setOpenModal] = useState(false);

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

    const getBook = async () => {
      const res = await clienteAxios.get(
        `/general-book/${id}`
      );
      setUpdateBook(res.data);
    };

    const getUpdateBook = async () => {
      const res = await clienteAxios.put(
        `/book/update/${id}`
      );
    };

    /* getUpdateBook() */
    getBook();
    fetchData("autores", setAuthors);
    fetchData("series", setSeries);
    fetchData("generos", setGenres);
    setYears(yearsArray);
  }, []);

  /* Inicializar un objeto vacío */
  const [updateBook, setUpdateBook] = useState<Book>({
    nombre: "",
    anio: "",
    imagen: "",
    autorId: 0,
    generoId: 0,
    serieId: 0,
  });

  /* Destructurar el objeto para darles un estado inicial */
  const { nombre, anio, imagen, autorId, generoId, serieId } = updateBook;

  const [nombreUpt, setNombreUpt] = useState(nombre);
  const [anioUpt, setAnioUpt] = useState(anio);
  const [imagenUpt, setImagenUpt] = useState(imagen);
  const [autorIdUpt, setAutorIdUpt] = useState(autorId);
  const [generoIdUpt, setGeneroIdUpt] = useState(generoId);
  const [serieIdUpt, setSerieIdUpt] = useState(serieId);
  const [isEmpty, setIsEmpty] = useState(false);

  /* Ya cargados los datos, se actualizara el state cuando haya cambios */
  useEffect(() => {
    setNombreUpt(nombre);
    setAnioUpt(anio);
    setImagenUpt(imagen);
    setAutorIdUpt(autorId);
    setGeneroIdUpt(generoId);
    setSerieIdUpt(serieId);
  }, [updateBook]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!nombre || !anio || !imagen || !autorId || !generoId) {
      setIsEmpty(true);
      setTimeout(() => {
        setIsEmpty(false);
      }, 3000);
    } else {
      console.log(nombreUpt);
      try {
        const newBook = {
          nombre: nombreUpt,
          anio: anioUpt,
          imagen: imagenUpt,
          autorId: autorIdUpt,
          generoId: generoIdUpt,
          serieId: serieIdUpt,
        };
        await clienteAxios.put(`/book/${id}`, newBook);
        setOpenModal(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full px-6 lg:flex">
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="w-[80vw] h-[250px] lg:w-auto lg:px-6">
          <h1 className="font-semibold text-2xl mt-12">
            Libro actualizado con éxito
          </h1>
          <div className="flex flex-col gap-y-4 mt-4">
            <Link to={"/home"}>
              <button className="text-white bg-[#191C24] py-4 px-12 w-full rounded-full">
                Regresar al inicio
              </button>
            </Link>
            <button
              onClick={() => setOpenModal(false)}
              className="py-4 px-12 rounded-full border-2 border-[#191C24]"
            >
              Seguir editando
            </button>
          </div>
        </div>
      </Modal>
      <div className=" lg:w-[50vw] lg:pr-12">
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
              onChange={(e) => setNombreUpt(e.target.value)}
              value={nombreUpt}
              type={"text"}
              className="w-full border-2 border-black rounded-full h-[40px] bg-transparent pl-4"
            ></input>
          </label>

          <label>
            {" "}
            Año de publicación
            <select
              onChange={(e) => setAnioUpt(e.target.value)}
              value={anioUpt}
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
              onChange={(e) => setImagenUpt(e.target.value)}
              value={imagenUpt}
              type={"text"}
              className="w-full border-2 border-black rounded-full h-[40px] bg-transparent pl-4"
            ></input>
          </label>

          <label>
            {" "}
            Autores
            <select
              onChange={(e) => setAutorIdUpt(parseInt(e.target.value))}
              value={autorIdUpt}
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
                onChange={(e) => setGeneroIdUpt(parseInt(e.target.value))}
                value={generoIdUpt}
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
                onChange={(e) => setSerieIdUpt(parseInt(e.target.value))}
                value={serieIdUpt ?? ""}
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
            Actualizar libro
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
