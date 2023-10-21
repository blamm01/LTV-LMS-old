import { Router } from "express";
import { checkAuth } from "../middlewares/auth";
import { getMe } from "../controllers/users";

const router = Router()

router.get("/get/@me", checkAuth(true), getMe)

export = router