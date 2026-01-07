import './style.css'



document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LÓGICA DEL MENÚ RESPONSIVE
    // ==========================================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    let isMenuOpen = false;

    // Función para alternar el menú
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            // ABRIR
            mobileMenu.classList.remove('invisible', 'opacity-0');
            mobileMenu.classList.add('visible', 'opacity-100');
            
            // Animación Burguer -> X
            line1.classList.add('rotate-45', 'translate-y-2');
            line2.classList.add('opacity-0');
            line3.classList.add('-rotate-45', '-translate-y-2');

            // Animación de los links (entrada)
            menuLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.classList.remove('translate-y-10', 'opacity-0');
                }, index * 100); // Pequeño retraso escalonado
            });

        } else {
            // CERRAR
            mobileMenu.classList.remove('visible', 'opacity-100');
            mobileMenu.classList.add('invisible', 'opacity-0');
            
            // Animación X -> Burguer
            line1.classList.remove('rotate-45', 'translate-y-2');
            line2.classList.remove('opacity-0');
            line3.classList.remove('-rotate-45', '-translate-y-2');

            // Resetear links
            menuLinks.forEach(link => {
                link.classList.add('translate-y-10', 'opacity-0');
            });
        }
    }

    // Evento Click en el botón
    if(menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // Cerrar menú al hacer click en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(isMenuOpen) toggleMenu();
        });
    });


    // ==========================================
    // 2. LÓGICA DE LA CALCULADORA
    // ==========================================
    const calcZone = document.getElementById('calc-zone');
    const calcSize = document.getElementById('calc-size');
    const calcResult = document.getElementById('calc-result');

    function updateValuation() {
        // Obtenemos valores. Si están vacíos, usamos 0.
        const pricePerM2 = parseInt(calcZone.value) || 0;
        const size = parseInt(calcSize.value) || 0;
        
        // La matemática
        const totalValue = pricePerM2 * size;

        // Formato de moneda ($3,500,000)
        const formatter = new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0
        });

        // Actualizar el texto en pantalla
        if(calcResult) {
            calcResult.innerText = formatter.format(totalValue);
        }
    }

    // Escuchar eventos (solo si los elementos existen)
    if(calcZone && calcSize) {
        calcZone.addEventListener('change', updateValuation);
        calcSize.addEventListener('input', updateValuation); // 'input' detecta mientras escribes
    }


    // ==========================================
    // 3. LÓGICA DE FILTRADO (PROPIEDADES)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Estilos visuales de los botones
            filterBtns.forEach(b => {
                b.classList.remove('bg-black', 'text-white', 'border-black');
                b.classList.add('border-neutral-200', 'text-black');
            });
            btn.classList.remove('border-neutral-200', 'text-black');
            btn.classList.add('bg-black', 'text-white', 'border-black');

            // 2. Filtrar tarjetas
            const category = btn.getAttribute('data-filter');

            propertyCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

});

function injectPropertyButtons() {
    const cards = document.querySelectorAll('.property-card');

    cards.forEach(card => {
        const imageContainer = card.querySelector('div');

        if (imageContainer) {
            imageContainer.classList.add('relative');

            const btn = document.createElement('a');
            btn.innerText = 'Ver Detalles';
            btn.href = '#';

            // AQUÍ ESTÁ EL CAMBIO IMPORTANTE:
            btn.className = `
                absolute bottom-6 left-1/2 -translate-x-1/2 
                bg-white text-black px-6 py-3 
                text-[10px] font-bold uppercase tracking-[0.2em] 
                hover:bg-neutral-900 hover:text-white 
                transition-all duration-500 ease-out
                shadow-xl cursor-pointer z-10 whitespace-nowrap

                /* 1. MÓVIL (Por defecto): Siempre visible y en su lugar */
                opacity-100 translate-y-0

                /* 2. DESKTOP (lg:): Oculto inicialmente y desplazado abajo */
                lg:opacity-0 lg:translate-y-4 
                
                /* 3. DESKTOP HOVER: Aparece al pasar el mouse */
                lg:group-hover:opacity-100 lg:group-hover:translate-y-0
            `;

            imageContainer.appendChild(btn);
        }
    });
}

injectPropertyButtons();