document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.menu-toggle');
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.header-nav');

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
