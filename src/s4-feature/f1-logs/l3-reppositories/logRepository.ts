import {Collection} from 'mongodb'
import {LogTagType, LogType} from './logCollection'

export class LogRepository {
    _lastSave: Omit<LogType,'createdAt'> = {tag: 'error', name: '', log: ''}

    constructor(public _logCollection: Collection<LogType>, private _tags: LogTagType[]) {
    }

    async saveLog(tag: LogTagType, name: string, log: string, more?: string) {
        if (
            this._tags.includes(tag)
            && !( // не полное совпадение
                this._lastSave.tag === tag
                && this._lastSave.name === name
                && this._lastSave.log === log
                && this._lastSave.more === more
            )
        ) {
            this._lastSave = {tag, log, more, name}

            return await this._logCollection.insertOne({
                tag,
                name,
                log,
                more,
                createdAt: new Date().toISOString(),
            })
        }
    }
}