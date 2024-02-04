import { Router } from "express";
import { getMessage, sendMessage } from "../controllers/messageController";
import authorize from "../middlewares/authMiddleware";

const messageRouter = Router();

messageRouter.post("/", authorize, sendMessage);
messageRouter.get("/", authorize, getMessage);

export default messageRouter;
