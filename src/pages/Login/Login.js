//import react from 'react'
// import './Login.css';
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

import axios from 'axios';
export default function Login() {

    const initialStateErrors = {
        userName: { required: false },
        password: { required: false },
        customerror: null
    };

    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        userName: "",
        password: "",
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = { ...initialStateErrors };
        let hasError = false;

        if (inputs.userName === "") {
            newErrors.userName.required = true;
            hasError = true;
        }

        if (inputs.password === "") {
            newErrors.password.required = true;
            hasError = true;
        }


        if (!hasError) {
            setLoading(true);
            try {
                const response = await axios.post('https://localhost:44372/Login/Login', {
                    UserName: inputs.userName,
                    Password: inputs.password
                });

                if (response.data.success) {
                    alert('Login successful!');
                    // navigate('/service');
                    const loginid = response.data.loginList[0].loginid; // Assuming loginid is in the first item of loginList array
                    navigate(`/service/${loginid}`);
                } else {
                    setErrors({ ...newErrors, customerror: response.data.message });
                }
            } catch (error) {
                setErrors({ ...newErrors, customerror: 'An error occurred. Please try again later.' });
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(newErrors);
        }
    };
    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };
    return (
        <section className="loginPage">
            <div className="container">
                <div className="login">
                    <div className="container-hed">
                        <h1 className="fw-bolder text-uppercase text-primary text-center p-4">Login Here</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="register-form" action="">
                        <div className="row form-group"></div>
                        <label htmlFor="userName" className="text-uppercase text-center px-5">UserName</label>
                        <div className="col-md-12 px-5">
                            <div className='input-container'>
                                <i className="fa fa-user icon"></i>
                                <input type="text" className="form-control" onChange={handleInput} name="userName" id="userName" />
                            </div>
                        </div>
                        {errors.userName.required && <span className="text-danger px-5">Name is required.</span>}


                        <div className="row form-group"></div>
                        <label htmlFor="password" className="text-uppercase text-center px-5">Password</label>
                        <div className="col-md-12 px-5">
                            <div className='input-container'>
                                <i className="fa fa-key icon"></i>
                                <input type="password" className="form-control" onChange={handleInput} name="password" id="password" />
                            </div>
                        </div>
                        {errors.password.required && <span className="text-danger pt-0 px-5">Password is required.</span>}


                        <div className="form-group px-5">
                            <span className="text-danger">
                                {errors.customerror && <p>{errors.customerror}</p>}
                            </span>
                            {loading ? (
                                <div className='text-center'>
                                    <div className="spinner-border text-primary" role="status"></div>
                                </div>) : null
                            }
                            <input type="submit" className="btn btn-dark float-right m-5" value="Login" />
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group px-5">
                            Already have an account? Please 
                            <Link to={`/register`} className="link-margin">Signup</Link>
                            <Link to={`/ServiceCollection`} className="link-margin">ServiceList</Link>
                        </div>
                        
        
    
                    </form>
                </div>
            </div>
        </section>
    );
}