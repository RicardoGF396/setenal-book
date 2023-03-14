import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Menu from "../../assets/menu.svg";
import Close from "../../assets/close.svg";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu(){
    setIsOpen(!isOpen)    
  };

  return (
    <div className="w-[full]">
      {/* Mobile Menu */}
      <div className={`lg:hidden bg-[#EDEAE2] fixed z-10 flex flex-col gap-y-12 w-full h-screen items-center transition-all duration-300
        ${isOpen ? "top-0" :"-top-[110%]"}`}>
        <div className="w-full flex justify-end p-8 ">
          <img onClick={() => toggleMenu()} src={Close} alt="close" />
        </div>
        <Link onClick={() => toggleMenu()} to={"/home"}>
          <h2 className="font-lora text-4xl">Incio</h2>
        </Link>
        <Link onClick={() => toggleMenu()} to={"/book/search"}>
          <h2 className="font-lora text-4xl">Buscar libros</h2>
        </Link>
        <Link onClick={() => toggleMenu()} to={"/book/create"}>
          <h2 className="font-lora text-4xl">Agregar libro</h2>
        </Link>
      </div>
      <div className="lg:hidden w-full flex justify-between py-4 px-6 items-center sticky top-0 left-0">
        <Link to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>
        <img onClick={() => toggleMenu()} className="w-[42px]" src={Menu} alt="menu" />
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex py-8 px-8 gap-x-20 items-center ">
        <img src={Logo} alt="logo" />
        <div>
          <ul className="flex gap-x-6">
            <Link to={"/home"}><li>Inicio</li></Link>
            <Link to={"/book/search"}><li>Buscar libros</li></Link>
            <Link to={"/book/create"}><li>Agregar libro</li></Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
