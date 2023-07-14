import React, { useEffect, useState } from "react";
import productService from "../../services/productServices";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState("");

  useEffect(() => {
    productService
      .getAll()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container py-5">
        <h5 className="text-center text-bold">More than just eyeglasses.</h5>
        <section className="Top-Sellers">
          <div className="container">
            <div className="row row-cols-3" style={{ padding: "20px" }}>
              {/* Recently Added Sunglasses */}
              {products &&
                products.data.map((product) => {
                  const productPic = `http://localhost:4000${product.photos[0]}`;

                  return (
                    <div className="col" style={{ marginBottom: "100px" }}>
                      <div
                        className="card"
                        style={{ width: "295px", height: "450px" }}
                      >
                        <img
                          src={productPic}
                          className="card-img-top product-image"
                          style={{ width: "285px" }}
                          alt="Sunglasses"
                        />
                        <div className="card-body d-flex flex-column align-items-center justify-content-center">
                          <h5 className="card-title">
                            <p
                              className="card-text"
                              style={{ fontSize: "14px", marginBottom: "0" }}
                            >
                              {product.name}
                            </p>
                          </h5>
                          <p className="card-text" style={{ color: "#024E82" }}>
                            Rs {product.price}
                          </p>
                              <Link
                          to={`/productDetail/${product._id}`}
                          state={{ productId: product._id, product }}
                        >
                          <div className="col-md-12 text-center">
                            <a
                              href="/"
                              className="btn btn-primary"
                              style={{
                                color: "white",
                                backgroundColor: "#024E82",
                                height: "40px",
                                width: "100px",
                              }}
                            >
                              Buy 
                            </a>
                          </div>
                        </Link>
                        </div>
                    
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
