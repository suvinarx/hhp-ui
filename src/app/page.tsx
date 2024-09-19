import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MainComponent from "@/components/MainComponent";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <header className="bg-background sticky top-0 z-50 shadow-md">
        <Navbar />
      </header>
      <main className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-32 mt-4 md:mt-8 flex flex-col gap-8">
        <MainComponent />
        <About />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
