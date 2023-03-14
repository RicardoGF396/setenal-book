import { useState } from "react";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";
import { RecentBook } from "../interfaces/RecentBook";

function SingleBookItem({ book }: { book: RecentBook }) {
  const { id, nombre, anio, imagen, genero, nombre_autor, serie } = book;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-5 py-6 flex flex-col gap-y-4 justify-center items-center">
          <img src={imagen} className="w-[250px] h-[250px] object-contain" alt="img-book" />
          <div>
            <p className="text-[#959691] text-sm"> {anio} </p>
            <h2 className="font-lora text-4xl"> {nombre} </h2>
            <p className="font-medium"> {nombre_autor} </p>
            <p className="font-semibold text-sm ">Género:  {genero}</p>
            <p className="font-semibold text-sm ">Serie: {serie} </p>
            <Link to={`/book/${id}`} key={id}>
              <button className="bg-[#191C24] px-6 py-2 rounded-full text-white text-sm mt-2">
                Ver libro
              </button>
            </Link>
          </div>
        </div>
      </Modal>
      <div className="bg-white rounded-lg w-[200px] h-[250px] flex items-center justify-center">
        <img
          className="w-[140] h-[184px] object-cover"
          src={imagen}
          alt="book"
        />
      </div>
      <p className="mt-2 font-semibold text-[#959691]"> {anio} </p>
      <p className="font-semibold text-xl"> {nombre} </p>
      <p>{nombre_autor}</p>
        <button onClick={() => setIsOpen(true)} className="bg-[#191C24] px-6 py-2 rounded-full text-white text-sm mt-2">
          Más información
        </button>
    </div>
  );
}

export default SingleBookItem;
