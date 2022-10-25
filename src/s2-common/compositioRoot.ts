import {MailerService} from '../s4-feature/f2-mailer-service/mailer'
import {LogRepository} from '../s4-feature/f1-logs/l3-reppositories/logRepository'
import {LogCollection} from '../s4-feature/f1-logs/l3-reppositories/logCollection'

export const mailerService = new MailerService()
export const logRepository = new LogRepository(LogCollection, ['error'])