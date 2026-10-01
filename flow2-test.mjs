import { JSDOM } from 'jsdom';
const dom=new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>',{url:'http://localhost:3000/services',pretendToBeVisual:true});
const {window}=dom;
window.scrollTo=()=>{}; window.HTMLElement.prototype.scrollIntoView=()=>{};
window.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}});
class IO{observe(){}unobserve(){}disconnect(){}takeRecords(){return[];}}
window.IntersectionObserver=IO; window.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};
const raf=cb=>setTimeout(()=>cb(Date.now()),0); window.requestAnimationFrame=raf;
for(const k of ['document','HTMLElement','Element','Node','DOMParser','Event','MouseEvent','KeyboardEvent','getComputedStyle','history','HTMLAnchorElement','FormData','Image','SVGElement','DocumentFragment','NodeFilter','XMLSerializer','navigator','CSS','URLSearchParams','location'])
 try{Object.defineProperty(globalThis,k,{value:window[k],configurable:true,writable:true});}catch{}
Object.defineProperty(globalThis,'window',{value:window,configurable:true,writable:true});
globalThis.IntersectionObserver=IO; globalThis.matchMedia=window.matchMedia; globalThis.requestAnimationFrame=raf;
const doc=window.document; const errs=[]; process.on('uncaughtException',e=>errs.push(e.stack||e.message));
await import('./src/main.js');
await new Promise(r=>setTimeout(r,400));
const main=()=>doc.getElementById('main-content');
const click=el=>el.dispatchEvent(new window.MouseEvent('click',{bubbles:true,cancelable:true}));
const wait=ms=>new Promise(r=>setTimeout(r,ms));

// find a service row and click its CTA
const cta=main().querySelector('.service-cta-btn');
console.log('CTA href:',cta?.getAttribute('href'));
click(cta); await wait(400);
console.log('after CTA ->',main().dataset.route,'| url=',window.location.pathname+window.location.search);
console.log('category:',main().querySelector('#category')?.value);
console.log('service:',main().querySelector('#service')?.value);
console.log('description prefilled:',(main().querySelector('#description')?.value||'').slice(0,50).replace(/\n/g,' '));

// check placeholder handling
const sendBtn=main().querySelector('#brief-send');
const copyBtn=main().querySelector('#brief-copy');
console.log('send button present:',!!sendBtn,'(should be false — no email configured)');
console.log('copy button present:',!!copyBtn);
console.log('aside email shows:',main().querySelector('.aside-details dd')?.textContent.trim());
console.log('aside note:',main().querySelector('.aside-note')?.textContent.trim().slice(0,80));

// build a brief and verify no fake mailto
main().querySelector('#name').value='Test';
main().querySelector('#phone').value='9876543210';
main().querySelector('#email').value='t@e.co';
main().querySelector('#description').value='A proper description that is long enough to pass validation checks.';
main().querySelector('#consent').checked=true;
main().querySelector('#contact-form').dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));
await wait(300);
console.log('review open:',!main().querySelector('#brief-review').hidden);
console.log('review body:',main().querySelector('.brief-review-body')?.textContent.trim().slice(0,90));
console.log('ERRORS:',errs.length?errs.slice(0,2):'none');
