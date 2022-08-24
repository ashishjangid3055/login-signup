import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';



function Login() {
    const initialValues = { email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loginMsg, setLoginMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // console.log(formValues);
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } 
        // else if (values.password.length < 4) {
        //     errors.password = "Password must be more than 4 characters";
        // } else if (values.password.length > 10) {
        //     errors.password = "Password cannot exceed more than 10 characters";
        // }

        let error_msg = '';
        var data = qs.stringify({
            'email': formValues.email,
            'password': formValues.password 
          });
          var config = {
            method: 'post',
            url: 'http://localhost:8080/login',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            // console.log("msg",response.data)
            if(response.data.success){
                setLoginMsg("LoggedIn successfully")
            }else{
                setLoginMsg(response.data.msg)
            }
            
            
          })
          .catch(function (error) {
            console.log(error);
          });


        return errors;
    };

    return (
        <div className='container'>
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">{loginMsg}</div>
            ) : (
                <pre>All Fields Required.</pre>
            )}
        
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                <div className="field">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.email}</p>

                    <div className='field'>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.password}</p>

                    <button className="fluid ui button blue">Login</button>
                </div>
            </form>
            <div className="create-account-wrap">
                <p>Not a member? <Link to="/">Create Account</Link></p>
            </div>
        </div>
    )
}

export default Login
