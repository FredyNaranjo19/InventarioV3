import React from "react";

function EtiquetaVisualizer(props){

    return(
        <div style={{position:'absolute',width:'100%',height:'100%'}}>
                <object
                data={'http://localhost:4000/1622487056567-uppEtiqueta-LAP13123123.pdf'}
                type=" pdf"
                width="100%"
                height="100%"
                >
                </object>
            </div>
    );
}

export default  EtiquetaVisualizer;