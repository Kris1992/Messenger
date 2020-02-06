import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Redirect
} from 'react-router-dom';

import Chats from './Chats';
import About from './About';

class Chatbox extends Component {
  render() {
    return (
      <Router>
            <nav id="sidebar">
                <div className="sidebar-header text-uppercase">
                    <h4><i className="fas fa-comments"></i>Messenger</h4>
                    <strong><i className="fas fa-comments"></i></strong>
                </div>
                <ul className="list-unstyled menu-wrapper text-uppercase">
                    <li>
                        <NavLink to="/chatbox/chats" className="menu-item" activeClassName="active">
                            <i className="fas fa-home"></i>
                            Rooms
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/chatbox/user_profile" className="menu-item" activeClassName="active">
                            <i className="fas fa-briefcase"></i>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <a href="" className="menu-item">
                            <i className="fas fa-user-friends"></i>
                            Friends
                        </a>
                    </li>
                    <li>
                        <a href="" className="menu-item">
                            <i className="fas fa-tools"></i>
                            Dashboard
                        </a>
                    </li>

                </ul>
                <ul className="list-unstyled sidebar-footer">
                    <li>
                        <Link to="/logout" className="btn btn-white">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </Link>

                        

                    </li>
                </ul>        
            </nav>

            <div className="container-fluid">
                <nav className="navbar navbar-dark bg-primary navbar-expand-sm">
                    <button type="button" id="sidebarCollapse" className="btn btn-white">
                        <i className="fas fa-align-left"></i>
                        <span>Toggle Menu</span>
                    </button>
                    <ul className="navbar-nav m-auto text-uppercase">
                        <li className="nav-item">
                            <span>
                                <a className="nav-link" href="">Welcome, kris</a>
                            </span>
                        </li>
                    </ul>
                </nav>

                <main>
                    <div id="react-content">
                        <Route exact path="/chatbox/chats" component={Chats} />
                    </div>
                </main>
            </div>
      </Router>
    );
  }
}


export default Chatbox;
/*
                         <a href="" className="menu-item active">
                            <i className="fas fa-home"></i>
                            Rooms
                        </a>
 <div className="container">
            <ul>
                <li>
                    <Link to="/chatbox">Home</Link>
                </li>
                <li>
                    <Link to="/chatbox/about">About</Link>
                </li>
            </ul>
            
            <Route exact path="/chatbox" component={Chats} />
            <Route path="/chatbox/about" component={About} />
        </div>*/