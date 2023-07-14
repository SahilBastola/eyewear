import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/loginService';
import '../../style/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    userService
      .login({ username, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userid', res.data.userId);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('admin', res.data.isAdmin);

        if (res.data.isAdmin === 'true' && res.data.token !== null) {
          navigate('/AdminproductPage');
        } else {
          navigate('/products');
        }
      })
      .catch(() => {
        setErrorMessage('Incorrect username or password');
      });
  };

  return (
    <section id="login-form">
      <div className="container rounded text-center">
        <div className="row">
        <div className="col-md-6 mt-3">
  <img
    src="https://th.bing.com/th/id/OIP.Xy2IDNZDWVhzD8zGiXkcEgHaEK?pid=ImgDet&rs=1"
    alt=""
    className="mt-5 img-fluid full-height"

    style={{ height: "400px"}}
  />
</div>


          <div className="col-md-6 mt-5">
            <h1 className="text-right">EYE WEAR</h1>
            <p>Welcome back! Please enter your details</p>
            <div className="card mt-3">
              <div className="card-body homeit">
                <form onSubmit={handleLogin} autoComplete="off">
                  <div className="form-floating mt-3">
                    <input
                      className="form-control"
                      name="username"
                      placeholder="Username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInputGroup1">Username</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInputGroup1">Password</label>
                  </div>
                  <div className='col'>
 
  <button
    className="btn btn-warning text-center mt-4 fw-bold fs-5"
    type="submit"
    style={{
      width: "100px",
      backgroundColor: "black",
      color: "white"
    }}
  >
    Login
  </button>
  <a href="/register" className="text-button ms-4 mt-4">
    Don't have an account? Sign up for free
  </a>
</div>

                  
                </form>
              </div>
            </div>
            <div id="login-message" className={`message ${errorMessage ? 'failure' : ''}`}>
              {errorMessage}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
