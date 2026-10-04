(() => {
  'use strict';
  const list = document.getElementById('log-list');
  const status = document.getElementById('log-status');
  const updated = document.getElementById('log-updated');
  const buttons = [...document.querySelectorAll('[data-category]')];
  let entries = [];
  const pageSize = 5;
  let currentPage = 1;
  let currentCategory = 'all';
  const pagination = document.createElement('nav');
  pagination.className = 'log-pagination';
  pagination.setAttribute('aria-label', '공부 기록 페이지');
  list.after(pagination);
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const render = category => {
    list.replaceChildren();
    const visible = entries.filter(e => category === 'all' || e.category === category);
    const pages = Math.ceil(visible.length / pageSize);
    currentPage = Math.min(currentPage, Math.max(pages, 1));
    status.textContent = visible.length ? `총 ${visible.length}개 · ${currentPage} / ${pages} 페이지` : '아직 공개한 기록이 없습니다. 공부 기록을 차근차근 쌓아갑니다.';
    visible.slice((currentPage - 1) * pageSize, currentPage * pageSize).forEach(e => {
      const article = element('article', '', 'log-card');
      const meta = element('div', '', 'log-meta');
      meta.append(element('span', e.category === 'Brush Industry' ? 'BRUSH INDUSTRY' : 'ECONOMY STUDY'));
      const time = element('time', e.date.replaceAll('-', '.')); time.dateTime = e.date; meta.append(time);
      article.append(meta, element('h3', e.title), element('p', e.summary, 'log-summary'));
      const details = element('details'); details.append(element('summary', '개념과 다음 질문 읽기'));
      [['핵심 개념', e.concepts], ['성찰', e.reflection], ['추가 공부', e.nextStudy], ['회사·진로 연결', e.connection]].forEach(([label, value]) => {
        if (value) details.append(element('h4', label), element('p', value));
      });
      article.append(details);
      if (e.verification) details.append(element('h4', '자료 확인 상태'), element('p', e.verification));
      try {
        const url = new URL(e.url);
        if (['https:', 'http:'].includes(url.protocol)) {
          const link = element('a', '원문 읽기 ↗', 'text-link'); link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.append(element('span', ' (새 탭)', 'sr-only')); article.append(link);
        }
      } catch (_) { /* Records without a source link remain readable. */ }
      list.append(article);
    });
    pagination.replaceChildren();
    if (pages > 1) {
      const addPage = (label, page, disabled, active = false) => {
        const button = element('button', label);
        button.type = 'button'; button.disabled = disabled;
        button.setAttribute('aria-label', label === '←' ? '이전 페이지' : label === '→' ? '다음 페이지' : `${page} 페이지`);
        if (active) button.setAttribute('aria-current', 'page');
        button.addEventListener('click', () => {
          currentPage = page; render(currentCategory);
          document.getElementById('log-status').scrollIntoView({block: 'start', behavior: 'instant'});
          const selected = pagination.querySelector('[aria-current="page"]');
          if (selected) selected.focus({preventScroll: true});
        });
        pagination.append(button);
      };
      addPage('←', currentPage - 1, currentPage === 1);
      const start = Math.max(1, Math.min(currentPage - 2, pages - 4));
      if (start > 1) { addPage('1', 1, false); if (start > 2) pagination.append(element('span', '…')); }
      for (let page = start; page <= Math.min(pages, start + 4); page++) addPage(String(page), page, false, page === currentPage);
      if (start + 4 < pages) { if (start + 5 < pages) pagination.append(element('span', '…')); addPage(String(pages), pages, false); }
      addPage('→', currentPage + 1, currentPage === pages);
    }
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    currentPage = 1; currentCategory = button.dataset.category;
    render(currentCategory);
  }));
  fetch('data/learning-log.json', {cache: 'no-cache'})
    .then(r => { if (!r.ok) throw new Error('load'); return r.json(); })
    .then(data => {
      if (!Array.isArray(data.entries)) throw new Error('schema');
      entries = data.entries;
      const date = new Date(data.updatedAt);
      updated.textContent = Number.isNaN(date.valueOf()) ? '' : `마지막 반영 ${date.toLocaleDateString('ko-KR', {timeZone: 'Asia/Seoul'})}`;
      render('all');
    }).catch(() => {
      updated.textContent = '';
      status.textContent = '학습 기록을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.';
    });
})();
