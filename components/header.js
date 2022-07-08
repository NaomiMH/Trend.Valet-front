import React from 'react';
import Btn_Standard from './buttons/btn_standard';
import Image from "next/image";
import { Text } from './text/text';

const Header = ({ width }) => {
    // Scale of the logo
    const scale = 1;

    // query de apollo
    // const { data, loading, error} = useQuery(OBTENER_USUARIO);

    // if(loading) return null;

    // if(!data) {
    //     return router.push('/login');
    // }

    // const { nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion = () => {
        console.log("Click")
    }

    return (
        <div className="flex md:flex-1 justify-between items-center">
            {width < 500 ? null : (
                <div className='hidden md:block'>
                    <Image src="/Trend Technologies Corporate Logo-PhotoRoom.png" alt="Trend Technologies" height={25 * scale} width={100 * scale} />
                </div>
            )}
            <p className="mr-2">{Text.Hello}: nombre apellido</p>
            <Btn_Standard btnClick={cerrarSesion} btnName={Text.Signoff} />
        </div>

    );
}

export default Header;