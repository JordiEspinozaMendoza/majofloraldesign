import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/user_actions";

import Loader from "../../components/Loader";
import Message from "../../components/Message";

import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";

import { USER_LOGIN_RESET } from "../../constants/user_constants";
export default function LoginScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (!userInfo) dispatch({ type: USER_LOGIN_RESET });

    if (userInfo) history.push("/");
  }, [history, userInfo]);

  return (
    <div style={{ marginTop: "10vh" }}>
      <main>
        {loading ? (
          <Loader />
        ) : (
          <FormContainer>
            <h2>Login</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="user">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre de usuario"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa la contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button className="mb-2" type="submit" variant="primary">
                Iniciar sesión
              </Button>
              {error && (
                <Message variant="danger" style={{ marginTop: "25px" }}>
                  Usuario o contraseña incorrectos
                </Message>
              )}
            </Form>
          </FormContainer>
        )}
      </main>
    </div>
  );
}
