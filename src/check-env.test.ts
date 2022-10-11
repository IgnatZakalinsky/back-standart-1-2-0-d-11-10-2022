import {destruct} from './s2-common/errors'
import {SETTINGS} from './s1-settings/config'

describe('check-env', () => {
    it('check-env1', () => {
        console.log({SETTINGS})
        console.log(destruct(process.env))
        expect(1).toBe(1)
    })
})