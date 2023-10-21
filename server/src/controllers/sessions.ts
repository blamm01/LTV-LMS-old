import { NextFunction } from "express";
import { ERequest, EResponse } from "../typings/express";
import { CreateRespond } from "../utils/express";
import { userModel } from "../models/user";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";
import config from "config"

export const createSession = async (
  req: ERequest,
  res: EResponse
) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user)
      return CreateRespond.Unauthorized(
        res,
        "Sai tên đăng nhập hoặc mật khẩu",
        "INVALID_CREDENTIALS"
      );
    if (!(await comparePassword(password, user.password)))
      return CreateRespond.Unauthorized(
        res,
        "Sai tên đăng nhập hoặc mật khẩu",
        "INVALID_CREDENTIALS"
      );
    if(user.status != 'active') return CreateRespond.Unauthorized(
      res,
      "Tài khoản đã bị vô hiệu hoá",
      "ACCOUNT_INACTIVE"
    )
    let session;
    try {
      session = await generateToken(user, req.ip);
    } catch (err: any) {
      CreateRespond.Unavailable(
        res,
        err?.message || "Lỗi không xác định",
        err?.code,
        err
      );
    }
    if(!session?.token || !session?.session) return CreateRespond.Unavailable(res, "Không thể tạo phiên đăng nhập", "UNABLE_TO_CREATE_SESSION");
    return CreateRespond.OK(
        res,
        "Session created",
        {
            token: session.token,
            duration: config.get("jwt.expiresIn.number")
        }
    )
  } catch (err) {
    CreateRespond.Unavailable(res, "Lỗi không xác định", "UNKNOWN_ERROR", err);
  }
};
