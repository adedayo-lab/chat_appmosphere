import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js"
import protectRoute from "../middleware/protectRoute.js";
import { get } from "mongoose";

const router = express.Router();
//methods below

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;