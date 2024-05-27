import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "react-bootstrap/Form";
import { Button, Container, Image, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const shops = ["Migros", "Teknosa", "Şok", "Bim"];

const shopsObj = shops.map((shop, index) => ({
  id: index,
  name: shop,
}));

const categories = ["Elektronik", "Şarküteri", "Oyuncak", "Bakliyat"];

const categoriesObj = categories.map((category, index) => ({
  id: index,
  name: category,
}));

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productShops, setProductShops] = useState("");
  const [productCategories, setProductCategories] = useState("");
  const [filteredShopId, setFilteredShopId] = useState("all");
  const [filteredCategoryId, setFilteredCategoryId] = useState("all");
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [filteredName, setFilteredName] = useState("");
  const [isAllBought, setIsAllBought] = useState(false);

  // eslint-disable-next-line react/prop-types
  const IconButton = ({ children, onClick }) => {
    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <button className="icon-button" onClick={handleClick}>
        {children}
      </button>
    );
  };

  const addProduct = () => {
    const product = {
      id: nanoid(),
      name: productName,
      shop: shopsObj.find((shop) => shop.id === parseInt(productShops, 10))
        .name,
      category: categoriesObj.find(
        (category) => category.id === parseInt(productCategories, 10)
      ).name,
      isBought: false,
    };
    setProducts([...products, product]);
    setProductName("");
    setProductShops("");
    setProductCategories("");
  };

  const handleProductClick = (productId) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return { ...product, isBought: !product.isBought };
        }
        return product;
      })
    );
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const filteredProducts = products.filter((product) => {
    return (
      (filteredShopId === "all" ||
        product.shop === shopsObj[parseInt(filteredShopId, 10)].name) &&
      (filteredCategoryId === "all" ||
        product.category ===
          categoriesObj[parseInt(filteredCategoryId, 10)].name) &&
      (filteredStatus === "all" ||
        (filteredStatus === "bought" ? product.isBought : !product.isBought)) &&
      (filteredName === "" ||
        product.name.toLowerCase().includes(filteredName.toLowerCase()))
    );
  });

  useEffect(() => {
    const allBought =
      products.length > 0 && products.every((product) => product.isBought);
    setIsAllBought(allBought);
  }, [products]);

  useEffect(() => {
    if (isAllBought) {
      alert("Alışveriş Tamamlandı");
    }
  }, [isAllBought]);

  return (
    <>
      <Container>
        <div className="column justify-content-center align-items-center">
          <Image
            style={{ width: "430px" }}
            src="https://www.kimnezamanicatetti.com/wp-content/uploads/2019/01/alisveris-arabasi-tekerlekli-alisveris-sepeti.jpg"
          />
          <Form className="d-flex justify-content-center align-items-center ps-4">
            <div>
              <Form.Group
                className="mb-4 pe-2"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="fw-bold text-danger"></Form.Label>
                <Form.Control
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  type="text"
                  placeholder="Shopping List"
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center align-items-center me-2">
              <Form.Select
                className="me-2"
                value={productShops}
                aria-label="Default select example"
                onChange={(e) => {
                  setProductShops(e.target.value);
                }}
              >
                <option value="">Shops</option>
                {shopsObj.map((shop) => (
                  <option value={shop.id} key={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                aria-label="Default select example"
                value={productCategories}
                onChange={(e) => {
                  setProductCategories(e.target.value);
                }}
              >
                <option value="">Category</option>
                {categoriesObj.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
              <Button className="ms-2" onClick={addProduct}>
                Add
              </Button>
            </div>
          </Form>

          <div className="filters">
            <div className="d-flex justify-content-center align-items-center me-3">
              <Form.Group className="me-2" controlId="formNameFilter">
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  value={filteredName}
                  onChange={(e) => setFilteredName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formShopFilter">
                <Form.Select
                  value={filteredShopId}
                  onChange={(e) => setFilteredShopId(e.target.value)}
                >
                  <option value="all">All Shops</option>
                  {shopsObj.map((shop) => (
                    <option key={shop.id} value={shop.id}>
                      {shop.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formCategoryFilter" className="ms-2">
                <Form.Select
                  value={filteredCategoryId}
                  onChange={(e) => setFilteredCategoryId(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categoriesObj.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <Form.Group controlId="formStatusFilter" className="mt-3 mb-3">
              <Form.Check
                type="radio"
                inline
                label="All"
                name="statusFilter"
                checked={filteredStatus === "all"}
                onChange={() => setFilteredStatus("all")}
              />
              <Form.Check
                type="radio"
                inline
                label="Bought"
                name="statusFilter"
                checked={filteredStatus === "bought"}
                onChange={() => setFilteredStatus("bought")}
              />
              <Form.Check
                type="radio"
                inline
                label="Not Bought"
                name="statusFilter"
                checked={filteredStatus === "not"}
                onChange={() => setFilteredStatus("not")}
              />
            </Form.Group>
          </div>

          <Table className="ms-2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Shop</th>
                <th>Category</th>
                <th>Id</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  style={{
                    textDecoration: product.isBought ? "line-through" : "none",
                  }}
                >
                  <td>{product.name}</td>
                  <td>{product.shop}</td>
                  <td>{product.category}</td>
                  <td>{product.id}</td>
                  <td>
                    <IconButton onClick={() => handleProductClick(product.id)}>
                      <FontAwesomeIcon icon={faCheck} />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton onClick={() => deleteProduct(product.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default App;
