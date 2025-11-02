
import image from '../images/img-1.jpg'
import google from '../images/google.png'
import logo from '../images/git.png'
import check from '../images/check.png'
import { useEffect, useState } from 'react'
import Keyframes from './Keyframes.jsx'
import { div } from 'motion/react-client'



const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userNameError, setUsernameError] = useState("Username")
    const [passwordError, setPasswordError] = useState("Password")
    const [fetching, setFetching] = useState(false)
    const [status, setStatus] = useState(false)
    const [show, setShow] = useState(false)
        
    useEffect(() => {
        status ? setShow(true) : setShow(false)
    },[status])

    const handleSubmit = async (e) => {

        setFetching(true)
        setTimeout(async () => {
            e.preventDefault()
            await fetch("http://localhost:5006/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then((data) => {
                setFetching(false)
                return data.json()
            }).then((data) => {
                if (data.status === "Error") {
                    setStatus(false)
                    console.log(data)
                    if (data.message === "User doesn't exist") {
                        setUsernameError(data.message, "Please try again")
                    } else {
                        setUsernameError("Username")
                    }
                    if (data.message === "Invalid password") {
                        setPasswordError(data.message, "Please try again")
                    } else {
                        setPasswordError("Password")
                    }
                    setFetching(false)
                } else {
                    setStatus(true)
                    setFetching(false)
                    console.log(data)
                }
            })

        }, 1500)
    }
  return (
      <section className="">
          {status ?
              <div className={`max-w-[1440px] h-[1000px] mx-auto flex items-center p-5`}>
                  <div className="w-280 h-150 mx-auto shadow-[0px_0px_20px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden flex flex-col justify-center gap-5 items-center">
                      <img className={`w-20 transition-opacity duration-[3s] ${show ? "opacity-100" : "opacity-0"}`} src={check} alt="" />
                      <h1 className={`font-bold transition-opacity duration-[3s] ${show ? "opacity-100" : "opacity-0"}`}>Logged in Successfully.</h1>
                </div>
              </div>
              :
              <div className=" max-w-[1440px] h-[1000px] mx-auto flex justify-center items-center p-5 relative">
                  {fetching ? <Keyframes></Keyframes> : ""}

                <div className="parent w-280 h-150 mx-auto shadow-[0px_0px_20px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden flex">
                  <img src={image} alt="" className={`h-full -ml-100 hidden sm:block ${fetching ? "child blur-md" : ""}`} />
                  <form action="" onSubmit={handleSubmit} className={`flex flex-col px-10 justify-center w-full ${fetching ? "child blur-md" : ""}`}>
                        <div className='flex items-center gap-2'>
                            <img className='h-10' src={logo} alt="" />
                            <p className='font-semibold'>KENNY'S</p >
                        </div>
                        <h1 className='font-semibold mt-5'>Nice to see you again!</h1>
                        <div>
                              <p className={`ml-5 mb-2 mt-5 text-[13px] ${userNameError === "User doesn't exist" ? "text-red-600" : ""}`}>{ userNameError}</p>
                            <input className={`bg-gray-200 rounded w-full pl-5 h-10 ${userNameError === "User doesn't exist" ? "focus:outline-red-300 ring-2 ring-red-600" : ""}`}
                              type="text"
                              onChange={(e) => setUsername(e.target.value)}
                                placeholder='Enter Your Username' required />
                            </div>
                        <div>
                              <p className={`ml-5 mt-5 mb-2 text-[13px] ${passwordError === "Invalid password" ? "text-red-600": ""}`}>{ passwordError }</p>
                            <input className={`bg-gray-200 rounded w-full pl-5 h-10 ${passwordError === "Invalid password" ? "focus:outline-red-300 ring-2 ring-red-600 " : ""}`}
                              type="text"
                              onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter Your Password' required/>
                        </div>
                        <div className='flex items-center justify-between mt-5'>
                            <label className='flex items-center gap-2 text-[13px]' htmlFor="">
                                <input className='form-checkbox accent-blue-500' type="checkbox" /> 
                                Remember me?
                            </label>
                            <a href="#" className='text-blue-500 hover:underline text-[13px]'>forgot password?</a>
                        </div>
                        <button type='submit' className='bg-blue-500 text-white py-2 rounded-lg mt-5'>Sign in</button>
                        <button className='bg-gray-800 py-2 flex justify-center items-center 
                        rounded-lg gap-3 mt-10'>
                            <span><img className='h-5' src={google} alt="" /></span>
                            <span className='text-white'>Or Sign in With Google</span>
                        </button>
                        <p className='flex gap-2 text-[13px] mx-auto mt-8'>
                            Don't have an account?
                            <span><a className='text-blue-500 hover:underline' href="#">Sign up now</a></span>
                        </p>
                  </form>
              </div>
          </div>}

    </section>
  )
}

export default Login