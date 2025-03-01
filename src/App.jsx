import { useContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import { UserContext } from "./context/UserContext";
import ApiProvider from "./context/ApiContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail"; // Import OrderDetail
import UpdateProfile from "./pages/UpdateProfile"; // Import UpdateProfile
import Product from "./pages/Product";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Post from "./pages/Post";
import ActualizarProducto from "./pages/ActualizarProducto";
import "./App.css";
import Contact from "./pages/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const { token } = useContext(UserContext);
  return (
    <>
      <ApiProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
            <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
            <Route path="/post" element={token ? <Post /> : <Navigate to="/login" />} />
            <Route path="/actualizarProducto/:id" element={token ? <ActualizarProducto /> : <Navigate to="/login" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={token ? <Order /> : <Navigate to="/login" />} />
            <Route path="/order/:id" element={token ? <OrderDetail /> : <Navigate to="/login" />} /> {/* Add route for OrderDetail */}
            <Route path="/updateProfile" element={token ? <UpdateProfile /> : <Navigate to="/login" />} /> {/* Add route for UpdateProfile */}
            <Route path="/productos/:id" element={<Product />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </CartProvider>
      </ApiProvider>
    </>
  );
}

export default App;
