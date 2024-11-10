import Login from "./components/Login"
import Register from "./components/Register"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Form from "./components/Form";
import Logout from "./components/Logout";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout/>,
      children:[
        {
          path:'/',
          element:<Form/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/logout',
          element:<Logout/>
        }
      ]
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
