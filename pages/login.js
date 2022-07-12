import { React } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Errors } from '../components/text/error';
import { Text } from '../components/text/text';
import { Attributes } from '../components/helpers/consts';
import Form_Log from '../components/form/form_log';
import { Log } from '../components/helpers/database';
import useSound from 'use-sound';
import { Alert_path } from '../components/alert/alert';
import { Fetch_Next } from '../components/fetch/fetch_next';

const Login = () => {
    // Save sound
    const [play] = useSound(Alert_path);

    // routing
    const router = useRouter();

    const formik = useFormik({
        onSubmit: async valores => {
            // console.log(valores);
            const { email, password } = valores;

            try {
                guardarMensaje('Autenticando...');

                // Guardar el token en localstorage
                // setTimeout(() => {
                //     const { token } = data.autenticarUsuario;
                //     localStorage.setItem('token', token);
                // }, 1000);

                // Redireccionar hacia clientes
                setTimeout(() => {
                    guardarMensaje(null);
                    router.push('/');
                }, 2000);

            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ', ''));
                // console.log(error);

                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
            }
        }
    })

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