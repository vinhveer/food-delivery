import express from "express"
import { loginUser,registerUser, updateUser, getUserInfo, verifyToken} from "../controller/userController.js"


const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/update",verifyToken ,updateUser)
userRouter.get("/info", verifyToken, getUserInfo);

export default userRouter;
