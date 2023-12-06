import { Router } from "express";

//Controllers
import  getPexelsPhotos  from "../helpers/pexelsaapi";

const router = Router();

router.post("/getpexelsphoto", getPexelsPhotos);

export default router;