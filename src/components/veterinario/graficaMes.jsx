import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
    { name: "Enero", Perros: 10, Gatos: 60 },
    { name: 'Febrero', Perros: 25, Gatos: 70 },
    { name: 'Marzo', Perros: 15, Gatos: 65 },
    { name: 'Abril', Perros: 35, Gatos: 85 },
    { name: 'Mayo', Perros: 12, Gatos: 48 },
    { name: 'Junio', Perros: 30, Gatos: 69 },
    { name: 'Julio', Perros: 15, Gatos: 78 },
]

const SimpleBarCharts = () => {
    return (
        <ResponsiveContainer width="100%" aspect={2}>
            <BarChart
                data={data}
                width={500}
                height={300}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Perros" fill="#6b48ff" />
                <Bar dataKey="Gatos" fill="#1ee3cf" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default SimpleBarCharts