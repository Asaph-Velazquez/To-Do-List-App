    import React from "react";
    import LentBusq from "./TaskSearchNav";
    import TareaFiltro from "./TaskFilter";

    interface TareasyBusquedaProp {

        EnBusq: (TermBusq: string ) => void; //funcion callBack RECIBE el parametro TermBusq y los maneja de tipo cadena   
        EnFiltro: (TipoFiltro: string) => void; 
        opciondefiltro: { value: string; label: string }[];
    }


    const TareasYBusqueda: React.FC<TareasyBusquedaProp> = ({ EnBusq, EnFiltro, opciondefiltro }) => {

        return(
            <div className="T-Y-B">

            < LentBusq EnBusq = {EnBusq}></LentBusq>

            < TareaFiltro 
            
            EnFiltro = {EnFiltro}
            opciondefiltro={opciondefiltro}></TareaFiltro>
            </div>
        );
    }


    export default TareasYBusqueda;