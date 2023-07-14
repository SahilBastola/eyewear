import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/home.css";
import productService from "../../services/productServices";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
      <section
        className="home pb-5"
        style={{
          height: "100vh",
          background: `url("https://th.bing.com/th/id/R.f68adfe871f7bdae4276502169071781?rik=RsWUwZd4Rviy1g&pid=ImgRaw&r=0")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-fluid">
          <div className="row d-flex justify-content-end">
            <div className="col-md-6 mt-5 py-3 text-center">
              <br />
              <p className="text-light fw-bold fs-4">STYLE PICKS BEATS</p>
              <p className="text-light fw-bold fs-4">THE HEAT</p>
              <br />
              <a href="/products" className="btn border-white text-white fw-bold fs-5">
                BUY NOW
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="new-arrivals">
        <div className="container">
          <h2 className="text-center">Discover New Arrivals</h2>

          <div className="row">
            {/* Recently Added Sunglasses */}
            {/* Recently Added Sunglasses */}
            {products &&
              products.data.map((product) => {
                const productPic = `http://localhost:4000${product.photos[0]}`;

                return (
                  <div className="col-md-4">
                    <div className="card">
                      <img
                        src={productPic}
                        className="card-img-top product-image"
                        alt="Sunglasses"
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                        <Link className="nav-link" to="/products">{product.name}</Link>
                        </h5>
                        <p className="card-text">{product.Description}</p>
                        <p className="card-text">Price:{product.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <section className="additional-section justify-content-center">
        <div className="row">
          <div className="col-md-6">
            <div
              className="container"
              style={{
                backgroundColor: "#642D1C",
                width: "calc(90% - 5px)",
                height: "100%",
                padding: "20px",
                marginRight: "5px",
              }}
            >
              <div style={{ textAlign: "center", color: "white" }}>
                <h3>BUY IT YOUR WAY</h3>
                <p>
                  A one-stop platform for all your sunglass needs, hassle-free.
                  Buy with a peace of mind.
                </p>
                <a
                  href="/"
                  className="btn btn-primary"
                  style={{ color: "blue", backgroundColor: "white" }}
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="container"
              style={{
                backgroundColor: "#642D1C",
                width: "calc(75% - 5px)",
                height: "100%",
                padding: "20px",
                marginLeft: "5px",
              }}
            >
              <div style={{ textAlign: "center", color: "white" }}>
                <h3>Summer Sale</h3>
                <p></p>
                <p>
                  End of season sale. Buy any 2 items of your choice and get 1
                  free.
                </p>
                <a
                  href="/products"
                  className="btn btn-primary"
                  style={{ color: "blue", backgroundColor: "white" }}
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="Top-Sellers">
        <div className="container">
          <h2 className="text-center">Top Sellers</h2>
          <h5 className="text-center">Browse our top-selling products</h5>
          <div className="row" style={{ padding: "20px" }}>
            {/* Recently Added Sunglasses */}
           
            {/* Add more product cards here */}
            {products &&
              products.data.map((product) => {
                const productPic = `http://localhost:4000${product.photos[0]}`;

                return (
       
                  <div className="col-md-4 ">
                    <div className="card">
                      <img
                        src={productPic}
                        className="card-img-top product-image"
                        style={{
                          width: "250px",
                          backgroundColor: "black",
                          color: "white",
                        }}
                        alt="Sunglasses"
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link className="nav-link" to="/products">{product.name}</Link>
                        </h5>
                        <p className="card-text">{product.Description}</p>
                        <p className="card-text">Price:{product.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

            
              

            <div className="col-md-12 text-center" style={{ padding: "20px" }}>
              <a
                href="/products"
                className="btn btn-primary"
                style={{
                  color: "white",
                  backgroundColor: "#024E82",
                  height: "40px",
                  width: "100px",
                }}
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
