import React, { useState, useEffect } from "react";
import FormData from "form-data";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProfilePage = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${window.localStorage.getItem('userid')}`)
      .then((res) => {
        const { Username, email, location, passsword } = res.data;
        setUsername(Username);
        setEmail(email);
        setLocation(location);
        setPassword(password);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:4000/users/${window.localStorage.getItem('userid')}`, {
        username: username,
        email: email,
        location: location,
        passsword: password,
      })
      .then(() => {
        window.localStorage.setItem(`username`, username)
       
        navigate("/ProfilePage");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <h2>Edit Profile</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}>
            <div className="mb-3">
             
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="interests" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="interests"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
