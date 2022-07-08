import React from 'react';
import useSound from 'use-sound';

// Ejemplo
// <Btn_Standard btnName={"nombre"} btnClick={funcion} />

const Btn_Standard = ({ btnName, btnClick = null, btnDisable = null, btnType = "button" }) => {
    // const [play] = useSound("/alert-quick-chime.mp3")
    // const [play] = useSound("/software-start.mp3")
    // const [play] = useSound("/video-game-alert.mp3")
    // const [play] = useSound("/digital-quick-tone.mp3")
    const [play] = useSound("/machine-key-press.mp3")

    return (
        <input
            type={btnType}
            className={`${btnDisable ? "bg-slate-400" : "bg-light-blue cursor-pointer hover:bg-dark-blue"} py-2 px-2 inline-block text-white rounded uppercase font-bold text-sm m-3`}
            value={btnName}
            onClick={btnClick ? () => { play(); btnClick() } : play}
            disabled={btnDisable ? "disabled" : null}
        />
    );
}

export default Btn_Standard;