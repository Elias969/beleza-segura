document.addEventListener('DOMContentLoaded', () => {
  const feed = document.getElementById('communityFeed');
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const modal = document.getElementById('modalOverlay');
  const openModal = document.getElementById('openModalBtn');
  const closeModal = document.getElementById('closeModalBtn');
  const form = document.getElementById('newTopicForm');
  const search = document.querySelector('.search-input');
  if (window.lucide) window.lucide.createIcons();

  const applyFilters = () => {
    const active = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const term = (search?.value || '').trim().toLowerCase();
    feed?.querySelectorAll('.post-card').forEach(post => {
      const matchesCategory = active === 'all' || post.dataset.category === active;
      const matchesSearch = !term || post.textContent.toLowerCase().includes(term);
      post.hidden = !(matchesCategory && matchesSearch);
    });
  };
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    applyFilters();
  }));
  search?.addEventListener('input', applyFilters);

  feed?.addEventListener('click', event => {
    const like = event.target.closest('.like-btn');
    if (like) {
      const count = like.querySelector('span');
      const icon = like.querySelector('svg, i');
      const liked = like.classList.toggle('liked');
      const value = Math.max(0, Number.parseInt(count?.textContent || '0', 10) + (liked ? 1 : -1));
      if (count) count.textContent = value;
      if (icon?.tagName === 'I') icon.className = liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      return;
    }
    const comments = event.target.closest('.comment-trigger');
    if (comments) {
      const section = comments.closest('.post-card')?.querySelector('.comments-section');
      if (section) section.hidden = !section.hidden;
      return;
    }
    const send = event.target.closest('.send-comment, .comment-input-box button');
    if (send) {
      const box = send.closest('.comment-input-box');
      const input = box?.querySelector('input');
      const text = input?.value.trim();
      if (!text) return;
      const list = box.closest('.comments-section')?.querySelector('.comment-list');
      if (list) list.insertAdjacentHTML('beforeend', `<div class="comment-item"><span class="initial-avatar comment-avatar" aria-label="Você">V</span><div class="comment-bubble"><strong>Você</strong><p>${text.replace(/[<>]/g, '')}</p></div></div>`);
      input.value = '';
      if (window.lucide) window.lucide.createIcons();
    }
  });

  openModal?.addEventListener('click', () => modal?.classList.add('active'));
  closeModal?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', event => { if (event.target === modal) modal.classList.remove('active'); });
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const category = document.getElementById('topicCategory').value;
    const title = document.getElementById('topicTitle').value.trim();
    const content = document.getElementById('topicContent').value.trim();
    if (!title || !content || !feed) return;
    const labels = { beleza: 'Beleza', maquiagem: 'Maquiagem', dicas: 'Dicas', alertas: 'Alertas' };
    feed.insertAdjacentHTML('afterbegin', `<article class="post-card" data-category="${category}"><div class="post-avatar"><span class="initial-avatar" aria-label="Você">V</span></div><div class="post-content"><div class="post-meta"><span class="user-name">Você</span><span class="post-time">Agora mesmo</span><span class="badge">${labels[category] || 'Tópico'}</span></div><h3 class="post-title">${title.replace(/[<>]/g, '')}</h3><p class="post-text">${content.replace(/[<>]/g, '')}</p><div class="post-actions"><button class="action-btn like-btn" type="button"><i data-lucide="heart"></i><span>0</span></button><button class="action-btn comment-trigger" type="button"><i data-lucide="message-circle"></i><span>0 comentários</span></button></div><div class="comments-section" hidden><div class="comment-list"></div><div class="comment-input-box"><input type="text" placeholder="Escreva um comentário..."><button type="button" class="send-comment"><i data-lucide="send"></i></button></div></div></div></article>`);
    form.reset(); modal?.classList.remove('active');
    if (window.lucide) window.lucide.createIcons();
    applyFilters();
  });
});
