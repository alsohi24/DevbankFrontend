
import React, {useState} from 'react'
import TransferenciaController from '@services/TransferenciaController/';
import ButtonComponent from '@components/ButtonComponent/';
import './index.scss'
import InputMask from 'react-input-mask';
import ModalComponent from '@components/ModalComponent/';
import ButtonComponent from '@components/ButtonComponent/';

const {useState, useEffect} = React;

export default (props) =>{


    const [form, setForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [listCuentas, setListCuentas] = useState([]);

    function validatePermisosOperacion(){
        setShowModalError(true)
    }

    function submitTransferencia() {
        const body = {
            trfrnConcepto: form.concepto,
            trfrnCuentaReceptora: form.cuenta_destino,
            trfrnCuentaRemitente: form.cuenta_origen,
            trfrnMonto: form.monto,
            trfrnServicio: 0,
            trfrnTipoMovimientoDes: "",
            trfrnTipoMovimientoId: 0,
            trfrnTipoServicio: 0
        }
        setIsLoading(true);
        TransferenciaController.postRegister(body).then(()=>{
            setIsSuccess(true);
        }).catch(()=>{
            setIsSuccess(false);
        }).finally(()=>{
            setIsLoading(false);
        })
    }

    function handleForm(event) {
        let inputName = event.target.name;
        let inputValue = event.target.value;
        setForm({...form, [inputName]: inputValue})
    }

    function resetForm(){
        setIsLoading(false)
        setIsSuccess(false)
    }

    return (
        <div className="c_transfer__container">
            <h3 className="e-p1">Transferencias</h3>

            <div className="c_transfer__accounts_input_group">
                <label className="e-p5">Cuenta Origen</label>
                <select name="cuenta_origen" onChange={handleForm} className="c_transfer__select e-p6">
                    <option>Debito Sueldo S/.1500</option>
                </select>
            </div>

            <div className="c_transfer__accounts_input_group">
                <label className="e-p5">Cuenta Destino</label>
                {/* <InputMask className="c_transfer__input e-p6" name="ctaNuCuenta" placeholder="0000 0000 0000 00"  mask="9999 9999 9999 99" maskChar=" " className="p_cuentas__field_input e-p2 e-p4:md" />
            </div>

            <div className="c_transfer__footer">
                <input type="checkbox" name="" id=""/><label className="e-p4 e-p6:md">Acepto los terminos y condiciones</label>
                <button className="c_transfer__button e-p3 e-p6:md" onClick={validatePermisosOperacion} >Transferir</button>
            </div>
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
                <h4 className="e-h4">No cuenta con permisos para realizar esta operación</h4>
            </ModalComponent> */}
                <input  name="cuenta_destino" onChange={handleForm} className="c_transfer__input e-p6" placeholder="0000-0000-00000000000"></input>
            </div>

            <div className="c_transfer__accounts_input_group">
                <label className="e-p5">Concepto</label>
                <input  name="concepto" onChange={handleForm} className="c_transfer__input e-p6" placeholder=""></input>
            </div>

            <div className="c_transfer__accounts_input_group">
                <label className="e-p5">Monto</label>
                <input  name="monto" onChange={handleForm} className="c_transfer__input e-p6" placeholder=""></input>
            </div>

            <div className="c_transfer__footer">
                <input  name="terminos" onChange={handleForm} type="checkbox" name="" id=""/><label className="e-p4 e-p6:md">Acepto los terminos y condiciones</label>
                <button className="c_transfer__button e-p3 e-p6:md" action={()=>{submitTransferencia()}} isLoading={isLoading}>Transferir</button>
            </div>
            {(isLoading || isSuccess) &&
                <div className="c_transfer__layer">
                    {isLoading &&
                        <div className="c_transfer__loader"></div>
                    }
                    {isSuccess &&
                        <ButtonComponent action={()=>{resetForm()}}>Entendido</ButtonComponent>
                    }
                </div>
            }
        </div>
    )
}