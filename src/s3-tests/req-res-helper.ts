import {Request, Response, NextFunction} from 'express'

export type RequestType = Request
export const createReq = (req: Partial<RequestType>) => {
    return req as RequestType
}

export type ResponseType = Response
export const createRes = <T>() => {
    const _res = {
        status: 0 as number,
        data: {} as T
    }

    const res: Partial<ResponseType> = {
        status(code: number) {
            _res.status = code
            return this as ResponseType
        },
        json(body?: any) {
            _res.data = body
            return this as ResponseType
        },

    }

    const arr: [{ status: number, data: T }, ResponseType] = [_res, res as ResponseType]

    return arr
}

export const createNext = () => {
    const info = {
        isNext: false
    }
    const arr: [{ isNext: boolean }, NextFunction] = [
        info,
        () => {
            info.isNext = true
        }
    ]
    return arr
}