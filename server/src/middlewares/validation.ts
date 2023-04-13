import { NextFunction, Request, Response } from "express";
import { CreateRespond } from "../utils/express";

type ValidateType =
  | "string"
  | "number"
  | "array"
  | "object"
  | "email"
  | "boolean"
  | "password";

interface ValidateOptions {
  name: string;
  type: ValidateType;
  required: true | false;
}

export const checkType = (type: ValidateType, value: any) => {
  switch (type) {
    case "array":
      if (!Array.isArray(value)) return false;
      break;
    case "email":
      if (typeof value != "string") return false;
      const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!value.match(emailRegex)) return false;
      break;
    case "password":
      if (typeof value != "string") return false;
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%^&\*\(\)\-_=\+\{\}\[\]\\|;:'",.<>\/?]).{8,}$/;
      if (!passwordRegex.test(value)) return false;
      break;
    default:
      if (typeof value !== type) return false;
      break;
  }
  return true;
};

export const validate = {
  body: (options: ValidateOptions[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      const failures: string[] = [];
      options.map((data) => {
        if (!data.required && !body[data.name]) return;
        checkType(data.type, body[data.name]) ? null : failures.push(data.name);
      });
      if (failures.length > 0)
        return CreateRespond.BadRequest(
          res,
          `Validation Failed! Missing or sending wrong type of ${failures.join(
            ", "
          )} fields.`,
          "INVALID_FORM_BODY"
        );
      else return next();
    };
  },
  header: (options: ValidateOptions[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const headers = req.headers;
      const failures: string[] = [];
      options.map((data) => {
        data.name = data.name.toLowerCase();
        if (!data.required && !headers[data.name]) return;
        checkType(data.type, headers[data.name])
          ? null
          : failures.push(data.name);
      });
      if (failures.length > 0)
        return CreateRespond.BadRequest(
          res,
          `Validation Failed! Missing or sending wrong type of ${failures.join(
            ", "
          )} fields.`,
          "INVALID_FORM_HEADER"
        );
      else return next();
    };
  },
};
