import React from 'react';
import Btn_Standard from './buttons/btn_standard';
import Image from "next/image";
import { Text } from './text/text';
import { useRouter } from 'next/router';

const Header = ({ width, name }) => {
    // Scale of the logo
    const scale = 1;

    // routing
    const router = useRouter();

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <div className="flex md:flex-1 justify-between items-center">
            {width < 500 ? null : (
                <div className='hidden md:block'>
                    <Image src="/Trend Technologies Corporate Logo-PhotoRoom.png" alt="Trend Technologies" height={25 * scale} width={100 * scale} />
                </div>
            )}
            <p className="mr-2">{Text.Hello}: {name}</p>
            <Btn_Standard btnClick={cerrarSesion} btnName={Text.Signoff} />
        </div>

    );
}

export default Header;