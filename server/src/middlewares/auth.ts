import { NextFunction } from "express";
import { ERequest, EResponse } from "../typings/express";
import { checkPerms, getPermissions, verifyToken } from "../utils/auth";
import { CreateRespond } from "../utils/express";
import { validate } from "./validation";
import { permsType, permsTypeOptional } from "../typings/permissions";

export function checkAuthProcess(
  stopIfNotAuth: true | false = true,
  perms?: { include: permsTypeOptional; required: permsTypeOptional }
) {
  return [
    validate.header([
      {
        name: "authorization",
        required: true,
        type: "string",
      },
    ]),
    async function (req: ERequest, res: EResponse, next: NextFunction) {
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

      const userPermissions = await getPermissions(data.user);
      const isPermitted = perms
        ? checkPerms(perms.include, perms.required, userPermissions)
        : true;

      res.locals.info = {
        user: {
          ...(data.user as any)?._doc,
          password: "",
        },
        session: data.session,
        permissions: userPermissions,
        isPermitted,
      };

      if (perms && !isPermitted && stopIfNotAuth)
        return CreateRespond.Unauthorized(
          res,
          "Bạn không có quyền truy cập vào tài nguyên này",
          "MISSING_RIGHTS"
        );
      next();
    },
  ];
}
