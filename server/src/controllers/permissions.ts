import { ERequest, EResponse } from "../typings/express";
import { allPermsList, perms_explanation } from "../typings/permissions";
import { CreateRespond } from "../utils/express";

export const getPerms = async(req: ERequest, res: EResponse) => {
    CreateRespond.OK(res, null, {
        list: allPermsList,
        explanation: perms_explanation
    })
}