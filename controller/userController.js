const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

const dotenv = require('dotenv')
dotenv.config()

const saltNumber = 10
const secretKey = 'random@one'

const registerUser = async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;

    if (users.find((user) => user.email === email)) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const salt = bcrypt.genSaltSync(saltNumber)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const token = jwt.sign({user: email},secretKey,{expiresIn:'3d'})

    const user = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      password: hashedPassword,
      token: token
    };

    users.push(user);
    res.sendStatus(201);
    // res.status(200).cookie("tokenName",token).send(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);
    
    if(user && user.email === email){
      
      const validate = bcrypt.compareSync(password,user.password)
      const token = jwt.sign({user: user.email},secretKey,{expiresIn:'3d'})
      
      if(validate){
        const userInfo = {
          email: user.email,
          password: user.password,
          token: token
        }
        res.status(200).cookie("tokenName",token).send(userInfo)
      } else{
        res.send("Invalid Username or Password")
      }
    } else{
      res.send("User not Found")
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const allUsers = (req,res)=>{
  if(users){
      res.send(users)
  }
}

module.exports = {
  registerUser,
  loginUser,
  allUsers
};