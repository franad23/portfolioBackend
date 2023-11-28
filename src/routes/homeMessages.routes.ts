import { Router } from "express";

//Controllers
import { postHomeMessage, createAccessToken, getFirstTenMessages, linkShortener } from "../controllers/homeMessage.controllers";

//Controllers
import verifyToken from "../middlewares/verifyToken.middleware";
const router = Router();

router.post("/posthomemessage", verifyToken, postHomeMessage);
router.post("/createaccesstoken", createAccessToken);
router.get("/getfirsttenmessages", getFirstTenMessages);
router.post("/shortlink", linkShortener)


export default router;