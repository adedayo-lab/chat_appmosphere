import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

//signup controller below
export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password does not match" });
        }

        const user = await User.findOne({ username });


        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        //Hash password here
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        //profile pics here
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });


        if (newUser) {

            //Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                message: "User registered successfully",
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                username: newUser.username,
                profilePic: newUser.profilePic
            });

        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log('Error in signing in controller:===>', error.message);
        res.status(500).json({ error: "Internal server error, something went wrong" });
    }
};

//log in controller below
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }); // to check if user exist or not
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");// check if password is correct or not

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Username or Password" });// if anuy is false dispaly error message.
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            message: "User logged in successfully", // if user is logged in successfully then display this message.
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log('Error in login controller: ===>', error.message);
        res.status(500).json({ error: "Internal server error, something went wrong" });
    }
};

//logout controller below
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); // cleared out cookie here
        res.status(200).json({ message: "logged out successful " });

    } catch (error) {
        console.log(error, "error loging out ");
        res.status(500).json({ error: " Internal server error, something went wrong" });
    }
};
