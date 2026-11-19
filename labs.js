/* 教学实验区：目录渲染 + 站内查看器（2026-11-19 第一期）
   数据来自 labs-data.js（window.TEACH_LABS）。
   点击演示 → 在本站内的查看器（单个 iframe）中打开，不跳外链。 */
(function () {
  var LABS = window.TEACH_LABS || [];
  var SOURCE_LABEL = {
    phet: 'PhET', ass: 'All-Science Sims', sl3d: 'ScienceLab 3D',
    mpl: 'myPhysicsLab', tf: 'TF Playground', tense: 'Tense Playground'
  };

  /* ---- 渲染目录 ---- */
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  var bySubject = {};
  LABS.forEach(function (d) {
    (bySubject[d.subject] = bySubject[d.subject] || []).push(d);
  });
  var total = 0;
  Object.keys(bySubject).forEach(function (subj) {
    var box = document.querySelector('.lab-list[data-subject="' + subj + '"]');
    if (!box) return;
    var list = bySubject[subj];
    total += list.length;
    list.forEach(function (d) {
      var zhName = d.zh || d.name;
      var enName = d.en || d.name;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lab-btn' + (d.wedulab ? ' wedulab' : '');
      b.innerHTML = '<span class="lab-name">' + (d.wedulab ? '★ ' : '') + escapeHtml(zhName) + '</span>' +
        (enName !== zhName ? '<span class="lab-en">' + escapeHtml(enName) + '</span>' : '');
      b.title = (d.desc || d.name) + '（' + (SOURCE_LABEL[d.source] || d.source) + '）';
      b.addEventListener('click', function () { openViewer(d); });
      box.appendChild(b);
    });
    var h3 = box.parentElement.querySelector('h3');
    if (h3 && list.length) h3.textContent += '（' + list.length + '）';
  });
  var totalEl = document.getElementById('labTotal');
  if (totalEl) totalEl.textContent = '共 ' + total + ' 个演示';

  /* 学科暂无演示（第二期自研）：显示一行说明，不留空白 */
  document.querySelectorAll('.lab-list').forEach(function (box) {
    if (!box.children.length) {
      var p = document.createElement('p');
      p.className = 'note';
      p.textContent = '本学科演示正在自研中（第二期），敬请期待。';
      box.appendChild(p);
    }
  });

  /* ---- 站内查看器（单个 iframe） ---- */
  var viewer = document.createElement('div');
  viewer.id = 'labViewer';
  viewer.className = 'lab-viewer';
  viewer.setAttribute('aria-hidden', 'true');
  viewer.innerHTML =
    '<div class="lab-viewer-panel" role="dialog" aria-modal="true">' +
    '<div class="lab-viewer-bar">' +
    '<span class="lab-viewer-title"></span>' +
    '<span class="lab-viewer-src"></span>' +
    '<button type="button" class="lab-viewer-close lab-viewer-lang" style="margin-left:0" aria-label="切换语言" hidden>EN</button>' +
    '<button type="button" class="lab-viewer-close" aria-label="关闭">✕</button>' +
    '</div>' +
    '<div class="lab-viewer-desc"></div>' +
    '<iframe class="lab-viewer-frame" title="" allow="fullscreen" allowfullscreen></iframe>' +
    '</div>';
  document.body.appendChild(viewer);
  var frame = viewer.querySelector('iframe');
  var titleEl = viewer.querySelector('.lab-viewer-title');
  var srcEl = viewer.querySelector('.lab-viewer-src');
  var descEl = viewer.querySelector('.lab-viewer-desc');
  var langBtn = viewer.querySelector('.lab-viewer-lang');
  var currentEntry = null;
  var currentLang = 'zh';

  function openViewer(d) {
    var zhName = d.zh || d.name;
    var enName = d.en || d.name;
    titleEl.textContent = zhName;
    srcEl.textContent = (enName !== zhName ? enName + ' · ' : '') + (SOURCE_LABEL[d.source] || d.source);
    descEl.textContent = d.desc || '';
    frame.title = zhName;
    currentEntry = d;
    currentLang = 'zh';
    if (d.urlEn) {
      langBtn.hidden = false;
      langBtn.textContent = 'EN';
    } else {
      langBtn.hidden = true;
    }
    frame.src = d.url;
    viewer.classList.add('open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeViewer() {
    viewer.classList.remove('open');
    viewer.setAttribute('aria-hidden', 'true');
    frame.removeAttribute('src');
    document.body.style.overflow = '';
  }
  viewer.querySelector('.lab-viewer-close').addEventListener('click', closeViewer);
  /* PhET 中文/EN 切换：默认中文（d.url），点按换英文（d.urlEn），再点换回 */
  langBtn.addEventListener('click', function () {
    if (!currentEntry || !currentEntry.urlEn) return;
    if (currentLang === 'zh') {
      currentLang = 'en';
      langBtn.textContent = '中文';
      frame.src = currentEntry.urlEn;
    } else {
      currentLang = 'zh';
      langBtn.textContent = 'EN';
      frame.src = currentEntry.url;
    }
  });
  viewer.addEventListener('click', function (ev) {
    if (ev.target === viewer) closeViewer();
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && viewer.classList.contains('open')) closeViewer();
  });

  /* 直达链接：index.html#lab=<序号> 打开指定演示 */
  var m = /^#lab=(\d+)$/.exec(window.location.hash || '');
  if (m) {
    var idx = parseInt(m[1], 10);
    if (LABS[idx]) openViewer(LABS[idx]);
  }
})();
