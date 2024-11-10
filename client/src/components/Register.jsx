import { NavLink, useNavigate } from "react-router-dom"
import Background from "./ui/Background"
import { useState } from "react"
import { useAuth } from "../store/auth"

const defaultFormData = {
  username:"",
  email:"",
  password:""
}

const Register = () => {
  const navigate = useNavigate()
  const [formData,setFormData] = useState(defaultFormData)
  const {API,storeTokenInLS} = useAuth()

  const handleInput = (e)=>{
    let name = e.target.name
    let value = e.target.value
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const response = await fetch(`${API}/auth/register`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })

    if(response.ok){
      const res_Data = await response.json()
      storeTokenInLS(res_Data.token)
      setFormData(defaultFormData)
      navigate('/')
    }
  }

  return (
    <div>
      <Background/>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign up with new account
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <div>
              <label className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={formData.username}
                  onChange={handleInput}
                  autoComplete="off"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInput}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInput}
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-white">
            Already a member?
            <NavLink
              to='/login'
              className="font-semibold leading-6 text-indigo-300 hover:text-indigo-200"
            >
             Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
