import Footer from "../footer";
import Formulario from "../formulario";
import Navbar from "../navbar";
import HeroNosotros from "./hero";
import Nosotros from "./nosotros";

export default function Home() {
  return (
   <div>
    <Navbar />
    <HeroNosotros/>
    <Nosotros />
    <Formulario />
    <Footer/>
   </div>
  );
}
