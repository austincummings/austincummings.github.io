// Main JavaScript for Austin Cummings' portfolio website

document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add theme toggle functionality
    const createThemeToggle = () => {
        const header = document.querySelector('header .container');
        if (!header) return;

        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.innerHTML = '🌓';
        themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
        themeToggle.classList.add('theme-toggle');
        
        header.appendChild(themeToggle);
        
        // Add theme toggle styles
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle {
                position: absolute;
                top: 20px;
                right: 20px;
                background: var(--code-bg);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 20px;
                cursor: pointer;
                transition: transform 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-color);
            }
            
            .theme-toggle:hover {
                transform: rotate(15deg);
            }
            
            @media (max-width: 768px) {
                .theme-toggle {
                    top: 10px;
                    right: 10px;
                    width: 35px;
                    height: 35px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Check for saved theme preference or default to user's system preference
        const currentTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        // Toggle theme
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    };
    
    createThemeToggle();
    
    // Add animation to project cards
    const animateProjectCards = () => {
        const projects = document.querySelectorAll('.project');
        
        if (projects.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        // Add styles for animations
        const style = document.createElement('style');
        style.textContent = `
            .project {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            .project.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
        
        projects.forEach(project => {
            observer.observe(project);
        });
    };
    
    animateProjectCards();

    // Highlight active section in navigation
    const highlightActiveSection = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    };
    
    highlightActiveSection();
});