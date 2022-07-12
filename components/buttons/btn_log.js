import React from 'react';
import useSound from 'use-sound';

// Ejemplo
// <Btn_Log btnName={"nombre"} />

const Btn_Log = ({ btnName }) => {
    // const [play] = useSound("/alert-quick-chime.mp3")
    // const [play] = useSound("/software-start.mp3")
    // const [play] = useSound("/video-game-alert.mp3")
    // const [play] = useSound("/digital-quick-tone.mp3")
    const [play] = useSound("/machine-key-press.mp3")

    return (
        <input
                    type="submit"
                    className="bg-dark-blue w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-light-blue"
                    onClick={play}
                    value={btnName}
                />
    );
}

export default Btn_Log;