import React from "react";

interface FiltroBusqProp{
    EnFiltro: (TipoFiltro: string) => void; 
    opciondefiltro: { value: string; label: string } []
}

const TareaFiltro: React.FC<FiltroBusqProp> = ({ EnFiltro, opciondefiltro }) => {
    const ManejoBusq = (e:React.ChangeEvent<HTMLSelectElement>) => {

        EnFiltro(e.target.value)
    }; 

    return(
        <div className="Tareas-Filtro">
            <select onChange={ManejoBusq}>
                    {  }
                    {opciondefiltro.map((Option) => (
                        <option key={Option.value} value={Option.value}>
                            {Option.label}
                        </option>
                    )
                    ) 
                    }
            </select>
        </div>
    );
};

export default TareaFiltro;