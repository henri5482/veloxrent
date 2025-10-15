import Faq from "./fag";
import Footer from "./footer";
import Formulario from "./formulario";
import Hero from "./hero";
import Navbar from "./navbar";
import Proceso from "./proceso";
export default function Home() {
  return (
   <div>
    <Navbar />
    <Hero />
    <Proceso />
    <Faq />
    <Formulario />
    <Footer />
   </div>
  );
}
