import {agent} from 'supertest'
import {app} from '../../s2-common/app'
import {MongoMemoryServer} from 'mongodb-memory-server'
import {MongoClient} from 'mongodb'
import {globalCatch} from "../../s2-common/errors";
import {LogCollection, LogType} from "./l3-reppositories/logCollection";
import {logRepository} from "../../s2-common/compositioRoot";

describe('get me', () => {
    const testApp = agent(app)
    let ms: MongoMemoryServer
    let client: MongoClient
    beforeAll(async () => {
        ms = await MongoMemoryServer.create()
        client = new MongoClient(ms.getUri())
        await client.connect()

        logRepository._logCollection = client.db('standards').collection<LogType>('st-logs')
    })
    afterAll(async () => {
        await client.close()
        await ms.stop()
    })

    it('test log', async () => {
        globalCatch(
            s => {
                console.log({s})
                logRepository.saveLog('error', 'uncaughtException', s).then()
            },
            s => {
                console.log({s})
                logRepository.saveLog('error', 'unhandledRejection', s).then()
            },
        )
        const res = await testApp
            .get('/test-log')
        // console.log({res})

        await new Promise((resolve, reject) => {
            setTimeout(async () => {
                const log = await LogCollection.find().toArray()
                console.log({log})
                resolve(1)
            }, 3000)
        })

        expect(1).toBe(1)
    })
})