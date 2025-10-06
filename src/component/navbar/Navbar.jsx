import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {

  const {user , logOutUser} = useContext(AuthContext)
  console.log(user?.email)
  console.log(user?.role)

  const LogOut = async() =>{
logOutUser()
  }
    return (
     <div className="navbar bg-[#A7003C] shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a  href='/'><img className='w-18 h-18' src="https://i.ibb.co.com/0yyB7f1x/photo-2025-10-06-22-39-14.jpg" alt="" /></a>
  </div>

  <div className="navbar-end">
    {user ? <a className="btn bg-yellow-300 rounded-4xl" onClick={()=>{LogOut()}}>Log Out</a> : <a className="btn bg-yellow-300 rounded-4xl" href='/login'>Log in</a>}
  </div>
</div>
    );
};

export default Navbar;