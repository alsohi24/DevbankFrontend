import React from 'react'
import ModalComponent from '@components/ModalComponent/';
import ButtonComponent from '@components/ButtonComponent/';

import './index.scss'
import SolicitudesController from '../../../services/SolicitudesController';

const {useState, useEffect} = React;

export default (props) =>{
    const [showModal, setShowModal] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);


    const [codigo, setCodigo] = useState(false);
    const [form, setForm] = useState(false);

    function crear(){
        setShowModal(true);
    }
    function handleForm(event) {
        let inputName = event.target.name;
        let inputValue = event.target.value;
        setForm({...form, [inputName]: inputValue})
    }

    function crearSolictitud(){
        //SESSION
        const body = {
            "soliEstado":"1",
            "soliUsu":sessionStorage.getItem("user_name") ,
            "soliOperacion":"CREAR"
        }
        SolicitudesController.postProcesarSolicitud(body).then(({data}) => {
            const result = data.data;
            console.log(data)
        }).catch((error) => {
            console.log('Error', error);
            //setShowModal(false);
            setShowModalError(true);
        });
        setCodigo(true);
    }
    function validarCodigo(){
        //SESSION
        const body = {
            "soliEstado":"1",
            "soliUsuId":"1",
            "soliOperacion":"CREAR"
        }
        setShowModal(false)
        setShowSuccess(true)
        //setCodigo(true);
    }

    return (
        <div className="c_token__container">
            <ModalComponent 
                title="Crear Cliente"
                show={showModal}
                handleClose={()=>{console.log("wwwwww");setShowModal(false);}}                
            >         
                <div>
                <h3 className="e-h3" >Active su token para poder realizar movimientos!</h3>

                    {codigo &&
                    <>
                        <input onChange={handleForm}  name="codigo" className="btn_atc  c_token__field_input e-p2 e-p4:md" ></input>
                        <button onClick={()=>{validarCodigo()}} className="btn_atc c_token__button e-p3 e-p6:lg" >Enviar código</button>
                        </>
                    }
                {!codigo &&
                    <>
                        <button onClick={()=>{crearSolictitud()}} className="btn_atc c_token__button e-p3 e-p6:lg" >Activar</button>
                   </>
                    }
                </div>
            </ModalComponent>
                <h3 className="e-p1"></h3>
                <button className="c_token__button e-p3 e-p6:md" onClick={()=>{crear()}} >Solicitar Código de Seguridad</button>
                <ModalComponent
                title=""
                show={showModalError}
                handleClose={()=>{setShowModalError(false);}}
                footer={
                    <div className="p_cuentas__modal_buttons">
                        <ButtonComponent theme="primary" action={()=>{setShowModalError(false);}}>Cerrar</ButtonComponent>
                    </div>
                }
            >
                <h3 className="e-h3">Intente de nuevo</h3>
            </ModalComponent>
            <ModalComponent
                title=""
                show={showSuccess}
                handleClose={()=>{setShowSuccess(false);}}
                footer={
                    <div className="p_cuentas__modal_buttons">
                        <ButtonComponent theme="primary" action={()=>{setShowSuccess(false);}}>Cerrar</ButtonComponent>
                    </div>
                }
            >
                <h3 className="e-h3">Succes!</h3>
            </ModalComponent>
        </div>
    )
}