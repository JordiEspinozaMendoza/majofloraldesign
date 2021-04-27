import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_SUCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_SUCESS,
  PRODUCT_REGISTER_FAIL,
  PRODUCT_REGISTER_REQUEST,
  PRODUCT_REGISTER_RESET,
  PRODUCT_REGISTER_SUCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCESS,
} from "../constants/product_contants";
import axios from "axios";

export const registerProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_REGISTER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/products/create/", {}, config);
    dispatch({ type: PRODUCT_REGISTER_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/update/${product._id}/`,
      product,
      config
    );
    dispatch({ type: PRODUCT_UPDATE_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const listProducts = (query, page, cat="all") => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `api/products/getproducts/${query}/${cat}/${page}/`,
      config
    );

    dispatch({
      type: PRODUCT_LIST_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const productDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`api/products/getproduct/${id}/`, config);

    dispatch({
      type: PRODUCT_DETAILS_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`api/products/delete/${id}/`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
