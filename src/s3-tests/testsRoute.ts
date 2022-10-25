import express from 'express'
import {logRepository} from "../s2-common/compositioRoot";

export const testsRoute = express.Router()

testsRoute
    .get(
        '/test-log',
        async (req, res) => {
            // await logRepository.saveLog('error', 'uncaughtException', 'x').then()

            res.status(200).json({x: 1})
            // throw new Error('new')
        })
    .get(
        '/t',
        (req, res) => res.status(200)
            .json({a: 1})
    )
    .get(
        '/t/:id',
        (req, res) => res.status(200)
            .json({a: 2, p: req.params})
    )
    .get(
        '/tq',
        (req, res) => res.status(200)
            .json({a: 3, q: req.query})
    )
    .post(
        '/t',
        (req, res) => res.status(200)
            .json({a: 4, b: req.body})
    )
    .put(
        '/t',
        (req, res) => res.status(200)
            .json({a: 5, b: req.body})
    )
    .delete(
        '/t',
        (req, res) => res.status(200)
            .json({a: 6})
    )
    .delete(
        '/t/:id',
        (req, res) => res.status(200)
            .json({a: 7, p: req.params})
    )

    .get(
        '/th',
        (req, res) => res.status(200)
            .json({a: 8, h: req.headers})
    )
    .get(
        '/tc',
        (req, res) => res.status(200)
            .cookie(
                'token',
                '1;0-aBc',
                {
                    expires: new Date(Date.now() + 60000),
                    httpOnly: true,
                    secure: true,
                }
            )
            .json({a: 9, c: req.cookies, h: req.headers})
    )