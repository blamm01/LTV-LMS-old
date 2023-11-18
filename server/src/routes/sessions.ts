import { Router } from "express";
import { createSession, deleteSession } from "../controllers/sessions";
import { validate } from "../middlewares/validation";
import { checkAuthProcess } from "../middlewares/auth";

const router = Router();

router.post(
  "/create/",
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
  createSession
);

router.delete('/destroy', ...checkAuthProcess(true), deleteSession)

export = router;
