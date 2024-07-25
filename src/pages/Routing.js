import React from 'react';
import { BrowserRouter, Route, Routes,Navigate  } from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
// import Home from './Home/Home';
import ServiceList from './ServiceList/ServiceList';
import Service from './Service/Service';
import ServiceDetail from './ServiceList/ServiceDetails';
import ServiceCollection from './ServiceList/ServiceCollection';
// import Header from './Header/Header';
const Routing = () => {
    return (
        <div className="container">
             <h1 className='text-primary fw-bolder text-uppercase text-center'>EB SERVICE</h1>
            <BrowserRouter>
            {/* {/ {<Home/>}//header     /} */}
            {/* <Header /> */}
                <Routes>
               
                {/* <Route path="/" element={<Home />} /> */}
                {/* <Route path="/"  element={<Header />} /> */}
                    <Route path="/login"  element={<Login />} />
                    {/* <Route path="/header"  element={<header />} /> */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/service/:loginid" element={<Service />} />
                    <Route path="/servicelist/:loginid" element={<ServiceList/>} />
                    <Route path="/servicelistbyId/:servicenumber" element={<ServiceDetail/>} />
                    <Route path="/servicecollection" element={<ServiceCollection />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
               
                {/* { footer } */}
            </BrowserRouter>
        </div>
    );
}



export default Routing;