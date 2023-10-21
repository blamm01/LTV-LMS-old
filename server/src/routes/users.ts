import { Router } from "express";
import { checkAuthProcess } from "../middlewares/auth";
import { getMe } from "../controllers/users";

const router = Router()

router.get("/get/@me", ...checkAuthProcess(true), getMe)

export = router