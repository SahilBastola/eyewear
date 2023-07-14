import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './profilepage.css';

const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4000/users/${window.localStorage.getItem('userid')}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteOrder = (orderId) => {
    setUsers(users.filter((user) => user._id !== orderId));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("pic", file);

      try {
        const response = await axios.put(`http://localhost:4000/users/${window.localStorage.getItem('userid')}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Image uploaded successfully");
        // Do something with the response, if needed
      } catch (error) {
        console.log("Image upload failed", error);
        // Handle the error, if needed
      }
    }
  };

  return (
    <div className="bg-light py-5">
      <div className="container">
      {users && users.map((user) => (
        <div className="row">
          <div className="col-md-4">
             
             
                <div className="card-body">
                  <div className="profile-img-container">
                    <img src={user.pic ? `http://localhost:4000/${user.pic.replace('\\', '/')}` : ""} className="card-img-top" alt="Profile" />
                  </div>
                  <input type="file" onChange={handleImageUpload} className="upload-input" />
                  
                  
                </div>
                
            
           
          </div>
          <div className="col-md-7 pt-5">
                <h5 className="card-title mb-0 ">Username : {user.username}</h5>
                <h4 className="card-title mb-1 ">Email: {user.email}</h4>
                <h4 className="card-title mb-1">Location: New York, USA</h4>
                <Link to={`/EditProfilePage`}>
                  <button className="btn btn-primary fw-bold fs-5" type="submit">
                    Edit Details
                  </button>
                </Link>
                </div>
        </div>
          ))}
      </div>
    </div>
  );
};

export default ProfilePage;
