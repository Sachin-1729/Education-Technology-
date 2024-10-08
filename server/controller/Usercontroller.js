const User = require('../model/Usermodel'); // Ensure the path to your User model is correct
const Role = require('../model/Rolemodel');
const Subscription = require('../model/Subscriptionmodel');

// Define the signup function
async function signup(req, res) {
  
try {
  const email = req.body.Email.toLowerCase();
  if(await User.findOne({email: email}))
  {
    return res.status(409).json({ message: 'User already exists' });
  }
 
 

   const user = req.body;
   const Name = user.Name;
   const Email = user.Email.toLowerCase();
   const Password = user.Password;
   const Role = user.Role;
   
  
   const newUser = new User({
    name: Name,
    email: Email,
    password: Password,
    Role: Role
   });
  
   try{
       console.log("User ko save kr rha")
       const saveduser = await newUser.save();
       console.log('User saved successfully:', saveduser);
   }
   catch(error)
   { 
    console.error('Error saving user:', error);
      // Check if the error is a validation error (e.g., from Mongoose validators)
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);  // Capture individual field errors
        return res.status(400).json({ message: 'Validation failed', errors });
      }

   if (error.code === 11000 && error.keyPattern.email) {
      return res.status(409).json({ message: 'Email already in use' });
   }
   return res.status(500).json({ error: 'Failed to create user' });

   }
  
  
  
  
   
   
  // Send a success response to the client
  return res.status(201).json({ message: 'User created successfully' });
} 
catch (error) {
  if (error.code === 11000 && error.keyPattern.email) {
      return res.status(409).json({ message: 'Email already in use' });
  }
  return res.status(500).json({ error: 'Failed to create user' });
}
  
} 

async function signin(req, res) 
{

  console.log(req.body);
  const password = req.body.Password;
  if(await User.findOne({email: req.body.Email}) )
  {
     const data = await  User.findOne({email: req.body.Email});
     const detail = data
     console.log(detail);
     const role = await Role.findById(data.Role);
     
   
     if(data.password === password)
     {
      const token = Math.floor(100000 + Math.random() * 900000);
      const result = await User.findByIdAndUpdate(data._id, {token: token});
      
    
      return res.status(200).json({ Role: role.role ,token: token  , message: 'User logged in successfully' });
     }
     else{
      return res.status(401).json({ message: 'Invalid credentials' });
     }
  }
  else{

    return res.status(401).json({ message: 'Email does not exist' });
  }

}




async function getalluser(req , res)
{ 
 const user = await User.find().populate('Role');
 return res.status(200).json(user);


} 

async function getuserexceptloginadmin(req , res)
{
  const id = req.body.token;
  console.log(id)
  
  const user_login = await User.findOne({token: id});
  console.log(user_login)
 
  const id_login = user_login._id;
  
  const user = await User.find({_id: {$ne: id_login}}).populate('Role');
  return res.status(200).json(user);
}

async function getsingleuser(req , res)
{
    console.log(req.body.id)
    const id = req.body.id;
    const user = await User.findById(id);
    return res.status(200).json(user);
}

async function updateuser(req , res)
{
  
  // res.send(req.body);
  const user_id = req.body.id;
  const user = await User.findById(user_id);
  console.log(user)
  user.name = req.body.Name;
  user.email = req.body.Email;
  user.password = req.body.Password;
  await user.save();
  return res.status(200).json({ message: 'User updated successfully' });

}

async function deleteuser(req , res)
{
      console.log(req.body)
      const userid = req.body.iid;
     const subscription = await Subscription.find({userId: userid});
     if(subscription)
     {
      subscription.forEach(async (element) => {
        element.status = 'Inactive';
        await element.save();
      })
    
     }
      const result = await User.findByIdAndDelete(userid);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted successfully' });
}

async function myprofile(req , res)
{
const token = req.body.token;
const user = await User.findOne({token: token});
return res.status(200).json(user);
}

// Export the function
module.exports = { signup , signin  , getalluser , getsingleuser , updateuser , deleteuser , getuserexceptloginadmin ,myprofile };
