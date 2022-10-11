// import {runDB} from './s2-common/mongo'
import {app} from './s2-common/app'
import {SETTINGS} from './s1-settings/config'
import {globalCatch} from './s2-common/errors'

// runDB().then(isDB => {
//     if (!isDB) {
//         return
//     }

    globalCatch()

    // settings setInterval

    app.listen(SETTINGS.PORT, () => {
        console.log('listen port: ' + SETTINGS.PORT)
    })
// })