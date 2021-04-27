import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productRegisterReducer,
  productUpdateReducer,
} from "./reducers/product_reducers";
import {
  categorieDeleteReducer,
  categorieDetailsReducer,
  categorieListReducer,
  categorieRegisterReducer,
  categorieUpdateReducer,
} from "./reducers/categorie_reducers";
import { userLoginReducer } from "./reducers/user_reducers";

const reducer = combineReducers({
  //Aqui iran los reducers
  //Products
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
  productList: productListReducer,
  productRegister: productRegisterReducer,
  productUpdate: productUpdateReducer,
  //Categories
  categorieDelete: categorieDeleteReducer,
  categorieRegister: categorieRegisterReducer,
  categorieDetails: categorieDetailsReducer,
  categorieList: categorieListReducer,
  categorieUpdate: categorieUpdateReducer,
  //Users
  userLogin: userLoginReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
