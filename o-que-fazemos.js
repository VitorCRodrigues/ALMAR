document.addEventListener('DOMContentLoaded', () => {
        const gridContainer = document.querySelector('.servicos-grid');
        const cards = document.querySelectorAll('.servico-card');
        cards.forEach(card => {
            const plusBtn = card.querySelector('.plus-btn');
            const closeBtn = card.querySelector('.close-btn');
            if(plusBtn) {
                plusBtn.addEventListener('click', (e) => {
                    e.stopPropagation();  
                    gridContainer.classList.add('expanding-mode');
                    card.classList.add('active');
                    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }

            if(closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    gridContainer.classList.remove('expanding-mode');
                    card.classList.remove('active');
                });
            }
        });
    });
