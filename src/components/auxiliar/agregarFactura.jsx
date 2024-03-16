import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Grid, Modal } from '@mui/material';
import useForm from '../../Hooks/useForm';
import Input from '../admin/Input';
import Selects from '../admin/Selects';
import Boton from '../dash/boton';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { TextField } from '@mui/material';
import InputDate from '../dash/inputDate';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const FormAgregarFactura = (props) => {
    const { label, datosEditables, bgColor, icon, tooltip } = props;
    const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(datosEditables);
    const [desabilitado, setDesabilitado] = useState(Object.keys(datosEditables).length === 0);
    const [validarId, setValidarId] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [success, setSuccess] = useState('');
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [selectedServices, setSelectedServices] = React.useState([]);

    const handleModal = () => setOpen(true);
    const handleClose = () => {
        setError('');
        setSuccess('');
        setOpen(false);
    };
    const handleSubmitId = (event) => {
        event.preventDefault();

        if (values.tipo_documento === '' || values.N_documento === '') {
            setError('Por favor, complete los campos necesarios.');
        } else {
            setError('');
            setInfo('Datos cargados exitosamente.');
        }
    };

    const handleSubmit = (event) => {

    };

    return (
        <div>
            <Boton
                onClick={handleModal}
                bgColor={bgColor}
                icon={icon}
                tooltip={tooltip}
                disable={desabilitado}
            />
            <Modal open={open} onClose={handleClose}>
                <form
                    onSubmit={handleSubmit}
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] border border-solid border-black rounded-lg shadow p-4 bg-white'
                    autoComplete='off'
                    id='form'
                    noValidate
                >
                    <h1 className='text-3xl text-center mb-2'>{label}</h1>
                    {info && <Alert className='mb-2' severity="info">{info}</Alert>}
                    {error && <Alert className='mb-2' severity="error">{error}</Alert>}
                    {success && <Alert className='mb-2 mt-5' severity="success">{success}</Alert>}
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='tipo_documento'
                                label='Tipo de Documento'
                                name='tipo_documento'
                                value={values.tipo_documento}
                                onChange={handleInputChange}
                                items={documentItems}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Input
                                id='N_documento'
                                fullWidth
                                label='N°documento'
                                name='N_documento'
                                value={values.N_documento}
                                onChange={handleInputChange}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Boton
                                onClick={handleSubmitId}
                                bgColor='success'
                                icon={<MagnifyingGlassIcon />}
                                tooltip='Buscar'
                                disable={validarId ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='primer_nombre'
                                label='Primer Nombre Dueño'
                                name='primer_nombre'
                                value={values.primer_nombre}
                                disabled={true}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='primer_apellido'
                                fullWidth
                                label='Primer Apellido Dueño'
                                name='primer_apellido'
                                value={values.primer_apellido}
                                disabled={true}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-select-multiple" id="servicios-label">
                                    Servicios
                                </InputLabel>
                                <Select
                                    label="Servicios"
                                    id="servicios"
                                    multiple
                                    value={personName}
                                    onChange={handleServiceChange}
                                    input={<OutlinedInput label="Servicios" id="outlined-select-multiple" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={`${value} (${getServicePrice(value)} COP)`}
                                                    onDelete={() => handleRemoveService(value)}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {Servicios.map((service) => (
                                        <MenuItem
                                            key={service.name}
                                            value={service.name}
                                            style={getStyles(service.name, personName, theme)}
                                        >
                                            {`${service.name} (${service.precio} COP)`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputDate
                                id='fecha_creacion'
                                fullWidth
                                label='Fecha factura'
                                name='fecha_creacion'
                                fecha={values.fecha_creacion}
                                onChange={handleInputChangeDate}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        {validarId && (
                            <Grid item xs={12}>
                                <TextField
                                    id="observacionesAgregadas"
                                    label="Observaciones Agegadas Anteriormente"
                                    name="observacionesAgregadas"
                                    multiline
                                    maxRows={7}
                                    value={values.observaciones}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                id="observaciones"
                                label="Nuevas Observaciones"
                                name='observaciones'
                                multiline
                                maxRows={7}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {validarId && (
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Pago</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="idestado"
                                        onChange={handleInputChangeDate}
                                        value={values.idestado}
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="Si" />
                                        <FormControlLabel value="1" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <div className="flex justify-between items-center">
                                <div>Total:</div>
                                <div>{getTotalPrice()} COP</div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <button
                                type='submit'
                                className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all duration-100 active:transform active:translate-y-1'
                            >
                                Registrar Factura
                            </button>
                        </Grid>
                    </Grid>
                </form>
            </Modal>
        </div>
    );
};
