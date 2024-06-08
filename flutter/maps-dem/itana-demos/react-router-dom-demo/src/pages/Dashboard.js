import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Orders from './components/Orders';
import Users from './components/Users';

const Dashboard = () => {
    return (
        <div >
            <h1>Bienvenido al dashboard</h1>
            <p>React router dom</p>
            <hr />
            <Outlet />
        </div>
    )
}

export default Dashboard;
