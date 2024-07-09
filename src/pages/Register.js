import { useState } from 'react'
import './Register.css'
export default function Register(){

   const initialStateErrors={
    userName:{required:false},
    email:{required:false},
    phonenumber:{required:false},
    password:{required:false},
    confirm:{required:false},
    customerror:null
   };   

const [errors,setErrors]=useState(initialStateErrors);
 const [loading,setLoading]=useState(false);

const handleSubmit=(event)=>{
    event.preventDefault();
        let errors =initialStateErrors; 
        let hasError = false; 
        if (inputs.userName === "") {
            errors.userName.required=true;
            hasError=true;
        }
      if (inputs.email === "") {
            errors.email.required =true;
            hasError=true;
        }
        if (inputs.phonenumber=== "") {
            errors.phonenumber.required =true;
            hasError=true;
        }
        if (inputs.password === "") {
            errors.password.required =true;
            hasError=true;
        }
        if (inputs.confirm === "password") {
            errors.confirm.required =true;
            hasError=true;
        }
    if (!hasError)
    {

    }
   setErrors(errors);
    }     


const [inputs,setInputs] = useState({
    userName:"",
    email:"",
    phonenumber:"",
    password:"",
    confirm:""
})

const handleInput=(event)=>{
    setInputs({...inputs,[event.target.name]:event.target.value})
}
    return(
        <section className="registerPage">
            <div className="container-fluid">
                   <div className=" register-hed">
                    <div className="container">
                    <h1 className="fw-bolder text-center text-white p-4">Register Here</h1>
                     </div>
                    <form onSubmit={handleSubmit} className="register-form" action="">
                    <div className="row form-group"></div>
                        <label for="exampleInputEmail1" className="text-uppercase text-center px-5" aria-placeholder='Enter your name'>userName</label>
                                              <div className="col-md-12 px-5" >
                            <div className='input-container'>
                            <i className="fa fa-user icon"></i>
                                <input type="text" className="form-control" onChange={handleInput} name="userName" id=""/>
                               
                               </div>
                               </div>
                      { errors.userName.required?
                       ( <span className="text-danger px-5" >
                            Name is required.
                        </span>):null
}
                        <div className=" row form-group"></div>
                        <label for="exampleInputEmail1" className="text-uppercase text-center px-5">email id </label>
                        <div className="col-md-12 px-5" >
                            <div className='input-container'>
                            <i className="fa fa-envelope icon"></i>
                                <input type="email" className="form-control" aria-placeholder="Please enter your mail id"  onChange={handleInput} name="email" id=""/>
                               </div>
                               </div>
                        { errors.email.required?   
                        (<span className="text-danger pt-0 px-5" >
                            Email is required.
                        </span>):null
}
                
                <div className=" row form-group"></div>
                        <label for="exampleInputEmail1" className="text-uppercase text-center px-5">phonenumber</label>
                        <div className="col-md-12 px-5" >
                            <div className='input-container'>
                            <i className="fa fa-phone icon"></i>
                                <input type="text" className="form-control" onChange={handleInput}  name="phonenumber" id=""/>
                               </div>
                               </div>
                         {     errors.phonenumber.required? 
                       (<span className="text-danger pt-0 px-5" >
                            Phonenumber is required.
                        </span>):null
}
                        <div className=" row form-group"></div>
                        <label for="exampleInputEmail1" className="text-uppercase text-center px-5">password</label>
                        <div className="col-md-12 px-5" >
                            <div className='input-container'>
                            <i className="fa fa-key icon"></i>
                                <input type="password" className="form-control"  onChange={handleInput} name="password" id=""/>
                               </div>
                               </div>
                          {errors.password.required?     
                        (<span className="text-danger pt-0 px-5" >
                            Password is required.
                        </span>):null
}
<div className=" row form-group"></div>
                        <label for="exampleInputEmail1" className="text-uppercase text-center px-5">confirm password</label>
                        <div className="col-md-12 px-5" >
                            <div className='input-container'>
                            <i className="fa fa-key icon"></i>
                                <input type="password" className="form-control"  onChange={handleInput} name="confirm" id=""/>
                               </div>
                               </div>
                          {errors.confirm.required?     
                        (<span className="text-danger pt-0 px-5" >
                            Password is required.
                        </span>):null
}

                        <div className="form-group px-5">
                            
                      <span className="text-danger">
                        {errors.customerror?
                        <p >{errors.customerror}</p>
                         :null
                       }
                     </span>
                        {loading?
                       (<div className='text-center'>
                <div className="spinner-border text-primary" role="status">
                     </div>
                     </div>):null}

                     <input type="submit" class="btn btn-dark float-right m-5"  value="Register"/>
                </div>
                     <div className="clearfix"></div>
                     <div className="form-group px-5">
                       Already have account ? Please <a href="#">Login</a>
                     </div>
    </form>
        </div>
          </div>
</section>
)
}