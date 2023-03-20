import express from 'express'

export interface Request extends express.Request {
    ipAddr?: string
}