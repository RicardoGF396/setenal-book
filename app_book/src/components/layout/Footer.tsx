import Logo from "../../assets/logo.svg";

function Footer() {
  return (
    <div className="p-6 py-24 lg:p-12 lg:flex justify-between items-baseline">
      <div className="lg:w-[370px]">
        <img src={Logo} alt="logo" />
        <p className="mt-4">
          El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es
          tener el coraje de continuar.
        </p>
        <p className="italic">- Winston Churchill</p>
      </div>
      <div>
        <p className="mt-8 lg:mt-0">Creado por Ricardo González Flores</p>
      </div>
    </div>
  );
}

export default Footer;
