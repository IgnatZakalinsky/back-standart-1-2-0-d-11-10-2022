import {SETTINGS} from "../s1-settings/config";
import {MongoClient} from "mongodb";
import {destruct} from "./errors";

export const client = new MongoClient(SETTINGS.MONGO_DB_URIS)

export const runDB = async () => {
    try {
        await client.connect()
        console.log('success connect db!')
        return true
    } catch (e) {
        console.log('db error: ', destruct(e))
        return false
    }
}