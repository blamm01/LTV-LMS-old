import { Router } from "express";
import { LoginUser } from "../controllers/auth";
import { validate } from "../middlewares/validation";

const router = Router();

router.post(
  "/login/",
  validate.body([
    {
      name: "username",
      required: true,
      type: "string"
    },
    {
      name: "password",
      required: true,
      type: "string"
    },
  ]),
  LoginUser
);

export default router;
