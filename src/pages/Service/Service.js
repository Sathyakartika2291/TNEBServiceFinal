import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Service.css';
import { useParams } from 'react-router-dom';
export default function Service() {
    const { loginid } = useParams();
    const initialStateErrors = {
        CRUDType: 1,
        ServiceName: { required: false },
        ServiceNumber: { required: false },
        Remarks: { required: false },
        SignupId: { required: false },
        customerror: null
    };

    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        ServiceName: "",
        ServiceNumber: "",
        Remarks: "",
        SignupId: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = { ...initialStateErrors };
        let hasError = false;

        if (inputs.ServiceName === "") {
            newErrors.ServiceName.required = true;
            hasError = true;
        }

        if (inputs.ServiceNumber === "") {
            newErrors.ServiceNumber.required = true;
            hasError = true;
        }
        if (inputs.Remarks === "") {
            newErrors.Remarks.required = true;
            hasError = true;
        }

        if (!hasError) {
            setLoading(true);
            try {
                const response = await axios.post('https://localhost:44372/Service/Service', {
                    CRUDType: 1,
                    ServiceName: inputs.ServiceName,
                    ServiceNumber: inputs.ServiceNumber,
                    Remarks: inputs.Remarks,
                    SignupId: loginid,
                });

                if (response.data.success) {
                    alert('Service Added successfully!');
                    navigate('/servicelist');  // Navigate to servicelist.js
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
        <section className="servicePage">
            <div className="container-fluid">
                <div className="register-hed">
                    <div className="container">
                        <h1 className="fw-bolder text-center text-white p-4">Service</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="service-form" action="">
                        <div className="row form-group"></div>
                        <label htmlFor="ServiceName" className="text-uppercase text-center px-5">Service Name</label>
                        <div className="col-md-12 px-5">
                            <div className='input-container'>
                                <i className="fa fa-user icon"></i>
                                <input type="text" className="form-control" onChange={handleInput} name="ServiceName" id="ServiceName" value={inputs.ServiceName} />
                            </div>
                        </div>
                        {errors.ServiceName.required && <span className="text-danger px-5">Service Name is required.</span>}

                        <div className="row form-group"></div>
                        <label htmlFor="ServiceNumber" className="text-uppercase text-center px-5">Service Number</label>
                        <div className="col-md-12 px-5">
                            <div className='input-container'>
                                <i className="fa fa-phone icon"></i>
                                <input type="text" className="form-control" onChange={handleInput} name="ServiceNumber" id="ServiceNumber" value={inputs.ServiceNumber} />
                            </div>
                        </div>
                        {errors.ServiceNumber.required && <span className="text-danger pt-0 px-5">Service Number is required.</span>}

                        <div className="row form-group"></div>
                        <label htmlFor="Remarks" className="text-uppercase text-center px-5">Remarks</label>
                        <div className="col-md-12 px-5">
                            <div className='input-container'>
                                <i className="fa fa-key icon"></i>
                                <input type="text" className="form-control" onChange={handleInput} name="Remarks" id="Remarks" value={inputs.Remarks} />
                            </div>
                        </div>
                        {errors.Remarks.required && <span className="text-danger pt-0 px-5">Remarks are required.</span>}

                        <div className="form-group px-5">
                            <span className="text-danger">
                                {errors.customerror && <p>{errors.customerror}</p>}
                            </span>
                            {loading && (
                                <div className='text-center'>
                                    <div className="spinner-border text-primary" role="status"></div>
                                </div>
                            )}
                            <input type="submit" className="btn btn-dark float-right m-5" value="Add Service" />
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group px-5">
                            Already have an account? Please <a href="./login">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
