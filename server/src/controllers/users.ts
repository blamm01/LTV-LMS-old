import { ERequest, EResponse } from "../typings/express";

export const getMe = async (
    req: ERequest,
    res: EResponse
  ) => {
    res.json(res.locals?.info)
}