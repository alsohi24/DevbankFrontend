import React from 'react';
import HeaderComponent from '@components/HeaderComponent/';
import ModalComponent from '@components/ModalComponent/';
import ButtonComponent from '@components/ButtonComponent/';

import ListaController from '@services/ListaController/';
import ClienteController from '@services/ClienteController/';
import {ReactComponent as EditIcon} from '@icons/edit.svg'
import './index.scss';
import InputMask from 'react-input-mask';

const {useState, useEffect} = React;


export default () => {
    
    const [showModal, setShowModal] = useState(false);
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [form, setForm] = useState(false);
    const [tipoCuenta, setTipoCuenta] = useState(false);
    const [cuentas, setCuentas] = useState(false);
    const [productos, setProductos] = useState(false);

    function crear(){
        setShowModal(true);
    }

    function crearSubmit() {
        const body = {
            cuenta: {
                ctaNuCuenta: "10000000",
                ctaNuCuentaCci: "04410000000",
                ctaSaldo: 1000,
                ctaEstId: 1,
                tipoCuenta: {
                    tctaId: 1
                },
                usuario: {
                    usuId: 1
                },
                producto: {
                    prodId: 1
                }
            }
        }
        ClienteController.postRegister(body).then((result) => {
            if(result.status === 200){
                setForm({});
                setShowModal(false);
                setShowModalSuccess(true);
            }
        }).catch((error) => {
            console.log('Error', error);
            setShowModal(false);
            setShowModalError(true);
        });
    }

    function handleForm(event) {
        let inputName = event.target.name;
        let inputValue = event.target.value;
        setForm({...form, [inputName]: inputValue})
    }

    useEffect(() => {
        ListaController.getTipoCuenta().then(({data}) => {
            const result = data.data;
            setTipoCuenta(result);
        })

        ListaController.getCuentas().then(({data}) => {
            const result = data.data;
            setCuentas(result);
        })

        ListaController.getProductos().then(({data}) => {
            const result = data.data;
            console.log(result)
            setProductos(result);
        })
    }, [])


    return (
        <div className="p_cuentas">
            <HeaderComponent/>
            <div className="p_cuentas__list">
                <div className="p_cuentas__list_header">
                    <h2 className="e-h6">Cuentas</h2>
                    <button onClick={()=>{crear()}} className="p_cuentas__list_header_new e-p6">Nuevo</button>
                </div>
                <table className="p_cuentas__table">
                    <thead className="p_cuentas__table_head">
                        <tr>
                            <td>Numero Cuenta</td>
                            <td>Numero Cuenta CCI</td>
                            <td>Saldo</td>
                            <td>Tipo Cuenta</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody className="p_cuentas__table_body">

                   { cuentas &&
                                cuentas.map((c) => {
                                    return (
                                        <tr value={c.ctaId}>                                        
                                        <td>{c.ctaNuCuenta}</td>
                                        <td>{c.ctaNuCuentaCci}</td>
                                        <td>{c.ctaSaldo}</td>
                                        <td>{c.tipoCuenta.tctaDescripcion}</td>
                                        {/* <td>{c.ctaNuCuentaCci}</td>
                                        <td>{c.ctaNuCuentaCci}</td>
                                        <td>{c.ctaNuCuentaCci}</td> */}
                                        <td><EditIcon height="20px"/></td> 
                                        
                                        </tr>
                                    )
                                })
                            }
                        {/* <tr>
                            <td>123</td>
                            <td>Bruno Reyes</td>
                            <td>brunorebu12@gmail.com</td>
                            <td>997919677</td>
                            <td>DNI</td>
                            <td>70287443</td>
                            <td>APROBADO</td>
                            <td><EditIcon height="20px"/></td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
            <ModalComponent 
                title="Crear Cliente"
                show={showModal}
                handleClose={()=>{setShowModal(false);}}
                footer={
                    <div className="p_cuentas__modal_buttons">
                        <ButtonComponent theme="secondary" action={()=>{crearSubmit()}}>Guardar</ButtonComponent>
                        <ButtonComponent theme="primary" action={()=>{setShowModal(false);}}>Cerrar</ButtonComponent>
                    </div>
                }
            >
                <form>
                    <div className="p_cuentas__field_box">
                        <label className="p_cuentas__field_label e-p4 e-p6:md">Número de cuenta:</label>
                        {/* <input name="ctaNuCuenta" onChange={handleForm} className="p_cuentas__field_input e-p2 e-p4:md"></input> */}
                        <InputMask name="ctaNuCuenta"  mask="9999 9999 9999 99" maskChar=" " onChange={handleForm} className="p_cuentas__field_input e-p2 e-p4:md" />
                    </div>
                    <div className="p_cuentas__field_box">
                        <label className="p_cuentas__field_label e-p4 e-p6:md">Número de Cuenta CCI:</label>
                        {/* <input name="ctaNuCuentaCci" onChange={handleForm} className="p_cuentas__field_input e-p2 e-p4:md"></input> */}
                        <InputMask name="ctaNuCuentaCci" mask="0\4\9 9999 9999 9999 99" maskChar=" " onChange={handleForm} className="p_cuentas__field_input e-p2 e-p4:md" />
                    </div>

                    <div className="p_cuentas__field_box">
                        <label className="p_cuentas__field_label e-p4 e-p6:md">Saldo:</label>
                        <input name="direccion" onChange={handleForm} className="p_cuentas__field_input e-p2 e-p4:md"></input>
                    </div>

                    <div className="p_cuentas__field_box">
                        <label className="p_cuentas__field_label e-p4 e-p6:md">Tipo de Cuenta:</label>
                        <select name="tipoDocumento" onChange={handleForm} className="p_cuentas__field_select e-p6">
                            <option value="">Seleccionar</option>
                            { tipoCuenta &&
                                tipoCuenta.map((tpcuenta) => {
                                    return (
                                        <option value={tpcuenta.tctaId}>{tpcuenta.tctaDescripcion}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="p_cuentas__field_box">
                        <label className="p_cuentas__field_label e-p4 e-p6:md">Productos:</label>
                        <select name="tipoDocumento" onChange={handleForm} className="p_cuentas__field_select e-p6">
                            <option value="">Seleccionar</option>
                            { productos &&
                                productos.map((p) => {
                                    return (
                                        <option value={p.prodId}>{p.prodDescripcion}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="p_cuentas__field_box">
                        <label className="p_cuentas__field_label e-p4 e-p6:md">Usuario:</label>
                        <select name="tipoDocumento" onChange={handleForm} className="p_cuentas__field_select e-p6">
                            <option value="">Seleccionar</option>
                            { productos &&
                                productos.map((p) => {
                                    return (
                                        <option value={p.prodId}>{p.prodDescripcion}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="p_cuentas__field_box">
                        <label className="p_cuentas__field_label e-p4 e-p6:md">Estado:</label>
                        <select name="ctaEstId" onChange={handleForm} className="p_cuentas__field_select e-p6">
                            <option value="1">ACTIVO</option>
                            <option value="0">INACTIVO</option>
                        </select>
                    </div>
                </form>
            </ModalComponent>
            <ModalComponent
                title=""
                show={showModalSuccess}
                handleClose={()=>{setShowModalSuccess(false);}}
                footer={
                    <div className="p_cuentas__modal_buttons">
                        <ButtonComponent theme="primary" action={()=>{setShowModalSuccess(false);}}>Cerrar</ButtonComponent>
                    </div>
                }
            >
                <h3 className="e-h3">Se registro correctamente el cliente</h3>
            </ModalComponent>
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
                <h3 className="e-h3">Ha ocurrido un error al registrar el cliente</h3>
            </ModalComponent>
        </div>
    )
}