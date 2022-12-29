import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../dist/css/adminlte.min.css";
import { BrowserRouter,MemoryRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import HeaderComponent from './components/header.component';
import SidebarComponent from './components/sidebar.component';
import ExamPage from './Pages/Exam.Page';
import ExamPage2 from './Pages/Exam2.Page';
import ExamEditPage from './Pages/ExamEdit.Page';
import Test from './Pages/Test.Page';

const Admin = ({ match })=> {
    console.log(match);
        return (
            <Router>
                <div className="container">
                <HeaderComponent match={match}/>
                {/* <SidebarComponent match={match}/> */}
                    {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/create'} className="nav-link">Create</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/Exam'} className="nav-link">Exam</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/Exam2'} className="nav-link">Exam</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/index'} className="nav-link">Index</Link>
                                </li>
                            </ul>
                        </div>
                    </nav> <br/>
                    <h2>Create app CRUD with ReactJs, NodeJs, MongoDB</h2> <br/> */}
                    <Switch>
                        <Route exact path={`/Exam2`} component={ ExamPage2 } />
                        <Route  path={`${match.path}/create`} component={ Create } />
                        <Route path={`/edit/:id`} component={ ExamEditPage } />
                        <Route path={`/Exam`} component={ ExamPage } />
                        <Route path={`/Test`} component={ Test } />
                        <Route path={`${match.path}`} component={ ExamPage2 } />
                    </Switch>
                </div>
            </Router>
        );
    }



export default Admin;
