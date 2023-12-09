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
        titulo: 'Ejemplo titulo',
        href: '#',
        icon: <box-icon type='solid' name='balloon'></box-icon>,
        subtitiulo: 'Ejemplo subtitulo',
    },
    {
        id: 1,
        titulo: 'Ejemplo titulo',
        href: '#',
        icon: <box-icon type='solid' name='balloon'></box-icon>,
        subtitiulo: 'Ejemplo subtitulo',
    },
    {
        id: 1,
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

export default function Example() {
    return (

        <div className="bg-white w-full flex lg:grid-cols-1">
            <div className="ml-20  px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7x2 lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Titulo Ejemplo</h2>

                <div className=" w-96  mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-1 xl:gap-x-8">
                    {products.map((product) => (
                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <svg
                                className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                            </svg>
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need help with a Claim?</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Follow this step-by-step guideline on how to certify for your weekly benefits:</p>
                            <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
                                See our guideline
                                <svg
                                    className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                                    />
                                </svg>
                            </a>
                        </div>
                    ))}


                </div>

            </div>


            <div className="ml-20 w-96 px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7x2 lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Mesajes</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols- lg:grid-cols-1 xl:gap-x-8">
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
