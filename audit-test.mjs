import { JSDOM } from 'jsdom';
const url=process.argv[2]||'http://localhost:3000/';
const dom=new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>',{url,pretendToBeVisual:true});
const {window}=dom;
window.scrollTo=()=>{}; window.HTMLElement.prototype.scrollIntoView=()=>{};
window.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}});
class IO{observe(){}unobserve(){}disconnect(){}takeRecords(){return[];}}
window.IntersectionObserver=IO; window.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};
const raf=cb=>setTimeout(()=>cb(Date.now()),0); window.requestAnimationFrame=raf; window.cancelAnimationFrame=id=>clearTimeout(id);
for(const k of ['document','HTMLElement','Element','Node','DOMParser','Event','MouseEvent','KeyboardEvent','getComputedStyle','history','HTMLAnchorElement','FormData','Image','SVGElement','DocumentFragment','NodeFilter','XMLSerializer','navigator','CSS','URLSearchParams','location','sessionStorage'])
 try{Object.defineProperty(globalThis,k,{value:window[k],configurable:true,writable:true});}catch{}
Object.defineProperty(globalThis,'window',{value:window,configurable:true,writable:true});
globalThis.IntersectionObserver=IO; globalThis.matchMedia=window.matchMedia; globalThis.requestAnimationFrame=raf; globalThis.cancelAnimationFrame=window.cancelAnimationFrame;
const doc=window.document; const errs=[]; process.on('uncaughtException',e=>errs.push(e.stack||e.message));
await import('./src/main.js');
await new Promise(r=>setTimeout(r,400));
const main=()=>doc.getElementById('main-content');
const click=el=>el.dispatchEvent(new window.MouseEvent('click',{bubbles:true,cancelable:true}));
const wait=ms=>new Promise(r=>setTimeout(r,ms));

console.log('route:',main().dataset.route);
console.log('title:',doc.title);
console.log('description:',doc.querySelector('meta[name="description"]')?.content.slice(0,60));
console.log('canonical:',doc.querySelector('link[rel="canonical"]')?.href);
console.log('og:url:',doc.querySelector('meta[property="og:url"]')?.content);
console.log('main focusable:',main().getAttribute('tabindex'));
console.log('skip link:',!!doc.querySelector('.skip-link'));

// every internal link resolves
const bad=[];
doc.querySelectorAll('a[href^="/"]').forEach(a=>{
  const p=a.getAttribute('href').split(/[?#]/)[0];
  const routes=['/','/services','/work','/contact','/privacy','/terms'];
  if(!routes.includes(p)) bad.push(a.getAttribute('href'));
});
console.log('broken internal links:',bad.length?bad:'none');

// nav through every route
for(const label of ['Services','Work','Contact']){
  click([...doc.querySelectorAll('.nav-link')].find(a=>a.textContent.trim()===label)); await wait(250);
  console.log(`nav->${label}: ${main().dataset.route} | h1="${main().querySelector('h1')?.textContent.trim().slice(0,40)}" | title="${doc.title.slice(0,30)}"`);
}
// footer legal links
click(doc.querySelector('.footer-legal a[href="/terms"]')); await wait(250);
console.log('footer->terms:',main().dataset.route);
click(doc.querySelector('.footer-legal a[href="/privacy"]')); await wait(250);
console.log('footer->privacy:',main().dataset.route);
console.log('main focusable after nav:',main().getAttribute('tabindex'));
console.log('activeElement is main:',doc.activeElement===main());
console.log('ERRORS:',errs.length?errs.slice(0,2):'none');
process.exit(errs.length ? 1 : 0);
