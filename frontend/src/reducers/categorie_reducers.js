import {
  CATEGORIE_DELETE_FAIL,
  CATEGORIE_DELETE_REQUEST,
  CATEGORIE_DELETE_RESET,
  CATEGORIE_DELETE_SUCESS,
  CATEGORIE_DETAILS_FAIL,
  CATEGORIE_DETAILS_REQUEST,
  CATEGORIE_DETAILS_RESET,
  CATEGORIE_DETAILS_SUCESS,
  CATEGORIE_LIST_FAIL,
  CATEGORIE_LIST_REQUEST,
  CATEGORIE_LIST_RESET,
  CATEGORIE_LIST_SUCESS,
  CATEGORIE_REGISTER_FAIL,
  CATEGORIE_REGISTER_REQUEST,
  CATEGORIE_REGISTER_RESET,
  CATEGORIE_REGISTER_SUCESS,
  CATEGORIE_UPDATE_FAIL,
  CATEGORIE_UPDATE_REQUEST,
  CATEGORIE_UPDATE_RESET,
  CATEGORIE_UPDATE_SUCESS,
} from "../constants/categorie_contants";

export const categorieRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIE_REGISTER_REQUEST:
      return { loading: true };
    case CATEGORIE_REGISTER_SUCESS:
      return { loading: false, success: true, message: action.payload };
    case CATEGORIE_REGISTER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORIE_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const categorieDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIE_DETAILS_REQUEST:
      return { loading: true };
    case CATEGORIE_DETAILS_SUCESS:
      return { loading: false, success: true, categorie: action.payload };
    case CATEGORIE_DETAILS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORIE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const categorieListReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIE_LIST_REQUEST:
      return { loading: true };
    case CATEGORIE_LIST_SUCESS:
      return { loading: false, success: true, categories: action.payload };
    case CATEGORIE_LIST_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
export const categorieUpdateReducer = (state = { categorie: {} }, action) => {
  switch (action.type) {
    case CATEGORIE_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORIE_UPDATE_SUCESS:
      return { loading: false, success: true, message: action.payload };
    case CATEGORIE_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORIE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const categorieDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIE_DELETE_REQUEST:
      return { loading: true };
    case CATEGORIE_DELETE_SUCESS:
      return { loading: false, success: true, message: action.payload };
    case CATEGORIE_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORIE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
