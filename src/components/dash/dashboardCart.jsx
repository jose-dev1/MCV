export const DashboardCard = ({ titulo, Info, estado, iconColor, icon }) => {
    return (
        <div className="mt-4 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className={`bg-clip-border mx-4 rounded-xl overflow-hidden ${iconColor} text-white shadow-${iconColor}/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`}>
                {icon}
            </div>
            <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{titulo}</p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{Info}</h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">{estado}</strong>&nbsp;hace 4 horas
                </p>
            </div>
        </div>
    );
};