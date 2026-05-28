const slides=

document.querySelectorAll(
".slide"
);

const container=

document.querySelector(
".slides-container"
);

const slidesView=

document.getElementById(
"slidesView"
);

const homeView=

document.getElementById(
"homeView"
);

let currentSlide=0;


const closeBtn=

document.createElement(
"button"
);

closeBtn.textContent="✕";

closeBtn.style.position="absolute";
closeBtn.style.top="24px";
closeBtn.style.right="24px";
closeBtn.style.zIndex="9999";
closeBtn.style.width="42px";
closeBtn.style.height="42px";
closeBtn.style.borderRadius="999px";
closeBtn.style.border="1px solid rgba(255,255,255,.2)";
closeBtn.style.background="rgba(255,255,255,.08)";
closeBtn.style.color="white";
closeBtn.style.cursor="pointer";

slidesView.appendChild(
closeBtn
);

closeBtn.onclick=()=>{

slidesView.style.display=
"none";

homeView.style.display=
"block";

}


function restartAnimations(){

const active=
slides[currentSlide];

active.querySelectorAll("*")
.forEach(el=>{

el.style.animation="none";

void el.offsetHeight;

el.style.animation="";

});

}


function updateSlides(){

container.style.transform=
`translateX(-${currentSlide*100}%)`;

restartAnimations();

}


nextSlide.onclick=()=>{

if(
currentSlide<slides.length-1
){
currentSlide++;
updateSlides();
}

}


prevSlide.onclick=()=>{

if(
currentSlide>0
){
currentSlide--;
updateSlides();
}

}


document.addEventListener(
"keydown",
(e)=>{

if(
e.key==="ArrowRight"
&& currentSlide<slides.length-1
){
currentSlide++;
updateSlides();
}

if(
e.key==="ArrowLeft"
&& currentSlide>0
){
currentSlide--;
updateSlides();
}

if(
e.key==="Escape"){
closeBtn.click();
}

}
);

restartAnimations();