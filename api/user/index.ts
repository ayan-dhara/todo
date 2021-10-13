// @ts-ignore
import express from "express";
import verifyRouter from "./verify";
import checkSigned from "../../middlewares/checkSigned";
import login from "./login";
import signup from "./signup";
import checkRegister from "../../middlewares/checkRegister";

// USE /api/user
const router = express.Router();

// POST /login To login an existing user
router.post("/login", login)
// POST /signup	To sign up a new user
// @ts-ignore
router.post("/signup", checkRegister, signup)

// extra
// ALL /verify To check if signed in
router.all("/verify", checkSigned, verifyRouter);

export default router;
