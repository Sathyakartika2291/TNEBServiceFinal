import { useState } from 'react';
import './Register.css';
import axios from 'axios';

export default function Register() {
    const initialStateErrors = {
        userName: { required: false },
        phonenumber: { required: false },
        password: { required: false },
        confirm: { required: false },
        customerror: null
    };

    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        userName: "",
        phonenumber: "",
        password: "",
        confirm: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = { ...initialStateErrors };
        let hasError = false;

        if (inputs.userName === "") {
            newErrors.userName.required = true;
            hasError = true;
        }

        if (inputs.phonenumber === "") {
            newErrors.phonenumber.required = true;
            hasError = true;
        }
        if (inputs.password === "") {
            newErrors.password.required = true;
            hasError = true;
        }
        if (inputs.confirm !== inputs.password) {
            newErrors.confirm.required = true;
            hasError = true;
        }

        if (!hasError) {
            setLoading(true);
            try {
                const response = await axios.post('https://localhost:44372/Signup/Signup', {
                    UserName: inputs.userName,
                    PhoneNumber: inputs.phonenumber,
                    Password: inputs.password,
                    ConfirmPassword: inputs.confirm
                });

                if (response.data.success) {
                    alert('Registration successful!');
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
        <section className="registerPage">
            <div className="wrapper">
                <div className="container-register">

                    <h1 className="fw-bolder text-center text-white p-4">Register Here</h1>
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
                    <label htmlFor="phonenumber" className="text-uppercase text-center px-5">PhoneNumber</label>
                    <div className="col-md-12 px-5">
                        <div className='input-container'>
                            <i className="fa fa-phone icon"></i>
                            <input type="text" className="form-control" onChange={handleInput} name="phonenumber" id="phonenumber" />
                        </div>
                    </div>
                    {errors.phonenumber.required && <span className="text-danger pt-0 px-5">Phonenumber is required.</span>}

                    <div className="row form-group"></div>
                    <label htmlFor="password" className="text-uppercase text-center px-5">Password</label>
                    <div className="col-md-12 px-5">
                        <div className='input-container'>
                            <i className="fa fa-key icon"></i>
                            <input type="password" className="form-control" onChange={handleInput} name="password" id="password" />
                        </div>
                    </div>
                    {errors.password.required && <span className="text-danger pt-0 px-5">Password is required.</span>}

                    <div className="row form-group"></div>
                    <label htmlFor="confirm" className="text-uppercase text-center px-5">Confirm Password</label>
                    <div className="col-md-12 px-5">
                        <div className='input-container'>
                            <i className="fa fa-key icon"></i>
                            <input type="password" className="form-control" onChange={handleInput} name="confirm" id="confirm" />
                        </div>
                    </div>
                    {errors.confirm.required && <span className="text-danger pt-0 px-5">Passwords do not match.</span>}

                    <div className="form-group px-5">
                        <span className="text-danger">
                            {errors.customerror && <p>{errors.customerror}</p>}
                        </span>
                        {loading && (
                            <div className='text-center'>
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        )}
                        <input type="submit" className="btn btn-dark float-right m-5" value="Register" />
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group px-5">
                        Already have an account? Please <a href="./login">Login</a>
                    </div>
                </form>
            </div>
        </section >
    );
}
