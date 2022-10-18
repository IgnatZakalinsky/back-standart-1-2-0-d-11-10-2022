import {client} from "../../../s2-common/runDB";

export type LogType = {
    tag: string
    log: string
    more: string

    createdAt: string
}

export const LogRepository = client.db('standards').collection<LogType>('st-logs')