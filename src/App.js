import logo from "./logo.svg";
import "./App.css";
import { Allroutes } from "./allroutes/Allroutes";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ProductQuickView from "./components/modal/ProductQuickView";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./commonHelpers/scrollToTop";


function App() {
  return (

    <>
    <ScrollToTop/>
     {/* //!!main layout for all components */}
      <div className="body">
        <Navbar />
        <Allroutes />
        <Footer />
      </div>
      <ToastContainer/>
    </>
  );
}

export default App;
