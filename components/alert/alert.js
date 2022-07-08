import { Errors } from "../text/error";

// Example
{
    // Import Alert_path, Alert_Show
    // import useSound from 'use-sound';
    // Save sound
    // const [play] = useSound(Alert_path);
    // Call function
    // Alert_show("Something", play)
}

// export const Alert_path = "/machine-key-press.mp3"
// export const Alert_path = "/digital-quick-tone.mp3"
// export const Alert_path = "/video-game-alert.mp3"
// export const Alert_path = "/software-start.mp3"
export const Alert_path = "/alert-quick-chime.mp3"

// Play sound with alert
export function Alert_show(message, play) {
    console.log(message)
    try {
        window.navigator.vibrate(100);
    } catch {
        console.log("No vibro");
    }
    if (!play) {
        setTimeout(() => {
            alert(Errors.ParameterMissing("Alert_show", "play"))
            return
        }, 500);
    } else {
        play()
        setTimeout(() => {
            alert(message)
        }, 500);
    }
}