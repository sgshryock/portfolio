import Navigation from "./components/layout/Navigation";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import WhatIBuild from "./components/sections/WhatIBuild";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <div>
      <a href="#about" className="skip-link">Skip to main content</a>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <WhatIBuild />
        <Skills />
        {/* <Projects /> */}
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
