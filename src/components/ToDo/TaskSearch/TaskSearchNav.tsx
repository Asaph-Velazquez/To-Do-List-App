//prop de busqueda de la funcion de lupa// 

import React from "react";

interface BusqLente{
    EnBusq: (TermBusq: string ) => void; //funcion callBack RECIBE el parametro TermBusq y los maneja de tipo cadena   
}

const LentBusq: React.FC<BusqLente> = ({ EnBusq }) => {

    const ManejoBusq = (e: React.ChangeEvent<HTMLInputElement>) =>{
        EnBusq(e.target.value);
    };

    return(
        <div className="LupaDeBusq">
            <input
                type = "text"
                placeholder="<=Busqueda Tarea=>"
                onChange={ManejoBusq}
            ></input>

        <span className="IconoBusqueda">🔍</span>
        </div>
    );
};

export default LentBusq;

