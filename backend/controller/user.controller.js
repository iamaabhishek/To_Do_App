import User from "../model/user.model.js";
import {z} from "zod";
import bcrypt from "bcryptjs"
import {generateTokenAndSaveInCookies} from "../jwt/token.js"

export const userSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address" })
        .trim(),

    username: z.string()
        .min(4, { message: "Username must be at least 4 characters" })
        .trim(),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters" })
});



export const register = async (req, res) => {
    console.log("signup function called");
    try {
        const { username, email, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const validation = userSchema.safeParse({ username, email, password });
        if (!validation.success) {
            const errorMessage = validation.error.issues.map((err) => err.message)

            return res.status(400).json({ error: errorMessage });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already Register" });
        }

        const hashPassword = await bcrypt.hash(password,10)
        const newUser = new User({ username, email, password:hashPassword });
        await newUser.save();


        if (newUser) {
            const token = await generateTokenAndSaveInCookies(newUser._id,res)
            res.json({ message: "New User Register", newUser});    
        }


        

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in Registration" });
    }
};





export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = await generateTokenAndSaveInCookies(user._id, res);

        return res.status(200).json({
            message: "User logged in successfully",
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error logging user" });
    }
};




export const logout = (req,res) =>{
    try {
        res.clearCookie("jwt",{
            path:"/"
        })
        res.status(200).json({message:"User logged out successfully "})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error logging out user"})
    }
}

