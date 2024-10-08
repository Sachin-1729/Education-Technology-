import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


export default function Login() {

 const [name , setName] = useState('');
 const[email , setEmail] = useState('');
 const[password , setpassword] = useState('');

 const[password1 , setpassword1] = useState('');
 const[password2 , setpassword2] = useState('');
 const[role , setRole] = useState([]);
  


function handlenamechange(event)
{
  setName(event.target.value); 
  console.log(name)

}
function handleEmailChange(event)
{
  setEmail(event.target.value);
  console.log(email);
}
function handlepassword1change(event)
{
  setpassword1(event.target.value);
}

function handlepassword2change(event)
{
  setpassword2(event.target.value)
}

 function confirmpassword() {
  if (password1 !== password2) {
    toast.error('Passwords do not match!');

    return false;
    
  }
  else if(email ==='' || password1=='' || password2 =='' || name=='')
  {
    toast.error('All fields are mandatory');
    return false;
  }
  else {
    setpassword(password1);
    console.log(password ,"password")
    return true;
  }
};

async  function signup()
{
  const Email = email;
  const Name = name;


  try {
    setRole('66e2d38d9c82415c6c96f042');
const response = await fetch('http://localhost:7000/users/signup' , {
   method: 'POST',
   headers:{
    'Content-Type': 'application/json',

   },
   body: JSON.stringify({
    Name: Name,
    Email: Email,
    Password: password1,
    Role: "66e2d38d9c82415c6c96f042",
    
   })
})
if(response.ok)
{
  toast.success("User Created Successfully");
  setName('');
  setEmail('');
  setpassword1('');
  setpassword2('');
  
}
else{
  const data = await response.json();
  console.log(data);
  toast.error(data.message);
}

    
    
  } catch (error) {
   
    toast.error(error);
  }


}

function handleSubmit(event) {
  event.preventDefault();

  if(confirmpassword())
   {
    signup();
   }
   else{
  toast.error("Error in Login")
   }
 
  
 
}
function handleclick(event)
{
  event.preventDefault() 
  console.log("handleclick")
  alert("djkbjkfb")
}

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700 ">
          {/* ToastContainer to display toasts */}
          <ToastContainer />
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are The Lotus Team
                      </h4>
                    </div>

                    <form id="form" onSubmit={handleSubmit}>
                    <label
                        htmlFor="name"
                        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                      >
                        Name
                      </label>
                      <input
                        id="email"
                         type="text"
                        placeholder="Enter your name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ color: "black" }} // Override with inline style
                        value={name}
                        onChange={handlenamechange}
                      />
                       <label
                        htmlFor="Email"
                        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ color: "black" }} // Override with inline style
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <label
                        htmlFor="Password"
                        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ color: "black" }} // Override with inline style
                        value={password1}
                        onChange={handlepassword1change}
                      />

                      <label
                        htmlFor="Password"
                        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                      >
                       Confirm Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ color: "black" }} // Override with inline style
                        value={password2}
                        onChange={handlepassword2change}
                      />
                      <br />
                      <br />
                      

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                        
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Register
                          </button>
                        </TERipple>

                        {/* Forgot password link */}
                        {/* <a href="#!">Forgot password?</a> */}
                      </div>

                      {/* Register button */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Already have an account?</p>
                        <Link to="/login">
                        <TERipple rippleColor="light">
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                                Sign in
                          </button>
                        </TERipple>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Lorem ipsum dolor sit.
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
