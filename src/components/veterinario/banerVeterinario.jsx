const links = [
    { name: 'Hospitalizaciones', href: '#' },
    { name: 'Vacunas', href: '#' },
    { name: 'Exámenes medicos', href: '#' },
    { name: 'Agenda', href: '#' },
]
const stats = [
    { name: 'Offices worldwide', value: '12' },
    { name: 'Full-time colleagues', value: '300+' },
    { name: 'Hours per week', value: '40' },
    { name: 'Paid time off', value: 'Unlimited' },
]

export default function Example() {
    return (
        <div className=" mt-10 relative isolate overflow-hidden bg-gray-900  mx-10 h-52">
            <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
            />
            <div
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl ">
                <h5 className="text-white font-bold text-center text-xl  mt-2" > Opciones de trabajo</h5>


                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                        {links.map((link) => (
                            <a key={link.name} href={link.href}>
                                {link.name} <span aria-hidden="true">&rarr;</span>
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
