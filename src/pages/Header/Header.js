import React from 'react';
import './Header.css';
import ai1Logo from '../../pages/Asserts/AI1.jpg'; 

export default function Header() {
    return (
        <section className="heading">
            <div className="container head">
                <span className="logo">
                    <img src={ai1Logo} alt="AI1 logo" width="30" height="30" />
                </span>
                <h3 className="text-uppercase text-center text-black p-4 mb-4">Government of Tamilnadu Electricity Department</h3>
            </div>
        </section>
    );
}
