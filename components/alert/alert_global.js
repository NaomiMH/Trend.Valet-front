import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { Fetch_Next } from '../fetch/fetch_next';
import { Emb_Enc, Emb_Mat, Loc, Mat_Rec_Enc } from '../helpers/database';
import { Errors } from '../text/error';
import { Text } from '../text/text';
import { Alert_path, Alert_show } from './alert';

const Alert_global = () => {
    // Empty data (dont reload)
    // const [empty, setEmpty] = useState(false)
    // Show global error of Materials
    // const [showMat, setShowMat] = useState(false)
    // Save sound
    // const [play] = useSound(Alert_path);

    // Load the data
    // useEffect(() => {
    //     if (!empty) {
    //         setEmpty(true)
    //         check_material()
    //     }
    // })

    // function nextFunc(res, { setShow, msg }) {
    //     if (res.error) {
    //         setShow(true)
    //         Alert_show(msg, play)
    //     }
    // }

    // function check_material() {
    //     Fetch_Next(Mat_Rec_Enc.withError, play, nextFunc, "get", {}, { setShow: setShowMat, msg: Errors.MaterialsLongWait })
    // }

    return (
        <>
            {/* {showMat ? (
                <p className='block bg-red-500 p-3'>
                    <p className='font-bold'>
                        {Text.Warning}: {Errors.MaterialsLongWait}
                    </p>
                    {Errors.LongWait2(Text.LocateMaterials)}
                </p>
            ) : null} */}
        </>
    );
}

export default Alert_global;