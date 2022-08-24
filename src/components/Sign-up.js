import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../App.css";
import Login from "./Login";
import axios from "axios";
import qs from 'qs';


function SignUp() {
    const initialValues = { username: "", email: "", password: "", cpassword: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [signupMsg, setSignupMsg] = useState('');



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };


    const validate = (values) => {

        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const usernameFormat = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
        const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

        if (!values.username) {
            errors.username = "Username is required!";
        } else if (!usernameFormat.test(values.username)) {
            errors.username = "This is not a valid usename. please enter Alphanumeric username!";
        }

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (!passwordFormat.test(values.password)) {
            errors.password = "Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
        }
        
        if (!values.cpassword) {
            errors.cpassword = "Confirm Password is required";
        } else if (values.password !== values.cpassword) {
            errors.cpassword = "Password cannot matched.";
        }


        var data = qs.stringify({
            'email': formValues.email,
            'username': formValues.username,
            'password': formValues.password,
            're_password': formValues.cpassword
        });
        var config = {
            method: 'post',
            url: 'http://localhost:8080/sign-up',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.success) {
                    setSignupMsg("User Created successfully")
                    console.log(signupMsg)
                } else {
                    setSignupMsg(response.data.msg)
                    console.log(signupMsg)
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });

        return errors;

    };


    return (
        <div className="container">
            {
                Object.keys(formErrors).length === 0 && isSubmit ? (
                <>
                    <div className="ui message success">{signupMsg}</div>
                    {/* {signupMsg === 'User Created successfully' && <Navigate replace to="/login" />} */}
                </>
                    ) : (
                        <pre>All Fields Required.</pre>
                    )
            }

            <form onSubmit={handleSubmit}>
                <h1>Signup Form</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                    <div className="field">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.username}</p>
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
                    <div className="field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.password}</p>
                    <div className="field">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="cpassword"
                            placeholder="Confirm Password"
                            value={formValues.cpassword}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.cpassword}</p>
                    <button className="fluid ui button blue">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp
