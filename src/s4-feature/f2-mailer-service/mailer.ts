import nodemailer, {SentMessageInfo} from 'nodemailer'
import {SETTINGS} from '../../s1-settings/config'
import {mailerService} from "../../s2-common/compositioRoot";
import Mail from "nodemailer/lib/mailer";

export type MailType = {
    from: string // sender address
    to: string // list of receivers
    subject: string // Subject line
    text?: string // plain text body
    html?: string // html body
}

export class MailerService {
    transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SETTINGS.GMAIL_LOGIN,
            pass: SETTINGS.GMAIL_PASS,
        },
    })
    _send = async (mail: MailType) => {
        return this.transport.sendMail(mail)
    }
    sendConfirmedCode = async (email: string, confirmationCode: string): Promise<SentMessageInfo> => {
        return this._send({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: email,
            subject: 'registration',
            html: `<a href="https://somesite.com/confirm-email?code=${confirmationCode}">reg</a>`
        })
    }
}

export const fakeMailerService = new MailerService()
fakeMailerService.transport = {
    sendMail: async (m: MailType) => m
} as Mail