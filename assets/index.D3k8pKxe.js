import{w as je,c as qe,h as Me,g as De}from"./data-portfolio.MoBeezc7.js";import{g as Ne,s as ie,a as He,b as ze}from"./data-services.BOmv04Xh.js";import{e as O,p as Oe,d as Fe,C as Q,f as Ue,i as Ve,c as ee,a as Ke,b as be,g as ke}from"./data-contact.Bs4iwv8u.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const v of a.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&o(v)}).observe(document,{childList:!0,subtree:!0});function i(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=i(n);fetch(n.href,a)}})();const xe={logo:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 16L14 22L24 10"/><circle cx="16" cy="16" r="12" opacity="0.3"/></svg>',menu:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',close:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',arrowRight:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',arrowDown:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',sparkles:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',zap:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',brain:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-3 3c0 1.5 1.5 2.5 2 3 0.5 0.5 1 1 1.5 1.5s1.5 1.5 3 1.5 3-1 3-1.5c0.5-0.5 1-1 1.5-1.5 0.5-0.5 2-1.5 2-3a3 3 0 1 0-3-3z"/><path d="M9 14c0 1.5 1.5 2.5 2 3s2-1.5 2-3"/><path d="M15 14c0 1.5-1.5 2.5-2 3s-2-1.5-2-3"/></svg>',code:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',palette:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="18.5" cy="11.5" r="2.5"/><circle cx="8.5" cy="11.5" r="2.5"/><circle cx="6.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',flask:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 2v7.31"/><path d="M8.5 2h7"/><path d="M7 11.5h10"/><path d="M9 22v-5h6v5"/></svg>',github:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>',twitter:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.24-3.308.54L11.07 14.31l-1.748 2.224 1.004-1.184-2.881-1.74-1.084 3.09 2.864.873L3 14.58l7.214-4.09L13.25 1.2l1.08 3.13 2.942-1.5 3.144.873-2.433 3.122-1.15-1.004z"/></svg>',linkedin:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',email:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',external:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',globe:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',cpu:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 4v16M15 4v16M4 9h16M4 15h16"/></svg>',penTool:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 3.5"/></svg>',gitBranch:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>',camera:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="12" r="4"/></svg>',image:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',badge:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.25 17.25c3.3-1.5 5.4-5 5.4-9A4.5 4.5 0 0 0 13.5 3.75a4.5 4.5 0 0 0-9 4.5c0 4 2.1 7.5 5.4 9 1.5 0.7 3 1.5 4.5 1.5s3-0.8 4.5-1.5z"/></svg>',layers:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',fileText:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',square:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>',monitor:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',youtube:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377 0.505A3.017 3.017 0 0 0 0.502 6.186C0 7.674 0 12 0 12s0 4.327 0.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-0.505a3.015 3.015 0 0 0 2.122-2.136C24 16.327 24 12 24 12s0-4.327-0.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',share2:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',film:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>',activity:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',box:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',music:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',layout:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',shoppingCart:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',chevronLeft:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',chevronRight:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>',maximize2:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',checkCircle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="16 8 12 12 8 16"/></svg>',send:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',lightbulb:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a6 6 0 0 0-6 6v2a2 2 0 0 1-2 2h16a2 2 0 0 1-2-2v-2a6 6 0 0 0-6-6z"/><line x1="12" y1="16" x2="12" y2="22"/></svg>',hammer:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4.5L6 13.5a2.121 2.121 0 0 0 0 3l6.5 6.5a2.12 2.12 0 0 0 3 0l6.5-6.5a2.12 2.12 0 0 0 0-3L18 7.5"/><line x1="9.5" y1="14.5" x2="11" y2="16"/><line x1="13" y1="12" x2="14.5" y2="13.5"/></svg>',testTube:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v16.5A2.5 2.5 0 0 0 8.5 21h7A2.5 2.5 0 0 0 18 18.5V2"/><line x1="6" y1="14" x2="18" y2="14"/></svg>',shieldCheck:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',trendingUp:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>'},Ge={search:"sparkles",upload:"send",loader:"zap",messageSquare:"email",mapPin:"globe",clock:"activity",instagram:"camera",chevronDown:"arrowDown",x:"close",alertTriangle:"zap",video:"film",archive:"box",file:"fileText",alertCircle:"zap",grid:"layout","chevron-left":"chevronLeft","chevron-right":"chevronRight","pen-tool":"penTool","file-text":"fileText","share-2":"share2","git-branch":"gitBranch","shopping-cart":"shoppingCart","check-circle":"checkCircle","test-tube":"testTube","shield-check":"shieldCheck","trending-up":"trendingUp",utensils:"box",package:"box",store:"layout",briefcase:"layers",moreHorizontal:"sparkles",smartphone:"monitor",settings:"cpu"};function p(e){return xe[e]||xe[Ge[e]]||""}const Ae=[{href:"#about",label:"About"},{href:"/services",label:"Services",route:"services"},{href:"#skills",label:"Capabilities"},{href:"/work",label:"Work",route:"work"},{href:"#process",label:"Process"},{href:"/contact",label:"Contact",route:"contact"}];function Ye(){const e=document.createElement("nav");return e.className="nav",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Main navigation"),e.innerHTML=`
    <div class="nav-inner">
      <a href="/" class="nav-brand" aria-label="Umesh Kumar — ARTRAW, home" data-route="home">
        <span class="nav-brand-mark" aria-hidden="true">A</span>
        <span class="nav-brand-text"><strong>ARTRAW</strong><small>Umesh Kumar</small></span>
      </a>
      <ul class="nav-menu" role="menubar">
        ${Ae.map(t=>`
          <li role="none">
            <a href="${t.href}" class="nav-link" ${t.route?`data-route="true" data-nav="${t.route}"`:""} role="menuitem">${t.label}</a>
          </li>
        `).join("")}
      </ul>
      <div class="nav-cta">
        <a href="/contact" class="btn btn-primary btn-sm" data-route="true">Start a Project</a>
      </div>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        ${p("menu")}
      </button>
    </div>
    <div class="nav-overlay" hidden></div>
    <div class="nav-mobile-menu" id="mobile-menu" hidden>
      <ul class="nav-mobile-links">
        ${Ae.map(t=>`
          <li>
            <a href="${t.href}" class="nav-mobile-link" ${t.route?`data-route="true" data-nav="${t.route}"`:""}>${t.label}</a>
          </li>
        `).join("")}
      </ul>
      <a href="/contact" class="btn btn-primary" data-route="true">Start a Project</a>
    </div>
  `,e}function _e(e){const t=e.querySelector(".nav-toggle"),i=e.querySelector(".nav-mobile-menu"),o=e.querySelector(".nav-overlay");function n(){t.setAttribute("aria-expanded","false"),t.setAttribute("aria-label","Open menu"),t.innerHTML=p("menu"),i.classList.remove("open"),i.hidden=!0,o.hidden=!0,o.classList.remove("visible"),document.body.style.overflow=""}function a(){t.setAttribute("aria-expanded","true"),t.setAttribute("aria-label","Close menu"),t.innerHTML=p("close"),i.hidden=!1,o.hidden=!1,requestAnimationFrame(()=>{i.classList.add("open"),o.classList.add("visible")}),document.body.style.overflow="hidden"}t.addEventListener("click",()=>{t.getAttribute("aria-expanded")==="true"?n():a()}),o.addEventListener("click",n),e.addEventListener("click",g=>{const h=g.target.closest("a");!h||!e.contains(h)||(i.contains(h)||h.classList.contains("nav-mobile-link")||h.closest(".nav-mobile-menu"))&&n()}),document.addEventListener("keydown",g=>{g.key==="Escape"&&n()});const v=()=>e.classList.toggle("scrolled",window.scrollY>40);return window.addEventListener("scroll",v,{passive:!0}),v(),{closeMenu:n,destroy:()=>window.removeEventListener("scroll",v)}}function Qe(){const e=document.createElement("section");return e.className="hero",e.setAttribute("aria-labelledby","hero-title"),e.id="home",e.innerHTML=`
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-gradient"></div>
      <div class="hero-grid"></div>
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
      <div class="hero-orb hero-orb-3"></div>
    </div>
    <div class="hero-content">
      <div class="hero-copy">
        <p class="hero-kicker reveal">Umesh Kumar — ARTRAW</p>
        <h1 id="hero-title" class="hero-title reveal reveal-delay-1">
          <span class="hero-title-line">Creative work.</span>
          <span class="hero-title-line hero-title-accent">Digital systems.</span>
          <span class="hero-title-line">Built to ship.</span>
        </h1>
        <p class="hero-position reveal reveal-delay-2">Creative • Digital • Technology</p>
        <p class="hero-subtitle reveal reveal-delay-3">
          ARTRAW is the creative and stage brand of Umesh Kumar. Design, photo, video,
          branding, websites, AI apps, automation, and custom digital projects — one practice,
          made for people who need the work done properly.
        </p>
        <div class="hero-cta-group reveal reveal-delay-4">
          <a href="#contact" class="btn btn-primary btn-lg" data-magnetic>
            Start a Project
            ${p("arrowRight")}
          </a>
          <a href="#work" class="btn btn-secondary btn-lg">View Work</a>
        </div>
      </div>
      <aside class="hero-panel reveal reveal-delay-5" aria-label="What ARTRAW covers">
        <p class="hero-panel-label">Practice</p>
        <ul class="hero-panel-list">
          <li><span>01</span> Graphic, photo &amp; brand</li>
          <li><span>02</span> Video, AI video &amp; 3D</li>
          <li><span>03</span> YouTube &amp; social</li>
          <li><span>04</span> Websites &amp; e-commerce</li>
          <li><span>05</span> Android, AI &amp; automation</li>
        </ul>
      </aside>
    </div>
  `,e}function Xe(){return{destroy:()=>{}}}function Ze(){const e=document.createElement("section");return e.className="section",e.id="about",e.setAttribute("aria-labelledby","about-title"),e.innerHTML=`
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">About</span>
        <h2 id="about-title" class="section-title">Umesh Kumar, working as ARTRAW</h2>
        <p class="section-description">
          Umesh Kumar is the person. ARTRAW is the creative and stage brand.
          The work sits across design, media, websites, apps, and technical builds —
          practical digital projects, not a fake agency story.
        </p>
      </header>
      <div class="grid grid-3">
        <article class="card reveal reveal-delay-1">
          <div class="card-content">
            <div class="card-icon" aria-hidden="true">${p("palette")}</div>
            <h3 class="card-title">Creative</h3>
            <p class="card-description">
              Graphic and Photoshop work, branding, photo and design, music and artist visuals,
              thumbnails, and campaign creatives.
            </p>
          </div>
        </article>
        <article class="card reveal reveal-delay-2">
          <div class="card-content">
            <div class="card-icon" aria-hidden="true">${p("film")}</div>
            <h3 class="card-title">Digital</h3>
            <p class="card-description">
              Video editing, AI and product video, 3D and animation, YouTube and social media,
              e-commerce listings, and content support.
            </p>
          </div>
        </article>
        <article class="card reveal reveal-delay-3">
          <div class="card-content">
            <div class="card-icon" aria-hidden="true">${p("cpu")}</div>
            <h3 class="card-title">Technology</h3>
            <p class="card-description">
              Website development, Android and AI apps, AI automation and assistants,
              Termux and Linux technical work, and custom digital projects.
            </p>
          </div>
        </article>
      </div>
    </div>
  `,e}const Je=[{icon:"palette",title:"Graphic / Photoshop",text:"Layouts, compositing, retouch, posters, banners, and print-ready files."},{icon:"badge",title:"Branding",text:"Logos, identity systems, business cards, and brand application."},{icon:"image",title:"Photo / Design",text:"Photo editing, product images, backgrounds, and visual presentation."},{icon:"film",title:"Video Editing",text:"Long-form, reels, shorts, YouTube edits, and cinematic cuts."},{icon:"sparkles",title:"AI Video / Product Video",text:"AI-assisted video, product films, and motion-ready exports."},{icon:"box",title:"3D / Animation",text:"3D concepts, CGI-style visuals, 2D animation, and motion graphics."},{icon:"youtube",title:"YouTube / Thumbnail / Social",text:"Thumbnails, channel art, posts, and social creative systems."},{icon:"music",title:"Music / Artist Creative",text:"Cover art, song posters, visualizers, and artist branding."},{icon:"globe",title:"Website Development",text:"Business sites, portfolios, landing pages, and redesigns."},{icon:"cpu",title:"Android / AI Apps",text:"Android concepts, on-device AI ideas, and app prototypes."},{icon:"zap",title:"AI Automation",text:"Workflows that replace repetitive document and data tasks."},{icon:"brain",title:"AI Assistants",text:"Assistant concepts, chatbot setup, and conversation design."},{icon:"shoppingCart",title:"E-commerce",text:"Stores, catalogs, and product presentation for selling online."},{icon:"layers",title:"Product Listing",text:"Listing copy, images, and catalog prep for marketplaces."},{icon:"layout",title:"Digital Business Setup",text:"Profiles, forms, QR menus, catalogs, and online presence."},{icon:"fileText",title:"Content / Marketing",text:"Creatives and content support for campaigns and channels."},{icon:"code",title:"Termux / Linux / Dev",text:"Scripts, developer tooling, and technical environment work."},{icon:"send",title:"Custom Digital Projects",text:"Scoped builds that do not fit a single service line."}];function et(){const e=document.createElement("section");return e.className="section",e.id="services",e.setAttribute("aria-labelledby","services-title"),e.innerHTML=`
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Services</span>
        <h2 id="services-title" class="section-title">What ARTRAW does</h2>
        <p class="section-description">
          Creative, digital, and technical work — organized so you can see the range
          before starting a project.
        </p>
      </header>
      <div class="service-az" role="list">
        ${Je.map((t,i)=>`
          <article class="service-az-item reveal" role="listitem" style="transition-delay:${Math.min(i,8)*40}ms">
            <div class="service-az-icon" aria-hidden="true">${p(t.icon)}</div>
            <h3>${t.title}</h3>
            <p>${t.text}</p>
          </article>
        `).join("")}
      </div>
      <div class="section-cta reveal">
        <a href="/services" class="btn btn-primary btn-lg" data-route="true">Browse the full service list</a>
      </div>
    </div>
  `,e}const tt=[{letter:"A",title:"AI Assistants & Automation",summary:"Assistant concepts, chatbots, workflow design, model routing, and AI API integration.",items:["AI Assistants","AI Automation","AI Chatbot Setup","Model Routing"]},{letter:"B",title:"Branding",summary:"Marks, identity systems, and brand application across print and digital.",items:["Logo Design","Brand Identity","Business Cards","Brand Guidelines"]},{letter:"C",title:"Content & Creative",summary:"Campaign creatives, music visuals, and content support for artists and brands.",items:["Content Support","Music / Artist Creative","Cover Artwork","Marketing Creatives"]},{letter:"D",title:"Digital Business Setup",summary:"Profiles, catalogs, forms, QR assets, and practical digital setup assistance.",items:["Business Profiles","Digital Catalogs","Online Forms","QR / Menu Assets"]},{letter:"E",title:"E-commerce",summary:"Storefronts, product catalogs, listing creatives, and marketplace content.",items:["E-commerce Websites","Product Catalogs","Product Listing","Listing Creatives"]},{letter:"G",title:"Graphic & Photoshop",summary:"Layout, compositing, retouch, posters, banners, and print-ready graphics.",items:["Graphic Design","Photoshop Editing","Posters & Flyers","Banners"]},{letter:"M",title:"Motion, 3D & Video",summary:"Editing, AI video, product video, motion graphics, and 3D/animation concepts.",items:["Video Editing","AI Video / Product Video","3D / Animation","Motion Graphics"]},{letter:"P",title:"Photo & Design",summary:"Photo editing, product images, background work, and visual presentation.",items:["Photo Editing","Retouching","Product Image Editing","Design Layouts"]},{letter:"T",title:"Technical & Developer",summary:"Websites, Android/AI apps, Termux/Linux, and custom digital builds.",items:["Website Development","Android / AI Apps","Termux / Linux","Custom Digital Projects"]},{letter:"Y",title:"YouTube & Social",summary:"Thumbnails, channel art, short-form edits, and social media creatives.",items:["YouTube Thumbnails","Channel Artwork","Social Media","Shorts / Reels"]}];function it(){const e=document.createElement("section");return e.className="section section-tight",e.id="skills",e.setAttribute("aria-labelledby","skills-title"),e.innerHTML=`
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Capabilities</span>
        <h2 id="skills-title" class="section-title">Skills, A to Z</h2>
        <p class="section-description">
          The same practice, grouped so a brief can start from the right letter.
        </p>
      </header>
      <div class="skills-index" role="list">
        ${tt.map(t=>`
          <article class="skills-card reveal" role="listitem">
            <span class="skills-letter" aria-hidden="true">${t.letter}</span>
            <div>
              <h3>${t.title}</h3>
              <p>${t.summary}</p>
              <ul>
                ${t.items.map(i=>`<li>${i}</li>`).join("")}
              </ul>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  `,e}function st(){const e=document.createElement("section");e.className="section",e.id="work",e.setAttribute("aria-labelledby","work-title");const t=je.slice(0,6);return e.innerHTML=`
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Selected projects</span>
        <h2 id="work-title" class="section-title">Work that exists</h2>
        <p class="section-description">
          Real projects from this practice. Status is stated as it is — no invented clients,
          launch numbers, or testimonials.
        </p>
      </header>
      <div class="grid grid-3">
        ${t.map(i=>`
          <article class="card project-card reveal">
            <div class="project-visual project-visual-${i.accent}" aria-hidden="true">
              <span>${i.mark}</span>
            </div>
            <div class="card-content">
              <p class="project-kicker">${i.category}</p>
              <h3 class="card-title">${i.title}</h3>
              <p class="card-description">${i.tagline}</p>
              <p class="project-status">${i.statusLabel}</p>
              <a href="/work#${i.id}" class="btn btn-ghost" data-route="true" data-project="${i.id}">
                View project
                ${p("arrowRight")}
              </a>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="section-cta reveal">
        <a href="/work" class="btn btn-secondary btn-lg" data-route="true">View all work</a>
      </div>
    </div>
  `,e}function ot(){const e=document.createElement("section");return e.className="section",e.id="creative",e.setAttribute("aria-labelledby","creative-title"),e.innerHTML=`
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Creative / technology</span>
        <h2 id="creative-title" class="section-title">How the work shows up</h2>
        <p class="section-description">
          Directions tied to real ARTRAW projects. Visuals here are original marks for those
          projects — not stock case studies and not unpublished client campaigns.
        </p>
      </header>
      <div class="grid grid-3">
        ${qe.map(t=>`
          <article class="card reveal">
            <div class="project-visual project-visual-${t.accent}" aria-hidden="true">
              <span>${t.mark}</span>
            </div>
            <div class="card-content">
              <p class="project-kicker">${t.kind}</p>
              <h3 class="card-title">${t.title}</h3>
              <p class="card-description">${t.description}</p>
              <a href="/work" class="btn btn-ghost" data-route="true">
                Open in work
                ${p("arrowRight")}
              </a>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  `,e}function rt(){const e=document.createElement("section");return e.className="section",e.id="process",e.setAttribute("aria-labelledby","process-title"),e.innerHTML=`
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Process</span>
        <h2 id="process-title" class="section-title">How a project moves</h2>
        <p class="section-description">
          A short path from brief to delivery. Scope stays written. Nothing starts as a contract
          until both sides agree.
        </p>
      </header>
      <ol class="process-grid">
        ${Me.map(t=>`
          <li class="process-card reveal">
            <span class="process-num">${t.number}</span>
            <h3>${t.title}</h3>
            <p>${t.description}</p>
          </li>
        `).join("")}
      </ol>
    </div>
  `,e}function nt(){const e=document.createElement("section");return e.className="section",e.id="contact",e.setAttribute("aria-labelledby","contact-title"),e.innerHTML=`
    <div class="container">
      <div class="contact-panel reveal">
        <p class="section-label">Work with me</p>
        <h2 id="contact-title">Build Something Different.</h2>
        <p>
          Design, video, a website, an app, automation, or a custom digital job — tell me what
          you need and get a structured brief you can review before sending. This is an enquiry,
          not a contract.
        </p>
        <div class="hero-cta-group">
          <a href="/contact" class="btn btn-primary btn-lg" data-route="true">
            Start a Project
            ${p("arrowRight")}
          </a>
          <a href="/work" class="btn btn-secondary btn-lg" data-route="true">View Work</a>
        </div>
        <p class="contact-note">Based remotely in India · IST (UTC+5:30). Social profiles are added when they are live.</p>
      </div>
    </div>
  `,e}function at(){const e=document.createElement("footer");e.className="footer",e.setAttribute("role","contentinfo");const t=new Date().getFullYear();return e.innerHTML=`
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="footer-logo" data-route="home" aria-label="ARTRAW home">
            <span>ARTRAW</span>
          </a>
          <p class="footer-tagline">Umesh Kumar — Creative • Digital • Technology.</p>
        </div>
        <nav class="footer-nav" aria-label="Explore">
          <h3 class="footer-column-title">Explore</h3>
          <ul class="footer-links">
            <li><a href="#about" class="footer-link">About</a></li>
            <li><a href="/services" class="footer-link" data-route="true">Services</a></li>
            <li><a href="#skills" class="footer-link">Capabilities</a></li>
            <li><a href="/work" class="footer-link" data-route="true">Selected work</a></li>
          </ul>
        </nav>
        <nav class="footer-nav" aria-label="Work with ARTRAW">
          <h3 class="footer-column-title">Work with me</h3>
          <ul class="footer-links">
            <li><a href="#process" class="footer-link">Process</a></li>
            <li><a href="/contact" class="footer-link" data-route="true">Start a Project</a></li>
            <li><a href="#creative" class="footer-link">Creative work</a></li>
          </ul>
        </nav>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">&copy; ${t} Umesh Kumar — ARTRAW.</p>
        <ul class="footer-legal">
          <li><a href="/privacy" class="footer-link" data-route="true">Privacy</a></li>
          <li><a href="/terms" class="footer-link" data-route="true">Terms</a></li>
        </ul>
      </div>
    </div>
  `,e}const _=12,lt=6,Pe=[{id:"relevance",label:"Most relevant"},{id:"az",label:"A–Z"},{id:"za",label:"Z–A"},{id:"category",label:"By category"}];function E(e){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function Be(e,t){const i=String(e);if(i.length<=t)return i;const o=i.slice(0,t),n=o.lastIndexOf(" ");return`${(n>t*.6?o.slice(0,n):o).trim()}…`}function ct(){const e=document.createElement("section");e.className="services-page",e.id="services-page",e.setAttribute("aria-labelledby","services-page-title");const t=Ne().length;return e.innerHTML=`
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Services</span>
        <h1 id="services-page-title" class="section-title">Services Catalog</h1>
        <p class="section-description">
          ${t} services across ${ie.length} categories. Search or filter to narrow
          the list—each service covers description, what ARTRAW helps with, what you provide, and what you receive.
        </p>
      </header>

      <div class="services-toolbar reveal reveal-delay-1" role="search" aria-label="Service search and filter">
        <div class="search-wrapper">
          ${p("search")}
          <input
            type="search"
            id="service-search"
            class="search-input"
            placeholder="Search services… try “logo”, “GST”, “Reels”, “thumbnail”"
            autocomplete="off"
            aria-label="Search services"
            aria-describedby="search-help"
          >
          <kbd class="search-hint" aria-hidden="true">⌘K</kbd>
        </div>
        <p id="search-help" class="visually-hidden">
          Results filter as you type. Press the down arrow key to move into the results list.
        </p>

        <div class="services-controls">
          <div class="control-group" role="group" aria-label="Change view">
            <span class="control-label" id="view-label">View</span>
            <div class="segmented" role="group" aria-labelledby="view-label">
              <button class="segment active" data-view="grouped" aria-pressed="true">
                ${p("layers")} Grouped
              </button>
              <button class="segment" data-view="grid" aria-pressed="false">
                ${p("layout")} Grid
              </button>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="service-sort">Sort</label>
            <select id="service-sort" class="sort-select">
              ${Pe.map(i=>`<option value="${i.id}">${i.label}</option>`).join("")}
            </select>
          </div>
        </div>

        <div class="filter-chips" role="group" aria-label="Category filters">
          <button class="filter-chip active" data-category="all" aria-pressed="true">
            All <span class="chip-count">${t}</span>
          </button>
          ${ie.map(i=>`
            <button class="filter-chip" data-category="${i.id}" aria-pressed="false">
              ${p(i.icon)}
              <span class="chip-label">${i.label}</span>
              <span class="chip-count">${i.services.length}</span>
            </button>
          `).join("")}
        </div>

        <div class="results-summary" aria-live="polite" aria-atomic="true">
          <span class="visible-count">${t}</span>
          <span class="results-word"> services visible</span>
          <button class="clear-inline" id="clear-filters-inline" hidden>Clear</button>
        </div>
      </div>

      <div class="services-results" id="services-results"></div>

      <div class="no-results" id="no-results" hidden aria-live="polite">
        <div class="no-results-content">
          ${p("search")}
          <h3>No services match</h3>
          <p>Try a different search term, or clear filters to see all ${t} services.</p>
          <button class="btn btn-ghost" id="clear-filters">Clear all filters</button>
        </div>
      </div>
    </div>

    <div class="service-modal-overlay" id="service-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
      <div class="service-modal" role="document">
        <button class="modal-close" aria-label="Close modal">${p("close")}</button>
        <div class="modal-content" id="modal-content"></div>
      </div>
    </div>
  `,e}function dt(e,t){return`
    <article class="service-card reveal reveal-delay-${t%6+1}" data-service-id="${e.id}" data-category="${e.categoryId}">
      <div class="service-card-header">
        <span class="service-category-tag" style="--accent-color: var(--color-accent-${e.categoryAccent});">
          ${p(e.categoryIcon)}
          <span class="tag-label">${e.categoryLabel}</span>
        </span>
      </div>
      <h3 class="service-card-title">${E(e.title)}</h3>
      <p class="service-card-description">${E(Be(e.description,132))}</p>
      <ul class="service-card-highlights" aria-label="What ARTRAW helps with">
        ${e.helpsWith.slice(0,3).map(i=>`<li>${E(i)}</li>`).join("")}
        ${e.helpsWith.length>3?`<li class="more-count">+${e.helpsWith.length-3} more</li>`:""}
      </ul>
      <div class="service-card-footer">
        <button class="btn btn-primary btn-sm service-detail-btn" data-service-id="${e.id}">
          View Details
          ${p("arrowRight")}
        </button>
        <a href="/contact?service=${encodeURIComponent(e.id)}" class="btn btn-ghost btn-sm service-cta-btn" data-service-id="${e.id}" data-route="true">
          Start Project
        </a>
      </div>
    </article>
  `}function ut(e){return`
    <li class="service-row" data-service-id="${e.id}" data-category="${e.categoryId}">
      <button class="service-row-main service-detail-btn" data-service-id="${e.id}" aria-expanded="false">
        <span class="service-row-title">${E(e.title)}</span>
        <span class="service-row-desc">${E(Be(e.description,96))}</span>
      </button>
      <span class="service-row-actions">
        <a href="/contact?service=${encodeURIComponent(e.id)}" class="service-row-cta service-cta-btn" data-service-id="${e.id}" data-route="true">
          Start Project
        </a>
        <span class="service-row-chevron" aria-hidden="true">${p("arrowRight")}</span>
      </span>
    </li>
  `}function pt(e,t,i){const o=Math.max(0,(i!=null?i:t.length)-t.length);return`
    <section class="service-group reveal" data-group="${e.id}" aria-labelledby="group-title-${e.id}">
      <header class="service-group-header">
        <span class="service-group-icon" style="--accent-color: var(--color-accent-${e.accent});" aria-hidden="true">
          ${p(e.icon)}
        </span>
        <div class="service-group-text">
          <h2 class="service-group-title" id="group-title-${e.id}">${E(e.label)}</h2>
          <p class="service-group-meta">
            <span class="group-count">${i!=null?i:t.length}</span>
            ${(i!=null?i:t.length)===1?"service":"services"}
            ${o?`<span class="group-hidden-note">· ${o} not shown</span>`:""}
          </p>
        </div>
      </header>
      <ul class="service-rows" role="list" aria-label="${E(e.label)} services">
        ${t.map(ut).join("")}
      </ul>
    </section>
  `}function vt(e){for(const t of ie){const i=t.services.find(o=>o.id===e);if(i)return{...i,categoryId:t.id,categoryLabel:t.label,categoryIcon:t.icon,categoryAccent:t.accent}}return null}function ht(e){return e==="business-documentation"}function mt(e){return`
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="0">
      <div class="modal-header">
        <span class="modal-category" style="color: ${`var(--color-accent-${e.categoryAccent})`};">
          ${p(e.categoryIcon)} ${E(e.categoryLabel)}
        </span>
        <h2 id="modal-title" class="modal-title">${E(e.title)}</h2>
      </div>

      <div class="modal-body">
        <section class="modal-section">
          <h3>Description</h3>
          <p>${E(e.description)}</p>
        </section>

        <section class="modal-section">
          <h3>What ARTRAW helps with</h3>
          <ul class="modal-list">
            ${e.helpsWith.map(i=>`<li>${E(i)}</li>`).join("")}
          </ul>
        </section>

        <section class="modal-section">
          <h3>What you'll need to provide</h3>
          <ul class="modal-list">
            ${e.requirements.map(i=>`<li>${E(i)}</li>`).join("")}
          </ul>
        </section>

        <section class="modal-section">
          <h3>What you'll receive</h3>
          <ul class="modal-list">
            ${e.deliverables.map(i=>`<li>${E(i)}</li>`).join("")}
          </ul>
        </section>

        ${ht(e.categoryId)?`
          <section class="modal-section modal-disclaimer">
            <h3>Important note</h3>
            <p>
              This service covers <strong>process, application, and documentation assistance only</strong>.
              ARTRAW is not a government authority, licensed tax advisor, legal counsel, or certified
              compliance professional, and is not affiliated with any government or platform body.
              Approvals, filings, and regulatory outcomes are not guaranteed. Clients review all
              submissions and consult qualified professionals where required.
            </p>
          </section>
        `:""}

        ${e.categoryId==="food-local-business"?`
          <section class="modal-section modal-disclaimer">
            <h3>Platform note</h3>
            <p>
              This is <strong>listing and setup assistance</strong> for platforms such as Zomato and Swiggy.
              ARTRAW is an independent service provider, not an official partner, representative, or
              authorised agent of any platform. Platform onboarding, review, and approval decisions
              rest with the platform.
            </p>
          </section>
        `:""}
      </div>

      <div class="modal-footer">
        <button class="btn btn-primary modal-cta" data-service-id="${e.id}">
          Start a Project
          ${p("arrowRight")}
        </button>
        <button class="btn btn-ghost modal-close-btn">Close</button>
      </div>
    </div>
  `}function ft(e,t){const i=t.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(!i.length)return;const o=i[0],n=i[i.length-1];e.shiftKey&&document.activeElement===o?(e.preventDefault(),n.focus()):!e.shiftKey&&document.activeElement===n&&(e.preventDefault(),o.focus())}function gt(e){if(!e)return{destroy(){}};const t=e.querySelector("#service-search"),i=e.querySelector("#service-sort"),o=e.querySelector("#services-results"),n=e.querySelector("#no-results"),a=e.querySelector(".visible-count"),v=e.querySelector(".results-word"),g=e.querySelector("#clear-filters"),h=e.querySelector("#clear-filters-inline"),B=e.querySelectorAll(".filter-chip"),q=e.querySelectorAll(".segment"),A=e.querySelector("#service-modal"),R=e.querySelector("#modal-content");let M="all",S="grouped",P="",I=_,j=new Set,F=[],U=null,W=null,D=null,b=null;function $(){const s=He(P,i.value);return M==="all"?s:s.filter(l=>l.categoryId===M)}function se(){return M!=="all"||P.length>0}function V(){var w;if(!((w=window.history)!=null&&w.replaceState))return;const s=new URLSearchParams;P&&s.set("q",P),M!=="all"&&s.set("category",M),S!=="grouped"&&s.set("view",S),i.value!=="relevance"&&s.set("sort",i.value);const l=s.toString(),u=l?`${window.location.pathname}?${l}`:window.location.pathname;window.history.replaceState({route:"services"},"",u)}function X(){const s=new URLSearchParams(window.location.search),l=s.get("q"),u=s.get("category"),w=s.get("view"),T=s.get("sort");l&&(P=l,t.value=l),u&&ie.some(x=>x.id===u)&&(M=u),(w==="grouped"||w==="grid")&&(S=w),T&&Pe.some(x=>x.id===T)&&(i.value=T)}function Y(){B.forEach(s=>{const l=s.dataset.category===M;s.classList.toggle("active",l),s.setAttribute("aria-pressed",String(l))})}function Z(){q.forEach(s=>{const l=s.dataset.view===S;s.classList.toggle("active",l),s.setAttribute("aria-pressed",String(l))}),o.dataset.view=S}function oe(s){return S==="grid"||j.has(s)?Number.POSITIVE_INFINITY:lt}function me(s){if(S==="grid"){const x=s.slice(0,I);return{html:`
        <div class="services-grid" role="list" aria-label="Services">
          ${x.map((N,ge)=>`<div role="listitem">${dt(N,ge)}</div>`).join("")}
        </div>
      `,shown:x.length,expand:null}}let l=0;const u=[];F=[];const w=ie.map(x=>{const N=s.filter(ue=>ue.categoryId===x.id);if(!N.length)return"";const ge=oe(x.id),de=N.slice(0,ge);if(l+=de.length,de.length<N.length){const ue={categoryId:x.id,remaining:N.length-de.length,cat:x};u.push(ue),F.push(ue.categoryId)}return pt(x,de,N.length)}).join(""),T=u.length?{categoryId:u[0].categoryId,remaining:u.reduce((x,N)=>x+N.remaining,0),cat:u[0].cat}:null;return{html:w,shown:l,expand:T}}function H(){const s=$(),l=s.length>0;if(n.hidden=l,o.hidden=!l,a.textContent=String(s.length),v&&(v.textContent=s.length===1?" service visible":" services visible"),h.hidden=!se(),!l){o.innerHTML="";return}const{html:u,shown:w,expand:T}=me(s);let x="";T?x=`
        <div class="load-more-wrap">
          <p class="load-more-meta">Showing ${w} of ${s.length} in this view</p>
          <button class="btn btn-secondary load-more-btn" id="load-more" data-category-expand="${T.categoryId}">
            Load more ${E(T.cat.label)} (${T.remaining} left)
          </button>
        </div>
      `:S==="grid"&&w<s.length&&(x=`
        <div class="load-more-wrap">
          <p class="load-more-meta">Showing ${w} of ${s.length}</p>
          <button class="btn btn-secondary load-more-btn" id="load-more">
            Load ${Math.min(_,s.length-w)} more
          </button>
        </div>
      `),o.innerHTML=u+x,c(),fe()}function fe(){b==null||b.disconnect();const s=o.querySelectorAll(".reveal");if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){s.forEach(l=>l.classList.add("visible"));return}b=new IntersectionObserver(l=>{l.forEach(u=>{u.isIntersecting&&(u.target.classList.add("visible"),b.unobserve(u.target))})},{rootMargin:"0px 0px -40px 0px"}),s.forEach(l=>b.observe(l))}function z(){I=_,j=new Set,Y(),H(),V()}function re(s){P=s.target.value.trim(),z()}function ne(s){M=s.currentTarget.dataset.category,z()}function ae(s){S=s.currentTarget.dataset.view,I=_,j=new Set,Z(),H(),V()}function le(){I=_,j=new Set,H(),V()}function ce(){t.value="",P="",M="all",i.value="relevance",j=new Set,Y(),H(),V()}function r(s){var u,w;s.currentTarget.dataset.categoryExpand?F.forEach(T=>j.add(T)):I+=_,H();const l=o.querySelector("#load-more");l?l.focus():(w=(u=o.querySelector(".service-group"))==null?void 0:u.scrollIntoView)==null||w.call(u,{block:"nearest"})}function c(){var s;o.querySelectorAll(".service-detail-btn").forEach(l=>{l.addEventListener("click",u=>{u.stopPropagation(),m(l.dataset.serviceId)})}),o.querySelectorAll(".service-card").forEach(l=>{l.addEventListener("click",()=>m(l.dataset.serviceId)),l.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),m(l.dataset.serviceId))}),l.hasAttribute("tabindex")||l.setAttribute("tabindex","0")}),(s=o.querySelector("#load-more"))==null||s.addEventListener("click",r)}function d(s){f();const l=document.createElement("a");l.href=s?`/contact?service=${encodeURIComponent(s.id)}`:"/contact",l.dataset.route="true",l.click()}function m(s){const l=vt(s);if(!l)return;D=document.activeElement,U=s,R.innerHTML=mt(l),A.hidden=!1,document.body.style.overflow="hidden",requestAnimationFrame(()=>{var T;A.classList.add("visible"),(T=R.querySelector(".modal-panel"))==null||T.focus()}),W=R.querySelector(".modal-panel");const u=R.querySelector(".modal-close-btn, .modal-close");u==null||u.addEventListener("click",f);const w=R.querySelector(".modal-cta");w==null||w.addEventListener("click",()=>d(l)),R.addEventListener("click",y)}function y(s){s.target.closest(".modal-close-btn, .modal-close")&&f()}function f(){!A||A.hidden||(A.classList.remove("visible"),document.body.style.overflow="",setTimeout(()=>{A.hidden=!0,A.classList.remove("visible"),R.innerHTML="",U=null,W=null,D&&document.contains(D)&&D.focus(),D=null},300))}function C(s){U!==null&&(s.key==="Escape"&&(s.preventDefault(),f()),s.key==="Tab"&&W&&ft(s,W))}function J(s){(s.metaKey||s.ctrlKey)&&s.key.toLowerCase()==="k"&&(s.preventDefault(),t.focus(),t.select()),s.key==="/"&&!K(s.target)&&(s.preventDefault(),t.focus()),s.key==="Escape"&&document.activeElement===t&&P&&(t.value="",P="",z())}function K(s){return s instanceof HTMLElement&&(s.tagName==="INPUT"||s.tagName==="TEXTAREA"||s.tagName==="SELECT"||s.isContentEditable)}return t.addEventListener("input",re),i.addEventListener("change",le),B.forEach(s=>s.addEventListener("click",ne)),q.forEach(s=>s.addEventListener("click",ae)),g.addEventListener("click",ce),h.addEventListener("click",ce),A.addEventListener("click",s=>{s.target===A&&f()}),document.addEventListener("keydown",J),document.addEventListener("keydown",C),X(),Y(),Z(),H(),{destroy(){document.removeEventListener("keydown",J),document.removeEventListener("keydown",C),b==null||b.disconnect(),f()}}}function bt(){const e=document.createElement("section");return e.className="work-page section",e.setAttribute("aria-labelledby","work-page-title"),e.innerHTML=`
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Selected work</span>
        <h1 id="work-page-title" class="section-title">Projects</h1>
        <p class="section-description">
          Lucy AI, OpenClaw / OmniRoute, Zafiro, Ayur Veda Global, HF RECORD, and this ARTRAW site.
          Only work that exists in this practice. No client metrics.
        </p>
      </header>
      <div class="project-list" id="project-list">
        ${je.map(t=>yt(t)).join("")}
      </div>
      <header class="section-header reveal" id="creative-work">
        <span class="section-label">Creative / technology</span>
        <h2 class="section-title">Studio notes</h2>
      </header>
      <div class="grid grid-3">
        ${qe.map(t=>`
          <article class="card reveal">
            <div class="project-visual project-visual-${t.accent}" aria-hidden="true"><span>${t.mark}</span></div>
            <div class="card-content">
              <p class="project-kicker">${t.kind}</p>
              <h3 class="card-title">${t.title}</h3>
              <p class="card-description">${t.description}</p>
            </div>
          </article>
        `).join("")}
      </div>
      <header class="section-header reveal" id="how-i-work">
        <span class="section-label">Process</span>
        <h2 class="section-title">How I work</h2>
      </header>
      <ol class="process-grid">
        ${Me.map(t=>`
          <li class="process-card reveal">
            <span class="process-num">${t.number}</span>
            <h3>${t.title}</h3>
            <p>${t.description}</p>
          </li>
        `).join("")}
      </ol>
      <div class="section-cta reveal">
        <a href="/contact" class="btn btn-primary btn-lg" data-route="true">Start a Project</a>
      </div>
    </div>
    <dialog class="project-dialog" id="project-dialog">
      <div class="project-dialog-body" id="project-dialog-body"></div>
    </dialog>
  `,e}function yt(e){return`
    <article class="work-row reveal" id="${e.id}">
      <div class="project-visual project-visual-${e.accent}" aria-hidden="true"><span>${e.mark}</span></div>
      <div>
        <p class="project-kicker">${e.category}</p>
        <h2>${e.title}</h2>
        <p>${e.summary}</p>
        <p class="project-status">${e.statusLabel}</p>
        <ul class="tag-list">
          ${e.stack.map(t=>`<li>${t}</li>`).join("")}
        </ul>
        <button type="button" class="btn btn-ghost" data-open-project="${e.id}">
          Project notes ${p("arrowRight")}
        </button>
      </div>
    </article>
  `}function wt(e){if(!e)return{destroy(){}};const t=e.querySelector("#project-dialog"),i=e.querySelector("#project-dialog-body");function o(v){const g=De(v);!g||!t||(i.innerHTML=`
      <button type="button" class="modal-close" data-close-project aria-label="Close">${p("close")}</button>
      <p class="project-kicker">${g.category}</p>
      <h2 id="project-dialog-title">${g.title}</h2>
      <p>${g.summary}</p>
      <h3>What exists</h3>
      <ul>${g.built.map(h=>`<li>${h}</li>`).join("")}</ul>
      <p class="project-status">${g.statusLabel}</p>
      <a href="/contact" class="btn btn-primary" data-route="true">Start a related project</a>
    `,typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}function n(){t!=null&&t.open&&t.close?t.close():t==null||t.removeAttribute("open")}function a(v){const g=v.target.closest("[data-open-project]");g&&o(g.dataset.openProject),v.target.closest("[data-close-project]")&&n()}return e.addEventListener("click",a),t==null||t.addEventListener("click",v=>{v.target===t&&n()}),t==null||t.addEventListener("cancel",v=>{v.preventDefault(),n()}),{destroy(){e.removeEventListener("click",a)}}}const kt=8*1024*1024;function k(e){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function pe(e){return String(e).replace(/\*\*/g,"")}const xt={"ai-technology":"AI / Automation","website-digital":"Website","design-branding":"Logo / Branding","photo-video":"Video Editing","music-creative":"Music Creative","social-youtube":"YouTube",ecommerce:"Ecommerce","food-local-business":"Zomato / Swiggy","business-documentation":"Documentation / Application Assistance","other-digital":"Other"};function At(e){return String(e).toLowerCase().replace(/\b(assistance|setup|service|services|system|support|work)\b/g," ").replace(/[^a-z0-9]+/g," ").trim()}function $t(e,t){const i=O.find(n=>(n.services||[]).some(a=>a.id===e));if(i)return i.label;const o=xt[t];return o&&O.some(n=>n.label===o)?o:null}const St=new Set(["and","the","for","with","from","into","your","you","are","not","based","custom","other","related","process","assistance","setup","service","services","system","support","work","online","digital","creative","style","level","using","via","plus"]);function $e(e){return At(e).split(" ").filter(t=>t.length>2&&!St.has(t))}function Ct(e,t,i){const o=e.services||[];if(!o.length)return null;const n=o.find(h=>h.id===t);if(n)return n;const a=$e(i);if(!a.length)return o[0];let v=null,g=0;for(const h of o){const B=new Set($e(h.label));if(!B.size)continue;const q=a.filter(R=>B.has(R)).length;if(!q)continue;const A=q/Math.max(B.size,a.length);A>g&&(g=A,v=h)}return g>=.34?v:o[0]}function Tt(){const e=document.createElement("section");return e.className="contact-page section",e.setAttribute("aria-labelledby","contact-page-title"),e.innerHTML=`
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Work with me</span>
        <h1 id="contact-page-title" class="section-title">Build Something Different.</h1>
        <p class="section-description">
          Pick a service, describe what you need, and send a structured brief. This is an enquiry,
          not a contract — nothing is submitted anywhere until you review it and press send.
        </p>
      </header>

      <section class="brief-steps reveal reveal-delay-1" aria-label="How the brief works">
        ${["Choose a category","Add the details","Review and send"].map((t,i)=>`
          <div class="brief-step">
            <span class="brief-step-num">0${i+1}</span>
            <span class="brief-step-label">${t}</span>
          </div>
        `).join("")}
      </section>

      <div class="quick-categories reveal reveal-delay-1" role="group" aria-label="Quick categories">
        ${O.map(t=>`
          <button type="button" class="quick-chip" data-quick-category="${t.id}">
            ${p(t.icon)}
            <span>${k(t.label)}</span>
          </button>
        `).join("")}
      </div>

      <div class="contact-layout">
        <form class="contact-form reveal" id="contact-form" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="name">Name <span class="required-mark">*</span></label>
              <input id="name" name="name" type="text" required autocomplete="name" placeholder="Your name">
              <span class="field-error" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <label for="phone">Phone / WhatsApp <span class="required-mark">*</span></label>
              <input id="phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel" placeholder="+91 98XXX XXXXX">
              <span class="field-error" aria-live="polite"></span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email <span class="required-mark">*</span></label>
              <input id="email" name="email" type="email" required autocomplete="email" inputmode="email" placeholder="you@email.com">
              <span class="field-error" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <label for="business">Business / Brand</label>
              <input id="business" name="business" type="text" autocomplete="organization" placeholder="Optional — your business name">
              <span class="field-error" aria-live="polite"></span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="category">Service category <span class="required-mark">*</span></label>
              <select id="category" name="category" required>
                <option value="">Select a service area</option>
                ${O.map(t=>`<option value="${t.id}">${k(t.label)}</option>`).join("")}
              </select>
              <span class="field-error" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <label for="service">Specific service <span class="required-mark">*</span></label>
              <select id="service" name="service" required disabled>
                <option value="">Select a category first</option>
              </select>
              <span class="field-error" aria-live="polite"></span>
            </div>
          </div>

          <p class="assistance-notice" id="assistance-notice" hidden>
            ${p("alertTriangle")}
            <span>${k(Ke)}</span>
          </p>

          <div class="form-group">
            <label for="description">Project description <span class="required-mark">*</span></label>
            <textarea id="description" name="description" required rows="6" placeholder="What are you trying to achieve? What already exists, and what should the finished work do?"></textarea>
            <span class="field-hint">The more specific, the more useful the reply.</span>
            <span class="field-error" aria-live="polite"></span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="budget">Budget <span class="optional-mark">Optional</span></label>
              <select id="budget" name="budget">
                <option value="">Prefer not to say</option>
                ${Oe.map(t=>`<option value="${t.label}">${k(t.label)}</option>`).join("")}
              </select>
              <span class="field-error" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <label for="deadline">Deadline <span class="optional-mark">Optional</span></label>
              <select id="deadline" name="deadline">
                <option value="">No fixed deadline</option>
                ${Fe.map(t=>`<option value="${t.label}">${k(t.label)}</option>`).join("")}
              </select>
              <span class="field-error" aria-live="polite"></span>
            </div>
          </div>

          <div class="form-group">
            <label for="reference">Reference file <span class="optional-mark">Optional</span></label>
            <div class="file-drop" id="file-drop">
              <input id="reference" name="reference" type="file" class="file-input"
                     accept="image/*,application/pdf,.doc,.docx,.txt,.zip">
              <label for="reference" class="file-label">
                ${p("upload")}
                <span id="file-name">Attach a reference — image, PDF, or document (max 8 MB)</span>
              </label>
              <button type="button" class="file-clear" id="file-clear" hidden aria-label="Remove attached file">
                ${p("close")}
              </button>
            </div>
            <span class="field-hint" id="file-hint">The file is not uploaded anywhere. It is only named here so you can mention it in your brief.</span>
            <span class="field-error" aria-live="polite"></span>
          </div>

          <label class="check-row">
            <input type="checkbox" id="consent" name="consent" required>
            <span>I understand this is an enquiry, not a contract, and that my details are used only to reply. See the <a href="/privacy" data-route="true">privacy note</a>.</span>
          </label>
          <span class="field-error" id="consent-error" aria-live="polite"></span>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-lg" id="submit-btn">
              Review my brief ${p("arrowRight")}
            </button>
          </div>

          <p class="form-status" id="form-status" role="status" hidden></p>
        </form>

        <aside class="contact-aside reveal">
          <div class="aside-block">
            <h2>Before you write</h2>
            <ul class="aside-list">
              <li>${k(pe(be.government))}</li>
              <li>${k(pe(be.noGuarantee))}</li>
              <li>${k(pe(be.platforms))}</li>
            </ul>
          </div>

          <div class="aside-block">
            <h2>Working details</h2>
            <dl class="aside-details">
              <div>
                <dt>Email</dt>
                <dd>${Q?`<a href="mailto:${k(ee.email)}">${k(ee.email)}</a>`:'<span class="pending-value">Not set yet</span>'}</dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd><span class="pending-value">Not set yet</span></dd>
              </div>
              <div><dt>Based in</dt><dd>${k(ee.location)}</dd></div>
              <div><dt>Timezone</dt><dd>${k(ee.timezone)}</dd></div>
            </dl>
            ${Q?"":`
              <p class="aside-note">
                Contact details are not configured on this build, so the form cannot send anything.
                Use <strong>Copy brief</strong> and send it from your own mail app.
              </p>
            `}
          </div>
        </aside>
      </div>

      <section class="faq-section reveal" aria-labelledby="faq-title">
        <header class="section-header">
          <span class="section-label">Questions</span>
          <h2 id="faq-title" class="section-title">Services, explained honestly</h2>
          <p class="section-description">
            What ARTRAW does, what it does not do, and what happens after you send a brief.
          </p>
        </header>
        <div class="faq-groups">
          ${Ue.map(t=>`
            <section class="faq-group">
              <h3 class="faq-group-title">${k(t.category)}</h3>
              ${t.questions.map(i=>`
                <details class="faq-item">
                  <summary>${k(i.q)}</summary>
                  <div class="faq-answer">${k(pe(i.a))}</div>
                </details>
              `).join("")}
            </section>
          `).join("")}
        </div>
      </section>
    </div>

    <div class="brief-review-overlay" id="brief-review" role="dialog" aria-modal="true" aria-labelledby="brief-review-title" hidden>
      <div class="brief-review-panel">
        <button type="button" class="modal-close" id="brief-review-close" aria-label="Close review">${p("close")}</button>
        <h2 id="brief-review-title" class="brief-review-title">${k(ke.title)}</h2>
        <p class="brief-review-body">${k(Q?ke.body:"Nothing was sent anywhere. Contact details are not configured on this build, so copy the brief below and send it from your own mail app.")}</p>
        <pre class="brief-preview" id="brief-preview" tabindex="0" aria-label="Your brief"></pre>
        <div class="brief-review-actions">
          ${Q?'<button type="button" class="btn btn-primary" id="brief-send">Open in email app</button>':""}
          <button type="button" class="btn ${Q?"btn-ghost":"btn-primary"} btn-copy-lead" id="brief-copy">Copy brief</button>
        </div>
        <p class="brief-review-status" id="brief-review-status" role="status"></p>
      </div>
    </div>
  `,e}const Lt=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,Et=/^[+]?[\d][\d\s().-]{6,19}$/;function Rt(e){if(!e)return{destroy(){}};const t=e.querySelector("#contact-form"),i=e.querySelector("#form-status"),o=e.querySelector("#consent-error"),n=t.querySelector("#category"),a=t.querySelector("#service"),v=e.querySelector("#assistance-notice"),g=e.querySelectorAll("[data-quick-category]"),h=t.querySelector("#reference"),B=e.querySelector("#file-name"),q=e.querySelector("#file-clear"),A=e.querySelector("#brief-review"),R=e.querySelector("#brief-review-close"),M=e.querySelector("#brief-preview"),S=e.querySelector("#brief-send"),P=e.querySelector("#brief-copy"),I=e.querySelector("#brief-review-status");let j=null,F="",U="",W=null;function D(r){return(r.closest(".form-group")||r.parentElement).querySelector(".field-error")||(r.id==="consent"?o:null)}function b(r,c){const d=D(r);r.setAttribute("aria-invalid",c?"true":"false"),d&&(d.textContent=c||"")}function $(r){b(r,"")}function se(r,c){const d=O.find(y=>y.id===r),m=a.value;a.innerHTML=d?`<option value="">Select a service</option>${d.services.map(y=>`<option value="${k(y.id)}">${k(y.label)}</option>`).join("")}`:'<option value="">Select a category first</option>',a.disabled=!d,d&&m&&d.services.some(f=>f.id===m)&&(a.value=m)}function V(){const r=Ve(n.value);v.hidden=!r}function X(){se(n.value),V(),$(n),a.disabled&&$(a)}function Y(r){const c=r.currentTarget.dataset.quickCategory;n.value=c,X(),n.focus()}function Z(){const r=h.files&&h.files[0];if(!r){j=null,B.textContent="Attach a reference — image, PDF, or document (max 8 MB)",q.hidden=!0;return}if(r.size>kt){j=null,h.value="",B.textContent="Attach a reference — image, PDF, or document (max 8 MB)",q.hidden=!0;const d=D(h);d&&(d.textContent="That file is larger than 8 MB. Attach a smaller one or skip it."),h.setAttribute("aria-invalid","true");return}j=r,h.setAttribute("aria-invalid","false"),B.textContent=r.name,q.hidden=!1;const c=D(h);c&&(c.textContent="")}function oe(){h.value="",j=null,B.textContent="Attach a reference — image, PDF, or document (max 8 MB)",q.hidden=!0,h.setAttribute("aria-invalid","false");const r=D(h);r&&(r.textContent="")}function me(){let r=!0;const c=[],d=t.querySelector("#name");d.value.trim()?$(d):(r=!1,b(d,"This field is required."),c.push(d));const m=t.querySelector("#phone");m.value.trim()?Et.test(m.value.trim())?$(m):(r=!1,b(m,"Enter a valid phone number."),c.push(m)):(r=!1,b(m,"This field is required."),c.push(m));const y=t.querySelector("#email");y.value.trim()?Lt.test(y.value.trim())?$(y):(r=!1,b(y,"Enter a valid email."),c.push(y)):(r=!1,b(y,"This field is required."),c.push(y)),n.value?$(n):(r=!1,b(n,"Choose a service category."),c.push(n)),a.disabled?(r=!1,b(a,"Choose a category first."),c.push(a)):a.value?$(a):(r=!1,b(a,"Choose a specific service."),c.push(a));const f=t.querySelector("#description");f.value.trim()?f.value.trim().length<20?(r=!1,b(f,"A little more detail helps — at least a couple of sentences."),c.push(f)):$(f):(r=!1,b(f,"Describe what you need."),c.push(f));const C=t.querySelector("#consent");return C.checked?$(C):(r=!1,b(C,"Please confirm before sending."),c.push(C)),{valid:r,firstInvalid:c}}function H(){var C,J;const r=new FormData(t),c=((C=O.find(K=>K.id===r.get("category")))==null?void 0:C.label)||r.get("category"),d=(J=O.find(K=>K.id===r.get("category")))==null?void 0:J.services.find(K=>K.id===r.get("service")),m=["ARTRAW — PROJECT ENQUIRY","",`Name: ${r.get("name")}`,`Phone / WhatsApp: ${r.get("phone")}`,`Email: ${r.get("email")}`,`Business / Brand: ${r.get("business")||"—"}`,"",`Service category: ${c}`,`Specific service: ${(d==null?void 0:d.label)||r.get("service")}`,`Budget: ${r.get("budget")||"Not specified"}`,`Deadline: ${r.get("deadline")||"Not specified"}`,j?`Reference file: ${j.name} (not attached — sending separately)`:"Reference file: none","","PROJECT DESCRIPTION","----------------",String(r.get("description")).trim(),"","---","Sent from the ARTRAW website enquiry form. This is an enquiry, not a contract."];if(!Q)return{text:m.join(`
`),mailto:""};const y=`ARTRAW enquiry — ${(d==null?void 0:d.label)||c}`,f=m.join(`
`);return{text:f,mailto:`mailto:${ee.email}?subject=${encodeURIComponent(y)}&body=${encodeURIComponent(f)}`}}function fe(){var m;const{valid:r,firstInvalid:c}=me();if(!r){i.hidden=!1,i.className="form-status is-error",i.textContent="Some details need fixing before the brief can be built.",(m=c[0])==null||m.focus();return}i.hidden=!0;const d=H();F=d.text,U=d.mailto,M.textContent=F,I.textContent="",A.hidden=!1,document.body.style.overflow="hidden",W=document.activeElement,requestAnimationFrame(()=>R.focus())}function z(){A.hidden=!0,document.body.style.overflow="",W&&document.contains(W)&&W.focus(),W=null}function re(r){r.preventDefault(),fe()}function ne(){if(!U){I.textContent="Sending is not configured on this build — use “Copy brief” instead.";return}window.location.href=U,I.textContent="Your email app should be opening. If it did not, use “Copy brief” instead."}async function ae(){try{await navigator.clipboard.writeText(F),I.textContent="Brief copied. Paste it into any mail app."}catch{I.textContent="Copying was blocked by the browser — select the text above and copy it manually.",M.focus()}}function le(r){r.key==="Escape"&&(r.preventDefault(),z())}function ce(){const c=new URLSearchParams(window.location.search).get("service");if(!c)return;const d=ze(c);if(!d)return;const m=$t(c,d.categoryId),y=O.find(C=>C.label===m);if(y){n.value=y.id,se(y.id);const C=Ct(y,c,d.title);C&&(a.value=C.id),V()}const f=t.querySelector("#description");f&&!f.value.trim()&&(f.value=`I'd like to discuss: ${d.title}.

What I'm looking for:
`)}return n.addEventListener("change",X),t.querySelector("#service").addEventListener("change",r=>$(r.currentTarget)),t.querySelector("#name").addEventListener("input",r=>$(r.currentTarget)),t.querySelector("#phone").addEventListener("input",r=>$(r.currentTarget)),t.querySelector("#email").addEventListener("input",r=>$(r.currentTarget)),t.querySelector("#description").addEventListener("input",r=>$(r.currentTarget)),t.querySelector("#consent").addEventListener("change",r=>$(r.currentTarget)),g.forEach(r=>r.addEventListener("click",Y)),h.addEventListener("change",Z),q.addEventListener("click",oe),t.addEventListener("submit",re),R.addEventListener("click",z),A.addEventListener("click",r=>{r.target===A&&z()}),S==null||S.addEventListener("click",ne),P.addEventListener("click",ae),document.addEventListener("keydown",le),ce(),{destroy(){document.removeEventListener("keydown",le),n.removeEventListener("change",X),t.removeEventListener("submit",re),R.removeEventListener("click",z),S==null||S.removeEventListener("click",ne),P.removeEventListener("click",ae),h.removeEventListener("change",Z),q.removeEventListener("click",oe),g.forEach(r=>r.removeEventListener("click",Y)),document.body.style.overflow=""}}}const Se={privacy:{title:"Privacy",body:`
      <p>Project enquiries are used only to reply to you. The contact form opens your own email app. This site does not run an account system and does not sell personal data.</p>
      <p>If you email a brief, that message stays in your mail client and mine. Do not send passwords, payment card numbers, or government ID scans in the first message.</p>
    `},terms:{title:"Terms",body:`
      <p>Sending an enquiry is not a contract. Work starts only after scope, timeline, and payment are agreed in writing.</p>
      <p>ARTRAW provides creative, digital, and technical services. Documentation help for business processes is assistance only — not legal, tax, or government filing.</p>
      <p>Portfolio items describe work that exists. They are not a promise that the same result, timeline, or outcome will apply to your project.</p>
    `}};function Ce(e){const t=Se[e]||Se.privacy,i=document.createElement("section");return i.className="section legal-page",i.innerHTML=`
    <div class="container legal-copy">
      <p class="section-label">ARTRAW</p>
      <h1 class="section-title">${t.title}</h1>
      ${t.body}
      <p><a href="/" data-route="home">Back home</a></p>
    </div>
  `,i}function Ie(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function jt(e,t,i={}){const o={root:null,rootMargin:"0px 0px -10% 0px",threshold:.1},n=new IntersectionObserver(a=>{a.forEach(v=>{v.isIntersecting&&(t(v.target),n.unobserve(v.target))})},{...o,...i});return document.querySelectorAll(e).forEach(a=>n.observe(a)),n}function qt(e,t,i={}){return jt(e,t,i)}const ve={home:()=>Mt(),services:()=>ct(),work:()=>bt(),contact:()=>Tt(),privacy:()=>Ce("privacy"),terms:()=>Ce("terms")};let ye="home",L=null;function Mt(){const e=document.createDocumentFragment();return e.appendChild(Qe()),e.appendChild(Ze()),e.appendChild(et()),e.appendChild(it()),e.appendChild(st()),e.appendChild(ot()),e.appendChild(rt()),e.appendChild(nt()),e}function Pt(){const e=document.getElementById("app"),t=document.createElement("a");t.href="#main-content",t.className="skip-link",t.textContent="Skip to main content",e.appendChild(t);const i=Ye();e.appendChild(i);const o=document.createElement("main");return o.id="main-content",o.setAttribute("tabindex","-1"),e.appendChild(o),e.appendChild(at()),{nav:i,main:o}}function we(e){const t=e.replace(/\/+$/,"")||"/";if(t==="/")return"home";const i=t.slice(1);return ve[i]?i:"home"}function We(e){return e==="home"?"/":`/${e}`}function he(e,t=!1){var o;ve[e]||(e="home");const i=document.getElementById("main-content");i&&((o=L==null?void 0:L.destroy)==null||o.call(L),window.scrollTo(0,0),i.innerHTML="",i.removeAttribute("tabindex"),i.dataset.route=e,i.appendChild(ve[e]()),ye=e,e==="home"?(L=Xe(i.querySelector(".hero")),Ee(i)):e==="services"?L=gt(i.querySelector(".services-page")):e==="work"?L=wt(i.querySelector(".work-page")):e==="contact"?L=Rt(i.querySelector(".contact-page")):(L=null,Ee(i)),Wt(e),It(e),t||(i.setAttribute("tabindex","-1"),i.focus({preventScroll:!0})),t||history.pushState({route:e},"",We(e)+window.location.search))}const Bt="https://artraw.dev",Te={home:"Umesh Kumar — ARTRAW | Creative • Digital • Technology",services:"Services — Umesh Kumar / ARTRAW",work:"Selected Work — Umesh Kumar / ARTRAW",contact:"Start a Project — Umesh Kumar / ARTRAW",privacy:"Privacy — Umesh Kumar / ARTRAW",terms:"Terms — Umesh Kumar / ARTRAW"},Le={home:"Umesh Kumar — ARTRAW. Creative • Digital • Technology. Design, video, websites, AI apps, automation, and custom digital projects.",services:"Browse ARTRAW services — AI and automation, websites, design and branding, photo and video, music visuals, ecommerce, and business documentation assistance.",work:"Selected work by Umesh Kumar / ARTRAW — projects that exist in this practice, with status stated as it is.",contact:"Start a project with ARTRAW. Choose a service, describe what you need, and send a structured brief.",privacy:"How ARTRAW handles enquiry data — replies only, no accounts, no selling of personal data.",terms:"Terms for working with ARTRAW — enquiries are not contracts, and documentation help is assistance only."};function It(e){const t=Te[e]||Te.home,i=Le[e]||Le.home,o=We(e),n=`${Bt}${o}`;document.title=t,G("name","description",i),G("property","og:title",t),G("property","og:description",i),G("property","og:url",n),G("name","twitter:title",t),G("name","twitter:description",i),G("name","twitter:url",n);let a=document.querySelector('link[rel="canonical"]');a||(a=document.createElement("link"),a.rel="canonical",document.head.appendChild(a)),a.href=n}function G(e,t,i){let o=document.querySelector(`meta[${e}="${t}"]`);o||(o=document.createElement("meta"),o.setAttribute(e,t),document.head.appendChild(o)),o.content=i}function Wt(e){document.querySelectorAll(".nav-link, .nav-mobile-link").forEach(t=>{const o=t.dataset.nav===e;t.classList.toggle("active",o),o?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")})}function Ee(e=document){const t=e.querySelectorAll(".reveal");if(Ie()){t.forEach(i=>i.classList.add("visible"));return}qt(".reveal",i=>i.classList.add("visible"),{rootMargin:"0px 0px -40px 0px"})}function te(e){const t=document.querySelector(e);if(!t)return;const i=document.querySelector(".nav"),o=t.getBoundingClientRect().top+window.scrollY-((i==null?void 0:i.offsetHeight)||0)-8;window.scrollTo({top:o,behavior:Ie()?"auto":"smooth"}),t.hasAttribute("tabindex")||t.setAttribute("tabindex","-1"),t.focus({preventScroll:!0})}function Dt(e){const t=e.target.closest("a");if(!t||t.target==="_blank"||t.hasAttribute("download"))return;const i=t.getAttribute("href");if(!i||i.startsWith("mailto:")||i.startsWith("tel:"))return;if(i.startsWith("#")){e.preventDefault(),ye!=="home"?(he("home",!1),requestAnimationFrame(()=>te(i))):te(i);return}const o=new URL(i,window.location.origin);if(o.origin!==window.location.origin)return;const n=we(o.pathname);if(!(!ve[n]&&o.pathname!=="/")){if(e.preventDefault(),n===ye&&o.hash){te(o.hash);return}he(n),o.hash&&requestAnimationFrame(()=>te(o.hash)),t.dataset.project&&requestAnimationFrame(()=>Nt(t.dataset.project))}}function Nt(e){const t=[...document.querySelectorAll("[data-open-project]")].find(i=>i.dataset.openProject===e);t==null||t.click()}function Re(){document.documentElement.setAttribute("data-theme","dark");const{nav:e}=Pt(),t=_e(e);document.addEventListener("click",Dt),window.addEventListener("popstate",()=>he(we(window.location.pathname),!0)),he(we(window.location.pathname),!0),window.location.hash&&requestAnimationFrame(()=>te(window.location.hash)),window.addEventListener("beforeunload",()=>{var i;t==null||t.destroy(),(i=L==null?void 0:L.destroy)==null||i.call(L)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Re):Re();
