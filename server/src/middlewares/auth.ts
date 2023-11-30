import { NextFunction } from "express";
import { ERequest, EResponse } from "../typings/express";
import { checkPerms, getPermissions, verifyToken } from "../utils/auth";
import { CreateRespond } from "../utils/express";
import { validate } from "./validation";
import {
  defaultPerm,
  permsTypeOptional,
} from "../typings/permissions";

export function checkAuthProcess(
  stopIfNotAuth: true | false = true,
  perms?: {
    requireSpecificPerms: boolean;
    include: permsTypeOptional;
    required: permsTypeOptional;
    requiredSuperuser?: boolean | null;
  }
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

      let userPermissions;

      try {
        userPermissions = await getPermissions(data.user);
      } catch (err: any) {
        console.log(err);
        res.locals.info = {
          user: {
            ...(data.user as any)?._doc,
            password: "",
          },
          session: data.session,
          permissions: { permObj: defaultPerm, superuser: false },
          isPermitted: false,
        };
        return stopIfNotAuth && perms?.requireSpecificPerms
          ? CreateRespond.Unauthorized(
              res,
              err?.message || "Không thể kiểm tra quyền hạn của người dùng",
              err?.code || "UNABLE_TO_CHECK_PERMISSIONS"
            )
          : next();
      }

      const isPermitted =
        perms && perms.requireSpecificPerms
          ? checkPerms(
              perms.include,
              perms.required,
              userPermissions.permObj,
              perms.requiredSuperuser || false,
              userPermissions.superuser
            )
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
