import { Grid, Modal, Avatar } from '@mui/material'
import useForm from '../../Hooks/useForm'
import { useState } from 'react'
import Boton from '../dash/boton'
import Input from '../admin/Input'
import dayjs from 'dayjs'
import { useHabilitar } from '../../Hooks/useHabilitar'
import { getDataById } from '../../utils/getDataById'
import axios from 'axios'
import Message from '../dash/succesfulMessage'
import InputDate from '../dash/inputDate'
import Swal from 'sweetalert2';



const defaultValues = {
    nombre_mascota: '',
    fecha_nacimiento_mascota: dayjs(),
    tipo_sangre_mascota: '',
    color_mascota: '',
    raza_mascota: '',
    peso_mascota: '',
    tamanno_mascota: '',
    micochip_mascota: 1,
    foto_mascota:''
}

export const FromGestionarMascota = (props) => {
    const { label, bgColor, icon, tooltip, id, actualizar, dato, successMessage, errorMessage } = props
    const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(defaultValues)
    const { desabilitado, validarId } = useHabilitar({ id })
    const [error, setError] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [buffer,setBuffer] = useState(null)
    const [success, setSuccess] = useState('')
    const [open, setOpen] = useState(false)


    const handleModal = async () => {
        successMessage('')
        errorMessage('')
        const { todosDatos, validacion } = await getDataById({ id, endpoind: 'gestionar_mascotas', defaultValues })
        console.log(todosDatos)
        if (validacion) {
            if (todosDatos instanceof Error) {
                setError(todosDatos)
            } else {
                setValues(todosDatos)
                setAvatar(todosDatos.foto_mascota === null || todosDatos.foto_mascota === null ? null:todosDatos.foto_mascota)
                setOpen(true)
            }
        }
    }


    const handleClose = () => {
        setBuffer(null)
        setError('')
        setSuccess('')
        setOpen(false)
    }

    const handleAvatarChange = (event) => {
        setAvatar(URL.createObjectURL(event.target.files[0]));
        setBuffer(event.target.files[0])
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            for (let key in values) {
                if (values[key] === '' && key!=='anotacion_mascota' && key!=='foto_mascota') {
                    setError('Por favor, completa todos los campos.');
                    return;
                }
            }
            const formattedFechaNacimiento = new Date(values.fecha_nacimiento_mascota).toISOString().slice(0, 19).replace('T', ' ');
            const updatedValues = {
                ...values,
                fecha_nacimiento_mascota: formattedFechaNacimiento
            };

            if(buffer){
                const formData = new FormData();
                formData.append('archivo',buffer)
                try {
                    const link = await axios.post('http://localhost:4321/files/avatarMascota', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    updatedValues.foto_mascota = link.data.link
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al cargar la imagen',
                        text: 'Por favor vuelva a reintentar la solicitud.',
                    });
                    return
                }
            }

            const response = await axios.patch(`http://localhost:4321/gestionar_mascotas/actualizar/${id}`, updatedValues);
            Swal.fire({
                title: "Actualizado...",
                text: "Mascota actualizada con exito",
                icon: "success"
            });
            actualizar(!dato);
            handleClose();
        } catch (error) {
            console.log(error);;
        }
    };


    return (
        <div>
            <Boton
                onClick={handleModal}
                bgColor={bgColor}
                icon={icon}
                tooltip={tooltip}
                desable={desabilitado}
            />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] border border-solid border-black rounded-lg shadow p-4 bg-white' autoComplete='off' id='form' noValidate>
                    <h1 className='text-3xl text-center    const [avatar, setAvatar] = useState(null); mb-2'>{label}</h1>
                    {error && (
                        <Message severity={'error'} message={error} />
                    )}
                    {success && (
                        <Message severity={'success'} message={success} />
                    )}
                    <div className="flex flex-col items-center">
                        <Avatar alt="Avatar" src={avatar} sx={{ width: 150, height: 150 }} />
                        <input id="avatar-input" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                        <label htmlFor="avatar-input" className="mt-3 mb-4  mr-3 inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-blue-700 to-cyan-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white ">
                            Subir Imagen
                        </label>
                    </div>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='nombre_mascota'
                                fullWidth
                                label='Nombre Mascota'
                                name='nombre_mascota'
                                value={values.nombre_mascota}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='raza_mascota'
                                label='Raza'
                                name=' raza_mascota'
                                value={values.raza_mascota}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='color_mascota'
                                fullWidth
                                label='color mascota'
                                name='color_mascota'
                                value={values.color_mascota}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='peso_mascota'
                                label='Peso mascota'
                                name='peso_mascota'
                                value={values.peso_mascota}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        {validarId && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <InputDate
                                        id='fecha_nacimiento_mascota'
                                        fullWidth
                                        label='Fecha de nacimiento'
                                        name='fecha_nacimiento_mascota'
                                        fecha={dayjs(values.fecha_nacimiento_mascota).format('YYYY-MM-DD')}
                                        onChange={handleInputChangeDate}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Input
                                        id='tamanno_mascota'
                                        label='tamaño mascota'
                                        name='tamanno_mascota'
                                        value={values.tamanno_mascota}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input
                                        id='tipo_mascota'
                                        label='Tipo mascota'
                                        name='tipo_mascota'
                                        value={values.tipo_mascota}
                                        onChange={handleInputChange}
                                        disabled={true}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input
                                        id='genero_mascota'
                                        label='Genero mascota'
                                        name='genero_mascota'
                                        value={values.genero_mascota}
                                        onChange={handleInputChange}
                                        disabled={true}
                                        required
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <button
                                type='submit'
                                className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
                            >
                                Registrar
                            </button>
                        </Grid>
                    </Grid>
                </form>
            </Modal>
        </div>
    )
}
