import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const{isLoggedIn} = useAuth()
  return (
    <nav className="flex justify-between items-center px-4 lg:px-16 py-4 bg-sky-900 text-gray-100">
      <div className="logo text-xl lg:text-3xl font-bold tracking-widest">
        <NavLink to='/'>
        <span className="text-orange-700">&lt;</span>
        <span>PassPin</span>
        <span className="text-orange-700">/&gt;</span>
        </NavLink>
        
      </div>
      <ul className="hidden lg:block">
        <li className="flex gap-16 text-lg ">
          {isLoggedIn?<><NavLink to="/logout"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button></NavLink></>:<><NavLink to="/login"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button></NavLink><NavLink to="/register"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</button></NavLink>
            </>}

          
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
