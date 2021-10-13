import express from "express"

import userRoute from './user'
import todoRouter from './todo'
import checkSigned from "../middlewares/checkSigned";

// USE /api
const router = express.Router()

router.use("/user", userRoute)
router.use("/todo",checkSigned, todoRouter)

router.all("*", (req, res) => {
  res.status(404).send({
    success: false,
    message: "Not Found"
  })
})

export default router;
