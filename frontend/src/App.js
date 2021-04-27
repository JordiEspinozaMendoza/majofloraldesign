import { HashRouter as Router, Route } from "react-router-dom";
import NavigationBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import HomeScreen from "./views/HomeScreen";
import Footer from "./components/Footer";
import CatalogueScreen from "./views/CatalogueScreen";
import ProductScreen from "./views/ProductScreen";
import EditProductScreen from "./views/EditProductScreen";
import ProductsListScreen from "./views/ProductsListScreen";
import CategoriesScreen from "./views/CategoriesScreen";
import RegisterCategorieScreen from "./views/RegisterCategorieScreen";
import EditCategorieScreen from "./views/EditCategorieScreen";
import LoginScreen from "./views/LoginScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavigationBar />
      <Route path="/" component={HomeScreen} exact></Route>
      <Route path="/catalogo/" component={CatalogueScreen} exact></Route>
      <Route path="/producto/:id/" component={ProductScreen} exact></Route>
      <Route path="/login/" component={LoginScreen} exact></Route>

      <Route
        path="/admin/productos/"
        component={ProductsListScreen}
        exact
      ></Route>
      <Route
        path="/admin/categorias/"
        component={CategoriesScreen}
        exact
      ></Route>
      <Route
        path="/admin/productos/:id/editar/"
        component={EditProductScreen}
        exact
      ></Route>
      <Route
        path="/admin/categorias/registrar/"
        component={RegisterCategorieScreen}
        exact
      ></Route>
      <Route
        path="/admin/categorias/:id/editar/"
        component={EditCategorieScreen}
        exact
      ></Route>

      <Footer />
    </Router>
  );
}
export default App;
