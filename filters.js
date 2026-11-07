Object.assign(DzenClean, {
  slots: [
    '[data-ad-type="direct"]', '[data-ad-type="mytarget"]', '[data-testid="ad-banner"]',
    '[data-testid="bottom-ad"]', '[data-testid="article-right-ad-block"]', '[data-testid="right-ad-block"]',
    '[data-testid="card-rtb-ad"]', '[data-testid="main-one-column-right-ad"]',
    '[class*="card-rtb"]', '[id*="card-rtb"]', '#ad-feed', '[data-testid$="-ad-block"]',
    '[class*="top-sidebar-desktop-ad__root"]',
    '[data-testid="video-player-teaser-ad-banner"]', '[data-testid="advert-fullscreen"]',
    '[class*="--article-right-ads__"]', '[class*="--ad-split-embed__"]', '[class*="--video-card-ad__"]',
    '[class*="--article-item__advertDoc2Doc-"]', '[class*="--article-item__bottomAdUnderComments-"]',
    '[class*="--article-item__rightAdWrapper"]', '.ad-split-embed', '.news-mt-advert', '.video-card-ads',
    'ins.mrg-tag', '[id^="adfox_"]', '[id^="rsya-R-A-"]', '[id^="ya_partner_R-A-"]',
    'article:has(> [data-ad-type="direct"])', '[data-testid="dzenpro-banner"]',
    '[id^="ya-dist-"]', '[class*="--distribution__distribution-"]',
    '[class*="BrandingAdvert"]', '[class*="MyTargetAdvert"]', '[class*="DirectAdvert"]'
  ],
  protectedContent: 'main, header, nav, footer, [role="main"], h1, video, audio, [itemprop="articleBody"], [data-testid="article-item-content"], [data-testid="article-title"], [contenteditable="true"], textarea, input, form, [role="textbox"]',
  protectedArea: '[itemprop="articleBody"], [data-testid="article-item-content"], [contenteditable="true"], form, [role="textbox"], [data-testid="comments"], [data-testid="subscriptions"]',
  label(text) { return /^(?:реклама|рекламная карточка|advertisement|sponsored)(?:\s*[·•|,.\-–—]?\s*(?:0|6|12|16|18)\s*\+)?$/iu.test(text.replace(/[\u200b-\u200d\ufeff]/g,'').trim().replace(/\s+/g,' ')); },
  skipLabel(text) { return /^(пропустить\s+рекламу|skip\s+(ad|ads|advertisement))[.!]?$/iu.test(text.trim().replace(/\s+/g, ' ')); },
  adLink(link) {
    try {
      let u = new URL(link, location.href);
      if (this.isDzen(u.hostname) && u.pathname === '/away') { const next = u.searchParams.get('to'); if (next) u = new URL(next); }
      return ['an.yandex.ru', 'ads.adfox.ru', 'ad.mail.ru', 'yabs.yandex.ru', 'r.mradx.net'].some(host => u.hostname === host || u.hostname.endsWith('.' + host)) ||
        (u.hostname === 'yandex.ru' && /^\/an\/count\//.test(u.pathname));
    } catch { return false; }
  }
});
