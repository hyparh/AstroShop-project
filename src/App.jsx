import Blog from "./Blog";
import Brand from "./components/Brand";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ClientsSay from "./components/ClientsSay";
import OurServices from "./components/OurServices";
import NewTelescopes from "./components/NewTelescopes";
import FeaturedTelescopes from "./components/FeaturedTelescopes";

function App() {
  return (
    <>
      <Header />
      <LogIn />
      <Register />
      <OurServices />
      <NewTelescopes />
      <FeaturedTelescopes />
      <ClientsSay />
      <Brand />
      <Blog />
      <Footer />
    </>
  );
}

export default App;
