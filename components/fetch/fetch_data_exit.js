import Router from 'next/router';
import { Alert_show } from "../alert/alert";
import { Errors } from "../text/error";

export function Fetch_Data_Exit(url, play, setData, urlBack) {
    if (!play) {
        alert(Errors.ParameterMissing("Fetch_Data_Exit", "play"))
        return
    }
    if (!url) {
        Alert_show(Errors.ParameterMissing("Fetch_Data_Exit", "url"), play)
        return
    }
    if (!setData) {
        Alert_show(Errors.ParameterMissing("Fetch_Data_Exit", "setData"), play)
        return
    }
    if (!urlBack) {
        Alert_show(Errors.ParameterMissing("Fetch_Data_Exit", "urlBack"), play)
        return
    }
    fetch(url, {
        headers: {
            "Authorization": localStorage.getItem('token')
        },
    })
        .then((res) => res.json())
        .then((res) => {
            // If server send an error message
            if (res.msg) {
                Alert_show(res.msg, play)
                Router.push({
                    pathname: urlBack
                })
            } else {
                if (res.length == 0) {
                    Alert_show(Errors.EmptyData, play)
                    Router.push({
                        pathname: urlBack
                    })
                } else {
                    if (res.errors) {
                        let msg = res.errors
                        if (msg.length != 0) {
                            Alert_show(JSON.stringify(msg), play)
                        }
                    }
                    if (res.result) {
                        setData(res.result)
                    } else {
                        setData(res)
                    }
                }
            }
        })
        .catch(() => Alert_show(Errors.FetchConnection, play))
}