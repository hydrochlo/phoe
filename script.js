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

// Add 'e' or 'event' as a parameter
function copyTemplate(elementId, event) {
    const codeBlock = document.getElementById(elementId);
    const textToCopy = codeBlock.innerText;
    
    // Capture the button immediately using the passed event
    const btn = event.currentTarget || event.target;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
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
        alert("Failed to copy text. Note: Clipboard API requires HTTPS or localhost.");
        console.error("Copy failed: ", err);
    });
}

// --- File Upload Logic (Direct to Google Drive) ---
const uploadForm = document.getElementById('file-upload-form');
const fileInput = document.getElementById('myFile');
const uploadStatus = document.getElementById('upload-status');
const uploadBtn = document.getElementById('upload-btn');

if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const file = fileInput.files[0];
        if (!file) {
            uploadStatus.innerText = "Please select a file first.";
            uploadStatus.style.color = "red";
            return;
        }

        uploadBtn.innerText = "Uploading...";
        uploadBtn.disabled = true;
        uploadStatus.innerText = "";

        // Read the file and convert it to Base64
        const reader = new FileReader();
        reader.onload = async function() {
            // Strip the metadata prefix (e.g., "data:image/png;base64,")
            const base64Data = reader.result.split(',')[1];
            
            // Package the data
            const payload = {
                base64: base64Data,
                type: file.type,
                name: file.name
            };

            try {
                // IMPORTANT: Replace the URL below with your Google Web App URL
                const scriptURL = "https://script.google.com/macros/s/AKfycbwNpzdHg2hMe0b_kk-SScr-VeDrzZTehEVM8bi4ve3Z3o8fGH0_48OLsTutakYhD4Wu5A/exec";
                
                const response = await fetch(scriptURL, {
                    method: 'POST',
                    // Note: No headers intentionally set here to prevent strict CORS blocking
                    body: JSON.stringify(payload)
                });

                const resultText = await response.text();

                if (resultText === "Success") {
                    uploadStatus.innerText = "Success! File saved to Google Drive.";
                    uploadStatus.style.color = "green";
                    uploadForm.reset(); 
                } else {
                    uploadStatus.innerText = "Oops! There was a problem saving your file.";
                    uploadStatus.style.color = "red";
                    console.error(resultText);
                }
            } catch (error) {
                console.error("Upload error:", error);
                uploadStatus.innerText = "Network error. Please try again.";
                uploadStatus.style.color = "red";
            } finally {
                uploadBtn.innerText = "Upload File";
                uploadBtn.disabled = false;
            }
        };
        
        // Trigger the file reading process
        reader.readAsDataURL(file);
    });
}