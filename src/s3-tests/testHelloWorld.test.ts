import {createReq, createRes} from './req-res-helper'
import {HelloWorldType, testHelloWorld} from './testHelloWorld'

describe('testHelloWorld', () => {
    it('should 200', () => {
        const req = createReq({})
        const [_res, res] = createRes<HelloWorldType>()
        testHelloWorld(req, res)

        expect(_res.status).toBe(200)
        expect(_res.data.hello).toBe('world!')
    })
})