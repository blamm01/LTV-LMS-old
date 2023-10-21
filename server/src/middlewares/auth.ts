import { NextFunction } from "express";
import { ERequest, EResponse } from "../typings/express";
import { verifyToken } from "../utils/auth";
import { CreateRespond } from "../utils/express";
import config from "config";

export function checkAuth(
  stopIfNotAuth: true | false = true,
) {
  return async function (req: ERequest, res: EResponse, next: NextFunction) {
    let token = req.headers["authorization"];
    if (token?.startsWith("Bearer ")) token = token.slice(7);
    token = token!;
    let data;
    try {
      data = await verifyToken(token);
    } catch (err: any) {
      console.log(err);
      return stopIfNotAuth == true
        ? CreateRespond.Unauthorized(
            res,
            err?.message || "Token đăng nhập không hợp lệ",
            err?.code || "INVALID_TOKEN"
          )
        : next();
    }
    if (!data.session || !data.user)
      return stopIfNotAuth == true
        ? CreateRespond.Unauthorized(
            res,
            "Phiên đăng nhập/Người dùng không hợp lệ",
            "INVALID_TOKEN"
          )
        : next();

    res.locals.info = {
      user: {
        ...((data.user as any)?._doc),
        password: ""
      },
      session: data.session
    };
    next();
  };
}
