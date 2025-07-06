import User from '../models/user.model.js';

export const getUsersForSideBar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id: {$ne: loggedInUserId } }).select('-password'); // Assuming user is set by protectRoute middleware

        res.status(200).json({ message: "Users for sidebar", users: filteredUsers });

    } catch (error) {
        console.error('Error in getUsersForSideBar controller:', error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};
