import express from 'express'
import cors from 'cors'
import {globalCatch} from './errors'
import {useRoutes} from './routes'
import cookieParser from 'cookie-parser'

globalCatch()

export const app = express()

app.use(cors())
app.use(cookieParser())

app.use(express.json())

useRoutes(app)