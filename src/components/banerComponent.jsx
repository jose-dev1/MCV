import React from "react";
import "../assets/css/baner.css";
import { Star, Pets, Group } from "@mui/icons-material";
import VerifiedUserSharpIcon from '@mui/icons-material/VerifiedUserSharp';


const Banner = () => {
    const items = [
        {
            title: "Servicio de calidad",
            icon: <Star sx={{ color: "primary" }} />,
        },
        {
            title: "Servicio de groomer",
            icon: <Pets sx={{ color: "" }} />,
        },
        {
            title: "Servicio rápido",
            icon: <VerifiedUserSharpIcon sx={{ color: "" }} />,
        },
        {
            title: "Doctores Expertos",
            icon: <Group sx={{ color: "" }} />,
        },
    ];

    return (
        <div className="banner">
            <div className="content">
                <h1 style={{ color: "black", fontSize: "50px" }}>Prestamos</h1><br />
                <h1 style={{ color: "black", fontSize: "36px" }}>Servicio de veterinaria</h1><br />
                <h1 style={{ color: "black", fontSize: "24px", margin: "1vh" }}>desde 2010</h1><br />
                <ul className="cards-1">
                    {items.map((item, index) => (
                        <li key={index} className="card-1">
                            <div className="icon yellow-bg">{item.icon}</div>
                            <div className="title">{item.title}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Banner;
