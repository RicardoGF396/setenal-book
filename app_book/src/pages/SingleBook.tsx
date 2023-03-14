import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../config/config";
import { BookDetails } from "../interfaces/BookDetails";

function SingleBook() {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false)

  const [book, setBook] = useState<BookDetails>({
    id: 0,
    nombre: "",
    anio: "",
    imagen: "",
    serie: "",
    genero: "",
    nombre_autor: "",
    autor_nacionalidad: "",
    autor_nacimiento: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDetailBook = async () => {
      try {
        const res = await clienteAxios.get(`/book/${id}`);
        setBook(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchDetailBook();
  }, []);

  /* Te manda a la ruta que necesites */
  const navigate = useNavigate();

  const deleteBook = async () => {
    try{
      await clienteAxios.delete(`/book/${id}`)
      navigate('/home')
    }catch(e){
      console.log(e);
      
    }
  }

  const {
    nombre,
    anio,
    imagen,
    serie,
    genero,
    nombre_autor,
    autor_nacionalidad,
    autor_nacimiento,
  } = book;

  const date = new Date(autor_nacimiento);

  const formattedDate = date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full lg:flex lg:flex-row gap-x-12 lg:justify-center">
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="w-[80vw] h-[250px] lg:w-auto lg:px-6">
          <h1 className="font-semibold text-2xl mt-12">¿Estás seguro que quieres eliminar este libro?</h1>
          <div className="flex flex-col gap-y-4 mt-4">
              <button
                onClick={() => deleteBook()}
                className="text-white bg-[#191C24] py-4 px-12 rounded-full"
              >
                Eliminar
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="py-4 px-12 rounded-full border-2 border-[#191C24]"
              >
                Cancelar
              </button>
            </div>
        </div>
      </Modal>
      <div className="flex justify-center items-center ">
        <div className="rounded-xl bg-white p-8 ">
          <img className="w-[150px] lg:w-[300px]" src={imagen} alt="book-img" />
        </div>
      </div>
      <div className="px-8 mt-8">
        <h1 className="font-lora text-4xl">{nombre}</h1>
        <div className="lg:flex gap-x-12">
          <div>
            <h3 className="font-semibold text-xl mt-6">Autor</h3>
            <p>{anio}</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mt-6">Género</h3>
            <p>{genero}</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mt-6">Serie</h3>
            <p>{serie == null ? "No tiene serie" : serie}</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#959691] my-6"></div>
        <h2 className="font-bold text-2xl">Detalles del autor</h2>
        <div className="lg:flex gap-x-12">
          <div>
            <h3 className="font-semibold text-xl mt-6">Nombre</h3>
            <p>{nombre_autor}</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mt-6">Nacionalidad</h3>
            <p>{autor_nacionalidad}</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mt-6">Nacimiento</h3>
            <p>{formattedDate}</p>
          </div>
        </div>

        <Link to={`/book/update/${id}`}>
        <button className="py-4 cursor-pointer px-8 bg-[#191C24] text-white w-full rounded-full mt-6">
          Editar
        </button>
        </Link>
        <button onClick={() => setOpenModal(true)} className="py-4 cursor-pointer px-8 border border-[#191C24] text-191C24 w-full rounded-full mt-4">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default SingleBook;
