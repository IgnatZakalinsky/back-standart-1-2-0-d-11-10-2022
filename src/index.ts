import {runDB} from './s2-common/runDB'
import {app} from './s2-common/app'
import {SETTINGS} from './s1-settings/config'
import {globalCatch} from './s2-common/errors'
import {logRepository} from './s2-common/compositioRoot'

globalCatch()

runDB()
    .then(isDB => {
        if (!isDB) {
            return
        }
        globalCatch(
            s => {
                logRepository.saveLog('error', 'uncaughtException', s).then()
            },
            s => {
                logRepository.saveLog('error', 'unhandledRejection', s).then()
            },
        )

        // settings setInterval

        app.listen(SETTINGS.PORT, () => {
            console.log('listen port: ' + SETTINGS.PORT)
        })
    })