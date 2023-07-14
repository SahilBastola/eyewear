import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (password === "" || confirmPassword === "") {
      setMessage("Password is empty");
      setValid("is-invalid");
    } else if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      setValid("is-invalid");
    } else {
      setMessage("Passwords match");
      setValid("is-valid");
    }
  }, [confirmPassword, password]);

  const handleRegister = () => {
    axios
      .post("http://localhost:4000/auth/registeruser", {
        username,
        password,
        email,
      })
      .then((response) => {
        const { _id, username, email, pic } = response.data;
        console.log("Successful:", response.data);
        setMessage("Registration successful");
        setValid("is-valid");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors.join(", ");
          setMessage(`Invalid user data: ${errorMessages}`);
        } else {
          setMessage("Registration failed. Please try again later.");
        }
        setValid("is-invalid");
        console.log("Error:", error);
      });
  };

  return (
    <section id="register-form">
      <div className="container rounded text-center">
        <div className="row">
          <div className="col-md-6 mt-5">
            <img
              src="https://th.bing.com/th/id/OIP.r_Pmi7cg6EaEJkRSgrT1gwHaNK?pid=ImgDet&w=736&h=1308&rs=1"
              style={{ width: "400px", height: "500px" }}
              alt=""
              className="mt-5 img-fluid full-height"
            />
          </div>

          <div className="col-md-6 mt-5">
            <h1 className="text-right">EYE WEAR</h1>
            <p>Create an account</p>
            <div className="card mt-3">
              <div className="card-body homeit">
                <form autoComplete="off">
                  <div className="form-floating mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="UserName"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInputGroup1">Username</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInputGroup1">Email</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingInputGroup1">Password</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      className={`form-control ${valid}`}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label htmlFor="floatingInputGroup1">Confirm Password</label>
                  </div>

                  <div>
                    {message && (
                      <div className={`alert alert-danger mt-3`} role="alert">
                        {message}
                      </div>
                    )}
                  </div>

                  <div className="col">
                    <button
                      className="btn btn-warning text-center mt-4 fw-bold fs-5"
                      onClick={handleRegister}
                      type="button"
                      style={{
                        width: "150px",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Signup
                    </button>
                    <a href="/login" className="text-button ms-4 mt-4">
                      Already have an account? Login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
