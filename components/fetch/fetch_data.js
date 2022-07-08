import { Alert_show } from "../alert/alert"
import { Errors } from "../text/error"

export function Fetch_Data(url, play, setEmpty, setData) {
    if (!play) {
        alert(Errors.ParameterMissing("Fetch_Data", "play"))
        return
    }
    if (!url) {
        Alert_show(Errors.ParameterMissing("Fetch_Data", "url"), play)
        return
    }
    if (!setEmpty) {
        Alert_show(Errors.ParameterMissing("Fetch_Data", "setEmpty"), play)
        return
    }
    if (!setData) {
        Alert_show(Errors.ParameterMissing("Fetch_Data", "setData"), play)
        return
    }
    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            // If server send an error message
            if (res.msg) {
                setEmpty(true)
                Alert_show(res.msg, play)
            } else {
                if (res.length == 0) {
                    setEmpty(true)
                } else {
                    setEmpty(false)
                }
                setData(res)
            }
        })
        .catch((e) => {
            console.log(e)
            Alert_show(Errors.FetchConnection, play)
        })
}