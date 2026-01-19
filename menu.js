document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.menu-toggle');
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.header-nav');

    header.classList.add('is-dark');

    if (btn && nav) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            
            const isOpen = nav.classList.toggle('active');
            btn.classList.toggle('active');
            header.classList.toggle('menu-open', isOpen);

            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {

                // remove ativo de todos
                nav.querySelectorAll('a').forEach(a => a.classList.remove('active'));

                // ativa o clicado
                link.classList.add('active');

                // fecha menu
                nav.classList.remove('active');
                btn.classList.remove('active');
                header.classList.remove('menu-open');
                document.body.style.overflow = '';
            });
        });

        function isLightColor(rgb) {
            var r = rgb[0], g = rgb[1], b = rgb[2];
            var luminance = (0.299*r + 0.587*g + 0.114*b);
            return luminance > 160;
        }
        function findBackgroundElement(el) {
            while (el && el !== document.body) {
                var style = window.getComputedStyle(el);
                if (
                    style.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
                    style.backgroundImage !== 'none'
                ) {
                    return el;
                }
                el = el.parentElement;
            }
            return null;
        }

        function updateHeaderContrast() {
            if (!header || header.classList.contains('menu-open')) return;

            var y = header.offsetHeight + 5;
            var el = document.elementFromPoint(window.innerWidth / 2, y);
            if (!el) return;

            var bgEl = findBackgroundElement(el);
            if (!bgEl) return;

            var style = window.getComputedStyle(bgEl);

            // imagem = assume escuro
            if (style.backgroundImage && style.backgroundImage !== 'none') {
                header.classList.add('is-dark');
                return;
            }

            var match = style.backgroundColor.match(/\d+/g);
            if (!match) return;

            if (isLightColor(match)) {
                header.classList.remove('is-dark');
            } else {
                header.classList.add('is-dark');
            }
        }

        window.addEventListener('scroll', updateHeaderContrast);
        window.addEventListener('load', updateHeaderContrast);
        window.addEventListener('resize', updateHeaderContrast);        
        window.addEventListener('load', () => {
            updateHeaderContrast();
        });


        // --- NOVO: Fechar ao clicar fora do menu ---
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = nav.contains(e.target);
            const isClickOnButton = btn.contains(e.target);

            // Se o menu está aberto E o clique NÃO foi no menu E NÃO foi no botão
            if (nav.classList.contains('active') && !isClickInsideMenu && !isClickOnButton) {
                nav.classList.remove('active');
                btn.classList.remove('active');
                header.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
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
