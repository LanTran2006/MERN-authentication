import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { sendCode,sendLink } from "../utils/sendEmail.js";
export async function loginController(req, res) {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("email unexisted");
  }
  console.log(password,email);
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).send("wrong password");
  }
  generateToken(res,user._id);
  res.status(200).send({
    message: "login successfully",
    user: user._doc,
  });
}

export async function registerController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("invalid criteria");
  }
  const user = await User.find({ email });
  if (user.length) {
    console.log(user);
    return res.status(400).send({
        message: "user existed"
    });
  }
  let codeExpiration=Date.now()+60*60*1000;
  let verifycode=Math.floor(Math.random()*100000)+100000;
  let newpass = await bcrypt.hash(password, 10);
  let newuser = await new User({ ...req.body, password: newpass,verifycode,codeExpiration}).save();
  generateToken(res, newuser._id);
  await sendCode(newuser.email,verifycode);
  res.status(200).send({
       message: "user created successfully",
       user:  {...newuser._doc,password: undefined}
  });
}

export async function verifyUser(req,res) {
  let {code}=req.body;
  let {id}=req.params;
  let client=await User.findById(id);
  if (client.verifycode!=code) {
     return res.status(400).send({
         message: "invalid code"
     })
  }
  if (client.codeExpiration<Date.now()) {
     return res.status(400).send({
         message: "expired code"
     })
  }
  client.ischecked=true;
  client.verifycode=undefined;
  client.codeExpiration=undefined;
  await client.save();
  res.status(200).send({
     message: "verify user successfully"
  })
}

export async function forgotController(req,res) {
  let {email}=req.body;
    let exist=await User.findOne({email});
    if (!exist) {
        return res.status(400).send({
            message: "unexisted email"
        })
    }
    await sendLink(email,process.env.RESET_LINK+exist._id);
    res.status(200).send({
      message: "link was sent to your email"
    })
}

export async function resetController(req,res) {
  let {id}=req.params;
  let {password}=req.body;
  let hash=await bcrypt.hash(password,10);
 try {
  await User.findByIdAndUpdate(id,{password: hash});
  res.status(200).send({
      message: "reset password successfully",
  })
 } catch (error) {
     return res.status(400).send("something went wrong");
 }

}
export async function logoutController(_,res) {
    res.clearCookie('token');
    res.status(200).send({
        message: "logout successfully"
    })
}
export async function checkAuth(req,res) {
  const user=await User.findById(req.userId);
  if (!user) {
    return res.status(400).send("no user found");
  }
  return res.status(200).send({
    user: user._doc
  });
}