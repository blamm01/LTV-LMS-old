import express from 'express'
import { IUser } from '../models/user'
import { ISession } from '../models/session'

export interface ERequest extends express.Request {
    ipAddr?: string
}

export interface EResponse extends express.Response {
    locals: {
        info?: {
            user: IUser,
            session: ISession
        }
    }
}