import { Alert_show } from "../alert/alert"
import { Errors } from "../text/error"
import emailjs from '@emailjs/browser'
import { publicKey, serviceID, templateID } from "./email"

export function Send_Email(templateParams, play ) {
    if (!play) {
        alert(Errors.ParameterMissing("Send_Email", "play"))
        return
    }
    if (!templateParams) {
        Alert_show(Errors.ParameterMissing("Send_Email", "templateParams"), play)
        return
    }
    emailjs.send(serviceID, templateID, templateParams, publicKey)
    .then((res) => {
        console.log(res)
        Alert_show(Message.Success, play)
    })
    .catch((e) => {
        console.log(e)
        Alert_show(Errors.FetchConnection, play)
    })
}