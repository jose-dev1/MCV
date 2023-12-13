import '../../index.css';
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
    {
        id: 1,
        titulo: 'Inicio',
        href: '#',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        ,
        subtitiulo: 'Ejemplo subtitulo',
    },
    {
        id: 2,
        titulo: 'Carnet',
        href: '#',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
        ,
        subtitiulo: 'Ejemplo subtitulo',
    },
    {
        id: 3,
        titulo: 'Ejemplo titulo',
        href: '#',
        icon: <box-icon type='solid' name='balloon'></box-icon>,
        subtitiulo: 'Ejemplo subtitulo',
    },



    // More products...
]

const Mensajes = [
    {
        id: 1,
        name: 'Samuel Vasquez',
        href: '#',
        image: 'https://pbs.twimg.com/media/EUXgF4hWkAEL2HE.jpg',
        mensaje: 'Ejemplo subtitulo',
    },

    {
        id: 2,
        name: 'Samuel Vasquez',
        href: '#',
        image: 'https://pbs.twimg.com/media/EUXgF4hWkAEL2HE.jpg',
        mensaje: 'Ejemplo subtitulo',
    },

    {
        id: 3,
        name: 'Samuel Vasquez',
        href: '#',
        image: 'https://pbs.twimg.com/media/EUXgF4hWkAEL2HE.jpg',
        mensaje: 'Ejemplo subtitulo',
    },
    {
        id: 3,
        name: 'Samuel Vasquez',
        href: '#',
        image: 'https://pbs.twimg.com/media/EUXgF4hWkAEL2HE.jpg',
        mensaje: 'Ejemplo subtitulo',
    },
    {
        id: 3,
        name: 'Samuel Vasquez',
        href: '#',
        image: 'https://pbs.twimg.com/media/EUXgF4hWkAEL2HE.jpg',
        mensaje: 'Ejemplo subtitulo',
    },
    {
        id: 3,
        name: 'Samuel Vasquez',
        href: '#',
        image: 'https://pbs.twimg.com/media/EUXgF4hWkAEL2HE.jpg',
        mensaje: 'Ejemplo subtitulo',
    },
    // More products...
]

export default function Inicio() {
    return (

        <div className="bg-white w-full flex lg:grid-cols-1">
            <div className="ml-20  px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7x2 lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Opciones</h2>

                <div className=" w-96  grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-1 xl:gap-x-8">
                    {products.map((product) => (
                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            {product.icon}
                            <a href={product.href} >
                                <h5 className=" text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"> {product.titulo} </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{product.subtitiulo}</p>

                            <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
                                Ver mas
                            </a>
                        </div>
                    ))}


                </div>

            </div>


            <div className=" ml-20 w-96 px-4 py-6 sm:px-6 sm:py-4 lg:max-w-7x2 lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Citas agendadas</h2>

                <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols- lg:grid-cols-1 xl:gap-x-8">
                    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Citas agendadas</h5>
                        </div>
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                {Mensajes.map((item) => (
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src={item.image} />
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {item.mensaje}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}

                                {/* Agrega más elementos de la lista según sea necesario */}
                            </ul>
                        </div>
                    </div>


                </div>

            </div>





        </div>
    )
}
