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
    const advices={4:['4GB - will lag badly','text-terracotta'],8:['8GB - ok for light use only','text-amber-700'],12:['12GB - decent but 16GB better','text-teal'],16:['Perfect - future proof for 4 years','text-teal'],20:['20GB - overkill but great','text-teal'],24:['24GB - pro level','text-teal'],32:['32GB - only for heavy ML/gaming','text-label']};
    function updateRam(){let v=parseInt(ramRange.value); ramVal.textContent=v+'GB'; let a=advices[v]||advices[16]; ramAdvice.textContent=a[0]; ramAdvice.className='font-mono text-[11px] mt-1 font-bold '+a[1];}
    ramRange?.addEventListener('input',updateRam); updateRam();
    const storageRange=document.getElementById('storageRange'), storageVal=document.getElementById('storageVal'), storageAdvice=document.getElementById('storageAdvice');
    const sAdv={256:['256GB - fills in 1 sem','text-terracotta'],512:['Sweet spot','text-teal'],768:['768GB - comfortable','text-teal'],1024:['1TB - creators/gamers','text-label']};
    function updateStorage(){let v=parseInt(storageRange.value); storageVal.textContent=(v>=1024?'1TB SSD':v+'GB SSD'); let a=sAdv[v]||sAdv[512]; storageAdvice.textContent=a[0]; storageAdvice.className='font-mono text-[11px] mt-1 font-bold '+a[1];}
    storageRange?.addEventListener('input',updateStorage); updateStorage();
    document.querySelectorAll('.budget-btn').forEach(b=>b.addEventListener('click',()=>{
      document.querySelectorAll('.budget-btn').forEach(x=>x.className='budget-btn h-8 border hairline font-mono text-xs font-bold bg-white');
      b.className='budget-btn h-8 border-2 border-ink bg-ink text-cream font-mono text-xs font-bold';
      const v=b.dataset.budget;
      const map={35:'At ~35K: Aim Ryzen 5 7520U, 16GB, 512GB, FHD - value king for BA/BCom.',55:'At 50-60K: Aim Ryzen 7 7730U, 16GB, 512GB, OLED. Beast value.',90:'At 80-100K: MacBook Air M2/M3 or RTX 4050 - premium & future proof.'}
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

    // checklist copy (with fallback for non-secure contexts / denied permission)
    const showCopyMsg=(ok)=>{
      const m=document.getElementById('copyMsg'); if(!m) return;
      m.textContent= ok ? 'Copied to clipboard ✓' : 'Copy failed - select and copy manually';
      m.classList.remove('hidden'); setTimeout(()=>m.classList.add('hidden'),2500);
    };
    document.getElementById('copyChecklist')?.addEventListener('click',()=>{
      const text=[...document.querySelectorAll('#checklist input')].map((cb)=> (cb.checked?'☑ ':'☐ ')+cb.nextElementSibling.textContent.trim()).join('\n');
      const full='LaptopFinder Checklist (2026)\n'+text;
      const legacyCopy=()=>{ // fallback: hidden textarea + execCommand
        try{
          const ta=document.createElement('textarea');
          ta.value=full; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.opacity='0';
          document.body.appendChild(ta); ta.select();
          const ok=document.execCommand('copy'); ta.remove(); showCopyMsg(ok);
        }catch(e){ showCopyMsg(false); }
      };
      if(navigator.clipboard && window.isSecureContext){ navigator.clipboard.writeText(full).then(()=>showCopyMsg(true), legacyCopy); }
      else legacyCopy();
    });

    // image fallback: if a hotlinked product photo breaks, swap to local favicon (capture phase: error events don't bubble)
    document.addEventListener('error',(e)=>{
      const t=e.target;
      if(t && t.tagName==='IMG' && t.dataset.fallback && !t.dataset.fbk){ t.dataset.fbk='1'; t.src=t.dataset.fallback; }
    }, true);

    // buttons previously wired via inline onclick (CSP-friendly)
    document.getElementById('seeBudgetBtn')?.addEventListener('click',()=>{
      document.getElementById('budget')?.scrollIntoView({behavior:'smooth'});
    });
    document.getElementById('printChecklistBtn')?.addEventListener('click',()=>window.print());
    document.getElementById('backToTop')?.addEventListener('click',(e)=>{
      e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'});
    });

    // sticky share: the button is a plain wa.me link (never blocked); upgrade to the native
    // share sheet with the exact current URL only where supported
    document.getElementById('shareBtn')?.addEventListener('click', async (e)=>{
      if(!navigator.share) return; // let the link navigate normally
      e.preventDefault();
      try{ await navigator.share({title:document.title, text:'LaptopFinder - honest laptop picks for freshers. No sponsorship.', url:location.href}); }catch(err){}
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
          title='MacBook Air M3 - 16GB is your best investment';
          spec='M3 • 16GB unified • 256GB • 15-18h • 1.24kg';
          why='CSE needs Unix, long battery for labs, and silent typing. M3 beats any Windows under 1L in battery and build.';
          cards=[
            {name:'MacBook Air M3 16GB 256GB', price:'₹1,02,000 ref', tag:'Top Pick', href:'https://www.amazon.in/Apple-MacBook-13-inch-8-core-Unified/dp/B0DLHDZ7FL', desc:'Best overall for CS. 16GB must.'},
            {name:'Lenovo ThinkPad E14 Gen5 (Ryzen 7)', price:'₹64,990', tag:'Value Win', href:'https://www.amazon.in/Lenovo-ThinkPad-Graphics-Keyboard-21JRS0H300/dp/B0DDY2TN52', desc:'If not Mac: upgradeable, great keyboard.'},
          ];
        } else if(budget==='55' || budget==='75'){
          title='ASUS VivoBook 15 OLED - perfect for CSE';
          spec='Ryzen 5 7530U • 16GB • 512GB OLED • 8-10h';
          why='You need 16GB + OLED for long coding nights. This gives Mac-like display at half price.';
          cards=[
            {name:'ASUS VivoBook 15 OLED M1505YA (R5 7530U, 16GB)', price:'₹49,990 ref', tag:'Fresher Fav', href:'https://www.amazon.in/ASUS-Vivobook-Ryzen-7530U-M1505YA-LK541WS/dp/B0CKJ9MYB7', desc:'Best 50k pick for coders.'},
            {name:'Lenovo IdeaPad Slim 5 (R7 7735HS, 16GB)', price:'₹62,990 ref', tag:'Thin & Light', href:'https://www.amazon.in/Lenovo-IdeaPad-Integrated-Graphics-83J2000HIN/dp/B0DVGF96B4', desc:'Lighter + 10h battery.'},
          ];
        } else {
          title='Stretch to 50-60K for real 16GB';
          spec='Intel Core 5 210H • 16GB • 512GB • thin-light';
          why='We list no 35K pick with 16GB right now - and 8GB soldered will hurt by Sem 3. These two Flipkart picks are the cheapest honest 16GB buys.';
          cards=[
            {name:'ASUS ExpertBook P1 P1403CVA (16GB)', price:'Flipkart · live varies', tag:'Business Pick', store:'Flipkart', href:'https://www.flipkart.com/asus-expertbook-p1-1-yr-adp-i5-14th-gen-intel-core-5-210h-16-gb-512-gb-ssd-windows-11-home-p1403cva-s61565ws-p1403cvayb-s62423ws-thin-light-laptop/p/itmd8d14da7d4e32?pid=COMHGYAFJWATPZ8K&marketplace=FLIPKART&lid=LSTCOMHGYAFJWATPZ8KIFU7U0', desc:'1-Yr ADP cover, upgradeable business build.'},
            {name:'Motorola Motobook 60 (16GB OLED)', price:'Flipkart · live varies', tag:'Display King', store:'Flipkart', href:'https://www.flipkart.com/motorola-motobook-60-full-metal-2-8k-oled-i5-14th-gen-intel-core-5-series-2-210h-16-gb-512-gb-ssd-windows-11-home-14irh10r-thin-light-laptop/p/itme7b254581c42e?pid=COMHAUZW4MMNNCGT&lid=LSTCOMHAUZW4MMNNCGTEVATRK&marketplace=FLIPKART&cmpid=content_computer_8965229628_gmc', desc:'2.8K OLED + metal body at this price.'},
          ];
        }
      } else if(purpose==='design'){
          title='Creator: OLED + 16GB + RTX or Mac';
          spec='OLED 2.8K 100% DCI-P3 • 16GB • 512GB • RTX 4050 or M3';
        why='Design needs colour accuracy. OLED is not luxury - it’s your tool.';
        cards=[
          {name:'ASUS VivoBook Pro 15 OLED (RTX 4050)', price:'₹84,990 ref', tag:'Creator', href:'https://www.amazon.in/ASUS-Vivobook-OLED-15-6-inch-1920/dp/B0CZ3NF1T7', desc:'OLED + 4050 = best value.'},
          {name:'MacBook Air M3 16GB', price:'₹1,02,000 ref', tag:'Colour King', href:'https://www.amazon.in/Apple-MacBook-13-inch-8-core-Unified/dp/B0DLHDZ7FL', desc:'If budget allows - P3 + silent.'},
        ];
      } else if(purpose==='engineering'){
        title='Engineering: no RTX pick listed yet';
        spec='Closest honest 16GB picks • GPU pick coming';
        why='SolidWorks and AutoCAD need a dedicated GPU, and none of our 4 listed picks has one. These are the closest honest buys - check back for a gaming pick.';
        cards=[
          {name:'ASUS ExpertBook P1 P1403CVA (16GB)', price:'Flipkart · live varies', tag:'Business Pick', store:'Flipkart', href:'https://www.flipkart.com/asus-expertbook-p1-1-yr-adp-i5-14th-gen-intel-core-5-210h-16-gb-512-gb-ssd-windows-11-home-p1403cva-s61565ws-p1403cvayb-s62423ws-thin-light-laptop/p/itmd8d14da7d4e32?pid=COMHGYAFJWATPZ8K&marketplace=FLIPKART&lid=LSTCOMHGYAFJWATPZ8KIFU7U0', desc:'1-Yr ADP cover, upgradeable business build.'},
          {name:'Motorola Motobook 60 (16GB OLED)', price:'Flipkart · live varies', tag:'Display King', store:'Flipkart', href:'https://www.flipkart.com/motorola-motobook-60-full-metal-2-8k-oled-i5-14th-gen-intel-core-5-series-2-210h-16-gb-512-gb-ssd-windows-11-home-14irh10r-thin-light-laptop/p/itme7b254581c42e?pid=COMHAUZW4MMNNCGT&lid=LSTCOMHAUZW4MMNNCGTEVATRK&marketplace=FLIPKART&cmpid=content_computer_8965229628_gmc', desc:'2.8K OLED + metal body at this price.'},
        ];
      } else if(purpose==='gaming'){
        if(gaming==='heavy'){
          title='Heavy gaming needs RTX - not listed yet';
          spec='Closest 16GB picks • RTX pick coming';
          why='Heavy AAA gaming needs an RTX GPU, which none of our 4 listed picks has. These two run light games fine - check back for a real gaming pick.';
          cards=[
            {name:'Motorola Motobook 60 (16GB OLED)', price:'Flipkart · live varies', tag:'Display King', store:'Flipkart', href:'https://www.flipkart.com/motorola-motobook-60-full-metal-2-8k-oled-i5-14th-gen-intel-core-5-series-2-210h-16-gb-512-gb-ssd-windows-11-home-14irh10r-thin-light-laptop/p/itme7b254581c42e?pid=COMHAUZW4MMNNCGT&lid=LSTCOMHAUZW4MMNNCGTEVATRK&marketplace=FLIPKART&cmpid=content_computer_8965229628_gmc', desc:'2.8K OLED + metal body at this price.'},
            {name:'ASUS ExpertBook P1 P1403CVA (16GB)', price:'Flipkart · live varies', tag:'Business Pick', store:'Flipkart', href:'https://www.flipkart.com/asus-expertbook-p1-1-yr-adp-i5-14th-gen-intel-core-5-210h-16-gb-512-gb-ssd-windows-11-home-p1403cva-s61565ws-p1403cvayb-s62423ws-thin-light-laptop/p/itmd8d14da7d4e32?pid=COMHGYAFJWATPZ8K&marketplace=FLIPKART&lid=LSTCOMHGYAFJWATPZ8KIFU7U0', desc:'1-Yr ADP cover, upgradeable business build.'},
          ];
        } else {
          title='Do not buy full gaming - get OLED + RTX';
          spec='Ryzen 7 • 16GB • RTX 4050 • OLED';
          why='Casual Valorant runs on 780M iGPU. Save weight and get battery.';
          cards=[
            {name:'ASUS VivoBook Pro 15 OLED RTX 4050', price:'₹84,990 ref', tag:'Balanced', href:'https://www.amazon.in/ASUS-Vivobook-OLED-15-6-inch-1920/dp/B0CZ3NF1T7', desc:'OLED + light gaming.'},
            {name:'HP Victus 15 (RTX 3050)', price:'₹69,990 ref', tag:'Alt', href:'https://www.amazon.in/dp/B0DTYZ2CG8', desc:'If need gaming chassis.'},
          ];
        }
      } else if(purpose==='business'){
        if(budget==='100'){
          title='MBA: MacBook Air is pure ROI';
          spec='M3 • 16GB • 256GB • 15h • 1.24kg';
          why='You carry daily to placements and airports. 1.2kg + 15h beats RTX.';
          cards=[
            {name:'MacBook Air M3 16GB', price:'₹1,02,000 ref', tag:'Placement Ready', href:'https://www.amazon.in/Apple-MacBook-13-inch-8-core-Unified/dp/B0DLHDZ7FL', desc:'Light, premium, 5yr resale.'},
            {name:'Lenovo Yoga Slim 7 Ryzen AI 7', price:'₹64,990 ref', tag:'Win Alt', href:'https://www.amazon.in/dp/B0FP5H1YMM', desc:'If Windows: 1.3kg, OLED.'},
          ];
        } else {
          title='Business: Thin, light, all-day';
          spec='Ryzen 7 7735HS • 16GB • OLED • 1.39kg • 10h';
          why='Excel and PPT and Zoom do not need GPU - need keyboard and battery.';
          cards=[
            {name:'Lenovo IdeaPad Slim 5 R7 7735HS', price:'₹62,990 ref', tag:'Best B-School', href:'https://www.amazon.in/Lenovo-IdeaPad-Integrated-Graphics-83J2000HIN/dp/B0DVGF96B4', desc:'Metal, 10h, fingerprint.'},
            {name:'ASUS VivoBook 15 OLED M1505YA', price:'₹49,990 ref', tag:'Value', href:'https://www.amazon.in/ASUS-Vivobook-Ryzen-7530U-M1505YA-LK541WS/dp/B0CKJ9MYB7', desc:'Best under 50k for MBA.'},
          ];
        }
      } else {
        if(budget==='35'){
          title='General College: Save money - 35K is enough';
          spec='Ryzen 5 5625U • 16GB • 512GB • FHD';
          why='Notes, PDFs, YouTube do not need RTX. Invest saved money in SSD and RAM.';
          cards=[{name:'Acer Aspire Lite AL15-41 R5 5625U', price:'₹34,490 ref', tag:'Save', href:'https://www.amazon.in/5-5625U-Premium-Windows-AL15-41-Display/dp/B0DG2GCTD7', desc:'Good enough for 4 years.'}];
        } else {
          title='General: VivoBook OLED is still king';
          spec='Ryzen 5 7530U • 16GB • OLED • 8h';
          why='OLED protects eyes for long reading nights + future-proof.';
          cards=[{name:'ASUS VivoBook 15 OLED M1505YA', price:'₹49,990 ref', tag:'Best All-rounder', href:'https://www.amazon.in/ASUS-Vivobook-Ryzen-7530U-M1505YA-LK541WS/dp/B0CKJ9MYB7', desc:'If can stretch to 50k, do it.'}];
        }
      }
      document.getElementById('resultTitle').textContent=title;
      document.getElementById('resultSpec').textContent=spec;
      document.getElementById('resultWhy').textContent=why;
      const cardsEl=document.getElementById('resultCards');
      cardsEl.replaceChildren(); // safe render: no HTML parsing, all text set via textContent
      const mk=(tag, cls, text)=>{ const n=document.createElement(tag); if(cls) n.className=cls; if(text!=null) n.textContent=text; return n; };
      const isSafeUrl=(u)=>{ try{ const p=new URL(u, location.origin); return p.protocol==='http:'||p.protocol==='https:'; }catch(e){ return false; } };
      cards.forEach(c=>{
        const a=mk('a','flex gap-3 p-3 border hairline bg-white hover:bg-creamTint transition');
        a.href=isSafeUrl(c.href)?c.href:'#';
        a.target='_blank'; a.rel='nofollow sponsored noopener';
        const icon=mk('div','w-12 h-12 border hairline bg-creamTint flex items-center justify-center shrink-0');
        icon.appendChild(mk('i','ri-macbook-line text-label'));
        const body=mk('div','flex-1 min-w-0');
        body.appendChild(mk('p','font-sans font-bold text-xs leading-tight',c.name));
        body.appendChild(mk('p','font-body text-xs text-body',c.desc));
        const price=mk('p','font-display text-xs mt-1',c.price+' ');
        price.appendChild(mk('span','font-mono text-[10px] font-normal text-label','• '+(c.store||'Amazon')));
        body.appendChild(price);
        a.appendChild(icon); a.appendChild(body);
        a.appendChild(mk('span','self-center font-mono text-[10px] tracking-widest uppercase bg-ink text-cream px-2 py-1 shrink-0',c.tag));
        cardsEl.appendChild(a);
      });
      cardsEl.appendChild(mk('p','font-mono text-[10px] tracking-wide text-label text-center','Sale ref price. Live price varies. Each link opens one exact model. Seller = Appario or Official.'));
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
