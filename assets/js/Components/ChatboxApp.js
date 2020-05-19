import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Redirect
} from 'react-router-dom';

import { getUserBasicData } from '../Api/user_api';


import Chats from './Chats';//change to ChatsApp
import About from './About';
import AdminDashboardApp from './AdminDashboardApp';

export default class ChatboxApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {
                'login': '',
                'roles': '',
            },
            isAdmin: false
        };
        //this.componentDidMount = this.componentDidMount.bind(this);
        //this.updateStateField = this.updateStateField.bind(this);
        //this.handleRowClick = this.handleRowClick.bind(this);
        //this.handleAddRepLog = this.handleAddRepLog.bind(this);
        //this.handleHeartChange = this.handleHeartChange.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
    }

    componentDidMount() {
        getUserBasicData().then((user) => {
                this.updateStateField('userData', 'login', user.login);
                this.updateStateField('userData', 'roles', user.roles);
                this.isAdmin();
        });
        
    }

    updateStateField(parentStateField = null, childStateField, newValue) {
        if( parentStateField !== null) {
            var newParentState = {};
            const stateObj = this.state[`${parentStateField}`];

            Object.entries(stateObj).map(([key, value]) => {
                if(key === childStateField) {
                    stateObj[`${key}`] = newValue;
                }
            });

            newParentState[`${parentStateField}`] = stateObj;

            this.setState(newParentState);

        } else {
            console.log('Only to use for fields with parent');    
        }

    }


    isAdmin() {
        const rolesArray = this.state.userData.roles;
        const isAdmin = rolesArray.includes('ROLE_ADMIN');

        //Change state only if is (initial is false)
        if(isAdmin) {
            this.setState({isAdmin: isAdmin});
        }   
    }




  render() {

    const { userData, isAdmin } = this.state;

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
                        <NavLink to="/chatbox/friends" className="menu-item" activeClassName="active">
                            <i className="fas fa-user-friends"></i>
                            Friends
                        </NavLink>
                    </li>

                    {isAdmin && (
                    <li>
                        <NavLink to="/chatbox/admin" className="menu-item" activeClassName="active">
                            <i className="fas fa-tools"></i>
                            Dashboard
                        </NavLink>
                    </li>
                    )}

                </ul>
                <ul className="list-unstyled sidebar-footer">
                    <li>
                        <a href="/logout" className="btn btn-white">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </a>
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
                                <a className="nav-link" href="">Welcome, <strong>{userData['login']}</strong> </a>
                            </span>
                        </li>
                    </ul>
                </nav>

                <main>
                    <div id="react-content">
                        <Route exact path="/chatbox/chats" component={Chats} />
                        <Route path="/chatbox/admin" component={AdminDashboardApp} />
                    </div>
                </main>
            </div>
      </Router>
    );
  }
}


//export default ChatboxApp;
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