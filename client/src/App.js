import React from "react";
import Signup from "./pages/Signup";
// import Login from "./pages/Signin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./dashboard/Userscontainer";
import Editusers from "./dashboard/Editusercontainer";
import Createuser from "./dashboard/Createusercontainer";
import Adminlayout from "./layouts/Adminlayout";
import Userlayout from "./layouts/Userlayout";
import Memberships from "./pages/Productlistcontainer";
import Guestlayout from "./layouts/Guestlayout";
import Plans from "./plans/plancontainer"
import Createplan from "./plans/Createplancontainer"
import Editplan from "./plans/Editplancontainer"
import Frontendplans from './frontend/plans'
import Product from './frontend/ExploreCourseContainer'
import Pricing from './frontend/MyCoursesContainer';
import Blog from './frontend/Blog'
import {loadStripe} from '@stripe/stripe-js';
import {CustomCheckoutProvider} from '@stripe/react-stripe-js';
import Subscription from "./subscription/Subscriptioncontainer";
import Alluser from './components/Alluser'
import Allsubscriber from './components/Allsubscriber'
import Transactions from "./transaction/Transactioncontainer";
import Content from './contents/Contentcontainer'
import Createcontent from './contents/CreaateContentContainer';
import Editcontent from './contents/EditcontentContainer'
import Contentofplan from './frontend/Contentofplancontainer'
import Login from './pages/login'
import Register from './pages/Register'
import Homemn from './frontend/Homecontainer'
import Profile from './frontend/Userprofilecontainer'
import Accordian from './frontend/AccordianContentcontainer'
import Quizzes from './dashboard/Createquizzes'
function App() {
  const stripe = loadStripe("your stripe public key", {
    betas: ['custom_checkout_beta_3'],
  });


  return (
    <Router>
      <Routes>

        <Route path="/gettingalluser" element={<Alluser/>}/>
        <Route path="/allsubscriber" element={<Allsubscriber/>}/>
     
        <Route element={<Adminlayout />}>
          <Route path="/" element={<Users />} />
          <Route path="/edit/:id" element={<Editusers />} />
          <Route path="/createusers" element={<Createuser />} />
          <Route path="/memberships" element={<Plans />} />
          <Route path="/createplans" element={<Createplan />} />
          <Route path="/editproducts/:id" element={<Editplan />} />
          <Route path="/subscriptions" element={<Subscription />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/createcontent" element={<Createcontent/>} />
          <Route path="/content" element={<Content/>} />
          <Route path="/editcontent/:id" element={<Editcontent/>} />
        </Route>

        <Route element={<Userlayout />}>
        
        
        <Route path="/users" element={ <Homemn/>  } />    
        <Route path="/product" element={ <Product/>  } />
        <Route path="/pricing" element={ <Pricing/>  } />
        <Route path="/visit/:id" element={ <Accordian/>  } />
        <Route path="/blog/success" element={ <Blog/>  } />
        <Route path="/profile" element={ <Profile/>  } />
        <Route path="/quizzes" element={ <Quizzes/>  } />

       
        
        </Route>
        <Route element={<Guestlayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
