import { Router } from "express";
import { getMessage, sendMessage } from "../controllers/messageController";
import authorize from "../middlewares/authMiddleware";

const messageRouter = Router();

messageRouter.post("/send", authorize, sendMessage);
messageRouter.get("/get/:chatId", authorize, getMessage);

export default messageRouter;
