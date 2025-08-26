// API Base URL (change this to your backend URL in production)
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();

    const footerChatbotLink = document.getElementById('footer-chatbot-link');
    const chatbotToggler = document.getElementById('chatbot-toggler');
    if (footerChatbotLink && chatbotToggler) {
        footerChatbotLink.addEventListener('click', function(e) {
            e.preventDefault();
            chatbotToggler.click();
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            const data = await res.json();
            if (data.success) {
                alert('Thank you for contacting me!');
                contactForm.reset();
            } else {
                alert('Error: ' + (data.error || 'Could not send message.'));
            }
        });
    }
});

// Initialize Application
function initializeApp() {
    setupNavbar();
    setupMobileMenu();
    setupParticles();
    setupBackToTop();
    setupModal();
    setupContactForm();
    setupThemeToggle(); // <-- Add this line

    // Load dynamic content
    loadSkills();
    loadProjects();
    loadAchievements();

    // Setup smooth scrolling for anchor links
    setupSmoothScrolling();

    // Setup lazy loading fallback
    setupLazyLoading();
}

// Theme toggle logic
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    let isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    setTheme(isDark);

    if (themeToggle) {
        updateToggleIcon(isDark);

        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            setTheme(isDark);
            updateToggleIcon(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    function setTheme(dark) {
        if (dark) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        }
    }

    function updateToggleIcon(dark) {
        themeToggle.innerHTML = dark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }
}

// Navbar scroll effect
function setupNavbar() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Particles.js configuration
function setupParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 100, 
                    density: { enable: true, value_area: 800 } 
                },
                color: { value: ['#6B46C1', '#8B5CF6', '#A855F7'] },
                shape: { 
                    type: 'circle',
                    stroke: { width: 0, color: '#000000' }
                },
                opacity: { 
                    value: 0.6, 
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: { 
                    value: 4, 
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: '#6B46C1', 
                    opacity: 0.4, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 3, 
                    direction: 'none', 
                    random: false, 
                    straight: false, 
                    out_mode: 'out', 
                    bounce: false 
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { 
                    onhover: { enable: true, mode: 'repulse' }, 
                    onclick: { enable: true, mode: 'push' }, 
                    resize: true 
                },
                modes: { 
                    grab: { distance: 400, line_linked: { opacity: 1 } }, 
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, 
                    repulse: { distance: 200, duration: 0.4 }, 
                    push: { particles_nb: 4 }, 
                    remove: { particles_nb: 2 } 
                }
            },
            retina_detect: true
        });
    }
}

// Back to top button functionality
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Modal functionality
function setupModal() {
    const modal = document.getElementById('resume-modal');
    const closeBtn = document.querySelector('.close');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form setup
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// API functions
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error posting to ${endpoint}:`, error);
        return null;
    }
}

// Load skills from API
async function loadSkills() {
    const skills = await fetchData('/skills');
    const container = document.getElementById('skills-container');
    const loading = document.getElementById('skills-loading');

    if (!container || !loading) return;

    if (skills && skills.length > 0) {
        container.innerHTML = skills.map(skill => `
            <div class="skill-item">
                <div class="skill-name">
                    <span>${escapeHtml(skill.name)}</span>
                    <span>${escapeHtml(skill.level)}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: 0%" data-width="${escapeHtml(skill.level)}%"></div>
                </div>
            </div>
        `).join('');

        // Animate skill bars with intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        setTimeout(() => {
                            bar.style.width = bar.getAttribute('data-width');
                        }, 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(container);
    } else {
        container.innerHTML = `
            <div style="text-align: center; color: var(--medium-gray); padding: 2rem;">
                <p>Unable to load skills. Using default data...</p>
            </div>
        `;
        // Load default skills if API fails
        loadDefaultSkills();
    }

    loading.style.display = 'none';
}

// Load default skills (fallback)
function loadDefaultSkills() {
    const defaultSkills = [
        { name: 'Python', level: 85 },
        { name: 'Javascript', level: 80 },
        { name: 'React', level: 75 },
        { name: 'MongoDB', level: 70 },
        { name: 'HTML/CSS', level: 90 },
        { name: 'Node.js', level: 75 }
    ];

    const container = document.getElementById('skills-container');
    if (container) {
        container.innerHTML = defaultSkills.map(skill => `
            <div class="skill-item">
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span>${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: 0%" data-width="${skill.level}%"></div>
                </div>
            </div>
        `).join('');

        // Animate skill bars
        setTimeout(() => {
            document.querySelectorAll('.skill-progress').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 500);
    }
}

// Load projects from API
async function loadProjects() {
    const projects = await fetchData('/projects');
    const container = document.getElementById('projects-container');
    const loading = document.getElementById('projects-loading');

    if (!container || !loading) return;

    if (projects && projects.length > 0) {
        container.innerHTML = projects.map(project => `
            <div class="project-card">
                <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="project-img" loading="lazy">
                <div class="project-content">
                    <h3 class="project-title">${escapeHtml(project.title)}</h3>
                    <p class="project-description">${escapeHtml(project.description)}</p>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.github ? `<a href="${escapeHtml(project.github)}" class="project-link" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>` : ''}
                        ${project.demo ? `<a href="${escapeHtml(project.demo)}" class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = `
            <div style="text-align: center; color: var(--medium-gray); padding: 2rem;">
                <p>Unable to load projects. Using default data...</p>
            </div>
        `;
        // Load default projects if API fails
        loadDefaultProjects();
    }

    loading.style.display = 'none';
}

// Load default projects (fallback)
function loadDefaultProjects() {
    const defaultProjects = [
        {
            title: 'PDFDesigner',
            description: 'PDFDesigner is an all-in-one, intuitive desktop and web application that transforms static PDF documents into dynamic, editable, and collaborative workspaces. Go beyond simple viewing and annotation to truly design and manipulate your documents with powerful, yet easy-to-use tools.',
            image: 'https://i.pinimg.com/1200x/65/3f/95/653f950239ea540ee842ed3990fb35b2.jpg',
            technologies: ['Html', 'Css', 'Javascript','Blogger'],
            github: 'https://github.com/harshraj677/PDFDesigner.',
            demo: 'pdfdesigner.blogspot.com'
        },
        {
            title: 'My Portfolio Wesbite',
            description: 'Engineering robust solutions through code. My portfolio showcases a journey of transforming complex problems into efficient and scalable software.',
            image: 'https://i.pinimg.com/1200x/bf/7b/6a/bf7b6a1ea511dcafc115c337a9b35cbc.jpg',
            technologies: ['JavaScript', 'Html', 'MongoDB', 'CSS3'],
            github: 'https://github.com/yourusername/task-manager',
            demo: 'https://your-task-manager-demo.com'
        },
    ];

    const container = document.getElementById('projects-container');
    if (container) {
        container.innerHTML = defaultProjects.map(project => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" class="project-link" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>
                        <a href="${project.demo}" class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Demo</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Load achievements from API
async function loadAchievements() {
    const achievements = await fetchData('/achievements');
    const container = document.getElementById('achievements-container');
    const loading = document.getElementById('achievements-loading');

    if (!container || !loading) return;

    if (achievements && achievements.length > 0) {
        container.innerHTML = achievements.map(achievement => `
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-date">${escapeHtml(achievement.date)}</div>
                    <h4 class="timeline-title">${escapeHtml(achievement.title)}</h4>
                    <p class="timeline-description">${escapeHtml(achievement.description)}</p>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = `
            <div style="text-align: center; color: var(--medium-gray); padding: 2rem;">
                <p>Unable to load achievements. Using default data...</p>
            </div>
        `;
        // Load default achievements if API fails
        loadDefaultAchievements();
    }

    loading.style.display = 'none';
}

// Load default achievements (fallback)
function loadDefaultAchievements() {
    const defaultAchievements = [
        {
            date: '2024',
            title: 'Basic of Python Certificate',
            description: 'I earned the HackerRank & Springboard by solving practical coding challenges. I demonstrated proficiency in core Python, data structures (lists, dictionaries, sets), and writing efficient, logical code to solve problems.'
        },
        {
            date: '2024',
            title: 'Foss Hackathon Winner',
            description: 'Won first place in our localhost coding hackathon with innovative web application solving real-world problems.'
        },
        {
            date: '2024',
            title: 'ADVAYA Hackthon',
            description: 'Represent our college at a Pan-India ADVAYA Hackathon, in BGSCET, Bengaluru '

        },
        {
            date: '2024',
            title: 'Reacts with Django Fundamentals Certification',
            description: 'Earned a certification in advanced JavaScript and modern ES6+ features, demonstrating proficiency in frameworks and cutting-edge development techniques'
            }
    ];

    const container = document.getElementById('achievements-container');
    if (container) {
        container.innerHTML = defaultAchievements.map(achievement => `
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-date">${achievement.date}</div>
                    <h4 class="timeline-title">${achievement.title}</h4>
                    <p class="timeline-description">${achievement.description}</p>
                </div>
            </div>
        `).join('');
    }
}

// Handle contact form submission
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
        const response = await postData('/contact', data);
        
        if (response && response.success) {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            e.target.reset();
        } 
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('An error occurred. Please try again later.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Resume functions
function downloadResume() {
    // In a real application, this would download from your server
    const resumeUrl = 'https://drive.google.com/file/d/1YKZhJEInOZ2rLprRrcRD28KA-KztsygO/view?usp=drivesdk'; // Update with actual resume URL
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'https://drive.google.com/file/d/1YKZhJEInOZ2rLprRrcRD28KA-KztsygO/view?usp=drivesdk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Resume download started!', 'success');
}

function viewResume() {
    const modal = document.getElementById('resume-modal');
    const iframe = document.getElementById('resume-frame');
    
    if (modal && iframe) {
        // In a real application, this would load from your server
        iframe.src = '//drive.google.com/file/d/1YKZhJEInOZ2rLprRrcRD28KA-KztsygO/view?usp=drivesdk';
        modal.style.display = 'block';
    }
}

// Utility functions
function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--soft-black);
                color: var(--white);
                padding: 1rem 1.5rem;
                border-radius: 8px;
                border-left: 4px solid var(--primary-purple);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 1rem;
                min-width: 300px;
                animation: slideIn 0.3s ease;
            }
            
            .notification-success {
                border-left-color: #10B981;
            }
            
            .notification-error {
                border-left-color: #EF4444;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--medium-gray);
                cursor: pointer;
                font-size: 0.9rem;
                padding: 0.2rem;
                margin-left: auto;
            }
            
            .notification-close:hover {
                color: var(--white);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Add any scroll-based animations or effects here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Image lazy loading fallback for older browsers
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // When the image is in the viewport
                if (entry.isIntersecting) {
                    const image = entry.target;
                    // For this fallback to work, the real image URL should be in 'data-src'.
                    // The 'src' would typically point to a low-quality placeholder.
                    // Example: <img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy">
                    if (image.dataset.src) {
                        image.src = image.dataset.src;
                    }
                    
                    // The 'loading' attribute is not needed anymore
                    image.removeAttribute('loading');

                    // Stop observing the image once it has been loaded
                    observer.unobserve(image);
                }
            });
        });

        // Start observing each image
        images.forEach(image => {
            imageObserver.observe(image);
        });
    }
}
document.getElementById("contact-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const res = await fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  });

  const data = await res.json();
  alert(data.message);
});
