import {

    dS_dt,
    dI_dt,
    dR_dt

} from "../model/sir.js"


function euler(

S0,
I0,
R0,

h,
tf,

beta,
gamma

){

    //Iniciales
    let S=S0;

    let I=I0;

    let R=R0;

    let n = tf / h;


    //Vectores
    let t_values = [];

    let S_values = [];

    let I_values = [];

    let R_values = [];


    //Simulación
    for(let i=0;i<n;i++){

        //Guardar
        t_values.push(i*h);

        S_values.push(S);

        I_values.push(I);

        R_values.push(R);


        //Derivadas
        let dS = dS_dt(
            S,
            I,
            beta
        );

        let dI = dI_dt(
            S,
            I,
            beta,
            gamma
        );

        let dR = dR_dt(
            I,
            gamma
        );


        //Euler
        S = S + h*dS;

        I = I + h*dI;

        R = R + h*dR;

    }


    return{

        t:t_values,

        S:S_values,

        I:I_values,

        R:R_values

    }

}


export{

    euler

}