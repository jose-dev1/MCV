import React, { useState } from 'react';
import { Menu, MenuItem, Avatar } from '@mui/material';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '../assets/img/MVC.png';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const cerrarMenu = () => {
        setAnchorEl(null);
    };
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Equipo veterinario', href: '#Team' },
        { name: 'Servicios', href: '#servicio' },
        { name: 'Contactanos', href: '#contacto' },
        { name: 'Quienes somos', href: '#Abaut' },
    ];

    const perfilUsuario = () => {
        navigate('/perfilUsuario')
    }

    const cerrarSession = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
        cerrarMenu();
    };

    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">MCV</span>
                            <img className="h-20 w-auto" src={Logo} alt="" />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Abrir Menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
                        {user && user.fk_tipo_usuario === 2 ? (
                            <div className="flex items-center">
                                <Avatar
                                    src={user.avatarUrl}
                                    alt={user.name}
                                    onClick={handleOpenMenu}
                                    aria-controls="user-menu"
                                    aria-haspopup="true"
                                    sx={{ cursor: 'pointer' }}
                                />
                                <Menu
                                    id="user-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={cerrarMenu}
                                >
                                    <MenuItem onClick={perfilUsuario} >Perfil</MenuItem>
                                    <MenuItem onClick={cerrarSession}>Cerrar sesión</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        )}
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">MCV</span>
                                <img
                                    className="h-20 w-auto"
                                    src={Logo}
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Cerrar menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {user && user.fk_tipo_usuario === 2 ? (
                                        <div className="flex items-center">
                                            <Avatar
                                                src={user.avatarUrl}
                                                alt={user.name}
                                                onClick={handleOpenMenu}
                                                aria-controls="user-menu"
                                                aria-haspopup="true"
                                                sx={{ cursor: 'pointer' }}
                                            />
                                            <Menu
                                                id="user-menu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={cerrarMenu}
                                            >
                                                <MenuItem onClick={perfilUsuario} >Perfil</MenuItem>
                                                <MenuItem onClick={cerrarSession}>Cerrar sesión</MenuItem>
                                            </Menu>
                                        </div>
                                    ) : (
                                        <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                                            Log in <span aria-hidden="true">&rarr;</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </div>
    );
};

export default Header;
