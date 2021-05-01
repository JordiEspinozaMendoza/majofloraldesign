import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Button, Form, Image } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginator from "../../components/Paginator";

import {
  productDetails as details,
  updateProduct,
} from "../../actions/product_actions";
import { listCategories } from "../../actions/categorie_actions";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from "../../constants/product_contants";
export default function EditProductScreen({ match, history }) {
  /*Vars for creation of product*/
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const [categorieName, setCategorieName] = useState();
  const [categorieId, setCategorieId] = useState("undefined");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const categorieList = useSelector((state) => state.categorieList);
  const {
    error: errorCategories,
    loading: loadingCategories,
    success: successCategories,
    categories,
  } = categorieList;

  const productDetails = useSelector((state) => state.productDetails);
  const {
    error: errorDetails,
    loading: loadingDetails,
    success: successDetails,
    product,
  } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    !userInfo && history.push("/");
    dispatch(listCategories());
    console.log(categorieId);
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      history.push("/admin/productos/");
    } else {
      if (!product?.name || product._id !== Number(productId))
        dispatch(details(productId));
      else {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setImage(product.img);
        setInStock(product.inStock);
        setCategorieName(product.categorie["name"]);
        product.categorie["_id"] && setCategorieId(product.categorie["_id"]);
      }
    }
  }, [product, productId, successUpdate, history, dispatch]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setIsUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );
      setImage(data);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (categorieId == "Selecciona una categoría")
      dispatch(
        updateProduct({
          name: name,
          _id: productId,
          category: "undefined",
          description: description,
          price: price,
          inStock: inStock,
        })
      );
    else {
      dispatch(
        updateProduct({
          name: name,
          _id: productId,
          description: description,
          category: categorieId,
          price: price,
          inStock: inStock,
        })
      );
    }
  };
  return loadingDetails ? (
    <div style={{ minHeight: "100vh", marginTop: "15vh" }}>
      <Loader />
    </div>
  ) : errorDetails ? (
    <div style={{ minHeight: "100vh", marginTop: "15vh" }}>
      <Message variant="danger">{errorDetails}</Message>
    </div>
  ) : (
    <div style={{ marginTop: "10vh" }}>
      <>
        <FormContainer>
          <h1 style={{ width: "100%" }}>Editar producto</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="desc">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingresa los detalles"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa el precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="categorie">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => setCategorieId(e.target.value)}
              >
                {successCategories && (
                  <>
                    <option selected={categorieId == "undefined"}>
                      Selecciona una categoría
                    </option>
                    {categories?.map((categorie) => (
                      <option
                        value={categorie._id}
                        selected={categorieId === categorie._id ? true : false}
                      >
                        {categorie.name}
                      </option>
                    ))}
                  </>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Imagen</Form.Label>
              <div className="d-flex align-items-center w-100 justify-content-center">
                {product?.img && (
                  <Image
                    className="d-block my-4 shadow"
                    style={{ maxWidth: "330px", maxHeight: "250px" }}
                    xs={6}
                    md={4}
                    src={`https://res.cloudinary.com/majo-floral-desing/${product.img}`}
                  />
                )}
              </div>
              <Form.Control
                type="text"
                placeholder="Ingresa la imagen"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                readOnly={true}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Elegir un archivo"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {isUploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="stock">
              <Form.Check
                type={"checkbox"}
                label={"¿Disponible en stock?"}
                checked={inStock}
                onChange={(e) => setInStock(!inStock)}
              ></Form.Check>
            </Form.Group>
            {loadingUpdate ? (
              <Loader />
            ) : errorUpdate ? (
              <>
                <Message variant="danger">{errorUpdate}</Message>
                <Button variant="primary" type="submit">
                  Actualizar
                </Button>
              </>
            ) : (
              <Button variant="primary" type="submit">
                Actualizar
              </Button>
            )}
          </Form>
        </FormContainer>
      </>
    </div>
  );
}
