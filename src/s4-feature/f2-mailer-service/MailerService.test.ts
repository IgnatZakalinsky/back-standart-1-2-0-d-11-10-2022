import {mailerService} from '../../s2-common/compositioRoot'
import {fakeMailerService} from './mailer'

describe('check mailerService', () => {
    it('check mailerService', async () => {
        const res = await mailerService.sendConfirmedCode('ai73a@yandex.com', '123')
        console.log({res})

        expect(1).toBe(1)
    })
    it('check fakeMailerService', async () => {
        const res = await fakeMailerService.sendConfirmedCode('ai73a@yandex.com', '123')
        console.log({res})

        expect(1).toBe(1)
    })
})