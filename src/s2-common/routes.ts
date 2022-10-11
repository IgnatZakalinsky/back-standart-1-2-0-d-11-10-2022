import {testHelloWorld} from '../s3-tests/testHelloWorld'
import {Express} from 'express'
import {testsRoute} from '../s3-tests/testsRoute'

export const useRoutes = (app: Express) => {
    app.get('/', testHelloWorld)

    app.use('/', testsRoute)
    //
}

