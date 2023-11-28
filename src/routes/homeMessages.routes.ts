import { Router } from "express";

//Controllers
import { postHomeMessage, createAccessToken, getFirstTenMessages } from "../controllers/homeMessage.controllers";

const router = Router();

router.post("/posthomemessage", postHomeMessage);
router.post("/createaccesstoken", createAccessToken);
router.get("/getfirsttenmessages", getFirstTenMessages);


export default router;