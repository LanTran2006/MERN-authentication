import {
  checkAuth,
  forgotController,
  loginController,
  logoutController,
  registerController,
  resetController,
  verifyUser,
} from "../controller/user.js";
import { Router } from "express";
import { verifyToken } from "../utils/generateToken.js";
import { User } from "../models/user.js";


const route = Router();
route.post("/login", loginController);
route.post("/forgot", forgotController);
route.post("/reset/:id", resetController);
route.post("/register", registerController);
route.post("/verify/:id", verifyUser);
route.get("/logout", verifyToken, logoutController);
route.get("/check",verifyToken,checkAuth)
route.put("/edit/:id",verifyToken,async (req,res)=>{
    const {id}=req.params;
    try {
      let edited_user=await User.findByIdAndUpdate(id,req.body,{new: true}).select("-password");
      res.status(200).send({
        message: "change detail successfully",
        user: edited_user
      })
    } catch (error) {
      return res.status(404).send("not found user");
    }

})
export default route;
