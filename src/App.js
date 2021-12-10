import GalleryList from "./components/GalleryList";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Page404 from "./components/Page404";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/galleries" element={<GalleryList />} />
          <Route path="/gallery/:name" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
