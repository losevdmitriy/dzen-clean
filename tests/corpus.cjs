const cases = [
  ['feed-1','feed','<article class="card" id="ordinary"><a href="/a/example">Полезная статья</a></article><article id="ad"><div data-ad-type="direct">Реклама</div></article>'],
  ['feed-2','feed','<div id="heuristic" class="card"><span>Реклама</span><a href="https://dzen.ru/away?to=https%3A%2F%2Fan.yandex.ru%2Fclick">Объявление</a></div><div id="normal" class="card"><span>Реклама</span><a href="https://example.org/">Обсуждение рекламы</a></div>'],
  ['feed-3','feed','<div id="feed"></div><div id="late-host"></div><div id="subscriptions" data-testid="subscriptions"><a href="/a/following">Подписки</a></div>'],
  ['article-1','article','<main><h1>Обычная статья</h1><div id="article-body" itemprop="articleBody"><span>Реклама</span><a href="https://an.yandex.ru/">Пример в тексте</a></div></main><aside id="right-ad" data-testid="article-right-ad-block" class="article-right-ads">Реклама</aside>'],
  ['article-2','article','<div data-testid="bottom-ad" id="bottom-ad">Баннер</div><div data-testid="comments" id="comments"><textarea id="comment">Комментарий</textarea><button id="comment-send">Отправить</button></div>'],
  ['article-3','article','<main><h1>Заголовок</h1><div id="editor" contenteditable="true">Реклама <a href="https://an.yandex.ru/">пример</a></div></main><iframe id="friendly"></iframe>'],
  ['news-1','news','<main><h1>Новости</h1><article id="news-content">Полезная новость</article></main><aside class="news-mt-advert" id="news-ad">Реклама</aside>'],
  ['news-2','news','<div id="shadow-host"></div><nav><a href="/news/">Все новости</a></nav>'],
  ['news-3','news','<div id="remote-ad" class="imported-ad">Баннер</div><article class="ordinary-card" id="ordinary"><a href="/a/example">Не скрывать</a></article>'],
  ['video-1','video','<section id="player"><video id="video" controls></video><button id="skip" disabled>Пропустить рекламу</button><button id="generic">Пропустить</button><button id="complain">Пожаловаться</button><button id="unpleasant">Мне это неприятно</button><button id="fullscreen">Полный экран</button></section><button id="outside">Пропустить рекламу</button>'],
  ['video-2','video','<section id="player"><video id="video" controls></video><button id="close-banner" aria-label="Закрыть баннер">×</button><div id="player-shadow"></div></section><div data-testid="video-player-teaser-ad-banner" id="overlay-ad">Баннер</div>'],
  ['video-3','video','<section id="player"><video id="video" controls></video><button id="skip">Skip ad</button><button id="next">Следующий ролик</button></section><section style="display:none"><video></video><button id="hidden-skip">Пропустить рекламу</button></section>']
];
function html(name) {
  const item=cases.find(x=>x[0]===name);if(!item)return null;
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Local synthetic ${item[0]}</title><style>body{font:16px sans-serif}.card{width:300px;min-height:90px}aside{width:280px;min-height:80px}video{width:320px;height:180px}button{padding:8px}section{width:500px}</style></head><body>${item[2]}<script>
window.clicks={};document.querySelectorAll('button').forEach(b=>b.onclick=()=>{clicks[b.id]=(clicks[b.id]||0)+1;if(b.id==='skip')b.disabled=true;});
document.querySelector('#fullscreen')?.addEventListener('click',()=>document.querySelector('video').requestFullscreen());
document.querySelector('#next')?.addEventListener('click',()=>{const v=document.querySelector('video');v.currentTime=0;v.play();});
if(document.querySelector('#shadow-host')){const h=document.querySelector('#shadow-host');window.closedRoot=h.attachShadow({mode:'closed'});closedRoot.innerHTML='<div data-testid="ad-banner" id="shadow-ad">Реклама</div><p id="shadow-normal">Новости</p>';}
if(document.querySelector('#player-shadow')){const h=document.querySelector('#player-shadow');window.closedRoot=h.attachShadow({mode:'closed'});closedRoot.innerHTML='<button id="shadow-skip">Пропустить рекламу</button>';closedRoot.querySelector('button').onclick=()=>clicks.shadow=(clicks.shadow||0)+1;}
if(document.querySelector('#friendly'))document.querySelector('#friendly').srcdoc='<div><span>Реклама</span><a href="https://an.yandex.ru/">Объявление</a></div>';
</script></body></html>`;
}
module.exports={cases,html};
