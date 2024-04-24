import React, { useState } from 'react';
import { FaAmazon, FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import '../Login/Login.scss';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  const handleSignUpClick = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <motion.div
      initial={{ scale: 0.8}}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.9 }}
      className="main">
      <div className="container">
        <FaAmazon size={'40px'} />
        <section className="wrapper">
          <div className="heading">
            <h1 className="text text-large">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
            <p className="text text-normal">
              {isSignUp ? 'Already have an account? ' : 'New user? '}
              <span>
                <a  className="text text-links" onClick={handleSignUpClick}>
                  {isSignUp ? 'Sign In' : 'Create an account'}
                </a>
              </span>
            </p>
          </div>
          <form onSubmit={handleOnSubmit} name={isSignUp ? 'signup' : 'signin'} className="form">
            {isSignUp && (
              <div className="input-control">
                <label htmlFor="name" className="input-label" hidden>Name</label>
                <input type="text" name="name" id="name" className="input-field" placeholder="Name" />
              </div>
            )}
            <div className="input-control">
              <label htmlFor="email" className="input-label" hidden>Email Address</label>
              <input type="email" name="email" id="email" className="input-field" placeholder="Email Address" />
            </div>
            <div className="input-control">
              <label htmlFor="password" className="input-label" hidden>Password</label>
              <input type="password" name="password" id="password" className="input-field" placeholder="Password" />
            </div>
            <div className="input-control">
              <a  className="text text-links">Forgot Password</a>
              <input type="submit" name="submit" className="input-submit" value={isSignUp ? 'Sign Up' : 'Sign In'} />
            </div>
          </form>
          {!isSignUp && (
            <div className="striped">
              <span className="striped-line"></span>
              <span className="striped-text">Or</span>
              <span className="striped-line"></span>
            </div>
          )}
          {!isSignUp && (
            <div className="method">
              <div className="method-control">
                <a  className="method-action">
                  <FaGoogle color='red' className='me-2' size={'24px'} />
                  <span>Sign in with Google</span>
                </a>
              </div>
              <div className="method-control">
                <a  className="method-action">
                  <FaFacebook color='blue' className='me-2' size={'24px'} />
                  <span>Sign in with Facebook</span>
                </a>
              </div>
              <div className="method-control">
                <a  className="method-action">
                  <FaApple color='black' className='me-2' size={'24px'} />
                  <span>Sign in with Apple</span>
                </a>
              </div>
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
};

export default Login;
