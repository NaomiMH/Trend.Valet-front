import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { React } from 'react';
import useSound from 'use-sound';
import * as Yup from 'yup';
import { Alert_path } from '../components/alert/alert';
import { Fetch_Next } from '../components/fetch/fetch_next';
import Form_Log from '../components/form/form_log';
import { Attributes } from '../components/helpers/consts';
import { Log } from '../components/helpers/database';
import Layout from '../components/layout';
import { Errors } from '../components/text/error';
import { Text } from '../components/text/text';

const Login = () => {
    // Save sound
    const [play] = useSound(Alert_path);
    // routing
    const router = useRouter();

    // Values for the Form
    const FormValues = [
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
        }
    ]

    function nextSubmit(data) {
        localStorage.setItem('token', data.result)
        router.push('/')
    }

    async function fSumbit(data) {
        Fetch_Next(Log.login, play, nextSubmit, "put", { data })
    }

    return (

        <>
            <Layout>
                <h1 className="text-center text-2xl text-white font-light">{Text.Login}</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <Form_Log
                            FlistValues={FormValues}
                            FonSubmit={fSumbit}
                            FNombre={Text.Login}
                        />
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Login;