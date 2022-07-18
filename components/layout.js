import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { Alert_path } from "./alert/alert";
import { Fetch_Data_Exit } from "./fetch/fetch_data_exit";
import Header from "./header";
import { Attributes } from "./helpers/consts";
import { Log } from "./helpers/database";
import Sidebar from "./sidebar";
import { Errors } from "./text/error";

const Layout = ({ children, width }) => {
    // Get the router
    const router = useRouter();
    // Save the information
    const [data, setData] = useState({});
    // Save sound
    const [play] = useSound(Alert_path);

    function fetchData() {
        Fetch_Data_Exit(Log.token, play, setData, "/login")
    }

    useEffect(() => {
        if (router.pathname != "/login") {
            if (Object.keys(data).length == 0) {
                fetchData()
            }
        }
    })

    function logLayout() {
        return (
            <div className="bg-dark-blue min-h-screen flex flex-col justify-center">
                {children}
            </div>
        )
    }

    if (router.pathname == "/login") {
        return logLayout()
    }

    if (!data) {
        return "Loading..."
    }

    if (Object.keys(data).length == 0) {
        return "Loading..."
    }

    if (typeof window !== 'undefined') {
        localStorage.setItem('Name', data[Attributes.Name])
        localStorage.setItem('Admin', data[Attributes.Admin])
        if (router.pathname == "/signup") {
            if (data[Attributes.Admin]) {
                return logLayout()
            } else {
                alert(Errors.Permission)
                router.push('/')
            }
        }
    }


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

export default Layout;