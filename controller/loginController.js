
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true }
})

const User = mongoose.model('User', registerSchema)

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ error: `Email is already exist` })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password: hashPassword })
        const registerdata = await newUser.save()
        // console.log("registerdata::", registerdata)
        res.status(200).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ message: `Error registering user ${error}` })

    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const validateUser = await User.findOne({ email })
        if (!validateUser) {
            return res.status(401).json({ message: 'Invalid Email or Password' })
        }
        const passwordMatch = await bcrypt.compare(password, validateUser.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Email or Password' })
        }
        const token = jwt.sign({ userId: validateUser._id }, 'secret', { expiresIn: '1h' })
        console.log("user login sucess!")
        res.status(200).json({ Token: `${token}` })
    } catch (error) {
        console.log("error::", error)
        res.status(500).json({ message: `Error Login user ${error}` })
    }
}

export const homepage = async (req, res) => {
    try {
        res.status(200).json({ message: `Wellcome to Blogger App ` })

    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` })

    }
}


// export default module
