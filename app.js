const $ = id => document.getElementById(id);
const show = id => $(id).classList.remove("hidden");
const hide = id => $(id).classList.add("hidden");
const val = id => parseFloat($(id).value);
const close = (a,b,t) => Number.isFinite(a) && Math.abs(a-b) <= t;

function feedback(id,type,text){
  const el=$(id);
  el.className=`feedback ${type}`;
  el.textContent=text;
}
function mark(inputId, fbId, ok, text="Correct"){
  const input=$(inputId), fb=$(fbId);
  input.classList.remove("good","bad");
  fb.className="field-feedback";
  if(!input.value){ fb.textContent=""; return; }
  input.classList.add(ok?"good":"bad");
  fb.classList.add(ok?"good":"bad");
  fb.textContent=ok?`✓ ${text}`:"Check this value";
}

// Lesson 1
document.querySelectorAll("[data-choice]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll("[data-choice]").forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    if(btn.dataset.choice==="fraction"){
      feedback("firstFeedback","pass","Correct. Convert 21% to 0.21, then divide the target kg N/ha by the N proportion.");
      show("lesson1Calc");
    }else{
      const msg={
        multiply:"Not quite. The fertiliser contains only 21% N, so you divide the nitrogen target by 0.21.",
        area:"Area conversion is not needed for this question.",
        bags:"Bags can only be calculated after you know kg of fertiliser required."
      };
      feedback("firstFeedback","fail",msg[btn.dataset.choice]);
    }
  });
});

function checkL1(){
  const p=val("l1Nprop"), k=val("l1KgHa");
  const answer=25/0.21;
  mark("l1Nprop","l1NpropFb",close(p,.21,.005));
  mark("l1KgHa","l1KgHaFb",close(k,answer,.35));
  if(!Number.isFinite(p)||!Number.isFinite(k)) return;
  if(close(p,.21,.005)&&close(k,answer,.35)){
    feedback("lesson1Feedback","pass",`Correct. 25 ÷ 0.21 = ${answer.toFixed(1)} kg fertiliser/ha, approximately 119 kg/ha.`);
    show("lesson2");
  }else{
    feedback("lesson1Feedback","fail","Use 21% = 0.21 and calculate 25 ÷ 0.21.");
    ["lesson2","lesson3","lesson4","practice","summary"].forEach(hide);
  }
}
["l1Nprop","l1KgHa"].forEach(id=>$(id).addEventListener("input",checkL1));

// Lesson 2
function checkL2(){
  const a=val("acresToHa"), h=val("haToAcres");
  const aAns=10*0.4047, hAns=20*2.471;
  mark("acresToHa","acresToHaFb",close(a,aAns,.03));
  mark("haToAcres","haToAcresFb",close(h,hAns,.04));
  if(!Number.isFinite(a)||!Number.isFinite(h)) return;
  if(close(a,aAns,.03)&&close(h,hAns,.04)){
    feedback("lesson2Feedback","pass",`Correct. 10 acres = ${aAns.toFixed(3)} ha and 20 ha = ${hAns.toFixed(2)} acres.`);
    show("lesson3");
  }else{
    feedback("lesson2Feedback","fail","Use acres × 0.4047 and hectares × 2.471.");
    ["lesson3","lesson4","practice","summary"].forEach(hide);
  }
}
["acresToHa","haToAcres"].forEach(id=>$(id).addEventListener("input",checkL2));

// Lesson 3
function checkL3(){
  const n=val("unitsToN"), k=val("canKgHa");
  const nAns=27*2.471, kAns=nAns/.275;
  mark("unitsToN","unitsToNFb",close(n,nAns,.15));
  mark("canKgHa","canKgHaFb",close(k,kAns,.55));
  if(!Number.isFinite(n)||!Number.isFinite(k)) return;
  if(close(n,nAns,.15)&&close(k,kAns,.55)){
    feedback("lesson3Feedback","pass",`Correct. 27 × 2.471 = ${nAns.toFixed(1)} kg N/ha, and ${nAns.toFixed(1)} ÷ 0.275 = ${kAns.toFixed(1)} kg CAN/ha.`);
    show("lesson4");
  }else{
    feedback("lesson3Feedback","fail","First multiply 27 by 2.471. Then divide that nitrogen rate by 0.275.");
    ["lesson4","practice","summary"].forEach(hide);
  }
}
["unitsToN","canKgHa"].forEach(id=>$(id).addEventListener("input",checkL3));

// Lesson 4
const FULL = {
  nHa:35*2.471,
};
FULL.kgHa=FULL.nHa/.18;
FULL.totalKg=FULL.kgHa*20;
FULL.exactBags=FULL.totalKg/25;
FULL.buyBags=Math.ceil(FULL.exactBags);

function checkL4(){
  const a=val("fullNHa"), b=val("fullKgHa"), c=val("fullTotalKg"), d=val("fullExactBags"), e=val("fullBuyBags");
  mark("fullNHa","fullNHaFb",close(a,FULL.nHa,.08));
  mark("fullKgHa","fullKgHaFb",close(b,FULL.kgHa,.6));
  mark("fullTotalKg","fullTotalKgFb",close(c,FULL.totalKg,12));
  mark("fullExactBags","fullExactBagsFb",close(d,FULL.exactBags,.5));
  mark("fullBuyBags","fullBuyBagsFb",close(e,FULL.buyBags,.1),"Round up");

  if(![a,b,c,d,e].every(Number.isFinite)) return;

  const ok=close(a,FULL.nHa,.08)&&close(b,FULL.kgHa,.6)&&close(c,FULL.totalKg,12)&&close(d,FULL.exactBags,.5)&&close(e,FULL.buyBags,.1);
  if(ok){
    feedback("lesson4Feedback","pass",
      `Correct. ${FULL.nHa.toFixed(2)} kg N/ha → ${FULL.kgHa.toFixed(1)} kg product/ha → ${FULL.totalKg.toFixed(0)} kg for 20 ha → ${FULL.exactBags.toFixed(1)} bags, so purchase ${FULL.buyBags} whole bags.`);
    show("practice"); show("summary");
    if(!$("practiceQuestion").textContent.trim()) newPractice();
  }else{
    feedback("lesson4Feedback","fail","Follow the chain from Units/acre → kg N/ha → kg fertiliser/ha → total kg → bags. Round the purchase quantity up.");
    ["practice","summary"].forEach(hide);
  }
}
["fullNHa","fullKgHa","fullTotalKg","fullExactBags","fullBuyBags"].forEach(id=>$(id).addEventListener("input",checkL4));

// Practice generator
const fertilisers = [
  {name:"CAN", n:27.5},
  {name:"Urea", n:46},
  {name:"Ammonium sulphate", n:21},
  {name:"SUPER 18:6:12", n:18},
  {name:"15% N compound", n:15}
];

let practiceData=null;

function seededPick(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}
function newPractice(){
  const f=seededPick(fertilisers);
  const units=seededPick([20,22,25,28,30,32,35,38,40]);
  const area=seededPick([5,8,10,12,15,18,20,25]);
  const bag=seededPick([25,50]);

  const nHa=units*2.471;
  const kgHa=nHa/(f.n/100);
  const totalKg=kgHa*area;
  const exact=totalKg/bag;
  const buy=Math.ceil(exact);

  practiceData={f,units,area,bag,nHa,kgHa,totalKg,exact,buy};

  $("practiceQuestion").innerHTML=
    `An adviser recommends <strong>${units} Units/acre</strong>. Use <strong>${f.name}</strong> containing <strong>${f.n}% N</strong> on <strong>${area} ha</strong>. Fertiliser is sold in <strong>${bag} kg bags</strong>. Calculate the nitrogen rate, fertiliser kg/ha, total kg, exact bags and bags to purchase.`;

  ["pNHa","pKgHa","pTotalKg","pBagsExact","pBagsBuy"].forEach(id=>$(id).value="");
  document.querySelectorAll("#practice input").forEach(i=>i.classList.remove("good","bad"));
  ["pNHaFb","pKgHaFb","pTotalKgFb","pBagsExactFb","pBagsBuyFb"].forEach(id=>{$(id).textContent=""; $(id).className="field-feedback";});
  feedback("practiceFeedback","neutral","Solve the new question.");
}

function checkPractice(){
  if(!practiceData) return;
  const p=practiceData;
  const a=val("pNHa"),b=val("pKgHa"),c=val("pTotalKg"),d=val("pBagsExact"),e=val("pBagsBuy");
  mark("pNHa","pNHaFb",close(a,p.nHa,.15));
  mark("pKgHa","pKgHaFb",close(b,p.kgHa,.65));
  mark("pTotalKg","pTotalKgFb",close(c,p.totalKg,15));
  mark("pBagsExact","pBagsExactFb",close(d,p.exact,.6));
  mark("pBagsBuy","pBagsBuyFb",close(e,p.buy,.1),"Round up");
  if(![a,b,c,d,e].every(Number.isFinite)) return;
  const ok=close(a,p.nHa,.15)&&close(b,p.kgHa,.65)&&close(c,p.totalKg,15)&&close(d,p.exact,.6)&&close(e,p.buy,.1);
  if(ok){
    feedback("practiceFeedback","pass",`Excellent. Final purchase quantity: ${p.buy} × ${p.bag} kg bags.`);
  }else{
    feedback("practiceFeedback","fail","Check the order: Units/acre × 2.471 → divide by N fraction → multiply by hectares → divide by bag size → round up.");
  }
}

$("newPractice").addEventListener("click",newPractice);
["pNHa","pKgHa","pTotalKg","pBagsExact","pBagsBuy"].forEach(id=>$(id).addEventListener("input",checkPractice));
