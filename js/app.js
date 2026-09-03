// mobile
    document.getElementById('mobileMenuBtn')?.addEventListener('click', ()=> document.getElementById('mobileMenu').classList.toggle('hidden'));

    // tabs
    document.querySelectorAll('.tab-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.tab-btn').forEach(b=>{b.className='tab-btn whitespace-nowrap px-4 h-8 font-mono text-xs tracking-widest uppercase font-bold bg-white border hairline hover:bg-creamTint';});
        btn.className='tab-btn whitespace-nowrap px-4 h-8 font-mono text-xs tracking-widest uppercase font-bold bg-ink text-cream';
        const tab = btn.dataset.tab;
        document.querySelectorAll('.tab-panel').forEach(p=> p.classList.toggle('hidden', p.dataset.panel !== tab));
      });
    });

    // calculators
    const ramRange=document.getElementById('ramRange'), ramVal=document.getElementById('ramVal'), ramAdvice=document.getElementById('ramAdvice');
    const advices={4:['4GB — will lag badly','text-terracotta'],8:['8GB — ok for light use only','text-amber-700'],12:['12GB — decent but 16GB better','text-teal'],16:['Perfect — future proof for 4 years','text-teal'],20:['20GB — overkill but great','text-teal'],24:['24GB — pro level','text-teal'],32:['32GB — only for heavy ML/gaming','text-label']};
    function updateRam(){let v=parseInt(ramRange.value); ramVal.textContent=v+'GB'; let a=advices[v]||advices[16]; ramAdvice.textContent=a[0]; ramAdvice.className='font-mono text-[11px] mt-1 font-bold '+a[1];}
    ramRange?.addEventListener('input',updateRam); updateRam();
    const storageRange=document.getElementById('storageRange'), storageVal=document.getElementById('storageVal'), storageAdvice=document.getElementById('storageAdvice');
    const sAdv={256:['256GB — fills in 1 sem','text-terracotta'],512:['Sweet spot','text-teal'],768:['768GB — comfortable','text-teal'],1024:['1TB — creators/gamers','text-label']};
    function updateStorage(){let v=parseInt(storageRange.value); storageVal.textContent=(v>=1024?'1TB SSD':v+'GB SSD'); let a=sAdv[v]||sAdv[512]; storageAdvice.textContent=a[0]; storageAdvice.className='font-mono text-[11px] mt-1 font-bold '+a[1];}
    storageRange?.addEventListener('input',updateStorage); updateStorage();
    document.querySelectorAll('.budget-btn').forEach(b=>b.addEventListener('click',()=>{
      document.querySelectorAll('.budget-btn').forEach(x=>x.className='budget-btn h-8 border hairline font-mono text-xs font-bold bg-white');
      b.className='budget-btn h-8 border-2 border-ink bg-ink text-cream font-mono text-xs font-bold';
      const v=b.dataset.budget;
      const map={35:'At ~35K: Aim Ryzen 5 7520U, 16GB, 512GB, FHD — value king for BA/BCom.',55:'At 50-60K: Aim Ryzen 7 7730U, 16GB, 512GB, OLED. Beast value.',90:'At 80-100K: MacBook Air M2/M3 or RTX 4050 — premium & future proof.'}
      document.getElementById('budgetAdvice').textContent=map[v];
    }));

    // budget filter
    document.querySelectorAll('.filter-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        document.querySelectorAll('.filter-btn').forEach(b=>{b.className='filter-btn px-4 h-8 border hairline bg-white font-mono text-xs tracking-widest uppercase font-bold hover:bg-creamTint'});
        btn.className='filter-btn px-4 h-8 bg-ink text-cream font-mono text-xs tracking-widest uppercase font-bold';
        const f=btn.dataset.filter;
        document.querySelectorAll('#budgetGrid > div').forEach(card=>{
          card.style.display=(f==='all' || card.dataset.budget===f) ? '' : 'none';
        });
      });
    });

    // checklist copy
    document.getElementById('copyChecklist')?.addEventListener('click',()=>{
      const text=[...document.querySelectorAll('#checklist input')].map((cb)=> (cb.checked?'☑ ':'☐ ')+cb.nextElementSibling.textContent.trim()).join('\n');
      navigator.clipboard.writeText('LaptopFinder Checklist (2026)\n'+text).then(()=>{
        const m=document.getElementById('copyMsg'); m.classList.remove('hidden'); setTimeout(()=>m.classList.add('hidden'),2000);
      });
    });

    // QUIZ
    let step=1;
    const answers={};
    const total=5;
    const quizStepLabel=document.getElementById('quizStepLabel'), quizBar=document.getElementById('quizBar'), quizPct=document.getElementById('quizPct');
    const nextBtn=document.getElementById('quizNext'), backBtn=document.getElementById('quizBack');
    const quizIdle=document.getElementById('quizIdle'), quizResult=document.getElementById('quizResult');
    function renderStep(){
      document.querySelectorAll('.quiz-step').forEach(s=>s.classList.toggle('hidden', parseInt(s.dataset.step)!==step));
      quizStepLabel.textContent=`Question ${step} of ${total}`;
      const pct=Math.round(step/total*100); quizBar.style.width=pct+'%'; quizPct.textContent=pct+'%';
      backBtn.classList.toggle('hidden', step===1);
      const sel=answers[step];
      if(sel){nextBtn.disabled=false; nextBtn.className='flex-1 bg-ink text-cream h-11 font-mono text-xs tracking-widest uppercase font-bold hover:bg-terracotta transition'; nextBtn.textContent= step===total ? 'See my result →' : 'Continue →';}
      else {nextBtn.disabled=true; nextBtn.className='flex-1 bg-creamTint text-label border hairline h-11 font-mono text-xs tracking-widest uppercase font-bold cursor-not-allowed'; nextBtn.textContent='Select an option to continue';}
      document.querySelectorAll(`.quiz-step[data-step="${step}"] .quiz-opt`).forEach(opt=>{
        const isSel = opt.dataset.value===answers[step];
        opt.classList.toggle('border-ink', isSel);
        opt.classList.toggle('border-2', isSel);
        opt.classList.toggle('bg-creamTint', isSel);
        opt.classList.toggle('hairline', !isSel);
      });
    }
    document.querySelectorAll('.quiz-opt').forEach(opt=>{
      opt.addEventListener('click',()=>{
        const s=parseInt(opt.closest('.quiz-step').dataset.step);
        answers[s]=opt.dataset.value;
        renderStep();
        if(s < total) setTimeout(()=>{if(answers[s]){step=s+1; renderStep();}}, 260);
        else setTimeout(computeResult, 300);
      });
    });
    nextBtn.addEventListener('click',()=>{ if(!answers[step]) return; if(step < total){ step++; renderStep();} else computeResult(); });
    backBtn.addEventListener('click',()=>{ if(step>1){step--; renderStep();}});
    function computeResult(){
      const purpose=answers[1], budget=answers[2], os=answers[4], gaming=answers[5];
      let title='', spec='', why='', cards=[];
      if(purpose==='coding'){
        if(budget==='100' || os==='mac'){
          title='MacBook Air M2/M3 — 16GB is your best investment';
          spec='M2/M3 • 16GB unified • 512GB • 15–18h • 1.24kg';
          why='CSE needs Unix, long battery for labs, and silent typing. M2 beats any Windows under 1L in battery & build.';
          cards=[
            {name:'MacBook Air M2 16GB / 256GB', price:'₹81,990', tag:'Top Pick', href:'https://www.amazon.in/s?k=MacBook+Air+M2+16GB', desc:'Best overall for CS. 16GB must.'},
            {name:'Lenovo ThinkPad E14 Gen5 (Ryzen 7)', price:'₹64,990', tag:'Value Win', href:'https://www.amazon.in/s?k=ThinkPad+E14+Gen+5', desc:'If not Mac: upgradeable, great keyboard.'},
          ];
        } else if(budget==='55' || budget==='75'){
          title='ASUS VivoBook 15 OLED / ThinkPad E14 — perfect for CSE';
          spec='Ryzen 7 7730U / i5-1335U • 16GB • 512GB OLED • 8–10h';
          why='You need 16GB + OLED for long coding nights. These give Mac-like display at half price.';
          cards=[
            {name:'ASUS VivoBook 15 OLED (R7 7730U, 16GB)', price:'₹49,990', tag:'Fresher Fav', href:'https://www.amazon.in/s?k=ASUS+VivoBook+15+OLED+Ryzen+7', desc:'Best 50k pick for coders.'},
            {name:'Lenovo IdeaPad Slim 5 (7840U, 16GB)', price:'₹62,990', tag:'Thin & Light', href:'https://www.amazon.in/s?k=Lenovo+IdeaPad+Slim+5+7840U', desc:'Lighter + 10h battery.'},
          ];
        } else {
          title='Stretch to 16GB — even at 35K';
          spec='Ryzen 5 7520U • 16GB • 512GB • FHD IPS';
          why='At 35K, 16GB is rare but must hunt. Avoid 8GB soldered or you’ll regret in Sem 3.';
          cards=[
            {name:'HP 15s Ryzen 5 7520U (16GB)', price:'₹33,990', tag:'Budget CS', href:'https://www.amazon.in/s?k=HP+15s+Ryzen+5+7520U+16GB', desc:'Only budget option with 16GB.'},
            {name:'Lenovo IdeaPad Slim 3 (R5 5625U, 16GB)', price:'₹36,500', tag:'Durable', href:'https://www.amazon.in/s?k=Lenovo+IdeaPad+Slim+3+16GB', desc:'Better build + upgradeable.'},
          ];
        }
      } else if(purpose==='design'){
        title='Creator: OLED + 16GB + RTX/Mac';
        spec='OLED 2.8K 100% DCI-P3 • 16GB • 512GB • RTX 4050 or M3';
        why='Design needs colour accuracy. OLED is not luxury — it’s your tool.';
        cards=[
          {name:'ASUS VivoBook Pro 15 OLED (RTX 4050)', price:'₹84,990', tag:'Creator', href:'https://www.amazon.in/s?k=VivoBook+Pro+15+OLED+RTX', desc:'OLED + 4050 = best value.'},
          {name:'MacBook Air M3 16GB', price:'₹1,02,000', tag:'Colour King', href:'https://www.amazon.in/s?k=MacBook+Air+M3+16GB', desc:'If budget allows — P3 + silent.'},
        ];
      } else if(purpose==='engineering'){
        title='Engineering: Need RTX for CAD';
        spec='i5-13450HX + RTX 3050/4050 • 16GB DDR5 • 512GB • 144Hz';
        why='SolidWorks/AutoCAD will crawl without dedicated GPU. You trade weight for power.';
        cards=[
          {name:'Lenovo LOQ 15 (RTX 4050)', price:'₹83,490', tag:'Best Mech', href:'https://www.amazon.in/s?k=Lenovo+LOQ+15+RTX+4050', desc:'Best thermals in range.'},
          {name:'Acer Nitro V (RTX 3050)', price:'₹74,990', tag:'Budget CAD', href:'https://www.amazon.in/s?k=Acer+Nitro+V+RTX+3050', desc:'Cheaper if tight.'},
        ];
      } else if(purpose==='gaming'){
        if(gaming==='heavy'){
          title='Gaming + Study — LOQ/Nitro is your pick';
          spec='RTX 4050 • 16GB • 144Hz • 512GB';
          why='Heavy gaming needs RTX. Accept 2.4kg & 4h battery.';
          cards=[
            {name:'Lenovo LOQ 15 RTX 4050', price:'₹83,490', tag:'Top Game', href:'https://www.amazon.in/s?k=Lenovo+LOQ+15+RTX+4050', desc:'144Hz, upgradeable.'},
            {name:'ASUS TUF A15 RTX 4050', price:'₹89,990', tag:'Tough', href:'https://www.amazon.in/s?k=ASUS+TUF+A15', desc:'MIL-STD, better cooling.'},
          ];
        } else {
          title='Don’t buy full gaming — get OLED + casual GPU';
          spec='Ryzen 7 7730U • 16GB • RTX 3050 (optional)';
          why='Casual Valorant runs on 780M iGPU. Save weight & get battery.';
          cards=[
            {name:'ASUS VivoBook 15 OLED + RTX 3050', price:'₹68,990', tag:'Balanced', href:'https://www.amazon.in/s?k=VivoBook+OLED+RTX+3050', desc:'OLED + light gaming.'},
            {name:'HP Victus 15 (RTX 3050)', price:'₹69,990', tag:'Alt', href:'https://www.amazon.in/s?k=HP+Victus+RTX+3050', desc:'If need gaming chassis.'},
          ];
        }
      } else if(purpose==='business'){
        if(budget==='100'){
          title='MBA: MacBook Air is pure ROI';
          spec='M2/M3 • 16GB • 256GB • 15h • 1.24kg';
          why='You carry daily to placements, airports. 1.2kg + 15h > RTX.';
          cards=[
            {name:'MacBook Air M2 16GB', price:'₹81,990', tag:'Placement Ready', href:'https://www.amazon.in/s?k=MacBook+Air+M2', desc:'Light, premium, 5yr resale.'},
            {name:'Lenovo Yoga Slim 7 / HP Aero', price:'₹64,990', tag:'Win Alt', href:'https://www.amazon.in/s?k=Lenovo+Yoga+Slim+7', desc:'If Windows: 1.3kg, OLED.'},
          ];
        } else {
          title='Business: Thin, light, all-day';
          spec='Ryzen 7 7730U • 16GB • OLED • 1.39kg • 10h';
          why='Excel/PPT/Zoom don’t need GPU — need keyboard & battery.';
          cards=[
            {name:'Lenovo IdeaPad Slim 5 (7840U)', price:'₹62,990', tag:'Best B-School', href:'https://www.amazon.in/s?k=IdeaPad+Slim+5', desc:'Metal, 10h, fingerprint.'},
            {name:'ASUS VivoBook 15 OLED', price:'₹49,990', tag:'Value', href:'https://www.amazon.in/s?k=VivoBook+15+OLED', desc:'Best under 50k for MBA.'},
          ];
        }
      } else {
        if(budget==='35'){
          title='General College: Save money — 35K is enough';
          spec='Ryzen 5 7520U • 16GB • 512GB • FHD';
          why='Notes, PDFs, YouTube don’t need RTX. Invest saved money in SSD/RAM.';
          cards=[{name:'HP 15s / Acer Aspire Lite', price:'₹33,990', tag:'Save', href:'https://www.amazon.in/s?k=HP+15s+Ryzen+5+7520U', desc:'Good enough for 4 years.'}];
        } else {
          title='General: VivoBook OLED is still king';
          spec='Ryzen 7 7730U • 16GB • OLED • 8h';
          why='OLED protects eyes for long reading nights + future-proof.';
          cards=[{name:'ASUS VivoBook 15 OLED', price:'₹49,990', tag:'Best All-rounder', href:'https://www.amazon.in/s?k=VivoBook+15+OLED', desc:'If can stretch to 50k, do it.'}];
        }
      }
      document.getElementById('resultTitle').textContent=title;
      document.getElementById('resultSpec').textContent=spec;
      document.getElementById('resultWhy').textContent=why;
      const cardsEl=document.getElementById('resultCards');
      cardsEl.innerHTML=cards.map(c=>`
        <a href="${c.href}" target="_blank" class="flex gap-3 p-3 border hairline bg-white hover:bg-creamTint transition">
          <div class="w-12 h-12 border hairline bg-creamTint flex items-center justify-center shrink-0"><i class="ri-macbook-line text-label"></i></div>
          <div class="flex-1 min-w-0">
            <p class="font-sans font-bold text-xs leading-tight">${c.name}</p>
            <p class="font-body text-xs text-body">${c.desc}</p>
            <p class="font-display text-xs mt-1">${c.price} <span class="font-mono text-[10px] font-normal text-label">• Amazon</span></p>
          </div>
          <span class="self-center font-mono text-[10px] tracking-widest uppercase bg-ink text-cream px-2 py-1 shrink-0">${c.tag}</span>
        </a>
      `).join('') + `<p class="font-mono text-[10px] tracking-wide text-label text-center">Prices July 2026 sale. Seller = Appario/Official.</p>`;
      quizIdle.classList.add('hidden');
      quizResult.classList.remove('hidden');
      if(window.innerWidth < 1024) quizResult.scrollIntoView({behavior:'smooth', block:'start'});
    }
    document.getElementById('quizRestart')?.addEventListener('click',()=>{
      step=1; for(let k in answers) delete answers[k];
      quizResult.classList.add('hidden'); quizIdle.classList.remove('hidden');
      renderStep();
    });
    renderStep();

    document.querySelectorAll('[data-purpose]').forEach(chip=>chip.addEventListener('click', e=>{
      e.preventDefault();
      const tabMap={coding:'coding',design:'design',engineering:'engineering',business:'business',general:'general'};
      const tab=tabMap[chip.dataset.purpose] || 'coding';
      document.querySelector(`[data-tab="${tab}"]`)?.click();
      document.getElementById('purpose').scrollIntoView({behavior:'smooth'});
    }));
