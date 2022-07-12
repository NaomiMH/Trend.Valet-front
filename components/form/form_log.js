import { React } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Text } from '../text/text';
import Btn_Log from '../buttons/btn_log';

// Example
{
    // import * as Yup from 'yup';

    // Values for the Form
    // const FormValues = [
    //     {
    //         name: "rack", // Id
    //         initialValue: '',
    //         validation: Yup.number().required('Ingrese un numero de rack'),
    //         text: "# Rack", // Show text
    //         placeholder: "Numero de Rack",
    //         type: "number"
    //     }
    // ]

    // Sumbit function
    // function fSumbit() {
    //     console.log("aqui")
    // }

    {/* <Form_Log
        FlistValues={FormValues}
        FonSubmit={fSumbit}
        FNombre="Crear Localidad"
        /> */}
}
const Form_Log = ({ FlistValues, FonSubmit, FNombre, mensaje }) => {

    const rInitial = {}
    const rValidation = {}

    for (const dato of FlistValues) {
        rInitial[dato.name] = dato.initialValue
        rValidation[dato.name] = dato.validation
    }

    const formik = useFormik({
        initialValues: rInitial,
        validationSchema: Yup.object(rValidation),
        onSubmit: async valores => await FonSubmit(valores)
    })

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    function addInput(dato) {
        return (
            <>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor={dato.name}>
                        {dato.text}
                    </label>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id={dato.name}
                        type={dato.type}
                        placeholder={dato.placeholder}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[dato.name]}
                    />
                </div>
                {formik.touched[dato.name] && formik.errors[dato.name] ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 " >
                        <p className="font-bold">{Text.Error}</p>
                        <p>{formik.errors[dato.name]}</p>
                    </div>
                ) : null}
            </>
        )
    }

    return (
        <>
            {mensaje && mostrarMensaje()}
            <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
            >
                {FlistValues.map((dato) => addInput(dato))}
                <Btn_Log btnName={FNombre} btnType="submit" />
            </form>
        </>
    );
}

export default Form_Log;