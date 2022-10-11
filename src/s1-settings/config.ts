import env from 'dotenv'

const IS_LOCAL_VERSION = !process.env.PORT
IS_LOCAL_VERSION && env.config() // set env in developer mode

export const SETTINGS = {
    PORT: process.env.PORT || 7542,
    IS_LOCAL_VERSION,
    MONGO_DB_URIS: process.env.MONGO_DB_URIS || 'no-db-uris',
    GMAIL_LOGIN: process.env.GMAIL_LOGIN,
    GMAIL_PASS: process.env.GMAIL_PASS,

}
