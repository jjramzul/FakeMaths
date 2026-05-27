//T Cambio de susceptibles
function dS_dt(S,I,beta){

    return -beta*S*I;

}


//T cambio de infectados
function dI_dt(S,I,beta,gamma){

    return beta*S*I - gamma*I;

}


//T Cambio recuperados
function dR_dt(I,gamma){

    return gamma*I;

}


export {

    dS_dt,

    dI_dt,

    dR_dt

};