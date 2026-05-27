

import {

    dS_dt,
    dI_dt,
    dR_dt

} from "../model/sir.js"


function solver(

    S0,
    I0,
    R0,

    tf,

    beta,
    gamma

){

    //Paso pequeño referencia

    let h=0.001;

    let n=tf/h;


    //Iniciales

    let S=S0;

    let I=I0;

    let R=R0;


    //Vectores

    let S_values=[];

    let I_values=[];

    let R_values=[];


    for(
        let i=0;
        i<n;
        i++
    ){

        S_values.push(S);

        I_values.push(I);

        R_values.push(R);


        //K1

        let k1S=dS_dt(
            S,
            I,
            beta
        );

        let k1I=dI_dt(
            S,
            I,
            beta,
            gamma
        );

        let k1R=dR_dt(
            I,
            gamma
        );


        //K2

        let k2S=dS_dt(
            S+(h/2)*k1S,
            I+(h/2)*k1I,
            beta
        );

        let k2I=dI_dt(
            S+(h/2)*k1S,
            I+(h/2)*k1I,
            beta,
            gamma
        );

        let k2R=dR_dt(
            I+(h/2)*k1I,
            gamma
        );


        //K3

        let k3S=dS_dt(
            S+(h/2)*k2S,
            I+(h/2)*k2I,
            beta
        );

        let k3I=dI_dt(
            S+(h/2)*k2S,
            I+(h/2)*k2I,
            beta,
            gamma
        );

        let k3R=dR_dt(
            I+(h/2)*k2I,
            gamma
        );


        //K4

        let k4S=dS_dt(
            S+h*k3S,
            I+h*k3I,
            beta
        );

        let k4I=dI_dt(
            S+h*k3S,
            I+h*k3I,
            beta,
            gamma
        );

        let k4R=dR_dt(
            I+h*k3I,
            gamma
        );


        //Actualizar

        S=S+(h/6)*(k1S+2*k2S+2*k3S+k4S);

        I=I+(h/6)*(k1I+2*k2I+2*k3I+k4I);

        R=R+(h/6)*(k1R+2*k2R+2*k3R+k4R);

    }


    return{

        S:S_values,

        I:I_values,

        R:R_values

    }

}


export{

solver

}