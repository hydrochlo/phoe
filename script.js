// Mobile Hamburger Menu Logic
const mobileMenu = document.getElementById('mobile-menu');
const navLinksList = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinksList.classList.toggle('active-menu');
});

// Tab Navigation Logic (Updated to close mobile menu on click)
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');

navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all buttons and sections
        navButtons.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active-section'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show the corresponding section
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-section');

        // Close the mobile menu after clicking a link
        if (window.innerWidth <= 600) {
            navLinksList.classList.remove('active-menu');
        }
    });
});

// Copy to Clipboard Logic
function copyTemplate(elementId) {
    const codeBlock = document.getElementById(elementId);
    const textToCopy = codeBlock.innerText;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const btn = event.target;
        const originalText = btn.innerText;
        
        btn.innerText = "Copied!";
        btn.style.backgroundColor = "#d4edda";
        btn.style.borderColor = "#c3e6cb";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "#ffffff";
            btn.style.borderColor = "#bbb";
        }, 1500);
    }).catch(err => {
        alert("Failed to copy text. Please try manually.");
        console.error("Copy failed: ", err);
    });
}