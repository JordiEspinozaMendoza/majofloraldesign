import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategorie,
  detailsCategorie,
} from "../../actions/categorie_actions";

import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  CATEGORIE_UPDATE_RESET,
  CATEGORIE_DETAILS_RESET,
} from "../../constants/categorie_contants";
export default function UpdateCategorieScreen({ history, match }) {
  const categorieId = match.params.id;
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const categorieUpdate = useSelector((state) => state.categorieUpdate);
  const { loading, error, success } = categorieUpdate;

  const categorieDetails = useSelector((state) => state.categorieDetails);
  const {
    loading: loadingCategorie,
    error: errorCategorie,
    categorie,
  } = categorieDetails;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategorie({
        _id: categorieId,
        name: name,
      })
    );
  };

  useEffect(() => {
    if (!userInfo) history.push("/");
    if (success) {
      dispatch({ type: CATEGORIE_UPDATE_RESET });
      dispatch({ type: CATEGORIE_DETAILS_RESET });
      history.push("/admin/categorias/");
    } else {
      if (!categorie?.name || categorie._id !== Number(categorieId))
        dispatch(detailsCategorie(categorieId));
      else setName(categorie.name);
    }
  }, [history, userInfo, success, categorie, categorieId, dispatch]);

  return (
    <div style={{ marginTop: "10vh" }}>
      <main>
        {loadingCategorie ? (
          <Loader />
        ) : errorCategorie ? (
          <Message variant="danger">{errorCategorie}</Message>
        ) : (
          <FormContainer>
            <h2>Editar categoría</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Nombre de categoría</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre de la categoría"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              {loading ? (
                <Loader />
              ) : error ? (
                <>
                  <Message variant="danger">{error}</Message>
                  <Button type="submit" variant="primary">
                    Actualizar categoría
                  </Button>
                </>
              ) : (
                <Button type="submit" variant="primary">
                  Actualizar categoría
                </Button>
              )}
            </Form>
          </FormContainer>
        )}
      </main>
    </div>
  );
}
