/* Deep Search – User Profile Page Script */
(function () {
  'use strict';

  /* ---- Tab switching ---- */
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  /* ---- History filter ---- */
  const historyFilter = document.getElementById('historyFilter');
  const historyItems = document.querySelectorAll('.history-item');

  if (historyFilter) {
    historyFilter.addEventListener('input', () => {
      const query = historyFilter.value.trim().toLowerCase();
      historyItems.forEach(item => {
        const text = item.querySelector('.history-query')?.textContent.toLowerCase() ?? '';
        item.classList.toggle('hidden', query.length > 0 && !text.includes(query));
      });
    });
  }

  /* ---- Remove history item ---- */
  document.getElementById('historyList')?.addEventListener('click', e => {
    const btn = e.target.closest('.btn-ghost');
    if (btn) {
      const item = btn.closest('.history-item');
      item?.remove();
    }
  });

  /* ---- Edit Profile modal ---- */
  const modal = document.getElementById('editModal');
  const openModalBtn = document.getElementById('editProfileBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const saveModalBtn = document.getElementById('saveModalBtn');

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('modalName').focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  openModalBtn?.addEventListener('click', openModal);
  closeModalBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal();
  });

  /* Save modal → update sidebar */
  saveModalBtn?.addEventListener('click', () => {
    const name = document.getElementById('modalName').value.trim();
    const bio = document.getElementById('modalBio').value.trim();

    if (name) {
      document.querySelector('.profile-name').textContent = name;
      document.querySelector('.profile-bio').textContent = bio;
      // Sync settings form fields
      const fullNameInput = document.getElementById('fullName');
      const bioInput = document.getElementById('bio');
      if (fullNameInput) fullNameInput.value = name;
      if (bioInput) bioInput.value = bio;
    }

    closeModal();
    showToast('Profile updated!');
  });

  /* ---- Settings form ---- */
  const settingsForm = document.getElementById('settingsForm');
  settingsForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('fullName').value.trim();
    const bio = document.getElementById('bio').value.trim();

    if (name) {
      document.querySelector('.profile-name').textContent = name;
      document.querySelector('.profile-bio').textContent = bio;
      document.getElementById('modalName').value = name;
      document.getElementById('modalBio').value = bio;
    }

    showToast('Settings saved!');
  });

  /* ---- Dark mode toggle ---- */
  const darkModeToggle = document.getElementById('darkMode');

  // Respect OS preference on load
  if (window.matchMedia('(prefers-color-scheme: dark)').matches && darkModeToggle) {
    darkModeToggle.checked = true;
  }

  darkModeToggle?.addEventListener('change', () => {
    document.body.style.colorScheme = darkModeToggle.checked ? 'dark' : 'light';
  });

  /* ---- Toast helper ---- */
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
  }
})();
