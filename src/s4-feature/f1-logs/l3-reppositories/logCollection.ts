import {client} from '../../../s2-common/runDB'
export type LogTagType =
    | 'error' //
    | 'warning' //
    | 'info' //

export type LogType = {
    tag: string // LogTagType

    name: string
    log: string

    more?: string
    createdAt: string
}

export const LogCollection = client.db('standards').collection<LogType>('st-logs')