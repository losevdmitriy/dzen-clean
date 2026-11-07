/* Remote input is data only; this module never accepts URLs from messages. */
globalThis.DzenUpdater = {
  async text(source) {
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(source.url, {signal: controller.signal, cache: 'no-cache', redirect: 'error', credentials: 'omit', referrerPolicy: 'no-referrer'});
      if (!response.ok || /html/i.test(response.headers.get('content-type') || '')) throw new Error(`Источник ${source.id} недоступен`);
      const reader = response.body.getReader(), chunks = []; let size = 0;
      for (;;) { const {done, value} = await reader.read(); if (done) break;
        size += value.length; if (size > 3 * 1024 * 1024) {await reader.cancel(); throw new Error(`Источник ${source.id} слишком большой`);} chunks.push(value); }
      const bytes = new Uint8Array(size); let offset = 0;
      for (const chunk of chunks) {bytes.set(chunk, offset); offset += chunk.length;}
      const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(x => x.toString(16).padStart(2, '0')).join('');
      return {text: new TextDecoder('utf-8', {fatal: true}).decode(bytes), hash};
    } finally {clearTimeout(timeout);}
  },
  async candidate() {
    const results = await Promise.all(DzenRuleCompiler.sources.filter(x=>!['ru-servers','ag-popups'].includes(x.id)).map(async source => {
      const {text, hash} = await this.text(source);
      const part = DzenRuleCompiler.compile(text, source.id,{scope:'global'});
      return {source, hash, part};
    }));
    const rules = DzenRuleCompiler.merge(results.map(x => x.part));
    if (!rules.cosmetic.length || !rules.network.length) throw new Error('Источники не содержат пригодных правил');
    const hashes = results.map(x => `${x.source.id}:${x.hash}`).join('|');
    const digest = [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(hashes)))].map(x => x.toString(16).padStart(2, '0')).join('');
    return {schema: 3, version: '03-'+digest.slice(0, 13), fetchedAt: Date.now(), rules,
      sources: results.map(x => ({id: x.source.id, hash: x.hash, license: x.source.license, stats: x.part.stats}))};
  }
};

