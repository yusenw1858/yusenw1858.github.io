try{var localSearch=$id("local-search"),html=$query("html"),mask=$id("mask"),searchBtn=$query(".search-btn"),searchClose=$query(".search-close-button"),isLoad=!1,searchId="local-search-input",contentId="local-search-result";async function search(a){try{var t=$id(contentId),s=(t.insertAdjacentHTML("beforeBegin",'<i class="fas fa-spinner fa-pulse" style="display:flex;justify-content:center"></i>'),a.split(".")[1]);let e=[];const n=await fetch(a);if("json"==s&&(e=await n.json()),"xml"==s){var l=await n.text();const o=new window.DOMParser,h=o.parseFromString(l,"text/xml");e=[...h.querySelectorAll("entry")].map(e=>({title:e.querySelector("title").textContent,content:e.querySelector("content").textContent,url:e.querySelector("url").textContent}))}e.length&&(isLoad=!0);const i=$query("i.fa-pulse");i.parentElement.removeChild(i);var r=$id(searchId);function c(){var d='<ul class="search-result-list">',m=r.value.trim().toLowerCase().split(/[\s\-]+/);t.innerHTML="",r.value.trim().length<=0||(e.forEach(e=>{var t,a,s,l,r=!0,c=(e.title&&""!==e.title.trim()||(e.title="Untitled"),e.title.trim().toLowerCase()),n=e.content.trim().replace(/<[^>]+>/g,"").toLowerCase(),i=e.url.startsWith("/")?e.url:"/"+e.url,o=-1,h=-1;""!==n?m.forEach(function(e,a){t=c.indexOf(e),o=n.indexOf(e),t<0&&o<0?r=!1:(o<0&&(o=0),0==a&&(h=o))}):r=!1,r&&(e=e.content.trim().replace(/<[^>]+>/g,""),0<=h&&(s=h+80,(s=0==(a=(a=h-20)<0?0:a)?100:s)>e.length&&(s=e.length),l=e.substring(a,s),m.forEach(e=>{var a=new RegExp(e,"gi");l=l.replace(a,'<span class="search-keyword">'+e+"</span>"),c=c.replace(a,'<span class="search-keyword">'+e+"</span>")}),d=d+"<li><a href='"+i+"' class='search-result-title'>"+c+'</a><p class="search-result">'+l+"...</p>"),d+="</li>")}),d+="</ul>",t.innerHTML=d,window.pjax&&window.pjax.refresh(t))}c(),r.addEventListener("input",c)}catch(e){isLoad=!1}}searchBtn.onclick=function(){isLoad||search($config.searchFile),mask.className="mask",localSearch.style.display||(localSearch.style.display="block",html.style.overflow="hidden",localSearch.classList.remove("search-animation-min"),localSearch.classList.add("search-animation-max"),$id(searchId).focus())},searchClose.onclick=function(){localSearch.classList.remove("search-animation-max"),localSearch.classList.add("search-animation-min"),mask.classList.remove("mask"),html.style.overflow="auto",setTimeout(()=>localSearch.style.display="",500)},window.addEventListener("pjax:complete",()=>{"none"===localSearch.style.display&&(mask.className="")})}catch(e){console.log("search error: ",e)}