document.querySelector('.nav-bar').addEventListener('click', function(e) {
    if (e.target.tagName === 'I' || e.target.tagName === 'BUTTON') {
        const target = e.target.tagName === 'I' ? e.target.parentElement : e.target;
        const tabId = target.getAttribute('data-tab');

        document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

        target.querySelector('.nav-icon').classList.add('active');
        document.getElementById(tabId).classList.add('active');
    }
});
