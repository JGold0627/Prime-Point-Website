(() => {
  const steps = [
    {id:'education', title:'Education', summary:'Understand your options, how they work, and what to expect before you begin.', detailTitle:'Start with understanding', points:['Explore the information behind each care option.','Learn what to expect from the process.','Bring your questions to your provider review.']},
    {id:'biomarkers', title:'Biomarkers', summary:'Explore bloodwork, consider results you already have, or plan your next test.', detailTitle:'Where are you starting?'},
    {id:'medication', title:'Medication Selection', summary:'Explore medications that align with your goals. Your provider decides what is appropriate.', detailTitle:'Explore with a clear purpose', points:['Learn about available medication options.','Consider your goals and questions.','Your selection is reviewed before a prescription is issued.']},
    {id:'intake', title:'Health Intake', summary:'Share your health history, current medications, and goals in a short online questionnaire.', detailTitle:'Help your provider understand you', points:['Tell us about your health history.','Include your medications and relevant health information.','Share what you hope to discuss with your provider.']},
    {id:'review', title:'Provider Review', summary:'A licensed provider reviews your information and determines whether a prescription is appropriate.', detailTitle:'Care informed by clinical review', points:['Your provider evaluates your health information.','Eligibility and medication choices are considered individually.','A prescription is issued only when clinically appropriate.']},
    {id:'fulfillment', title:'Fast Fulfillment', summary:'If prescribed, your medication is prepared by a licensed pharmacy and shipped to your door.', detailTitle:'From your prescription to your doorstep', points:['An approved prescription goes to the pharmacy.','Your medication is prepared for shipment.','Your order is delivered to the address you provide.']},
  ];
  const drawings = {
    education:'<path d="M16 8c-3-3-7-4-12-3v22c5-1 9 0 12 3 3-3 7-4 12-3V5c-5-1-9 0-12 3Z"/><path d="M16 8v22M8 11h4M8 16h4M20 11h4M20 16h4"/>',
    biomarkers:'<path d="M12 4h8M13 4v9L5 26c-1 2 0 3 2 3h18c2 0 3-1 2-3l-8-13V4M9 21h14"/><path d="M12 25h.01M19 24h.01M16 18h.01"/>',
    medication:'<rect x="6" y="10" width="20" height="20" rx="4"/><path d="M10 3h12v7H10zM12 20h8M16 16v8M13 3v7M19 3v7"/>',
    intake:'<path d="M11 5H6v25h20V5h-5M11 3h10v5H11zM11 14h10M11 20h10M11 25h6"/>',
    review:'<path d="M16 3 5 7v9c0 7 11 14 11 14s11-7 11-14V7Z"/><path d="m10 16 4 4 8-8"/>',
    fulfillment:'<path d="m4 10 12-6 12 6v16l-12 5L4 26ZM4 10l12 5 12-5M16 15v16M10 7l12 5v6"/>',
  };
  const icon = id => `<svg class="process-icon" viewBox="0 0 32 34" aria-hidden="true">${drawings[id]}</svg>`;
  const choices = [
    {label:'I want to learn', text:'Explore what bloodwork can tell you and which questions you would like to discuss with your provider.'},
    {label:'I have results', text:'Keep any recent bloodwork results ready to discuss during your provider review.'},
    {label:'I plan to test', text:'Consider what you want to learn about your body and the questions you want bloodwork to help explore.'},
  ];
  const choiceMarkup = () => `<div class="biomarker-choices" role="group" aria-label="Your starting point for bloodwork">${choices.map((c,i)=>`<button type="button" data-biomarker="${i}" aria-pressed="${i===0}">${c.label}</button>`).join('')}</div><div class="biomarker-responses" aria-live="polite">${choices.map((c,i)=>`<p class="biomarker-response" aria-hidden="${i!==0}">${c.text}</p>`).join('')}</div>`;
  const mount = document.querySelector('#process-design');
  const section = document.querySelector('.process-concept');
  let currentDesign = 'circles', currentStep = 0, observer;

  function bindChoices() {
    mount.querySelectorAll('[data-biomarker]').forEach(button=>button.addEventListener('click',()=>{
      const group=button.closest('.biomarker-choices');
      group.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      group.nextElementSibling.querySelectorAll('.biomarker-response').forEach((response,i)=>response.setAttribute('aria-hidden',String(i!==Number(button.dataset.biomarker))));
    }));
  }
  function circles() {
    mount.innerHTML=`<ol class="circle-route" aria-label="Your six steps with Prime Point">${steps.map(s=>`<li class="circle-stop"><div class="circle-symbol">${icon(s.id)}</div><h3>${s.title}</h3><p class="process-description">${s.summary}</p></li>`).join('')}</ol><aside class="circle-biomarkers" aria-labelledby="biomarker-title"><div><p class="process-kicker">A closer look at biomarkers</p><h3 class="biomarker-label" id="biomarker-title">Understand your starting point.</h3><p class="biomarker-intro">Your next step begins with what you already know about your body.</p></div><div>${choiceMarkup()}</div></aside>`;
    bindChoices();
  }
  function drawConnections() {
    const root=mount.querySelector('.cards-route');if(!root)return;
    const bounds=root.getBoundingClientRect(),cards=[...root.querySelectorAll('.route-card')],svg=root.querySelector('svg');
    svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
    svg.innerHTML='<defs><marker id="route-arrowhead" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 7 4 1 7"/></marker></defs>';
    cards.slice(0,-1).forEach((el,i)=>{
      const a=el.getBoundingClientRect(),b=cards[i+1].getBoundingClientRect();let x1,y1,x2,y2;
      if(Math.abs(a.top-b.top)<5){const right=b.left>a.left;x1=(right?a.right+5:a.left-5)-bounds.left;x2=(right?b.left-7:b.right+7)-bounds.left;y1=y2=a.top+a.height/2-bounds.top;}
      else{x1=x2=a.left+a.width/2-bounds.left;y1=a.bottom+5-bounds.top;y2=b.top-7-bounds.top;}
      svg.insertAdjacentHTML('beforeend',`<path d="M${x1} ${y1}L${x2} ${y2}" marker-end="url(#route-arrowhead)"/>`);
    });
  }
  function cards() {
    mount.innerHTML=`<div class="cards-route"><svg class="route-connections" aria-hidden="true"></svg><ol class="route-cards" aria-label="Your six steps with Prime Point">${steps.map(s=>`<li class="route-card"><div class="card-symbol">${icon(s.id)}</div><h3>${s.title}</h3><p class="process-description">${s.summary}</p>${s.id==='biomarkers'?'<ul class="card-biomarker-paths" aria-label="Bloodwork starting points"><li>Want to learn</li><li>Have results</li><li>Plan to test</li></ul>':''}</li>`).join('')}</ol></div>`;
    observer=new ResizeObserver(drawConnections);observer.observe(mount);requestAnimationFrame(drawConnections);
  }
  function updateGuided(moveFocus=false) {
    const s=steps[currentStep];
    mount.querySelectorAll('.guided-tab').forEach((button,i)=>{button.setAttribute('aria-selected',String(i===currentStep));button.tabIndex=i===currentStep?0:-1;});
    const panel=mount.querySelector('.guided-panel');panel.setAttribute('aria-labelledby',`tab-${s.id}`);
    panel.innerHTML=`<div class="guided-panel-main"><div class="guided-panel-symbol">${icon(s.id)}</div><h3>${s.title}</h3><p class="process-description">${s.summary}</p></div><div class="guided-panel-detail"><h4>${s.detailTitle}</h4>${s.id==='biomarkers'?choiceMarkup():`<ul class="guided-detail-list">${s.points.map(p=>`<li>${p}</li>`).join('')}</ul>`}</div>`;
    mount.querySelector('[data-back]').disabled=currentStep===0;mount.querySelector('[data-next]').disabled=currentStep===steps.length-1;
    mount.querySelector('.guided-position').textContent=currentStep<steps.length-1?`Up next: ${steps[currentStep+1].title}`:'Your path, from understanding to your doorstep.';
    bindChoices();if(moveFocus)mount.querySelector(`#tab-${s.id}`).focus({preventScroll:true});
  }
  function guided() {
    mount.innerHTML=`<div class="guided-route"><div class="guided-tabs" role="tablist" aria-label="Explore your care journey">${steps.map(s=>`<button type="button" class="guided-tab" role="tab" id="tab-${s.id}" aria-controls="guided-panel" aria-selected="false" tabindex="-1">${icon(s.id)}<span>${s.title}</span></button>`).join('')}</div><div class="guided-panel" id="guided-panel" role="tabpanel" tabindex="0"></div><div class="guided-navigation"><p class="guided-position"></p><div><button type="button" data-back>Previous</button><button type="button" data-next>Next step</button></div></div></div>`;
    mount.querySelectorAll('.guided-tab').forEach((button,i)=>{
      button.addEventListener('click',()=>{currentStep=i;updateGuided();});
      button.addEventListener('keydown',event=>{
        let next=currentStep;if(event.key==='ArrowRight')next=(currentStep+1)%steps.length;else if(event.key==='ArrowLeft')next=(currentStep-1+steps.length)%steps.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=steps.length-1;else return;
        event.preventDefault();currentStep=next;updateGuided(true);
      });
    });
    mount.querySelector('[data-back]').addEventListener('click',()=>{if(currentStep>0){currentStep--;updateGuided(true);}});
    mount.querySelector('[data-next]').addEventListener('click',()=>{if(currentStep<steps.length-1){currentStep++;updateGuided(true);}});
    updateGuided();
  }
  const notes={circles:'A / Connected circles — An open, visual overview with a dedicated space to explore biomarkers.',cards:'B / Cards & arrows — All six stages are visible at once. Follow the gold arrows across the two rows.',guided:'C / Guided steps — Select a stage to explore it. The complete journey stays visible above the detail.'};
  function show(design) {
    observer?.disconnect();currentDesign=design;section.dataset.design=design;
    document.querySelectorAll('button[data-design]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.design===design)));
    ({circles,cards,guided})[design]();document.querySelector('#design-note').textContent=notes[design];
    history.replaceState(null,'',`#${design}`);
  }
  document.querySelectorAll('button[data-design]').forEach(button=>button.addEventListener('click',()=>show(button.dataset.design)));
  document.fonts?.ready.then(()=>{if(currentDesign==='cards')drawConnections();});
  show(Object.hasOwn(notes,location.hash.slice(1))?location.hash.slice(1):'circles');
})();
