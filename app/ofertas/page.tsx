import Footer from "../footer";
import Navbar from "../navbar";
import Hero from "./hero";
import Meses from "./meses";
import Planes from "./planes ";

export default function Home() {
  return (
   <div>
    <Navbar />
    <Hero/>
    <Planes />
    <Meses />
    <Footer/>
   </div>
  );
}
