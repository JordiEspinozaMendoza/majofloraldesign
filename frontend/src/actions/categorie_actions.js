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
import axios from "axios";
export const registerCategorie = (categorie) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORIE_REGISTER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "api/categories/create/",
      categorie,
      config
    );
    dispatch({
      type: CATEGORIE_REGISTER_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const updateCategorie = (categorie) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORIE_UPDATE_REQUEST });

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
      `api/categories/update/${categorie._id}/`,
      categorie,
      config
    );
    dispatch({
      type: CATEGORIE_UPDATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const deleteCategorie = (categorie_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORIE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `api/categories/delete/${categorie_id}/`,
      config
    );
    dispatch({
      type: CATEGORIE_DELETE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIE_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const detailsCategorie = (categorie_id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORIE_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `api/categories/getcategorie/${categorie_id}/`,
      config
    );
    dispatch({
      type: CATEGORIE_DETAILS_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const listCategories = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORIE_LIST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("api/categories/getcategories/", config);
    dispatch({
      type: CATEGORIE_LIST_SUCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CATEGORIE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
