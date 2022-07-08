import Sidebar from "./sidebar";
import Header from "./header";
import { useRouter } from "next/router";
import Alert_global from "./alert/alert_global";

const Layout = ({ children, width }) => {
    // Get the router
    const router = new useRouter();

    return (
        <>
            {router.pathname === "/login" || router.pathname === "/signup" ? (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                    {children}
                </div>
            ) : (
                <div className="flex flex-col md:flex-row min-h-screen">
                    <Sidebar width={width} />
                    <main className="w-full md:w-3/4 xl:w-6/7 md:min-h-screen">
                        {width < 400 ? null : (
                            <Alert_global />
                        )}
                        <div className="m-5">
                            <Header width={width} />
                            {children}
                        </div>
                    </main>
                </div>
            )}
        </>
    )
}

export default Layout;