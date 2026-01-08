document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.header-nav');

    if (btn && nav) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('active');
            btn.classList.toggle('active');

            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                btn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    const heroVideo = document.getElementById('hero-video');
    const soundAlert = document.getElementById('sound-alert');

    if (heroVideo && soundAlert) {
        setTimeout(() => {
            soundAlert.classList.add('hidden');
            heroVideo.play().catch(error => {
                console.log("Reprodução automática bloqueada ou falhou:", error);
            });
        }, 5000);
    }
});

