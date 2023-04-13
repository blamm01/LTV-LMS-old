import { EResponse } from "../typings/express";

export const CreateRespond = {
    BadRequest: (
      res: EResponse,
      message: string,
      errorCode: string = "BAD_REQUEST",
      error?: any
    ) => {
      res.status(400).json({
        data: null,
        success: false,
        errorCode,
        error,
        message,
        requestedAt: new Date().toISOString(),
      });
    },
    Unauthorized: (
      res: EResponse,
      message: string,
      errorCode: string = "NOT_LOGGED_IN",
      error?: any
    ) => {
      res.status(401).json({
        data: null,
        success: false,
        errorCode,
        error,
        message,
        requestedAt: new Date().toISOString(),
      });
    },
    NotFound: (
      res: EResponse,
      message: string,
      errorCode: string = "NOT_FOUND",
      error?: any
    ) => {
      res.status(404).json({
        data: null,
        success: false,
        errorCode,
        error,
        message,
        requestedAt: new Date().toISOString(),
      });
    },
    Conflict: (
      res: EResponse,
      message: string,
      errorCode: string = "CONFLICT",
      error?: any
    ) => {
      res.status(409).json({
        data: null,
        success: false,
        errorCode,
        error,
        message,
        requestedAt: new Date().toISOString(),
      });
    },
    Created: (
      res: EResponse,
      data: any = null,
    ) => {
      res.status(201).json({
        data,
        success: true,
        requestedAt: new Date().toISOString(),
      });
    },
    Deleted: (
      res: EResponse,
    ) => {
      res.status(204).json();
    },
    OK: (
      res: EResponse,
      message: string | null = null,
      data: any = null,
    ) => {
      res.status(200).json({
        data,
        success: true,
        message,
        requestedAt: new Date().toISOString(),
      });
    },
    Unavailable: (
      res: EResponse,
      message: string = "An error occured while processing your request",
      errorCode: string = "UNKNOWN_ERROR",
      error: any = null
    ) => {
      res.status(503).json({
        data: null,
        errorCode,
        success: false,
        error,
        message,
        requestedAt: new Date().toISOString(),
      });
    },
    Custom: (
      res: EResponse,
      statusCode: number,
      success: true | false = false,
      message: string | null = null,
      data: any = null,
    ) => {
      res.status(statusCode).json({
        data,
        message,
        success,
        requestedAt: new Date().toISOString(),
      });
    },
  };