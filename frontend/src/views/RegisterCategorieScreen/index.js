import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerCategorie } from "../../actions/categorie_actions";

import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { CATEGORIE_REGISTER_RESET } from "../../constants/categorie_contants";
export default function RegisterCategorieScreen({ history }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const categorieRegister = useSelector((state) => state.categorieRegister);
  const { loading, error, success } = categorieRegister;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      registerCategorie({
        name: name,
      })
    );
  };

  useEffect(() => {
    if (!userInfo) history.push("/");
    if (success) history.push("/admin/categorias/");
    dispatch({
      type: CATEGORIE_REGISTER_RESET,
    });
  }, [history, userInfo, success]);

  return (
    <div style={{ marginTop: "10vh" }}>
      <main>
        <FormContainer>
          <h2>Registrar categoría</h2>
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
                  Registrar categoría
                </Button>
              </>
            ) : (
              <Button type="submit" variant="primary">
                Registrar categoría
              </Button>
            )}
          </Form>
        </FormContainer>
      </main>
    </div>
  );
}
