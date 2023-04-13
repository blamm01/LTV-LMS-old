import bcrypt from "bcrypt";
import config from "config";
import * as jwt from "jsonwebtoken";
import { EError } from "../typings/error";
import { ISession, sessionModel } from "../models/session";
import { IUser, userModel } from "../models/user";
import { generateUUID } from "./mongoose";

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
      throw new EError(`Invalid JWT Token | ${err}`, "INVALID_TOKEN");
    }

    const session = await sessionModel.findOne({
      _id: payload.sessionId,
      userId: payload.userId,
    });
    if (!session) throw new EError("Invalid Session", "INVALID_SESSION");
    if (
      Date.now() >=
      session.createdAt.getTime() +
        (config.get("jwt.expiresIn.number") as number)
    ) {
      await sessionModel.deleteOne({ _id: session._id });
      throw new EError("Session expired", "SESSION_EXPIRED");
    }

    const user = await userModel.findById(session.userId);
    if (!user) {
      await sessionModel.deleteOne({ _id: session._id });
      throw new EError(
        "User linked to this session is not existed",
        "LINKED_USER_NOT_EXIST"
      );
    }

    return {
      user,
      session,
    };
  } catch (err) {
    throw new EError(`Unknown Error: ${err}`, "UNKNOWN_ERROR");
  }
};

export const generateToken = async (user: IUser, ipAddr: string) => {
  try {
    let session = await sessionModel.create({
      _id: generateUUID(),
      user: user._id,
      ipAddr,
    });

    const payload: SessionPayload = {
      sessionId: session._id,
      userId: user._id,
    };

    return {
      token: jwt.sign(payload, jwtToken, {
        expiresIn: config.get("jwt.expiresIn.text") as string,
      }),
      session,
    };
  } catch (err) {
    throw new EError(`Unknown Error: ${err}`, "UNKNOWN_ERROR");
  }
};
