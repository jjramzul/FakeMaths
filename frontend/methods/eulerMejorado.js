import {

    dS_dt,
    dI_dt,
    dR_dt

} from "../model/sir.js"


function eulerMejorado(

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
    let t_values=[];

    let S_values=[];

    let I_values=[];

    let R_values=[];


    //Simulación
    for(let i=0;i<n;i++){

        t_values.push(i*h);

        S_values.push(S);

        I_values.push(I);

        R_values.push(R);


        //Pendientes iniciales

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


        //Predicción

        let S_pred=S+h*k1S;

        let I_pred=I+h*k1I;

        let R_pred=R+h*k1R;


        //Pendientes corregidas

        let k2S=dS_dt(
            S_pred,
            I_pred,
            beta
        );

        let k2I=dI_dt(
            S_pred,
            I_pred,
            beta,
            gamma
        );

        let k2R=dR_dt(
            I_pred,
            gamma
        );


        //Euler Mejorado

        S=S+(h/2)*(k1S+k2S);

        I=I+(h/2)*(k1I+k2I);

        R=R+(h/2)*(k1R+k2R);

    }


    return{

        t:t_values,

        S:S_values,

        I:I_values,

        R:R_values

    }

}


export{

    eulerMejorado

}