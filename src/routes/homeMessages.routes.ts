import { Router } from "express";

//Controllers
import { postHomeMessage } from "../controllers/homeMessage.controllers";

const router = Router();

router.post("/posthomemessage", postHomeMessage);


export default router;