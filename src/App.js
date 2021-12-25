import GalleryList from "./components/GalleryList";
import Gallery from "./components/Gallery";
import GalleryUpdater from "./components/GalleryUpdater";
import About from "./components/About";
import Page404 from "./components/Page404";
import GalleriesList from "./components/GalleriesList";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  let isAuthorized = true;
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/kategorie" element={<GalleriesList />} />
          <Route path="/kategorie/:name" element={<GalleryList />} />
          <Route
            path="/galerie/:name"
            element={isAuthorized ? <GalleryUpdater /> : <Gallery />}
          />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
