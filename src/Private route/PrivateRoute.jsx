import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';
const PrivateRoute = ({children}) => {


const {user,loading} = useContext(AuthContext)
const location = useLocation()

if(loading){
        return <div className='h-screen w-full flex items-center justify-center'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

if(!user){
    return <Navigate to="/login"  state={{ pathname: location.pathname }}/>
}











    return children
};

export default PrivateRoute;