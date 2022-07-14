import Layout from '../../../components/Layout';
import Btn_Standard from '../../../components/buttons/btn_standard';
import In_standard from '../../../components/input/in_standard';
import { useState } from 'react';
import { Attributes } from '../../../components/helpers/consts';
import { Scanner } from '../../../components/helpers/database';
import useSound from 'use-sound';
import { Alert_path, Alert_show } from '../../../components/alert/alert';
import { Fetch_Next } from '../../../components/fetch/fetch_next';
import { Scanner_Reading } from '../../../components/scanner/scanner_reading';
import { Text } from '../../../components/text/text';
import { Message } from '../../../components/text/message';

const RecepcionAgregar = () => {
    // Default Read
    const defaultRead = {
        1: {},
        2: {},
        3: {}
    }

    // Count
    const [count, setCount] = useState(1);
    // Reading
    const [read, setRead] = useState(defaultRead);
    // First line description
    const [description, setDescription] = useState("");
    // Save sound
    const [play] = useSound(Alert_path);

    // Get the scanner reading
    function saveChange(event) {
        if (count > 3) {
            Alert_show(Message.FinishFirst, play)
            event.target.value = ""
            return
        }

        const [type, info, reading] = Scanner_Reading(event, { description })

        const postData = {}
        postData[Attributes.Lectura] = reading
        postData[Attributes.Resultado] = type
        Fetch_Next(Scanner.post, play, () => { }, "post", { data: postData })
        
        if (type == "description") {
            setDescription(info)
            return
        } else {
            setDescription("")
        }

        const tempRead = read
        tempRead[count] = { reading, accepted: 0 }
        if (count == 1) {
            tempRead[count].accepted = 1
        } else if (reading == read[1].reading) {
            tempRead[count].accepted = 1
        }
        setCount(count + 1)
        setRead(tempRead)
    }

    function resetValues() {
        setCount(1)
        setDescription("")
        setRead(defaultRead)
    }

    function saveData() {
        // Comprobar resultado final
        const postData = {}
        if (!read[1].reading) {
            postData[Attributes.Label1] = "NULL"
        } else {
            postData[Attributes.Label1] = read[1].reading
        }
        if (!read[2].reading) {
            postData[Attributes.Label2] = "NULL"
        } else {
            postData[Attributes.Label2] = read[2].reading
        }
        if (!read[3].reading) {
            postData[Attributes.Label3] = "NULL"
        } else {
            postData[Attributes.Label3] = read[3].reading
        }

        if (read[1].accepted && read[2].accepted && read[3].accepted) {
            postData[Attributes.Result] = 1
        } else {
            postData[Attributes.Result] = 0
        }

        // Enviar resultado final
        console.log(postData)
        // Fetch_Next()
    }

    function check(num) {
        if (count > num) {
            if (read[num].accepted) {
                return (
                    <p className='text-green-600 font-bold'>
                        {Text.Accepted}
                    </p>
                )
            }
            return (
                <p className='text-red-600 font-bold'>
                    {Text.Refused}
                </p>
            )
        }
        return <p>{Text.None}</p>
    }

    return (
        <Layout width={399}>
            <div className="my-3">
                <h1 className="text-2xl text-gray-800 font-light">{Text.ReceiveMaterials}</h1>
                <div className='my-3'>
                    <p>{Text.Read} #1: {check(1)}</p>
                    <p>{Text.Read} #2: {check(2)}</p>
                    <p>{Text.Read} #3: {check(3)}</p>
                    <label>{Text.Scann} {Text.Material}</label>
                    <In_standard
                        inName={"etiqueta"}
                        inPlaceHolder={Text.SelectScann}
                        onChange={saveChange} />
                    <div className='text-right'>
                        <Btn_Standard btnName={Text.Finish} btnClick={saveData} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default RecepcionAgregar