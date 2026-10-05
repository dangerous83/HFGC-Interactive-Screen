'use strict';
(() => {
  const config = window.HFGC_CONFIG || {};
  const logo = 'HFGC%20EXPO%20GOLD%20FLAT%20LOGO.png';
  const icons = {
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    welcome: '<path d="M3 20h18M5 20V5l10-2v17M15 7h4v13M11 12h.01"/>',
    honor: '<path d="m3 7 4 4 5-7 5 7 4-4-2 12H5L3 7ZM6 22h12"/>',
    serve: '<path d="M2 13h4l4-3h6a2 2 0 0 1 0 4h-5M6 13v7l11-2 5-6a2 2 0 0 0-3-2l-3 4M2 20h4"/>',
    care: '<path d="M3 21v-7l3-3M21 21v-7l-3-3M3 16l5 4h8l5-4M12 4c-5-5-10 2 0 8 10-6 5-13 0-8Z"/>',
    users: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-4a6 6 0 0 1 12 0v4M16 4a3 3 0 0 1 0 6M21 21v-4a6 6 0 0 0-4-5"/>',
    guide: '<path d="M12 22V3M4 4h13l4 4-4 4H4V4ZM8 15h9v5H8l-4-2.5L8 15Z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 1 1 4 3c-1 .5-1 1-1 3M12 17h.01"/>',
    reception: '<path d="M3 20h18M4 16h16a8 8 0 0 0-16 0ZM12 8V5M10 5h4"/>',
    host: '<circle cx="8" cy="7" r="3"/><path d="M2 21v-3a6 6 0 0 1 10-4M15 7l2 2 4-4M16 13v8M12 17h8"/>',
    car: '<path d="m5 5-2 7v6h2v3h3v-3h8v3h3v-3h2v-6l-2-7H5ZM3 12h18M7 15h.01M17 15h.01"/>',
    runner: '<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>',
    lounge: '<path d="M5 11V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4M3 11h3v5h12v-5h3v8H3v-8ZM5 19v3M19 19v3"/>',
    protocol: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M9 10l1 1 2-2M14 10h2M9 16l1 1 2-2M14 16h2"/>',
    home: '<path d="m3 10 9-7 9 7v11H3V10ZM9 21v-8h6v8"/>',
    back: '<path d="m14 5-7 7 7 7M7 12h14"/>',
    next: '<path d="m10 5 7 7-7 7M17 12H3"/>',
    expand: '<path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"/>',
    collapse: '<path d="M3 8h5V3M21 8h-5V3M16 21v-5h5M8 21v-5H3"/>',
    book: '<path d="M12 5c-3-2-7-2-10-1v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1ZM12 5v15"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
    chat: '<path d="M21 15a3 3 0 0 1-3 3H8l-5 4V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v9ZM7 8h10M7 12h7"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.heart}</svg>`;
  const tile = name => `<span class="icon-tile">${icon(name)}</span>`;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pillars = [
  {
    "id": "welcome",
    "name": "Welcome",
    "tagline": "We make all people feel expected.",
    "text": "We make all people feel expected.",
    "scripture": "“Do not forget to show hospitality to strangers, for by so doing some people have shown hospitality to angels without knowing it.”",
    "reference": "Hebrews 13:2"
  },
  {
    "id": "honor",
    "name": "Honor",
    "tagline": "We make people feel valued.",
    "text": "We make people feel valued.",
    "scripture": "“Be devoted to one another in love. Honor one another above yourselves.”",
    "reference": "Romans 12:10"
  },
  {
    "id": "serve",
    "name": "Serve",
    "tagline": "We make their experience easier.",
    "text": "We make their experience easier.",
    "scripture": "“Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace in its various forms.”",
    "reference": "1 Peter 4:10"
  },
  {
    "id": "care",
    "name": "Care",
    "tagline": "We make people feel remembered.",
    "text": "We make people feel remembered.",
    "scripture": "“God is not unjust; he will not forget your work and the love you have shown him as you have helped his people and continue to help them.”",
    "reference": "Hebrews 6:10"
  }
];
  const teams = [
  {
    "id": "greeters",
    "category": "general",
    "name": "HFGC Greeters",
    "icon": "users",
    "short": "Create the first impression with warmth, joy, and the love of Christ.",
    "tagline": "A warm welcome starts with you.",
    "purpose": "They create the first impression of HFGC by welcoming every guest with warmth, joy, and the love of Christ.",
    "fit": "You enjoy meeting people and helping them feel welcome.",
    "interest": "I’m Interested in Greeters",
    "finder": "I love welcoming people.",
    "responsibilities": [
      "Welcome arriving guests",
      "Smile and greet",
      "Direct guests toward registration/venue",
      "Identify guests needing assistance (PWD - People with Determination)",
      "Create a joyful atmosphere",
      "Coordinate with Information/May I Help You teams"
    ],
    "extraTitle": "Atmosphere & Welcome Elements",
    "extraList": [
      "Mascots",
      "Air Dancers",
      "Mascots from HFGC locations, if possible: Japan, UAE, Cavite, Laguna, Pampanga",
      "HFGC Welcome Presentations"
    ],
    "location": "Entrances, arrival points, key access areas"
  },
  {
    "id": "ushers",
    "category": "general",
    "name": "HFGC Ushers",
    "icon": "guide",
    "short": "Guide guests safely throughout the venue and program.",
    "tagline": "We guide. We assist. We care.",
    "purpose": "They guide guests safely and efficiently throughout the venue, helping them find their designated areas and participate smoothly in the program.",
    "fit": "You enjoy guiding people, staying attentive, and helping activities run smoothly.",
    "interest": "I’m Interested in Ushers",
    "finder": "I love helping people find their way.",
    "responsibilities": [
      "Guide guests to seating areas",
      "Assist with crowd flow",
      "Help maintain orderly movement",
      "Assist elderly guests, PWDs (People with Determination), and families when needed",
      "Direct guests to facilities",
      "Coordinate with Security",
      "Assist with altar-call movement",
      "Assist with baptism movement"
    ],
    "extraTitle": "HFGC Altar Call Team",
    "extraText": "They can also serve as the HFGC Altar Call Team. They guide people who respond to the altar call."
  },
  {
    "id": "assistance",
    "category": "general",
    "name": "HFGC “May I Help You?” Team",
    "icon": "help",
    "short": "Provide mobile information and proactive guest care.",
    "tagline": "Help wherever it is needed.",
    "purpose": "They are the mobile information and guest-care team, proactively assisting guests with questions, directions, and practical needs throughout the venue.",
    "fit": "You enjoy answering questions, solving practical problems, and connecting people with the right help.",
    "interest": "I’m Interested in Guest Assistance",
    "finder": "I love helping people with their needs.",
    "responsibilityLabel": "View Assistance Areas",
    "responsibilities": [
      "Directions",
      "Program information",
      "Venue facilities",
      "Registration questions",
      "Lost & found",
      "Transportation information",
      "Food areas",
      "Medical locations",
      "Children’s areas",
      "Accessibility",
      "General concerns"
    ],
    "note": "Our key question: “May I help you?”",
    "extraTitle": "When We Don’t Know the Answer",
    "extraText": "When they don’t know the answer: “Let me find someone who can help you.” That is hospitality."
  },
  {
    "id": "reception",
    "category": "vip",
    "name": "HFGC VIP Reception Team",
    "icon": "reception",
    "short": "Receive, welcome, verify, and introduce VIPs to their Hosts.",
    "tagline": "We receive. We welcome. We connect.",
    "purpose": "They receive, welcome, verify, and introduce VIP guests to their assigned HFGC host.",
    "fit": "You enjoy welcoming guests and coordinating arrival arrangements.",
    "interest": "I’m Interested in VIP Reception",
    "finder": "I enjoy welcoming guests and organizing arrivals.",
    "responsibilities": [
      "Welcome VIP",
      "Verify arrival",
      "Coordinate credentials",
      "Receive luggage when appropriate",
      "Connect VIP to assigned Host",
      "Coordinate vehicle",
      "Direct VIP to lounge/hotel/venue"
    ],
    "location": "Airport, hotel, and venue arrival points"
  },
  {
    "id": "hosts",
    "category": "vip",
    "name": "HFGC VIP Hosts / Handlers",
    "icon": "host",
    "short": "Provide personalized care throughout each VIP’s HFGC experience.",
    "tagline": "One guest. One Host. One commitment to care.",
    "purpose": "They provide personalized care and assistance to assigned VIP guests throughout their HFGC experience.",
    "fit": "You enjoy attentive guest care, communication, and keeping track of schedules.",
    "interest": "I’m Interested in VIP Hosting",
    "finder": "I love personalized guest care.",
    "responsibilities": [
      "Accompany assigned VIP",
      "Know the VIP’s itinerary",
      "Coordinate movements",
      "Escort to meetings",
      "Escort to meals",
      "Coordinate stage call",
      "Monitor schedule",
      "Anticipate needs",
      "Coordinate with Protocol",
      "Remain available throughout the assignment"
    ]
  },
  {
    "id": "transportation",
    "category": "vip",
    "name": "HFGC VIP Transportation Team",
    "icon": "car",
    "short": "Manage VIP vehicle movement and safe transportation.",
    "tagline": "Safe journeys. Coordinated movements.",
    "purpose": "Manage the movement and scheduling of VIP vehicles.",
    "fit": "You enjoy logistics and scheduling, or would like to express interest in serving as a driver.",
    "interest": "I’m Interested in VIP Transportation",
    "finder": "I love logistics and transportation.",
    "responsibilityLabel": "VIP Transportation Coordinators",
    "responsibilities": [
      "Airport transfers",
      "Hotel transfers",
      "Venue transfers",
      "Vehicle assignments",
      "Driver assignments",
      "Pickup/drop-off schedules",
      "Contingency transportation"
    ],
    "extraTitle": "VIP Drivers",
    "extraList": null,
    "note": "Transportation Coordinator = manages the movement. Driver = operates the vehicle.",
    "extraText": "Professionally and safely transport assigned VIP guests according to the approved itinerary."
  },
  {
    "id": "runners",
    "category": "vip",
    "name": "HFGC VIP Support Runners",
    "icon": "runner",
    "short": "Provide rapid logistical support for time-sensitive needs.",
    "tagline": "Ready. Responsive. Reliable.",
    "purpose": "They provide rapid logistical support to VIP Hospitality operations and respond to time-sensitive needs.",
    "fit": "You enjoy practical tasks, quick responses, and supporting others.",
    "interest": "I’m Interested in Support Runners",
    "finder": "I enjoy providing quick, practical support.",
    "responsibilities": [
      "Deliver documents",
      "Retrieve items",
      "Bring water/materials",
      "Coordinate last-minute supplies",
      "Relay information",
      "Assist with room preparation",
      "Support VIP Hosts"
    ],
    "note": "They serve as a rapid-response support team."
  },
  {
    "id": "lounge",
    "category": "vip",
    "name": "HFGC VIP Lounge Team",
    "icon": "lounge",
    "short": "Manage the VIP lounge and work closely with VIP Hosts.",
    "tagline": "Prepare. Serve. Care.",
    "purpose": "They manage the VIP reception area, guest comfort, and lounge readiness.",
    "fit": "You enjoy preparing spaces, serving refreshments, and noticing details that improve guest comfort.",
    "interest": "I’m Interested in the VIP Lounge",
    "finder": "I love preparing spaces and serving guests.",
    "responsibilities": [
      "VIP reception area",
      "Seating",
      "Refreshments",
      "Meals",
      "Comfort",
      "Guest information",
      "Lounge readiness",
      "Special requests",
      "Transition from lounge → program"
    ],
    "note": "They should work closely with the VIP Hosts."
  },
  {
    "id": "protocol",
    "category": "vip",
    "name": "HFGC VIP Protocol Liaison Team",
    "icon": "protocol",
    "short": "Coordinate with official Protocol leadership.",
    "tagline": "We coordinate. We implement. We honor.",
    "purpose": "This person/team coordinates with the official Protocol leadership.",
    "fit": "You enjoy organization, clear communication, and following approved arrangements.",
    "interest": "I’m Interested in Protocol Liaison",
    "finder": "I love organization and protocol.",
    "responsibilityLabel": "View Coordination Areas",
    "responsibilities": [
      "Order of arrival",
      "VIP precedence",
      "Seating",
      "Stage access",
      "Meeting arrangements",
      "Official introductions",
      "Special protocol requirements"
    ],
    "note": "This prevents Hospitality from accidentally making protocol decisions that belong to leadership."
  }
];
  const main = document.getElementById('main');
  const intro = document.getElementById('intro');
  const experience = document.getElementById('experience');
  const idleDialog = document.getElementById('idle-dialog');
  let state = {page:'home', filter:'all', team:null, pillar:null, unsure:false};
  let selectedTeam = null;
  let registrationDraft = {};
  let churchFieldsOpen = false;
  let savedRegistration = null;
  let submitting = false;
  let history = [];
  let lastActivity = Date.now();
  let idleStarted = 0;
  let thankYouStarted = 0;
  let introActive = true;
  let discovery;
  let pressedIntroButton=null;
  const clearIntroPress=()=>{
    pressedIntroButton?.classList.remove('is-pressed');
    pressedIntroButton=null;
  };
  function btn(label, page, variant='primary', name='') {
    return `<button class="btn ${variant}" data-page="${page}">${name ? icon(name) : ''}${label}</button>`;
  }
  function back(label='Back') { return `<button class="back-button" data-back>${icon('back')}${label}</button>`; }
  function title(eyebrow, heading, text='', action='') {
    return `<div class="page-title"><div><p class="eyebrow">${eyebrow}</p><h1>${heading}</h1>${text ? `<p>${text}</p>` : ''}</div>${action}</div>`;
  }
  function teamCards(list, large=false) {
    return `<div class="team-grid ${large ? 'general-grid' : ''}">${list.map(t => `<button class="team-card" data-team="${t.id}">${tile(t.icon)}<div>${!large ? `<p class="mini-label">${t.category === 'general' ? 'GENERAL HOSPITALITY' : 'VIP HOSPITALITY'}</p>` : ''}<h3>${t.name}</h3><p>${t.short}</p>${large ? '<span class="card-link">Explore This Team</span>' : ''}</div></button>`).join('')}</div>`;
  }
  function home() {
    const destinations=[['heart','heart','Our Heart','The love behind every welcome.'],['general','serve','What We Do','Intentional care for every guest.'],['vip','honor','VIP Hospitality','Personalized care, every step.'],['teams','users','Our Teams','Nine ways to make a difference.'],['join','care','Get Involved','Find your place to serve.']];
    return `<section class="page home-page portrait-home"><div class="portrait-welcome"><p class="eyebrow gold-text">WELCOME TO HOSPITALITY</p><h1>There’s a place<br><em>for you.</em></h1><p class="lead">Every guest matters.<br>Every person matters to Christ.</p></div><div class="welcome-menu">${destinations.map(([page,name,label,description])=>`<button type="button" data-page="${page}">${tile(name)}<span><strong>${label}</strong><small>${description}</small></span><span class="welcome-arrow" aria-hidden="true">›</span></button>`).join('')}</div><div class="scripture-strip">${icon('book')}<p>“Accept one another, then, just as Christ accepted you, in order to bring praise to God.” <cite>Romans 15:7</cite></p></div></section>`;
  }
  function heart() {
    return `<section class="page">${title('WHO ARE WE?','HFGC Hospitality Ministry','We are a ministry of welcome, honor, service, and care—committed to making every guest experience the love of Christ through intentional hospitality.')}<div class="split-cards"><button class="feature-card" data-page="general">${tile('users')}<h2>General Hospitality</h2><p>In General hospitality, we give intentional care.</p><span class="card-link">Explore General Hospitality</span></button><button class="feature-card dark" data-page="vip">${tile('honor')}<h2>VIP Hospitality</h2><p>While in VIP hospitality, we give personalized care.</p><span class="card-link">Explore VIP Hospitality</span></button></div><div class="heart-bottom"><div><h3>Everyone receives Christ-centered care.</h3><p>Welcome. Honor. Serve. Care.</p></div>${btn('Explore Our Four Pillars','pillars','primary')}</div><div class="scripture-strip">${icon('book')}<p>“Accept one another, then, just as Christ accepted you, in order to bring praise to God.” <cite>Romans 15:7</cite></p></div></section>`;
  }
  function pillarOverview() {
    return `<section class="page">${back('Back to Our Heart')}${title('OUR FOUR PILLARS','Welcome. Honor. Serve. Care.','Touch a pillar to discover the heart and Scripture behind it.')}<div class="pillar-grid">${pillars.map((p,i)=>`<button class="pillar-card" data-pillar="${p.id}"><span class="pillar-number">0${i+1} / OUR HEART</span>${tile(p.id)}<h2>${p.name}</h2><p>${p.tagline}</p><span class="card-link">Discover ${p.name}</span></button>`).join('')}</div><div class="section-note"><p>VIP hospitality gives personalized care. General hospitality gives intentional care. But everyone receives Christ-centered care.</p><div class="actions">${btn('Explore Our Teams','teams','secondary')}${btn('Join Us','join')}</div></div></section>`;
  }
  function pillarDetail() {
    const p = pillars.find(p=>p.id===state.pillar) || pillars[0];
    return `<section class="page">${back('Back to Our Four Pillars')}<div class="pillar-detail"><div class="pillar-intro"><p class="eyebrow">THE HEART OF HOSPITALITY</p>${tile(p.id)}<h2>${p.name}</h2><p>${p.tagline}</p></div><div class="pillar-body">${p.text!==p.tagline ? `<p>${p.text}</p>` : ''}<blockquote class="quote">${p.scripture}<cite>${p.reference}</cite></blockquote><div class="actions">${btn('Explore Our Teams','teams')}${btn('Join Us','join','secondary')}</div></div></div></section>`;
  }
  function general() {
    return `<section class="page">${title('WHAT WE DO · GENERAL HOSPITALITY','Hospitality for General Guests','In General hospitality, we give intentional care.')} ${teamCards(teams.filter(t=>t.category==='general'),true)}<div class="section-note"><p>Everyone receives Christ-centered care.</p>${btn('Explore VIP Hospitality','vip','secondary')}</div></section>`;
  }
  function vip() {
    return `<section class="page">${title('VIP HOSPITALITY','Hospitality for VIP Guests','While in VIP hospitality, we give personalized care.')} ${teamCards(teams.filter(t=>t.category==='vip'))}<div class="section-note"><p>Everyone receives Christ-centered care.</p>${btn('Find Your Team','finder','secondary','compass')}</div></section>`;
  }
  function directory() {
    const list = teams.filter(t=>state.filter==='all' || t.category===state.filter);
    return `<section class="page">${title('OUR TEAMS · NINE WAYS TO SERVE','Find your place to serve.','Explore a team to learn how you can contribute.',btn('Find a Team for Me','finder','secondary','compass'))}${state.unsure ? '<div class="section-note" style="margin:0 0 20px"><p>Explore our teams, or express your interest and ask for help finding a place to serve.</p><button class="btn secondary" data-page="join">Express My Interest</button></div>' : ''}<div class="filters" role="group" aria-label="Filter teams">${[['all','All Teams'],['general','General Hospitality'],['vip','VIP Hospitality']].map(([id,label])=>`<button class="filter" data-filter="${id}" aria-pressed="${state.filter===id}">${label}</button>`).join('')}</div>${teamCards(list)}</section>`;
  }
  function responsibilities(label, list, text='') {
    return `<details><summary>${label}</summary><div class="responsibilities" tabindex="0" role="region" aria-label="${escape(label)}">${list ? `<ul>${list.map(item=>`<li>${escape(item)}</li>`).join('')}</ul>` : ''}${text ? `<p>${escape(text)}</p>` : ''}</div></details>`;
  }
  function teamDetail() {
    const t=teams.find(t=>t.id===state.team) || teams[0];
    return `<section class="page detail-page">${back('Back to Teams')}<div class="detail-top"><p class="eyebrow">${t.category==='general'?'GENERAL HOSPITALITY':'VIP HOSPITALITY'}</p></div><div class="detail-layout"><div class="detail-summary">${tile(t.icon)}<h1>${t.name}</h1><p class="tagline">${t.tagline}</p><p class="purpose">${t.purpose}</p>${t.location ? `<p class="team-location"><strong>Location:</strong> ${escape(t.location)}</p>` : ''}${t.note ? `<p class="aside-message">${t.note}</p>` : ''}</div><div class="detail-right"><div class="fit-card"><p class="eyebrow">THIS TEAM MAY SUIT YOU IF…</p><p>${t.fit}</p></div><div class="responsibility-panel">${responsibilities(t.responsibilityLabel || 'View Responsibilities',t.responsibilities)}${t.extraTitle ? responsibilities(t.extraTitle,t.extraList,t.extraText) : ''}</div><button class="btn primary" data-interest="${t.id}">${icon('heart')}${t.interest}</button></div></div></section>`;
  }
  function finder() {
    return `<section class="page">${title('FIND YOUR TEAM','What do you enjoy?','Choose an interest to explore a team that may suit you.')}<div class="finder-grid">${teams.map(t=>`<button class="interest-card" data-team="${t.id}">${tile(t.icon)}<span>${t.finder}</span></button>`).join('')}</div><div class="finder-foot"><p>A starting point to explore your interests. Team assignments are confirmed by ministry leadership.</p><button class="btn secondary" data-unsure>I’m Not Sure Yet</button></div></section>`;
  }
  function why() {
    const qualities=['A willing heart','A welcoming spirit','A servant’s heart','A willingness to learn','A commitment to teamwork','A desire to represent Christ'];
    return `<section class="page">${back('Back to Join Us')}${title('WHY JOIN US','There’s a place for you.','You don’t have to be a professional event organizer. Bring a willing heart, a welcoming spirit, and a desire to serve.')}<div class="qualities">${qualities.map(q=>`<div class="quality">${icon('check')}<span>${q}</span></div>`).join('')}</div><div class="why-banner"><div><h2>Be part of something bigger than yourself.</h2><p>Welcome someone attending for the first time. Honor people with dignity. Serve using your gifts. Care in practical ways.</p><p>Serve people from different nations and backgrounds.</p></div><div class="actions">${btn('Find My Team','finder','gold')}${btn('Express My Interest','join','secondary')}</div></div></section>`;
  }
  function signupUrl() {
    try {
      const u=new URL(config.signupUrl);
      if (!['https:','http:'].includes(u.protocol)) return '';
      if (selectedTeam && config.teamQueryParameter) u.searchParams.set(config.teamQueryParameter,selectedTeam.name);
      return u.href;
    } catch { return ''; }
  }
  function join() {
    const draft = registrationDraft;
    const preferred = draft.team ?? selectedTeam?.id ?? '';
    const field = name => escape(draft[name] || '');
    const url = signupUrl();
    const qr = typeof config.signupQrImage==='string' && /^(?!\/\/)[\w./% -]+\.(png|svg|webp|jpe?g)$/i.test(config.signupQrImage) ? config.signupQrImage : '';
    return `<section class="page registration-page">${title('JOIN HFGC HOSPITALITY','There’s a place for you.','Share your details and discover your place to serve.')}<div class="join-benefits"><p><strong>Welcome. Honor. Serve. Care.</strong> Reflect Christ through hospitality.</p><div class="registration-links"><button type="button" class="text-button" data-page="why">Why Join Hospitality? ${icon('next')}</button><button type="button" class="text-button" data-page="finder">Help Me Choose a Team ${icon('next')}</button></div></div>
      <form id="interest-form" class="registration-form" autocomplete="off">
        <div class="form-heading"><h2>Express your interest</h2><p>* Required fields</p></div>
        <div class="form-grid">
          <label class="form-field wide" for="signup-name">Full name *<input id="signup-name" name="name" type="text" required maxlength="120" autocomplete="off" value="${field('name')}" placeholder="Your first and last name"></label>
          <label class="form-field" for="signup-phone">Phone number<input id="signup-phone" name="phone" type="tel" inputmode="tel" maxlength="40" aria-describedby="contact-hint" value="${field('phone')}" placeholder="Your mobile number"></label>
          <label class="form-field" for="signup-email">Email address<input id="signup-email" name="email" type="email" inputmode="email" maxlength="254" aria-describedby="contact-hint" value="${field('email')}" placeholder="Your email address"></label>
          <p class="contact-hint" id="contact-hint">* Provide a phone number or email so the team can contact you.</p>
          <label class="form-field wide" for="signup-team">Where would you like to serve? *<select id="signup-team" name="team" required><option value="" ${preferred===''?'selected':''} disabled>Choose a team</option>${teams.map(t=>`<option value="${t.id}" ${preferred===t.id?'selected':''}>${escape(t.name)}</option>`).join('')}<option value="unsure" ${preferred==='unsure'?'selected':''}>I’m not sure — help me find my place</option></select></label>
        </div>
        <div class="optional-fields">
          <button type="button" id="church-fields-toggle" class="church-fields-toggle" aria-expanded="${churchFieldsOpen}" aria-controls="church-fields"><span>Locale Church &amp; District <small>(optional)</small></span><span class="church-fields-indicator" aria-hidden="true">${churchFieldsOpen?'−':'+'}</span></button>
          <div id="church-fields" class="form-grid" ${churchFieldsOpen?'':'hidden'}>
            <label class="form-field" for="signup-church">Locale Church<input id="signup-church" name="church" type="text" maxlength="160" value="${field('church')}" placeholder="Your locale church"></label>
            <label class="form-field" for="signup-district">District<input id="signup-district" name="district" type="text" maxlength="160" value="${field('district')}" placeholder="Your district"></label>
          </div>
        </div>
        <p class="form-notice">Your details will be saved on this kiosk for the Hospitality booth team to review. Submitting expresses your interest; the team will discuss the next steps with you.</p>
        <p id="signup-error" class="form-error" role="alert" hidden></p>
        <button type="submit" class="btn primary">Submit My Interest ${icon('next')}</button>
      </form>
      ${url ? `<aside class="external-signup">${qr ? `<img class="qr" src="${escape(qr)}" alt="QR code for the Hospitality online sign-up form">` : ''}<p>Prefer to sign up on your phone? Use our online form instead.</p><a class="btn secondary" href="${escape(url)}" target="_blank" rel="noopener noreferrer">Open Online Form</a></aside>` : ''}
    </section>`;
  }
  function thanks() {
    if (!savedRegistration) return join();
    return `<section class="page thankyou-page">${tile('check')}<p class="eyebrow gold-text">INTEREST SAVED ON THIS KIOSK</p><h1>Thank you for stepping forward.</h1><p class="lead">Your details have been saved for the Hospitality booth team to review.<br>We’re excited to meet you.</p><div class="saved-summary"><p>Your preferred team<br><strong>${escape(savedRegistration.team)}</strong></p></div><p class="receipt-note">Please speak with the booth team about training,<br>team placement, and the next steps.</p><p class="eyebrow" style="margin:30px 0">WELCOME · HONOR · SERVE · CARE</p><button class="btn primary" data-finish>Return to Home</button><p class="countdown">Returning home in <span id="thankyou-count">${Number(config.thankYouSeconds)||20}</span> seconds.</p></section>`;
  }
  const screens={home,heart,pillars:pillarOverview,pillar:pillarDetail,general,vip,teams:directory,team:teamDetail,finder,why,join,thanks};
  function render(focus=true) {
    main.classList.toggle('greeters-background',state.page==='team' && state.team==='greeters');
    main.classList.toggle('ushers-background',state.page==='team' && state.team==='ushers');
    main.classList.toggle('assistance-background',state.page==='team' && state.team==='assistance');
    main.classList.toggle('reception-background',state.page==='team' && state.team==='reception');
    main.classList.toggle('transport-background',state.page==='team' && state.team==='transportation');
    main.innerHTML=(screens[state.page] || home)();
    const active = state.page==='team' ? teams.find(t=>t.id===state.team)?.category : ({pillars:'heart',pillar:'heart',finder:'teams',why:'join',thanks:'join'})[state.page] || state.page;
    document.querySelectorAll('#main-nav button').forEach(b=>{
      if (b.dataset.page===active) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current');
    });
    document.getElementById('home-button').innerHTML=`${icon('home')}<span>Home</span>`;
    if (focus && !introActive) {main.focus({preventScroll:true});main.scrollTop=0;}
  }
  function navigate(page, changes={}, remember=true) {
    if (!screens[page] || (page==='thanks' && !savedRegistration)) return;
    if (page==='home') { reset(true); return; }
    if (remember) history.push({...state,scroll:main.scrollTop});
    state={...state,page,...changes};
    if (page==='thanks') thankYouStarted=Date.now(); else thankYouStarted=0;
    lastActivity=Date.now();
    render();
  }
  function goBack() {
    const previous=history.pop();
    state=previous || {page:'teams',filter:'all',team:null,pillar:null,unsure:false};
    thankYouStarted=0;
    render();
    if (previous?.scroll) main.scrollTop=previous.scroll;
  }
  function enter() {
    if (!introActive) return;
    introActive=false;
    intro.classList.add('dismissed');
    intro.inert=true;
    intro.setAttribute('aria-hidden','true');
    experience.inert=false;
    lastActivity=Date.now();
    render();
  }
  function reset(showIntro=true) {
    clearIntroPress();
    discovery?.reset();
    selectedTeam=null;
    registrationDraft={};
    churchFieldsOpen=false;
    savedRegistration=null;
    submitting=false;
    history=[];
    thankYouStarted=0;
    idleStarted=0;
    state={page:'home',filter:'all',team:null,pillar:null,unsure:false};
    if (idleDialog.open) idleDialog.close();
    render(!showIntro);
    lastActivity=Date.now();
    main.scrollTop=0;
    if (showIntro) {
      introActive=true;
      experience.inert=true;
      intro.inert=false;
      intro.removeAttribute('aria-hidden');
      intro.classList.remove('dismissed');
      // Replay the opening reveal and decorative loops for the next visitor.
      // Edge lights remain controlled by hover/focus instead of this replay.
      const content=intro.querySelector('.intro-content');
      content.getAnimations({subtree:true}).forEach(a=>{
        if(a.effect?.target?.closest?.('.intro-saber')) return;
        a.cancel();a.play();
      });
      document.getElementById('enter').focus({preventScroll:true});
    }
  }
  function continueExploring() {
    idleStarted=0;
    if (idleDialog.open) idleDialog.close();
    lastActivity=Date.now();
  }
  document.addEventListener('pointerdown',e=>{
    const button=e.target.closest('.intro-menu button');
    if(!button) return;
    clearIntroPress();
    pressedIntroButton=button;
    button.classList.add('is-pressed');
  },{passive:true});
  document.addEventListener('pointerup',clearIntroPress,true);
  document.addEventListener('pointercancel',clearIntroPress,true);
  window.addEventListener('blur',clearIntroPress);
  document.querySelectorAll('.intro-menu button').forEach(button=>button.addEventListener('pointerleave',clearIntroPress));
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');
    if (!b) return;
    if (b.dataset.introPage) { enter(); navigate(b.dataset.introPage); }
    else if (b.dataset.page) navigate(b.dataset.page);
    else if (b.dataset.team) navigate('team',{team:b.dataset.team});
    else if (b.dataset.pillar) navigate('pillar',{pillar:b.dataset.pillar});
    else if (b.dataset.interest) { selectedTeam=teams.find(t=>t.id===b.dataset.interest);registrationDraft.team=selectedTeam?.id || '';navigate('join'); }
    else if (b.hasAttribute('data-back')) goBack();
    else if (b.dataset.filter) {state.filter=b.dataset.filter;render(false);main.querySelector(`[data-filter="${state.filter}"]`).focus({preventScroll:true});}
    else if (b.hasAttribute('data-unsure')) navigate('teams',{filter:'all',unsure:true});
    else if (b.hasAttribute('data-clear-team')) {selectedTeam=null;registrationDraft.team='';render();}
    else if (b.id==='church-fields-toggle') {
      churchFieldsOpen=!churchFieldsOpen;
      b.setAttribute('aria-expanded',String(churchFieldsOpen));
      b.querySelector('.church-fields-indicator').textContent=churchFieldsOpen?'−':'+';
      document.getElementById('church-fields').hidden=!churchFieldsOpen;
    }
    else if (b.hasAttribute('data-finish')) reset();
  });
  document.addEventListener('input',e=>{
    if (!e.target.closest('#interest-form')) return;
    registrationDraft[e.target.name]=e.target.value;
    if (e.target.name==='phone' || e.target.name==='email') document.getElementById('signup-phone').setCustomValidity('');
    if (e.target.name==='name') e.target.setCustomValidity('');
    if (!idleDialog.open) lastActivity=Date.now();
  });
  document.addEventListener('change',e=>{
    if (!e.target.closest('#interest-form')) return;
    registrationDraft[e.target.name]=e.target.value;
    if (e.target.name==='team') selectedTeam=teams.find(t=>t.id===e.target.value) || null;
    lastActivity=Date.now();
  });
  document.addEventListener('submit',e=>{
    const form=e.target;
    if (form.id!=='interest-form') return;
    e.preventDefault();
    if (submitting) return;
    const details=Object.fromEntries([...new FormData(form)].map(([key,value])=>[key,String(value).trim()]));
    registrationDraft={...details};
    form.elements.name.setCustomValidity(details.name ? '' : 'Please enter your full name.');
    form.elements.phone.setCustomValidity(details.phone || details.email ? '' : 'Please provide a phone number or email address.');
    if (!form.reportValidity()) return;
    const team=teams.find(t=>t.id===details.team);
    if (!team && details.team!=='unsure') return;
    details.team=team?.name || 'Still exploring — help me find my place';
    submitting=true;
    const submit=form.querySelector('[type="submit"]');
    submit.disabled=true;
    try {
      savedRegistration=window.HFGC_SIGNUPS.save(details);
      registrationDraft={};
      churchFieldsOpen=false;
      selectedTeam=null;
      history=[];
      navigate('thanks',{},false);
    } catch {
      const error=document.getElementById('signup-error');
      error.textContent='Your details have not been saved. Please ask the booth team for help, or try again. Keep this form open until your entry is saved.';
      error.hidden=false;
      error.scrollIntoView({block:'center'});
      submit.disabled=false;
    } finally {
      submitting=false;
    }
  });
  ['pointerdown','keydown','wheel'].forEach(type=>document.addEventListener(type,()=>{if (!idleDialog.open) lastActivity=Date.now();},{passive:true}));
  document.addEventListener('scroll',()=>{if (!idleDialog.open) lastActivity=Date.now();},true);
  document.getElementById('enter').addEventListener('click',enter);
  discovery=window.HFGC_DISCOVERY.create({teams,pillars,openDestination:target=>{
    enter();
    if(target.page==='join' && target.params?.team) {
      selectedTeam=teams.find(t=>t.id===target.params.team);
      if(selectedTeam) registrationDraft.team=selectedTeam.id;
    }
    navigate(target.page,target.params || {});
  },activity:()=>{lastActivity=Date.now();}});
  document.getElementById('continue').addEventListener('click',continueExploring);
  document.getElementById('idle-home').addEventListener('click',()=>reset());
  idleDialog.addEventListener('cancel',e=>{e.preventDefault();continueExploring();});
  const full=document.getElementById('fullscreen');
  let fullscreenDocument=document;
  try {
    if (window.frameElement?.id==='kiosk-frame') fullscreenDocument=window.parent.document;
  } catch { /* A separately embedded kiosk uses its own fullscreen control. */ }
  let autoFullscreenComplete=Boolean(fullscreenDocument.fullscreenElement);
  let autoFullscreenPending=false;
  const fullState=()=>{
    const active=Boolean(fullscreenDocument.fullscreenElement);
    if(active) autoFullscreenComplete=true;
    full.innerHTML=icon(active?'collapse':'expand');
    full.setAttribute('aria-label',active?'Exit full screen':'Enter full screen');
  };
  fullState();
  fullscreenDocument.addEventListener('fullscreenchange',fullState);
  // Browsers require a trusted user gesture. Request the outer document's
  // fullscreen on the first opening-screen interaction, without delaying it.
  // After entry, respect a visitor's manual exit for the rest of this load.
  const startFullscreen=event=>{
    if(!event.isTrusted || !introActive || autoFullscreenComplete || autoFullscreenPending || fullscreenDocument.fullscreenElement || !fullscreenDocument.fullscreenEnabled) return;
    if(!intro.contains(event.target)) return;
    if(event.target.closest?.('#fullscreen')) return;
    if(event.type==='keydown' && (!['Enter',' '].includes(event.key) || event.repeat || event.target.matches?.('input,textarea,select,[contenteditable="true"]'))) return;
    const root=fullscreenDocument.documentElement;
    if(typeof root.requestFullscreen!=='function') return;
    autoFullscreenPending=true;
    try {
      Promise.resolve(root.requestFullscreen()).then(()=>{autoFullscreenComplete=true;}).catch(()=>{
        // Unsupported/blocked devices keep normal navigation and manual control.
      }).finally(()=>{autoFullscreenPending=false;});
    } catch {autoFullscreenPending=false;}
  };
  document.addEventListener('click',startFullscreen,true);
  document.addEventListener('keydown',startFullscreen,true);
  full.addEventListener('click',async()=>{
    try {
      if (fullscreenDocument.fullscreenElement) await fullscreenDocument.exitFullscreen();
      else if (fullscreenDocument.documentElement.requestFullscreen) await fullscreenDocument.documentElement.requestFullscreen();
      else throw new Error('unsupported');
    } catch {
      document.querySelector('.unsupported-fullscreen')?.remove();
      const toast=document.createElement('div');toast.className='unsupported-fullscreen';toast.setAttribute('role','status');toast.textContent='Use your browser’s full-screen mode to fill the display.';document.body.append(toast);setTimeout(()=>toast.remove(),5000);
    }
  });
  setInterval(()=>{
    const now=Date.now();
    if (introActive && !discovery.isOpen() && !idleDialog.open) return;
    if (state.page==='thanks' && discovery.isOpen()) thankYouStarted=now;
    if (state.page==='thanks' && thankYouStarted && !idleDialog.open && !discovery.isOpen()) {
      const left=Math.max(0,Math.ceil((Number(config.thankYouSeconds)||20)-(now-thankYouStarted)/1000));
      const counter=document.getElementById('thankyou-count');if(counter) counter.textContent=left;
      if (!left) reset();
      return;
    }
    if (idleDialog.open && idleStarted) {
      const left=Math.max(0,Math.ceil((Number(config.idleWarningSeconds)||15)-(now-idleStarted)/1000));
      document.getElementById('idle-count').textContent=left;
      if (!left) reset(true);
    } else if (now-lastActivity>=(Number(config.idleSeconds)||90)*1000) {
      discovery.close('idle');
      idleStarted=now;
      document.getElementById('idle-count').textContent=Number(config.idleWarningSeconds)||15;
      idleDialog.showModal();
    }
  },250);
  render(false);
})();
