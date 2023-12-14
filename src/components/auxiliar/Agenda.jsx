import React from 'react';

const NotificationCard = ({ notification }) => {
    const { titulo, avatarSrc, reactionUser, comentario, tiempo, } = notification;

    const containerClasses = `w-68p h-35 relative bg-slate-900 text-slate-100 px-5 py-3.5 rounded-lg shadow hover:shadow-xl max-w-sm transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear ml-auto`;

    return (
        <div className={containerClasses}>
            <div className="w-full flex items-center justify-between">
                <span className={`font-medium text-sm  '' : 'text-slate-400'}`}>{titulo}</span>
                <button className={`-mr-1 'bg-slate-800 hover:bg-slate-700/70 text-slate-400 hover:text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600'} h-5 w-5 rounded-full flex justify-center items-center`}>
                    <svg className="h-2 w-2 fill-current items-center" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" /></svg>
                </button>
            </div>
            <div className="flex items-center mt-2 rounded-lg px-1 py-1 cursor-pointer">
                <div className="relative flex flex-shrink-0 items-end">
                    <img className="h-16 w-16 rounded-full" src={avatarSrc} alt="User Avatar" />
                    <span className={`absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2  'border-slate-900' : 'border-white'}`}></span>
                </div>
                <div className="ml-3.5">
                    <span className="font-semibold tracking-tight text-xs">{reactionUser}</span>
                    <span className={`text-xs leading-none opacity-50  '' : 'text-slate-400'}`}>Ha agendado cita</span>
                    <p className={`text-xs leading-4 pt-2 italic opacity-70  '' : 'text-slate-400'}`}>{comentario}</p>
                    <span className={`text-[10px]  'text-blue-500' : 'text-slate-500'} font-medium leading-4 opacity-75`}>{tiempo}</span>
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;
