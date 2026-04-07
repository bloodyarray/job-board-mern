import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const createToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}

export const register = async (req, res) => {
    const user = await User.create(req.body)
    const token = createToken(user)

    res.status(201).json({
        user: {
            name: user.name,
            email: user.email,
            _id: user._id,
        },
        token,
    })
}

export const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const token = createToken(user)

    res.status(200).json({
        user: {
            name: user.name,
            email: user.email,
            _id: user._id,
        },
        token,
    })
}