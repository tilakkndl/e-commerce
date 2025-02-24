import express from "express"
import {login, protect, signup} from '../controllers/authController.js'

const router = express.Router()

router.post('/register', signup)
router.post("/login", login)
router.get("/protect", protect, (req, res)=>{
    res.status(200).json({
        success: true,
        message: "You are logged in"
    })
})

export default router