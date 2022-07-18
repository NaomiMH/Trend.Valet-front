import { useRouter } from 'next/router';
import React from 'react';
import useSound from 'use-sound';
import * as Yup from 'yup';
import { Alert_path, Alert_show } from '../components/alert/alert';
import { Fetch_Next } from '../components/fetch/fetch_next';
import Form_Log from '../components/form/form_log';
import { Attributes } from '../components/helpers/consts';
import { Log } from '../components/helpers/database';
import Layout from '../components/layout';
import { Errors } from '../components/text/error';
import { Message } from '../components/text/message';
import { Text } from '../components/text/text';


const NuevaCuenta = () => {
    // Save sound
    const [play] = useSound(Alert_path);
    // Routing
    const router = useRouter();
    
    // Values for the Form
    const FormValues = [
        {
            name: Attributes.Name,
            initialValue: '',
            validation: Yup.string().required(Errors.Require(Text.Name)),
            text: Text.Name,
            placeholder: Text.Name,
            type: "text"
        },
        {
            name: Attributes.Username,
            initialValue: '',
            validation: Yup.string().required(Errors.Require(Text.Username)),
            text: Text.Username,
            placeholder: Text.Username,
            type: "text"
        },
        {
            name: Attributes.Password,
            initialValue: '',
            validation: Yup.string().required(Errors.Require(Text.Password)),
            text: Text.Password,
            placeholder: Text.Password,
            type: "password"
        },
        {
            name: Attributes.Admin,
            initialValue: '',
            validation: Yup.boolean(),
            text: Text.Admin,
            type: "checkbox"
        }
    ]

    function nextSubmit() {
        Alert_show(Message.Save, play)
        router.push('/sistema/users')
    }

    async function fSumbit(data) {
        data[Attributes.Admin] = data[Attributes.Admin] ? 1 : 0
        Fetch_Next(Log.signup, play, nextSubmit, "post", { data })
    }

    return (
        <>
            <Layout>
                <h1 className="text-center text-2xl text-white font-light">{Text.Signup}</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <Form_Log
                            FlistValues={FormValues}
                            FonSubmit={fSumbit}
                            FNombre={Text.Signup}
                        />
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default NuevaCuenta;