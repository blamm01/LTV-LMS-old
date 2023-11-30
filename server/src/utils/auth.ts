import bcrypt from "bcrypt";
import config from "config";
import * as jwt from "jsonwebtoken";
import { EError } from "../typings/error";
import { sessionModel } from "../models/session";
import { IUser, userModel } from "../models/user";
import { generateObjectID, generateUUID } from "./mongoose";
import {
  allPermsArrayType,
  permsType,
  permsTypeOptional,
} from "../typings/permissions";
import { permissionModel } from "../models/auth/permission";

interface SessionPayload {
  sessionId: string;
  userId: string;
}

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(
    password,
    (await bcrypt.genSalt(config.get("bcrypt.salt") as number)) || 38
  );

export const comparePassword = async (
  plain: string,
  encrypted: string
): Promise<boolean> => await bcrypt.compare(plain, encrypted);

const jwtToken = config.get("jwt.token") as string;

export const verifyToken = async (token: string) => {
  try {
    let payload;
    try {
      payload = jwt.verify(token, jwtToken) as SessionPayload;
    } catch (err) {
      throw new EError(`Token đăng nhập không hợp lệ`, "INVALID_TOKEN");
    }

    const session = await sessionModel.findOne({
      _id: payload.sessionId,
      userId: payload.userId,
    });
    if (!session)
      throw new EError("Phiên đăng nhập không hợp lệ", "INVALID_SESSION");
    if (
      Date.now() >=
      session.createdAt.getTime() +
        (config.get("jwt.expiresIn.number") as number)
    ) {
      await sessionModel.deleteOne({ _id: session._id });
      throw new EError("Phiên đăng nhập đã hết hạn", "SESSION_EXPIRED");
    }

    const user = await userModel.findById(session.userId);
    if (!user) {
      await sessionModel.deleteOne({ _id: session._id });
      throw new EError(
        "Tài khoản đang liên kết với phiên đăng nhập không tồn tại",
        "LINKED_USER_NOT_EXIST"
      );
    }

    return {
      user,
      session,
    };
  } catch (err: any) {
    throw new EError(`${err}`, err?.code || "UNKNOWN_ERROR");
  }
};

export const generateToken = async (user: IUser, ipAddr: string) => {
  try {
    let session = await sessionModel.create({
      _id: generateUUID(`${user._id}_session_${ipAddr}_${generateObjectID()}`),
      userId: user._id,
      ipAddr,
    });

    const payload: SessionPayload = {
      sessionId: session._id,
      userId: user._id,
    };

    return {
      token: jwt.sign(payload, jwtToken, {
        expiresIn: config.get("jwt.expiresIn.number") as number,
      }),
      session,
    };
  } catch (err) {
    throw new EError(`Unknown Error: ${err}`, "UNKNOWN_ERROR");
  }
};

export const getPermissions = async (
  user: IUser
): Promise<{ permObj: permsType; superuser: boolean }> => {
  const role = user.role;
  const permission = await permissionModel.findOne({ belongTo: role });
  if (!permission) {
    throw new EError(
      "Vai trò hiện tại của người dùng không có bất cứ quyền nào",
      "PERMISSION_DATA_NOT_EXIST"
    );
  }
  console.log(permission)
  return {
    permObj: permission.permObj,
    superuser: permission.superuser,
  };
};

export const checkPerms = (
  include: permsTypeOptional,
  required: permsTypeOptional,
  perms: permsType,
  requiredSuperuser: boolean = false,
  isSuperuser: boolean = false
): boolean => {
  let passed = true;
  if (isSuperuser) return true;
  if(requiredSuperuser && !isSuperuser) return false
  Object.keys(required).forEach((key) => {
    const arr = required[key as keyof typeof required];
    if (!arr || !Array.isArray(arr)) passed = false;
    else if (arr.length > 0)
      arr.map((v) =>
        !(perms[key as keyof typeof perms] as string[]).includes(v)
          ? (passed = false)
          : null
      );
  });
  Object.keys(include).forEach((key) => {
    const arr = include[key as keyof typeof include];
    if (!arr || !Array.isArray(arr)) passed = false;
    else if (
      arr.length > 0 &&
      arr
        .map((v: string) =>
          (perms[key as keyof typeof perms] as string[]).includes(v)
        )
        .filter((v) => v).length == 0
    )
      passed = false;
  });
  return passed;
};
