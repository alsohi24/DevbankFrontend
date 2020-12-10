import React from 'react'
import './index.scss'
import InputMask from 'react-input-mask';
import ModalComponent from '@components/ModalComponent/';
import ButtonComponent from '@components/ButtonComponent/';

const {useState, useEffect} = React;

export default (props) =>{
    const [form, setForm] = useState(false);
    const [showModalError, setShowModalError] = useState(false);

    function validatePermisosOperacion(){
        setShowModalError(true)
    }
    return (
        <div className="c_transfer__container">
            <h3 className="e-p1">Transferencias</h3>

            <div className="c_transfer__accounts_input_group">
                <label className="e-p5">Cuenta Origen</label>
                <select className="c_transfer__select e-p6">
                    <option>Debito Sueldo S/.1500</option>
                </select>
            </div>

            <div className="c_transfer__accounts_input_group">
                <label className="e-p5">Cuenta Destino</label>
                <InputMask className="c_transfer__input e-p6" name="ctaNuCuenta" placeholder="0000 0000 0000 00"  mask="9999 9999 9999 99" maskChar=" " className="p_cuentas__field_input e-p2 e-p4:md" />
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
            </ModalComponent>
        </div>
    )
}