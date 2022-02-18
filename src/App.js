import { useContext } from "react";
import GalleryListUpdater from "./components/GalleryRoutes/GalleryListUpdater";
import GalleryList from "./components/GalleryRoutes/GalleryList";
import GalleryPicker from "./components/GalleryRoutes/GalleryPicker";
import Gallery from "./components/GalleryRoutes/Gallery";
import ProductionGallery from "./components/GalleryRoutes/ProductionGallery";
import ProductionGalleryUpdater from "./components/GalleryRoutes/ProductionGalleryUpdater";
import GalleryUpdater from "./components/GalleryRoutes/GalleryUpdater";
import About from "./components/AboutRoutes/About";
import AboutUpdater from "./components/AboutRoutes/AboutUpdater";
import Page404 from "./components/Page404";
import GalleriesList from "./components/GalleryRoutes/GalleriesList";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/LoginRoutes/Login";
import axios from "axios";
import dotenv from "dotenv";
import AuthContext from "./components/Context/AuthContext";
import "./styles/App.css";
import Footer from "./components/Footer";
dotenv.config();
axios.defaults.withCredentials = true;

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <div className="container">
          <Routes>
            <Route path="/kategorie/wybor" element={<GalleriesList />} />
            <Route path="/kategorie" element={<GalleryPicker />} />
            <Route
              path="/kategorie/produkcja"
              element={
                isAuthenticated ? (
                  <ProductionGalleryUpdater />
                ) : (
                  <ProductionGallery />
                )
              }
            />
            <Route
              path="/kategorie/:category/:name"
              element={isAuthenticated ? <GalleryUpdater /> : <Gallery />}
            />
            <Route
              path="/kategorie/:name"
              element={
                isAuthenticated ? <GalleryListUpdater /> : <GalleryList />
              }
            />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={isAuthenticated ? <AboutUpdater /> : <About />}
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
