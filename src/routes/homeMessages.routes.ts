import { Router } from "express";

//Controllers
import { postHomeMessage, createAccessToken } from "../controllers/homeMessage.controllers";

const router = Router();

router.post("/posthomemessage", postHomeMessage);
router.post("/createaccesstoken", createAccessToken);


export default router;