import { useState } from 'react';
import useSound from 'use-sound';
import { Alert_path, Alert_show } from '../../../components/alert/alert';
import Btn_Standard from '../../../components/buttons/btn_standard';
import { Send_Email } from '../../../components/email/send_email';
import { Fetch_Next } from '../../../components/fetch/fetch_next';
import { Attributes } from '../../../components/helpers/consts';
import { Label, Scanner } from '../../../components/helpers/database';
import Get_Position from '../../../components/helpers/get_position';
import In_standard from '../../../components/input/in_standard';
import Layout from '../../../components/layout';
import { Scanner_Reading } from '../../../components/scanner/scanner_reading';
import { Errors } from '../../../components/text/error';
import { Message } from '../../../components/text/message';
import { Text } from '../../../components/text/text';

const RecepcionAgregar = () => {
    // Default Read
    const defaultRead = {
        1: {},
        2: {},
        3: {},
        error: 0
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
        tempRead[count] = { reading, info, accepted: 0, error: 0 }
        if (type == "error messy" || type == "error unknown") {
            Alert_show(Errors.ErrorLabel, play)
            tempRead["error"] = 1
            tempRead[count]["error"] = 1
        }

        if (count == 3) {
            tempRead[1].accepted = 1
            if (!tempRead[1].error) {
                if (!tempRead[2].error) {
                    if (tempRead[1].info[Attributes.Clave_Material] == tempRead[2].info[Attributes.Clave_Material]) {
                        tempRead[2].accepted = 1
                    }
                }
                if (!tempRead[3].error) {
                    if (tempRead[1].info[Attributes.Clave_Material] == tempRead[3].info[Attributes.Clave_Material]) {
                        tempRead[3].accepted = 1
                    }
                }
            }
        }
        setCount(count + 1)
        setRead(tempRead)
    }

    function resetValues() {
        setCount(1)
        setDescription("")
        setRead(defaultRead)
    }

    async function nextSave(data) {
        if ("emailList" in data) {
            if ("msg" in data.emailList) {
                Alert_show(data.email.msg, play)
            }

            if (!data[Attributes.Result] || read["error"]) {
                const name = localStorage.getItem('Name')
                if (!name) {
                    Alert_show(Errors.ParameterMissing('nextSave', Attributes.Name), play)
                    return
                }

                if (data.emailList.length == 0) {
                    Alert_show(Errors.MissingEmails, play)
                    return
                }

                const templateParams = {
                    nombre: name,
                    fecha: data[Attributes.Date].replace("T", " ").slice(0, Get_Position(data[Attributes.Date], ".", 1)),
                    error: read["error"] ? Errors.ErrorLabel : "",
                    label1: data[Attributes.Label2],
                    label1R: read[2].accepted && !read[2]["error"] ? Text.Accepted : Text.Refused,
                    label2: data[Attributes.Label3],
                    label2R: read[3].accepted && !read[3]["error"] ? Text.Accepted : Text.Refused,
                    label3: data[Attributes.Label1],
                    label3R: !read[1]["error"] ? "" : Text.Refused,
                    turno: data[Attributes.Shift],
                    emails: data.emailList.map((elem) => elem[Attributes.Email]).join(";"),
                }

                await Send_Email(templateParams, play)
            }
        }
        resetValues()
    }

    function saveData() {
        if (count != 4) {
            Alert_show(Errors.MissingData, play)
            return
        }

        // Comprobar resultado final
        const postData = {}
        postData[Attributes.Label3] = read[1].reading
        postData[Attributes.Label1] = read[2].reading
        postData[Attributes.Label2] = read[3].reading
        if (read[1].accepted && read[2].accepted && read[3].accepted) {
            postData[Attributes.Result] = 1
        } else {
            postData[Attributes.Result] = 0
        }

        // Enviar resultado final
        Fetch_Next(Label.postLabel, play, nextSave, "post", { data: postData })
    }

    function check(num) {
        if (count > 3) {
            if (num == 4) {
                if (read[1].accepted && read[2].accepted && read[3].accepted && !read["error"]) {
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
            if (read[num].accepted && !read[num].error) {
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
        if (count > num) {
            if (read[num].reading) {
                return (
                    <p className='text-yellow-600 font-bold'>
                        {Text.Read}
                    </p>
                )
            }
        }
        return <p>{Text.None}</p>
    }

    return (
        <Layout width={399}>
            <div className="my-3">
                <h1 className="text-2xl text-gray-800 font-light">{Text.CheckLabels}</h1>
                <div className='my-3'>
                    <p>{Message.ThirdLabel}: {check(1)}</p>
                    <p>{Message.FirstLabel}: {check(2)}</p>
                    <p>{Message.SecondLabel}: {check(3)}</p>
                    <p>{Text.Result}: {check(4)}</p>
                    {count < 4 ? (
                        <>
                            <label className='font-bold'>{Text.Scann} {count == 1 ? Message.ThirdLabel : count == 2 ? Message.FirstLabel : Message.SecondLabel}</label>
                            <In_standard
                                inName={"etiqueta"}
                                inPlaceHolder={Text.SelectScann}
                                onChange={saveChange} />
                        </>
                    ) : null}
                    <div className='text-right'>
                        <Btn_Standard btnName={Text.Finish} btnClick={saveData} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default RecepcionAgregar