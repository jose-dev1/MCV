import VacunasRegistardas from '..//..//components/veterinario/vacunasRegistrados'

const vacunas = [
    { id: 1, value: 'Parvovirosi' },
    { id: 2, value: 'Pentavalente' },
    { id: 3, value: 'Pentavalente + coronavirus' },
    { id: 4, value: 'Pentavalente + coronavirus' },
    { id: 5, value: 'Rabia' },
    { id: 6, value: 'Tos de perreras (opcional) (KC)*' },
]
const VacunasComponent = () => {

    return (
        <VacunasRegistardas />
    );
};

export default VacunasComponent;
