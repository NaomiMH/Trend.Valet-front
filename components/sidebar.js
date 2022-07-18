import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { Text } from "./text/text";

const Sidebar = ({ width, admin }) => {
    // Get the router
    const router = new useRouter();

    // Content of each menu
    const menu_sistema = [
        { name: Text.Users, link: "/sistema/users" },
        { name: Text.Emails, link: "/sistema/emails" }
    ];
    const menu_consultas = [
        { name: Text.HistoryLabels, link: "/consultas/detalle" }
    ];

    const menu_scanner = [
        { name: Text.TestLabels, link: "/test/etiqueta" },
        { name: Text.CheckLabels, link: "/procesos/recepcion/agregar" },
    ];

    let [show_sistema, setShowSistema] = useState(false);
    let [show_consultas, setShowConsultas] = useState(false);

    function fill_detail_menu(object) {
        return (
            <li key={object.name} className={router.pathname === object.link ? "bg-light-blue p-1.5" : "p-1.5"}>
                <Link href={object.link}>
                    <a className="text-white block text-sm">
                        {object.name}
                    </a>
                </Link>
            </li>
        )
    }

    function fill_menu() {
        return (
            <>
                <Link href="/">
                    <p className="text-white text-2xl font-black cursor-pointer">VALET</p>
                </Link>
                <nav className="mt-1 list-none">
                    {admin ? (
                        <>
                            <p
                                onClick={() => setShowSistema(!show_sistema)}
                                className="text-white text-base font-black cursor-pointer"
                            >
                                {Text.System}
                            </p>
                            <div className={show_sistema ? 'block' : 'hidden'}>
                                {menu_sistema.map((link) => (fill_detail_menu(link)))}
                            </div>
                        </>
                    ) : null}
                    <p
                        onClick={() => setShowConsultas(!show_consultas)}
                        className="text-white text-base font-black cursor-pointer"
                    >
                        {Text.Queries}
                    </p>
                    <div className={show_consultas ? 'block' : 'hidden'}>
                        {menu_consultas.map((link) => (fill_detail_menu(link)))}
                    </div>
                </nav>
            </>
        )
    }

    function fill_mini_menu() {
        return (
            <>
                <Link href="/">
                    <p className="text-white text-2xl font-black cursor-pointer">VALET</p>
                </Link>
                <nav className="mt-1 list-none">
                    {menu_scanner.map((link) => (fill_detail_menu(link)))}
                </nav>
            </>
        )
    }

    return (
        <>
            <aside className="w-full md:w-1/4 xl:1/7 md:min-h-screen bg-dark-blue px-6 pb-4 left-0 md:px-5 md:py-3">
                {width < 400 ? (
                    <ul>
                        {fill_mini_menu()}
                    </ul>
                ) : fill_menu()}
            </aside>
        </>
    )
}

export default Sidebar;