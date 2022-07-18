import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { Alert_path, Alert_show } from "./alert/alert";
import { Fetch } from "./fetch/fetch";
import Header from "./header";
import { Attributes } from "./helpers/consts";
import { Log } from "./helpers/database";
import Sidebar from "./sidebar";

const Layout = ({ children, width }) => {
    // Get the router
    const router = useRouter();
    // Check if data have been fetch
    const [data, setData] = useState({});
    const [empty, setEmpty] = useState(false);
    // Save sound
    const [play] = useSound(Alert_path);

    function checkLog(data) {
        if (!data) {
            return "Loading.."
        }
        if ("msg" in data) {
            Alert_show(data.msg, play)
            router.push('/login')
            return
        }
        if (Object.keys(data).length != 0) {
            setData(data)
            localStorage.setItem('Name', data[Attributes.Name])
            localStorage.setItem('Admin', data[Attributes.Admin])
            return
        }
        router.push('/login')
        return
    }

    function fetchData() {
        return Fetch(Log.token, play, checkLog)
    }

    useEffect(() => {
        if (router.pathname != "/login") {
            if (!empty) {
                setEmpty(true)
                return fetchData()
            }
        }
    })

    if (router.pathname == '/login') {
        return logLayout()
    }

    function logLayout() {
        return (
            <div className="bg-dark-blue min-h-screen flex flex-col justify-center">
                {children}
            </div>
        )
    }

    function defLayout(data) {
        return (
            <div className="flex flex-col md:flex-row min-h-screen">
                <Sidebar width={width} admin={data[Attributes.Admin]} />
                <main className="w-full md:w-3/4 xl:w-6/7 md:min-h-screen">
                    <div className="m-5">
                        <Header width={width} name={data[Attributes.Name]} />
                        {children}
                    </div>
                </main>
            </div>
        )
    }

    if (Object.keys(data).length != 0) {
        return defLayout(data)
    }

    return logLayout(data)
}

export default Layout;