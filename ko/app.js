const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', '메뉴 열기'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기'); mobileNav.hidden = !open; });
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!mobileNav.hidden && !event.target.closest('.header')) closeMenu(); });
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => { const dialog = document.getElementById(button.dataset.open); dialog.showModal(); document.body.classList.add('modal-open'); }));
document.querySelectorAll('dialog').forEach(dialog => { dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close()); dialog.addEventListener('close', () => document.body.classList.remove('modal-open')); dialog.addEventListener('click', event => { const box = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close(); }); });
const briefForm = document.getElementById('brief-form');
const result = document.getElementById('brief-result');
const output = document.getElementById('brief-output');
briefForm.addEventListener('submit', event => { event.preventDefault(); const data = new FormData(briefForm); const description = String(data.get('description')).trim(); if (!description) { briefForm.elements.description.setCustomValidity('만들고 싶은 내용을 입력해주세요.'); briefForm.elements.description.reportValidity(); return; } const value = key => String(data.get(key) || '').trim() || '협의 필요'; output.value = `[개발 협업 제안]\n\n문의 유형: ${value('type')}\n\n만들고 싶은 것\n${description}\n\n현재 준비된 것: ${value('prepared')}\n희망 일정: ${value('schedule')}\n예상 예산: ${value('budget')}`; briefForm.hidden = true; result.hidden = false; document.getElementById('copy-status').textContent = ''; output.focus(); });
briefForm.elements.description.addEventListener('input', () => briefForm.elements.description.setCustomValidity(''));
document.getElementById('edit-brief').addEventListener('click', () => { result.hidden = true; briefForm.hidden = false; briefForm.elements.description.focus(); });
document.getElementById('copy-brief').addEventListener('click', async () => { try { await navigator.clipboard.writeText(output.value); document.getElementById('copy-status').textContent = '복사했습니다. 담당자에게 제안문을 전달해주세요.'; } catch { output.focus(); output.select(); document.getElementById('copy-status').textContent = '내용을 선택했습니다. 복사 단축키로 복사해주세요.'; } });
document.getElementById('year').textContent = new Date().getFullYear();
