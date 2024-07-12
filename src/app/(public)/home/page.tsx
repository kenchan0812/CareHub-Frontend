import Contact from "@/components/home-section/contact";
import Faq from "@/components/home-section/faq";
import Service from "@/components/home-section/service";
import Hero from "@/components/home-section/hero";
const page = () => {
  return (
    <div>
      <Hero />
      <Service />
      <Faq />
      <Contact />
    </div>
  );
};

export default page;
