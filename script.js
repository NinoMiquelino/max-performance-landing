        // Carregamento eficiente de recursos
        document.addEventListener('DOMContentLoaded', function() {
            // Configurar link do PageSpeed Insights
            function configurePageSpeedLink() {
                const pagespeedLink = document.getElementById('pagespeed-link');
                
                // Obter a URL atual da página
                const currentUrl = window.location.href;
                
                // Codificar a URL para uso seguro em parâmetros
                const encodedUrl = encodeURIComponent(currentUrl);
                
                // Construir a URL do PageSpeed Insights
                const pagespeedUrl = `https://pagespeed.web.dev/analysis?url=${encodedUrl}`;
                
                // Atualizar o href do link
                pagespeedLink.href = pagespeedUrl;
                
                console.log('Link do PageSpeed configurado:', pagespeedUrl);
            }

            // Menu mobile
            const menuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            const navItems = document.querySelectorAll('.nav-links a');
            
            // Configurar link do PageSpeed
            configurePageSpeedLink();
            
            // Abrir/fechar menu mobile
            menuBtn.addEventListener('click', () => {
                const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
                menuBtn.setAttribute('aria-expanded', !isExpanded);
                navLinks.classList.toggle('active');
            });

            // Fechar menu ao clicar em um link
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                });
            });

            // Fechar menu ao clicar fora dele
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Lazy loading para elementos
            const lazyElements = document.querySelectorAll('.lazy');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('loaded');
                        observer.unobserve(entry.target);
                    }
                });
            });

            lazyElements.forEach(el => observer.observe(el));

            // Animações sob demanda
            const animateOnScroll = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
                animateOnScroll.observe(el);
            });

            // Scroll suave para âncoras
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });

        // Service Worker para cache (opcional)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(console.error);
            });
        }