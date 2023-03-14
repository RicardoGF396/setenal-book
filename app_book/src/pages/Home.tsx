import TemplateSliderBooks from "../components/Home/TemplateSliderBooks";
import Book from "../assets/topBook.png";
import { useEffect } from "react";

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  

  return (
    <div>
      {/* Top Book */}

      <div className="w-full">
        <div>
          <div className="px-6 lg:flex lg:h-[400px] items-center justify-center lg:flex-row-reverse ">
            <div>
              <img className="w-[550px]" src={Book} alt="book" />
            </div>
            <div className="lg:w-[600px]">
              <h1 className="font-lora text-4xl mt-8">
                Abre la mente, abre un libro, vive una aventura sin fin.
              </h1>
              <p className="mt-4">
                Abre la mente y explora mundos imaginarios, aprende cosas nuevas
                y experimenta emociones que nunca pensaste posibles.
              </p>
              <button className="mt-4 border border-black rounded-full py-2 px-6">
                Comenzar a leer
              </button>
            </div>
          </div>
          {/* Libros recientes */}
          <TemplateSliderBooks
            key={"recent"}
            endpoint={"recent-books"}
            title={"Más recientes"}
          />
          {/* Fantasía */}
          <TemplateSliderBooks
            key={"genre"}
            endpoint={"genre"}
            param={"novela"}
            title={"Libros de Novela"}
          />
          {/* Drama */}
          <TemplateSliderBooks
            key={"genre2"}
            endpoint={"genre"}
            param={"drama"}
            title={"Libros de Drama"}
          />
          {/* Poesia */}
          <TemplateSliderBooks
            key={"genre3"}
            endpoint={"genre"}
            param={"poesia"}
            title={"Libros de Poesía"}
          />
          {/* Harry Potter Serie */}
          <TemplateSliderBooks
            key={"serie1"}
            endpoint={"serie"}
            param={"1"}
            title={"Serie de Harry Potter"}
          />
          {/* Crepúsculo Serie*/}
          <TemplateSliderBooks
            key={"serie2"}
            endpoint={"serie"}
            param={"2"}
            title={"Serie de Crepúsculo"}
          />
          {/* Señor de los Anillos Serie*/}
          <TemplateSliderBooks
            key={"serie3"}
            endpoint={"serie"}
            param={"3"}
            title={"Creación de hielo y fuego"}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
