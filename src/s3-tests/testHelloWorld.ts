import {RequestType, ResponseType} from './req-res-helper'

export type HelloWorldType = {
    hello: string
}

export const testHelloWorld = (req: RequestType, res: ResponseType) => {
    res.status(200).json({hello: 'world!'})
}