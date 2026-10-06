'use strict';
(() => {
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => String(value).normalize('NFKD').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const stop = new Set('a an the is are be am i im you your me my we our they their it its this that these those what whats which who how do does can could would should to of for in on at with and or about please tell more want need like love enjoy interested team teams hospitality hfgc suit suits recommend duties responsibilities'.split(' '));
  const words = value => normalize(value).split(' ').filter(w => w && !stop.has(w));
  const aliases = {
    greeters:'greeter greeting greet welcoming welcome smile entrance entrances',
    ushers:'usher guide guiding seating seat seats crowd elderly elders pwd accessibility altar baptism',
    assistance:'help helping information directions lost found medical children food assistance questions',
    reception:'reception receive receiving arrival arrivals luggage airport hotel credentials',
    hosts:'host hosts handler handlers personalized accompany accompanying itinerary escort schedule guest care',
    transportation:'transport transportation driver drivers driving drive car cars vehicle vehicles logistics transfers pickup dropoff',
    runners:'runner runners quick rapid support documents supplies water retrieve logistical',
    lounge:'lounge refreshments meals comfort prepare preparing spaces preparation serving refreshments',
    protocol:'protocol organization organizing organised organized precedence introductions order stage access'
  };
  function distance(a,b) {
    const row = Array.from({length:b.length+1},(_,i)=>i);
    for (let i=1;i<=a.length;i++) { let prev=row[0]; row[0]=i; for(let j=1;j<=b.length;j++){const old=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old;} }
    return row[b.length];
  }
  function tokenMatch(query,token) {
    if (query===token) return 1;
    if (query.length>=2 && token.startsWith(query)) return .72;
    if (query.length>=4 && Math.abs(query.length-token.length)<=1 && distance(query,token)<=1) return .55;
    return 0;
  }
  function buildGuide(teams,pillars) {
    const page = name => ({page:name});
    const entries = teams.map(team=>({
      id:team.id,kind:'team',title:team.name,category:team.category==='vip'?'VIP Hospitality':'General Hospitality',
      text:team.purpose,bullets:team.responsibilities,fit:team.fit,team,
      aliases:aliases[team.id],target:{page:'team',params:{team:team.id}},
      body:[team.short,team.purpose,team.fit,team.location,team.note,team.extraText,...team.responsibilities,...(team.extraList||[])].filter(Boolean).join(' ')
    }));
    entries.push(...pillars.map(p=>({id:'pillar-'+p.id,kind:'pillar',title:p.name,category:'Our Four Pillars',text:p.text,scripture:p.scripture,reference:p.reference,aliases:p.name+' bible scripture verse '+p.reference,body:p.text+' '+p.scripture+' '+p.reference,target:{page:'pillar',params:{pillar:p.id}}})));
    entries.push(
      {id:'heart',kind:'overview',title:'Our Heart',category:'The Ministry',text:'Hospitality is a ministry of welcome, honor, service, and care—committed to making every guest experience the love of Christ through intentional hospitality.',body:'More than a function, a ministry of love. General Hospitality gives intentional care. VIP Hospitality gives personalized care. Everyone receives Christ-centered care.',aliases:'purpose vision heart ministry christ love general vip difference intentional personalized',target:page('heart')},
      {id:'general',kind:'overview',title:'General Guest Hospitality',category:'What We Do',text:'We serve every guest with intentional care through HFGC Greeters, HFGC Ushers, and the HFGC “May I Help You?” Team.',body:'Welcome arriving guests, guide them through the venue, and assist with practical needs.',aliases:'general guest hospitality',target:page('general')},
      {id:'vip',kind:'overview',title:'VIP Hospitality',category:'What We Do',text:'We provide thoughtful, personalized assistance to guests who have special roles and responsibilities at HFGC.',body:'VIP Reception, Hosts / Handlers, Transportation, Support Runners, Lounge, and Protocol Liaison.',aliases:'vip special guests personalized hospitality',target:page('vip')},
      {id:'pillars',kind:'overview',title:'Welcome · Honor · Serve · Care',category:'Our Four Pillars',text:'Welcome makes people feel expected. Honor makes people feel valued. Serve makes their experience easier. Care makes people feel remembered.',body:pillars.map(p=>p.name+' '+p.scripture+' '+p.reference).join(' '),aliases:'four pillars values scripture bible verses welcome honor serve care',target:page('pillars')},
      {id:'join',kind:'signup',title:'Join the Hospitality Ministry',category:'Get Involved',text:'Open Join Us and complete the interest form: your full name, a phone number or email address, and your preferred team. You can choose “I’m not sure” if you need help finding your place.',body:'Locale Church and District are optional. Your details are saved on this kiosk for the Hospitality booth team to review. Submitting expresses your interest; the team will discuss the next steps with you.',aliases:'join signup sign up register registration volunteer contact form locale local church district',target:page('join')},
      {id:'why',kind:'overview',title:'Why Join Us?',category:'Get Involved',text:'You don’t have to be a professional event organizer. Bring a willing heart, a welcoming spirit, a servant’s heart, a willingness to learn, a commitment to teamwork, and a desire to represent Christ.',body:'Welcome, honor, serve, and care for people from different nations and backgrounds. Be part of something bigger than yourself.',aliases:'why join qualifications experience professional beginner skills training willing learn teamwork',target:page('why')},
      {id:'finder',kind:'overview',title:'Find Your Place',category:'Our Teams',text:'Explore teams that match the way you enjoy serving: welcoming, guiding, helping, personalized guest care, transportation, quick support, preparing spaces, or organization and protocol.',body:teams.map(t=>t.finder).join(' '),aliases:'choose unsure recommend fit interested serve find place',target:page('finder')}
    );
    entries.forEach(e=>{e.titleWords=words(e.title);e.aliasWords=words(e.aliases||'');e.bodyWords=words(e.body||'');});
    function search(query) {
      const tokens=words(query);
      if (!tokens.length) {
        const q=normalize(query);
        if (/^(hfgc|hospitality|team|teams|our teams)$/.test(q)) return entries.filter(e=>['heart','general','vip','finder'].includes(e.id)).map(entry=>({entry,score:1}));
        return [];
      }
      return entries.map(entry=>{
        let score=0, matched=0;
        tokens.forEach(q=>{
          const best=(list,weight)=>Math.max(0,...list.map(t=>tokenMatch(q,t)*weight));
          const match=Math.max(best(entry.titleWords,9),best(entry.aliasWords,7),best(entry.bodyWords,2));
          if (match) matched++;
          score+=match;
        });
        score*=matched/tokens.length;
        if(normalize(entry.title).includes(normalize(query))) score+=12;
        return {entry,score,matched};
      }).filter(r=>r.score>=1.5).sort((a,b)=>b.score-a.score);
    }
    const get=id=>entries.find(e=>e.id===id);
    const result=(entry,extras={})=>({text:entry.text,target:entry.target,source:entry.title,entryId:entry.id,followups:['How can I join?','Which team suits me?'],...extras});
    function answer(question,context) {
      const q=normalize(question), prior=get(context);
      if (!q) return null;
      if(prior?.kind==='team' && /^(how can i join (them|this team)|who can join|who is it for|what skills do i need)$/.test(q)) {
        if(q.includes('join')) return result(get('join'),{target:{page:'join',params:{team:prior.id}},source:'Join '+prior.title});
        return result(prior,{text:prior.fit});
      }
      const unknownEvent=/\b(when|date|dates|time|times|where|address|venue|location|schedule|cost|fee|contact|name)\b/.test(q) && /\b(expo|event|pickup|pick up|baptism|medical|food|children|lost|found|meeting|training|leader|phone|contact|program|hotel|airport)\b/.test(q);
      if (unknownEvent || /\b(phone number|contact number|who is (the|our)|who leads|who runs|exact location|actual venue|license|licence|certification|age limit|training schedule)\b/.test(q)) {
        const relevant=search(question).find(r=>r.entry.kind==='team');
        return {text:'The ministry guide does not provide those specific event details. Please ask the Hospitality booth team to confirm them. The “May I Help You?” Team can help guests find information and connect them with the right person.',target:relevant?.entry.target||get('assistance').target,source:relevant?.entry.title||get('assistance').title,followups:['What does the May I Help You team do?','How can I join?']};
      }
      if (/^(hi|hello|hey|good morning|good afternoon|thanks|thank you)$/.test(q) || /who are you|what can you (do|answer)/.test(q)) return {text:'Welcome! I’m your Hospitality Assistant. I can help you explore our ministry, understand each team, find a place to serve, and open the interest form. My answers come from the ministry guide on this screen.',followups:['What is Hospitality Ministry?','Which team suits me?','How can I join?']};
      if (/\b(difference|different|compare|versus|vs)\b/.test(q) && /\b(general|vip)\b/.test(q)) return result(get('heart'),{text:'General Hospitality gives intentional care to every guest through Greeters, Ushers, and the “May I Help You?” Team. VIP Hospitality gives personalized care to guests with special roles and responsibilities. Everyone receives Christ-centered care.',followups:['What does General Hospitality do?','What does VIP Hospitality do?']});
      if (/\b(coordinator|coordinators)\b/.test(q) && /\b(driver|drivers)\b/.test(q)) {const e=get('transportation');return result(e,{text:'The Transportation Coordinator manages vehicle movement and schedules. The Driver operates the vehicle and professionally and safely transports assigned VIP guests according to the approved itinerary.',bullets:e.bullets});}
      if (/^why\b.*\bjoin\b/.test(q)) return result(get('why'),{followups:['Which team suits me?','How can I join?']});
      if (/\b(join|signup|sign up|register|registration|volunteer|form|locale|local church|district)\b/.test(q) && !/\b(greeter|usher|reception|host|handler|runner|lounge|protocol|driver|transportation)\b/.test(q)) return result(get('join'),{bullets:['Required: full name, phone number or email, and preferred team.','Optional: Locale Church and District.','Choose “I’m not sure” if you would like help choosing a team.'],followups:['Do I need experience?','Which team suits me?']});
      if (/\b(experience|qualifications|professional|beginner|requirements)\b/.test(q) && !/\b(vip|guest|guests)\b/.test(q)) return result(get('why'),{followups:['Which team suits me?','How can I join?']});
      if (/\b(four pillars|pillars|values|all verses|bible verses)\b/.test(q)) return result(get('pillars'),{bullets:pillars.map(p=>p.name+': '+p.text+' ('+p.reference+')'),followups:['Tell me about Welcome','Tell me about Honor','How can I join?']});
      if (/^(what is hospitality( ministry)?|what is hfgc|what is the ministry|our heart|what is our purpose|what is our vision)$/.test(q)) return result(get('heart'));
      if (/\b(which team|what team|recommend|suit|suits|find my place)\b/.test(q) && !search(question).some(r=>r.entry.kind==='team'&&r.score>=6)) return result(get('finder'),{text:'There is a place for you! What do you enjoy doing? Tell me about welcoming people, guiding guests, driving, preparing refreshments, organizing, or providing quick support.',followups:['I enjoy welcoming people','I enjoy driving','I enjoy preparing refreshments','I enjoy organizing']});
      if (prior?.kind==='team' && /^(tell me more|more|what are (their|the) (duties|responsibilities)|what do they do|where do they serve|who can join|who is it for|how can i join (them|this team)|what skills do i need)$/.test(q)) {
        if (q.includes('join')) return result(get('join'),{target:{page:'join',params:{team:prior.id}},source:'Join '+prior.title});
        if(q.includes('where')) return result(prior,{text:prior.team.location||'The guide describes this team’s role, but does not specify an exact assigned location. Please ask the Hospitality booth team for the event arrangements.'});
        if(/skills|who/.test(q)) return result(prior,{text:prior.fit});
        return teamAnswer(prior);
      }
      const ranked=search(question), top=ranked[0];
      if (!top || top.score<3.5) return {text:'I can help with questions about HFGC Hospitality, our teams, the four pillars, and joining the ministry. I don’t have a direct answer for that in the ministry guide. You can try one of these topics, or tap the button below to reach our Hospitality booth team.',unresolved:true,followups:['What is Hospitality Ministry?','Which team suits me?','How can I join?']};
      const e=top.entry;
      if (e.kind==='team') {
        const other=ranked.find(r=>r.entry.kind==='team'&&r.entry.id!==e.id&&r.score>=top.score*.85);
        if(other && !normalize(e.title).includes(q) && !words(q).some(w=>e.titleWords.includes(w))) return {text:'A few teams may fit that topic. Which would you like to explore?',choices:[e,other.entry],followups:['Which team suits me?']};
        if (/\b(join|sign up|register)\b/.test(q)) return result(get('join'),{target:{page:'join',params:{team:e.id}},source:'Join '+e.title});
        if (/\b(where|location)\b/.test(q)) return result(e,{text:e.team.location||'The guide describes this team’s role, but does not specify an exact assigned location. Please ask the Hospitality booth team for the event arrangements.'});
        if (/\b(skills|fit|who is it for)\b/.test(q)) return result(e,{text:e.fit});
        return teamAnswer(e,/\b(enjoy|love|good at|suit|suits|recommend|like|skills)\b/.test(q));
      }
      if (e.kind==='pillar') return result(e,{text:e.text,bullets:[e.scripture+' — '+e.reference],followups:['What are the four pillars?','How can I join?']});
      return result(e);
    }
    function teamAnswer(e,recommend=false) {
      return result(e,{text:(recommend?e.title+' may be a good fit. '+e.fit+' ':'')+e.text,bullets:e.bullets,detail:[e.team.note,e.team.extraText].filter(Boolean).join(' '),followups:['Who is it for?','How can I join this team?','Where do they serve?']});
    }
    return {entries,search,answer,get};
  }
  function create({teams,pillars,openDestination,activity}) {
    const guide=buildGuide(teams,pillars);
    const dialog=document.createElement('dialog');
    dialog.id='discovery-dialog'; dialog.className='discovery-dialog'; dialog.setAttribute('aria-labelledby','discovery-title');
    dialog.innerHTML=`<div class="discovery-shell"><header class="discovery-header"><div><p class="discovery-kicker">HFGC HOSPITALITY MINISTRY</p><h2 id="discovery-title">Find your way</h2></div><button type="button" class="discovery-close" aria-label="Close search and assistant">×</button></header><div class="discovery-tabs" role="tablist" aria-label="Explore or ask"><button type="button" id="guide-search-tab" role="tab" aria-controls="guide-panel" data-guide-mode="search">Search ministry</button><button type="button" id="guide-assistant-tab" role="tab" aria-controls="guide-panel" data-guide-mode="assistant"><img src="assets/emoji/serve.svg" width="30" height="30" alt=""> Ask Bro. Simon</button></div><div id="guide-panel" class="discovery-panel" role="tabpanel"><div id="guide-body" class="discovery-body"></div><form id="guide-form" autocomplete="off"><label for="guide-query" id="guide-label">What would you like to find?</label><div class="guide-input-row"><input id="guide-query" type="text" inputmode="none" maxlength="240" autocomplete="off" spellcheck="false" aria-describedby="guide-hint"><button type="submit" id="guide-send">Search</button></div><p id="guide-hint">Use the touch keyboard below, or type on your keyboard.</p><div id="guide-suggestions" class="guide-suggestions" aria-label="Related suggestions"></div></form></div><div class="touch-keyboard" role="group" aria-label="Touch keyboard"></div></div>`;
    document.body.append(dialog);
    const input=dialog.querySelector('#guide-query'),body=dialog.querySelector('#guide-body'),suggestions=dialog.querySelector('#guide-suggestions'),keyboard=dialog.querySelector('.touch-keyboard');
    let mode='search',shift=false,context=null,opener=null,messages=[],queries={search:'',assistant:''},speaking=false;
    const defaults=['Greeters','Ushers','VIP Transportation','How can I join?'];
    const askDefaults=['What is Hospitality Ministry?','Which team suits me?','How can I join?'];
    const actionLink=(target,label)=>`<button type="button" class="guide-source" data-guide-target="${escape(JSON.stringify(target))}">Open ${escape(label)} <span aria-hidden="true">›</span></button>`;
    const questionChips=items=>items.map(q=>`<button type="button" data-guide-question="${escape(q)}">${escape(q)}</button>`).join('');
    function drawKeyboard() {
      const key=(label,value=label,cls='')=>`<button type="button" class="${cls}" data-guide-key="${escape(value)}" aria-label="${escape(value===' '?'Space':value)}"${value==='Shift'?` aria-pressed="${shift}"`:''}>${escape(label)}</button>`;
      keyboard.innerHTML=['1234567890','qwertyuiop','asdfghjkl'].map((r,i)=>`<div class="key-row ${i===2?'key-row-inset':''}">${[...r].map(c=>key(shift?c.toUpperCase():c)).join('')}</div>`).join('')+`<div class="key-row">${key('⇧','Shift','key-control')}${[...'zxcvbnm'].map(c=>key(shift?c.toUpperCase():c)).join('')}${key('⌫','Backspace','key-control')}</div><div class="key-row key-row-actions">${key('Clear','Clear','key-control')}${key('Space',' ','key-space')}${key('?')}${key(mode==='search'?'Search':'Ask','Enter','key-submit')}</div>`;
    }
    function drawResults() {
      const query=queries.search.trim(), ranked=guide.search(query);
      const results=query?ranked.slice(0,8):['heart','greeters','ushers','transportation','join'].map(id=>({entry:guide.get(id)}));
      body.innerHTML=`<p class="guide-result-count" role="status">${query?(results.length?`${ranked.length} matching ${ranked.length===1?'topic':'topics'}`:'No matching topics'):'Popular topics · Tap to explore'}</p><div class="guide-results">${results.map(({entry:e})=>`<button type="button" class="guide-result" data-guide-target="${escape(JSON.stringify(e.target))}"><span class="guide-category">${escape(e.category)}</span><strong>${escape(e.title)} <span aria-hidden="true">›</span></strong><span>${escape(e.kind==='team'?e.team.short:e.text)}</span></button>`).join('')}</div>${query&&!results.length?`<div class="guide-empty"><h3>Let’s try another word</h3><p>Try “welcome,” “transportation,” or “join.” You can also ask a question in Ask Hospitality.</p><button type="button" data-guide-mode="assistant" class="guide-source">Ask Hospitality</button></div>`:''}`;
    }
    function drawChat() {
      // The assistant speaks aloud; no transcript or captions are shown, so the stage stays uncluttered.
      const last=[...messages].reverse().find(m=>m.role==='assistant');
      const state=speaking?'speaking':(last?'ready':'idle');
      const label=state==='speaking'?'Bro. Simon is speaking…':state==='ready'?'Tap a suggestion or ask your own question.':'Hi, I’m Bro. Simon. Ask me anything about our ministry.';
      const chips=last?.followups?.length?last.followups:askDefaults;
      body.innerHTML=`<div class="guide-stage" data-voice-state="${state}" role="status" aria-live="polite"><div class="voice-orb" aria-hidden="true"><span class="voice-ring"></span><span class="voice-ring"></span><span class="voice-ring"></span><span class="voice-core"><img src="assets/emoji/serve.svg" alt="" width="56" height="56"></span></div><p class="voice-name">Bro. Simon</p><p class="voice-status">${escape(label)}</p>${last?.unresolved?`<div class="guide-fallback"><p>I can’t find that in the ministry guide. Our hospitality team is ready to help.</p><button type="button" class="btn primary guide-fast-help" data-guide-fast-help>Ask our Hospitality team <span aria-hidden="true">›</span></button></div>`:''}${last?.target&&!last.unresolved?`<button type="button" class="guide-source voice-source" data-guide-target="${escape(JSON.stringify(last.target))}">Open ${escape(last.source)} <span aria-hidden="true">›</span></button>`:''}<div class="guide-question-chips voice-chips">${questionChips(chips)}</div></div>`;
    }
    function spokenText(m) {
      const parts=[m.text];
      if(m.bullets?.length) parts.push(m.bullets.join('. '));
      if(m.detail) parts.push(m.detail);
      return parts.filter(Boolean).join(' ');
    }
    const voiceState={voice:null,ready:false};
    function pickVoice() {
      if(!('speechSynthesis' in window)) return null;
      const voices=window.speechSynthesis.getVoices();
      if(!voices.length) return null;
      // Prefer a natural-sounding male English voice. Google / Microsoft Natural voices sound closest to a real person.
      const preferences=[
        v=>/en[-_](US|GB|AU|CA)/i.test(v.lang) && /natural|neural|wavenet|studio/i.test(v.name) && /male|guy|brandon|ryan|guy|davis|tony|aaron|liam|andrew/i.test(v.name),
        v=>/en[-_](US|GB|AU|CA)/i.test(v.lang) && /google/i.test(v.name) && /male|uk english male|us english male/i.test(v.name),
        v=>/en[-_](US|GB|AU|CA)/i.test(v.lang) && /daniel|alex|fred|aaron|arthur|rishi|oliver|tom|bruce|guy|ryan|andrew|liam|brian|james|mark/i.test(v.name),
        v=>/en[-_](US|GB|AU|CA|PH|IN)/i.test(v.lang) && !/female|zira|samantha|victoria|karen|moira|tessa|fiona|susan|allison|ava|serena/i.test(v.name),
        v=>/^en/i.test(v.lang)
      ];
      for(const match of preferences){const found=voices.find(match);if(found) return found;}
      return voices[0];
    }
    function ensureVoice() {
      if(!('speechSynthesis' in window)) return;
      voiceState.voice=pickVoice();
      voiceState.ready=Boolean(voiceState.voice);
    }
    if('speechSynthesis' in window){
      ensureVoice();
      window.speechSynthesis.addEventListener?.('voiceschanged',ensureVoice);
    }
    function setSpeaking(next){
      if(speaking===next) return;
      speaking=next;
      document.dispatchEvent(new CustomEvent('hfgc-speaking', { detail: next }));
      if(mode==='assistant' && dialog.open){
        const stage=body.querySelector('.guide-stage');
        if(stage) stage.dataset.voiceState=speaking?'speaking':(messages.some(m=>m.role==='assistant')?'ready':'idle');
        const label=body.querySelector('.voice-status');
        if(label) label.textContent=speaking?'Bro. Simon is speaking…':(messages.some(m=>m.role==='assistant')?'Tap a suggestion or ask your own question.':'Hi, I’m Bro. Simon. Ask me anything about our ministry.');
      }
    }
    function speak(text) {
      if(!text || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        if(!voiceState.ready) ensureVoice();
        const utter=new SpeechSynthesisUtterance(text);
        if(voiceState.voice){utter.voice=voiceState.voice;utter.lang=voiceState.voice.lang;}
        // Tuned for a polite, calm, natural delivery.
        utter.rate=0.96; utter.pitch=0.92; utter.volume=1;
        utter.onstart=()=>setSpeaking(true);
        utter.onend=()=>setSpeaking(false);
        utter.onerror=()=>setSpeaking(false);
        window.speechSynthesis.speak(utter);
        // Some browsers delay onstart; nudge the state so the orb animates immediately.
        setSpeaking(true);
      } catch { setSpeaking(false); }
    }
    function stopSpeaking(){try{window.speechSynthesis?.cancel();}catch{} setSpeaking(false);}
    function drawSuggestions() {
      const q=input.value.trim(),related=q?guide.search(q).slice(0,4).map(r=>r.entry.title):(mode==='search'?defaults:askDefaults);
      suggestions.innerHTML=related.length?`<span>${q?'Related topics':'Try'}</span>${related.map(s=>`<button type="button" data-guide-suggest="${escape(s)}">${escape(s)}</button>`).join('')}`:'<span>Try a team name, a role, or “join.”</span>';
    }
    function changeMode(next) {
      queries[mode]=input.value; mode=next; input.value=queries[mode];
      stopSpeaking();
      dialog.querySelector('#discovery-title').textContent=mode==='search'?'Find your way':'Ask Bro. Simon';
      dialog.querySelector('#guide-label').textContent=mode==='search'?'What would you like to find?':'Ask Bro. Simon about the Hospitality Ministry';
      dialog.querySelector('#guide-send').textContent=mode==='search'?'Search':'Ask';
      input.placeholder=mode==='search'?'Search teams, roles, or joining…':'Type your question for Bro. Simon…';
      dialog.querySelectorAll('[role="tab"]').forEach(tab=>{const active=tab.dataset.guideMode===mode;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
      dialog.querySelector('#guide-panel').setAttribute('aria-labelledby',mode==='search'?'guide-search-tab':'guide-assistant-tab');
      mode==='search'?drawResults():drawChat();drawSuggestions();drawKeyboard();
      input.focus();activity();
    }
    function submit() {
      activity();
      if(mode==='search') {drawResults();body.scrollTop=0;return;}
      const question=input.value.trim(); if(!question)return;
      const response=guide.answer(question,context); if(!response)return;
      context=response.entryId||null;
      const assistant={role:'assistant',...response};
      messages.push({role:'user',text:question},assistant);
      messages=messages.slice(-24);input.value='';queries.assistant='';drawChat();drawSuggestions();
      speak(spokenText(assistant));
      input.focus();
    }
    function close(reason) {
      if(!dialog.open)return;dialog.close();stopSpeaking();
      if(!['navigate','reset','idle'].includes(reason)&&opener?.isConnected)opener.focus();
    }
    function editKey(key) {
      activity();
      if(key==='Enter'){submit();return;}
      if(key==='Shift'){shift=!shift;drawKeyboard();return;}
      if(key==='Clear'){input.value='';input.setSelectionRange(0,0);}
      else {
        let start=input.selectionStart??input.value.length,end=input.selectionEnd??start;
        if(key==='Backspace'){if(start===end&&start>0){start--;if(start>0&&/[\uDC00-\uDFFF]/.test(input.value[start]))start--;}input.setRangeText('',start,end,'end');}
        else if(input.value.length-(end-start)+key.length<=input.maxLength)input.setRangeText(key,start,end,'end');
      }
      input.focus();input.dispatchEvent(new Event('input',{bubbles:true}));
    }
    document.querySelectorAll('[data-discovery]').forEach(button=>button.addEventListener('click',()=>{
      const alreadyOpen=dialog.open;
      opener=button; if(!alreadyOpen)dialog.showModal();changeMode(button.dataset.discovery);
      // First open of Ask Bro. Simon → he greets the visitor out loud, then the dialog waits for a question.
      if(button.dataset.discovery==='assistant' && !alreadyOpen){
        const greet='Hello, I’m Bro. Simon. How can I assist you?';
        // speechSynthesis.getVoices often returns [] on the very first call until the voices load — give it a tick.
        setTimeout(()=>speak(greet),120);
      }
    }));
    dialog.addEventListener('pointerdown',e=>{if(e.target.closest('[data-guide-key], [data-guide-suggest]'))e.preventDefault();});
    dialog.addEventListener('click',e=>{
      const button=e.target.closest('button');if(!button)return;activity();
      if(button.classList.contains('discovery-close'))close();
      else if(button.dataset.guideMode)changeMode(button.dataset.guideMode);
      else if(button.dataset.guideTarget){const target=JSON.parse(button.dataset.guideTarget);close('navigate');openDestination(target);}
      else if(button.dataset.guideKey)editKey(button.dataset.guideKey);
      else if(button.dataset.guideSuggest){input.value=button.dataset.guideSuggest;queries[mode]=input.value;input.focus();input.setSelectionRange(input.value.length,input.value.length);mode==='search'?drawResults():null;drawSuggestions();}
      else if(button.dataset.guideQuestion){input.value=button.dataset.guideQuestion;queries[mode]=input.value;submit();}
      else if(button.dataset.guideSpeak){speak(button.dataset.guideSpeak);}
      else if(button.hasAttribute('data-guide-fast-help')){close('navigate');openDestination({page:'join'});}
    });
    dialog.querySelector('#guide-form').addEventListener('submit',e=>{e.preventDefault();submit();});
    input.addEventListener('input',()=>{queries[mode]=input.value;activity();if(mode==='search')drawResults();drawSuggestions();});
    dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
    dialog.querySelector('.discovery-tabs').addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();changeMode(e.key==='Home'?'search':e.key==='End'?'assistant':mode==='search'?'assistant':'search');dialog.querySelector('[aria-selected="true"]').focus();}});
    return {isOpen:()=>dialog.open,close,reset:()=>{stopSpeaking();close('reset');messages=[];context=null;queries={search:'',assistant:''};input.value='';shift=false;}};
  }
  window.HFGC_DISCOVERY={create,buildGuide};
})();
