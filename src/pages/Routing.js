import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
import Home from './Home/Home';
import ServiceList from './ServiceList/ServiceList';
import Service from './Service/Service';
import ServiceDetail from './ServiceList/ServiceDetails';
const Routing = () => {
    return (
        <div className="container">
            <BrowserRouter>
            {/* {/ {<Home/>}//header     /} */}
        
                <Routes>
                <Route path="/" element={<Home />} />
                    <Route path="/login"  element={<Login />} />
                    {/* <Route path="/header"  element={<header />} /> */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/service/:loginid" element={<Service />} />
                    <Route path="/servicelist" element={<ServiceList/>} />
                    <Route path="/servicelist/:servicenumber" element={<ServiceDetail/>} />
                </Routes>
               
                {/* { footer } */}
            </BrowserRouter>
        </div>
    );
}



export default Routing;