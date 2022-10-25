import express from 'express'
import cors from 'cors'
import {useRoutes} from './routes'
import cookieParser from 'cookie-parser'

export const app = express()

app.use(cors())
app.use(cookieParser())

app.use(express.json())

useRoutes(app)