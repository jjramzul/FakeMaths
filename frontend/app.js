import {

euler

} from "./methods/euler.js"

import {

eulerMejorado

} from "./methods/eulerMejorado.js"

import {

rk4

} from "./methods/rk4.js"

import {

solver

} from "./methods/solver.js"

const methodSelect =

document.getElementById(

    "methodSelect"

);

const statsBtn=
document.getElementById(
"statsBtn"
);

const homeBtn=
document.getElementById(
"homeBtn"
);

const resultsBtn=
document.getElementById(
"resultsBtn"
);

const graphsBtn=
document.getElementById(
"graphsBtn"
);

const homeView=
document.getElementById(
"homeView"
);

const statsView=
document.getElementById(
"statsView"
);

const resultsView=
document.getElementById(
"resultsView"
);

const graphsView=
document.getElementById(
"graphsView"
);

const statsContent=
document.getElementById(
"statsContent"
);

const resultsContent=
document.getElementById(
"resultsContent"
);

const peakInfection =
document.getElementById(
"peakInfection"
);

const peakTime =
document.getElementById(
"peakTime"
);

const methodUsed =
document.getElementById(
"methodUsed"
);

const totalRecovered =
document.getElementById(
"totalRecovered"
);

const dynamicPosts = document.getElementById("dynamic-posts");

const reactions = [

    "😱 Esto es gravísimo",

    "No puede ser real",

    "Compartan antes de que lo borren",

    "A mí también me pasó",

    "🔥 Tendencia total",

    "Esto explotó demasiado rápido",

    "Ya todo el mundo habla de esto",

    "Twitter está lleno de esto",

    "Confirmado por un amigo",

    "Esto se salió de control"

];

const likesText = document.getElementById("likes");

const repostsText = document.getElementById("reposts");

const commentsText = document.getElementById("comments");

const fakeNewsInput = document.getElementById("fakeNewsInput");

const betaInput = document.getElementById("betaInput");

const gammaInput = document.getElementById("gammaInput");

const simulateBtn = document.getElementById("simulateBtn");

const fakeNewsText = document.getElementById("fake-news-text");

const ctx = document.getElementById("sirChart");

const s0Input =
document.getElementById(
"s0Input"
);


const i0Input =
document.getElementById(
"i0Input"
);


const r0Input =
document.getElementById(
"r0Input"
);


const hInput =
document.getElementById(
"hInput"
);


const tfInput =
document.getElementById(
"tfInput"
);

let finalResults="";
let allMethodResults=null;

function changeView(
view
){

homeView.style.display="none";
statsView.style.display="none";
resultsView.style.display="none";
graphsView.style.display="none";

view.style.display=
"block";

}


// =========================
// CREAR GRÁFICA
// =========================

const sirChart = new Chart(ctx, {

    type: "line",

    data: {

        labels: [],

        datasets: [

            {
                label: "Susceptibles",
                data: [],
            },

            {
                label: "Compartiendo",
                data: [],
            },

            {
                label: "Recuperados",
                data: [],
            }

        ]

    },

    options: {

        responsive: true,

        animation: {
            duration: 1000
        }

    }

});

function renderExtraGraphs(
results
){

const oldCharts=
document.querySelectorAll(
".extra-chart"
);

oldCharts.forEach(
chart=>chart.remove()
);

if(!results)return;

Object.entries(results).forEach(
([name,data])=>{

const title=
document.createElement(
"h2"
);

title.classList.add(
"extra-chart"
);

title.textContent=name;

graphsView.appendChild(title);

const canvas=
document.createElement(
"canvas"
);

canvas.classList.add(
"extra-chart"
);

graphsView.appendChild(canvas);

new Chart(
canvas,
{
 type:"line",
 data:{
 labels:data.t,
 datasets:[
 {label:"S",data:data.S},
 {label:"I",data:data.I},
 {label:"R",data:data.R}
 ]
 }
}
);

}
);

}


// =========================
// EVENTO BOTÓN
// =========================

simulateBtn.addEventListener("click", () => {

    //Obtener fake news
    const fakeNews = fakeNewsInput.value;

    //Actualizar post
    fakeNewsText.textContent = fakeNews;


    //Obtener parámetros
    const beta = parseFloat(betaInput.value);

    const gamma = parseFloat(gammaInput.value);

    const S0=
    parseFloat(
    s0Input.value
    );

    const I0=
    parseFloat(
    i0Input.value
    );

    const R0=
    parseFloat(
    r0Input.value
    );

    const h=
    parseFloat(
    hInput.value
    );

    const tf=
    parseFloat(
    tfInput.value
    );


    const reference=
    solver(

    S0,
    I0,
    R0,

    tf,

    beta,
    gamma

    );


    //Método seleccionado

    let result;

    const method =
    methodSelect.value;


    function calcularErrores(
    resultado,
    referencia
    ){

    const SFinal=
    resultado.S[
    resultado.S.length-1
    ];

    const IFinal=
    resultado.I[
    resultado.I.length-1
    ];

    const RFinal=
    resultado.R[
    resultado.R.length-1
    ];

    const SRef=
    referencia.S[
    referencia.S.length-1
    ];

    const IRef=
    referencia.I[
    referencia.I.length-1
    ];

    const RRef=
    referencia.R[
    referencia.R.length-1
    ];

    const abs=(
    Math.abs(SFinal-SRef)+
    Math.abs(IFinal-IRef)+
    Math.abs(RFinal-RRef)
    )/3;

    const rel=(
    Math.abs((SFinal-SRef)/SRef)+
    Math.abs((IFinal-IRef)/IRef)+
    Math.abs((RFinal-RRef)/RRef)
    )/3;

    return {

    abs,
    rel,

    SFinal,
    IFinal,
    RFinal,

    SRef,
    IRef,
    RRef

    }

    }


    if(
    method==="todos"
    ){

    const resultEuler=
    euler(
    S0,I0,R0,
    h,tf,
    beta,gamma
    );

    const resultMejorado=
    eulerMejorado(
    S0,I0,R0,
    h,tf,
    beta,gamma
    );

    const resultRK4=
    rk4(
    S0,I0,R0,
    h,tf,
    beta,gamma
    );

    const errorEuler=
    calcularErrores(
    resultEuler,
    reference
    );

    const errorMejorado=
    calcularErrores(
    resultMejorado,
    reference
    );

    const errorRK4=
    calcularErrores(
    resultRK4,
    reference
    );

    result=resultRK4;

    allMethodResults={

    "Euler":resultEuler,

    "Euler Mejorado":resultMejorado,

    "RK4":resultRK4

    };

    finalResults=`
===== VALORES FINALES =====

Euler
S final: ${errorEuler.SFinal.toFixed(2)}
I final: ${errorEuler.IFinal.toFixed(2)}
R final: ${errorEuler.RFinal.toFixed(2)}

Euler Mejorado
S final: ${errorMejorado.SFinal.toFixed(2)}
I final: ${errorMejorado.IFinal.toFixed(2)}
R final: ${errorMejorado.RFinal.toFixed(2)}

RK4
S final: ${errorRK4.SFinal.toFixed(2)}
I final: ${errorRK4.IFinal.toFixed(2)}
R final: ${errorRK4.RFinal.toFixed(2)}

===== REFERENCIA =====

S final: ${errorRK4.SRef.toFixed(2)}
I final: ${errorRK4.IRef.toFixed(2)}
R final: ${errorRK4.RRef.toFixed(2)}

===== ERROR ABSOLUTO PROMEDIO =====

Euler: ${errorEuler.abs.toFixed(4)}
Euler Mejorado: ${errorMejorado.abs.toFixed(4)}
RK4: ${errorRK4.abs.toFixed(4)}

===== ERROR RELATIVO PROMEDIO =====

Euler: ${errorEuler.rel.toFixed(4)}
Euler Mejorado: ${errorMejorado.rel.toFixed(4)}
RK4: ${errorRK4.rel.toFixed(4)}
`;

    }

    else if(
    method==="euler"
    ){

    result=euler(
    S0,I0,R0,
    h,tf,
    beta,gamma
    );

    }

    else if(
    method==="mejorado"
    ){

    result=eulerMejorado(
    S0,I0,R0,
    h,tf,
    beta,gamma
    );

    }

    else{

    result=rk4(
    S0,I0,R0,
    h,tf,
    beta,gamma
    );

    }

        //Pico máximo de compartidos
    const maxI = Math.max(...result.I);
    const peakIndex=
    result.I.indexOf(
    maxI
    );


    peakInfection.textContent=
    `Máximo número compartiendo: ${
    Math.floor(maxI)
    }`;


    peakTime.textContent=
    `Momento de máxima propagación: ${
    result.t[
    peakIndex
    ].toFixed(1)
    }`;


    methodUsed.textContent=
    `Método numérico utilizado: ${
    method.toUpperCase()
    }`;


    totalRecovered.textContent=
    `Personas que dejaron de compartir: ${
    Math.floor(
    result.R[
    result.R.length-1
    ]
    )
    }`;

    statsContent.innerHTML=`

<p>${peakInfection.textContent}</p>
<p>${peakTime.textContent}</p>
<p>${methodUsed.textContent}</p>
<p>${totalRecovered.textContent}</p>

`;


if(
method!=="todos"
){

allMethodResults=null;

const SFinal=
result.S[
result.S.length-1
];

const IFinal=
result.I[
result.I.length-1
];

const RFinal=
result.R[
result.R.length-1
];

const SRef=
reference.S[
reference.S.length-1
];

const IRef=
reference.I[
reference.I.length-1
];

const RRef=
reference.R[
reference.R.length-1
];

const absError=(
Math.abs(SFinal-SRef)+
Math.abs(IFinal-IRef)+
Math.abs(RFinal-RRef)
)/3;

const relError=(
Math.abs((SFinal-SRef)/SRef)+
Math.abs((IFinal-IRef)/IRef)+
Math.abs((RFinal-RRef)/RRef)
)/3;

finalResults=`
===== VALORES FINALES =====

${method.toUpperCase()}

S final: ${SFinal.toFixed(2)}
I final: ${IFinal.toFixed(2)}
R final: ${RFinal.toFixed(2)}

===== REFERENCIA =====

S final: ${SRef.toFixed(2)}
I final: ${IRef.toFixed(2)}
R final: ${RRef.toFixed(2)}

===== ERROR ABSOLUTO =====

${absError.toFixed(4)}

===== ERROR RELATIVO =====

${relError.toFixed(4)}

Peak Infection: ${Math.floor(maxI)}
Peak Time: ${result.t[peakIndex].toFixed(1)}
`;

}


    //Calcular métricas fake
    const likes = Math.floor(maxI * 100);

    const reposts = Math.floor(maxI * 40);

    const comments = Math.floor(maxI * 15);


    //Actualizar feed
    likesText.textContent = `❤️ ${likes} me gusta`;

    repostsText.textContent = `🔁 ${reposts} compartidos`;

    commentsText.textContent = `💬 ${comments} comentarios`;



    //Limpiar posts anteriores
    dynamicPosts.innerHTML="";


    //Limpiar gráfica

    sirChart.data.labels=[];

    sirChart.data.datasets[0].data=[];

    sirChart.data.datasets[1].data=[];

    sirChart.data.datasets[2].data=[];

    sirChart.update();


    //Animación feed

    let index=0;


    const speed=2;


    const interval=setInterval(()=>{


        if(
            index>=result.I.length
        ){

            clearInterval(
                interval
            );


            //Mostrar gráfica completa al final

            if(
            allMethodResults
            ){

            sirChart.data.labels=[];

            sirChart.data.datasets[0].data=[];

            sirChart.data.datasets[1].data=[];

            sirChart.data.datasets[2].data=[];

            sirChart.update();

            renderExtraGraphs(
            allMethodResults
            );

            }

            else{

            sirChart.data.labels=
            result.t;

            sirChart.data.datasets[0].data=
            result.S;

            sirChart.data.datasets[1].data=
            result.I;

            sirChart.data.datasets[2].data=
            result.R;

            sirChart.update();

            renderExtraGraphs(null);

            }

            return;

        }


        const currentI=
        result.I[index];


        //Likes dinámicos

        likesText.textContent=
        `❤️ ${
            Math.floor(
                currentI*100
            )
        } me gusta`;


        repostsText.textContent=
        `🔁 ${
            Math.floor(
                currentI*40
            )
        } compartidos`;


        commentsText.textContent=
        `💬 ${
            Math.floor(
                currentI*15
            )
        } comentarios`;


        //Posts dinámicos

        if(
            index%25===0
        ){

            const randomReaction=
            reactions[
                Math.floor(
                    Math.random()*
                    reactions.length
                )
            ];


            const post=
            document.createElement(
                "div"
            );


            post.classList.add(
                "post"
            );


            post.innerHTML=`

                <h3>
                    👤 Usuario${index}
                </h3>

                <p>

                    ${randomReaction}

                </p>

            `;


            dynamicPosts.prepend(
                post
            );

        }


        index+=speed;


    },10);

});



homeBtn.addEventListener(
"click",
()=>{
slidesView.style.display="none";
changeView(homeView)
}
);

const slidesBtn=
document.getElementById(
"slidesBtn"
);

const slidesView=
document.getElementById(
"slidesView"
);

const goResultsBtn=
document.getElementById(
"goResultsBtn"
);

const heroBtn=
document.querySelector(
".hero-btn"
);

statsBtn.addEventListener(
"click",
()=>{
slidesView.style.display="none";
changeView(statsView)
}
);

resultsBtn.addEventListener(
"click",
()=>{
slidesView.style.display="none";
resultsContent.textContent=
finalResults;
changeView(resultsView)
}
);

graphsBtn.addEventListener(
"click",
()=>{
slidesView.style.display="none";
changeView(graphsView)
}
);

slidesBtn.addEventListener(
"click",
()=>{

homeView.style.display="none";
statsView.style.display="none";
resultsView.style.display="none";
graphsView.style.display="none";

slidesView.style.display="block";

}
);

document.addEventListener(
"click",
(e)=>{

if(
 e.target.closest("#goResultsBtn")
){

slidesView.style.display="none";

resultsContent.textContent=
finalResults;

changeView(resultsView);

}

if(
 e.target.closest(".hero-btn")
){

slidesView.style.display="none";

changeView(homeView);

}

}
);