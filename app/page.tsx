import Faq from "./fag";
import Footer from "./footer";
import Formulario from "./formulario";
import Hero from "./hero";
import Navbar from "./navbar";
import Proceso from "./proceso";
import Trabajo from "./trabajo";
export default function Home() {
  return (
   <div>
    <Navbar />
    <Hero />
    <Proceso />
    <Faq />
    <Trabajo />
    <Formulario />
    <Footer />
   </div>
  );
}
