export const transformToJsonSafely = (some: unknown, inLevel: number): any => {
    if (typeof some !== 'object') {
        if (some === undefined) {
            return 'error stringify: undefined'
        } else if (typeof some === 'function') {
            return 'error stringify: function'
        } else if (typeof some === 'symbol') {
            return 'error stringify: symbol'
        } else {
            try {
                JSON.stringify(some)
                return some
            } catch (e) {
                return 'error stringify with ' + typeof some
            }
        }
    } else if (some === null) {
        return 'error stringify: null'
    } else {
        if (Array.isArray(some)) {
            if (!inLevel) {
                return 'warning level stringify: some array'
            } else {
                return some.map(x => transformToJsonSafely(x, inLevel - 1))
            }
        } else {
            if (!inLevel) {
                return 'warning level stringify: some object'
            } else {
                const x: any = {}
                const newSome: any = {...some}
                if ((some as { message?: string }).message !== undefined) { // for Error
                    newSome.message = (some as { message?: string }).message
                }

                let i = 0
                for (const y in newSome) {
                    x[y] = transformToJsonSafely(newSome[y], inLevel - 1)
                    i++
                }

                if (!i && (some as { then?: any }).then !== undefined) {
                    return 'warning {} stringify: maybe Promise, have then function'
                } else {
                    return x
                }
            }
        }
    }
}

export const destruct = (e: unknown, inLevel: number = 7) => {
    return transformToJsonSafely(e, inLevel)
}

export const onUncaughtException = (f?: (s: string) => void) => {
    process.on('uncaughtException', (e) => {
        console.log(`!!! Uncaught Exception${f ? ' with log in db' : ''}: `, destruct(e))
        f?.('uncaughtException: ' + JSON.stringify(destruct(e))) // log in db
    })
}

export const onUnhandledRejection = (f?: (s: string) => void) => {
    process.on('unhandledRejection', (reason, p) => {
        console.log(`!!! Unhandled Rejection${f ? ' with log in db' : ''}: `, destruct(reason))
        f?.('unhandledRejection: ' + JSON.stringify(destruct(reason))) // log in db

        p
            .then(x => {
                console.log('unhandledRejection - then: ', destruct(x))
                f?.('unhandledRejection - then: ' + JSON.stringify(destruct(reason))) // log in db
            })
            .catch(e => {
                console.log('unhandledRejection - catch: ', destruct(e))
                f?.('unhandledRejection - catch: ' + JSON.stringify(destruct(reason))) // log in db
            })
    })
}

// отлов ошибок чтоб сервер не падал
export const globalCatch = (uncaughtF?: (s: string) => void, unhandledF?: (s: string) => void) => {
    onUncaughtException(uncaughtF)
    onUnhandledRejection(unhandledF)
}
