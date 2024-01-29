import { Router } from "express";
import { sendMessage } from "../controllers/messageController";
import authorize from "../middlewares/authMiddleware";

const messageRouter = Router();

messageRouter.post("/send", authorize, sendMessage);

export default messageRouter;
