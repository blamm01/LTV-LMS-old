import { Router } from "express";
import { createSession } from "../controllers/sessions";
import { validate } from "../middlewares/validation";

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

export = router;
