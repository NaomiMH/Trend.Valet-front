import { Alert_show } from "../alert/alert"
import { Errors } from "../text/error"

export function Fetch_Next(url, play, next, method = "get", data = {}, sendToNext = null) {
    if (!play) {
        alert(Errors.ParameterMissing("Fetch_Next", "play"))
        return
    }
    if (!url) {
        Alert_show(Errors.ParameterMissing("Fetch_Next", "url"), play)
        return
    }
    if (!next) {
        Alert_show(Errors.ParameterMissing("Fetch_Next", "next"), play)
        return
    }
    let temp = {
        headers: {
            "Authorization": localStorage.getItem('token')
        }
    }
    if (method != "get") {
        temp = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }
    }
    fetch(url, temp)
        .then((res) => res.json())
        .then((res) => {
            if (!(res instanceof Array)) {
                // If server send an error message
                if (res.msg) {
                    Alert_show(res.msg, play)
                    return
                }
            }
            if (next) {
                if (!next instanceof Function) {
                    Alert_show(Errors.ParameterMissing("Fetch_Next", "next"), play)
                } else {
                    next(res, sendToNext)
                }
            }
        })
        .catch((e) => {
            console.log(e)
            Alert_show(Errors.FetchConnection, play)
        })
}