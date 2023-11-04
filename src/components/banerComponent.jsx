import { ClipboardDocumentCheckIcon, EyeDropperIcon, HomeIcon } from '@heroicons/react/20/solid'
import Mascota from '../assets/img/Pets.png'
import 'tailwindcss/tailwind.css';

const features = [
    {
        name: 'Consulta Médica.',
        description:
            'Nuestro equipo de veterinarios altamente capacitados está disponible para atender a su mascota en caso de enfermedades, lesiones o simplemente para realizar chequeos regulares.',
        icon: ClipboardDocumentCheckIcon,
    },
    {
        name: 'Vacunaciones',
        description: 'Mantener a sus mascotas al día con las vacunas es esencial para protegerlas de enfermedades graves. Ofrecemos un programa completo de vacunación adaptado a las necesidades individuales de su mascota.',
        icon: EyeDropperIcon,
    },
    {
        name: 'Hospitalización',
        description: 'En caso de enfermedad grave o cirugía, brindamos servicios de hospitalización y atención especializada para garantizar la recuperación completa de su mascota.',
        icon: HomeIcon,
    },
]

export default function Banner() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">Servicios</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Un mejor flujo de trabajo</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                En Nuestra Clínica Veterinaria, nos enorgullece brindar una amplia gama de servicios de atención médica de alta calidad para sus queridas mascotas. Nuestra dedicación a la salud y el bienestar de los animales es nuestra principal prioridad, y trabajamos incansablemente para garantizar que sus amigos peludos reciban la mejor atención posible.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <img
                        src={Mascota}
                        alt="Product screenshot"
                        className="w-[28rem] max-w-none  ring-1 ring-gray-400/10 sm:w-[38rem] md:-ml-4 lg:-ml-0"
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>
        </div>
    )
}
