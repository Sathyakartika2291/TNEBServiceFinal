import React from 'react';
import './Header.css';
import ai1Logo from '../../pages/Asserts/TNEB.jpeg'; 

export default function Header() {
    return (
<div>
            <div className="container head p-4 bg-gradient">
                <div>
                    <img src={ai1Logo} alt="AI1 logo" width="110" height="110" />
                </div>
                <div>
                    <h3 className="text-uppercase text-center text-primary">
                        Tamilnadu Generation And Distribution Corporation Limited (TANGEDCO)
                    </h3>
                </div>
                
            </div>
   
<nav class="navbar navbar-expand-lg navbar-light bg-primary">
  <a class="navbar-brand" href="/">TNEB</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav">
      <li class="nav-item active">
       
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/register">Sign Up</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/ServiceCollection">ServiceList</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/">Signout</a>
      </li>
</ul>
    
  </div>
</nav>
</div>
    );
}
