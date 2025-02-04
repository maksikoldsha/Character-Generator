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

// Добавляем звездочки
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDuration = Math.random() * 2 + 3 + 's'; // Продолжительность падения от 3 до 5 секунд
    document.body.appendChild(star);

    // Удаляем звездочку после завершения анимации
    setTimeout(() => {
        star.remove();
    }, 5000);
}

// Создаем звездочки каждые 100 миллисекунд
setInterval(createStar, 100);
