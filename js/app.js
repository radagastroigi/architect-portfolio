// js/app.js

// 1. FADE IN ANIMATION (UX)
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add('loaded');
});

// 2. LOAD PROJECTS INTO GRID (For work.html)
function loadWorkGrid() {
    const grid = document.getElementById('work-grid');
    if (!grid) return; // Stop if not on work page

    projectsData.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card fade-up';
        card.onclick = () => window.location.href = `project.html?id=${p.id}`;
        
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${p.coverImage}" alt="${p.title}" loading="lazy">
            </div>
            <div class="card-text">
                <h3>${p.title}</h3>
                <p>${p.category} <span class="separator">/</span> ${p.year}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 3. LOAD SINGLE PROJECT DETAILS (For project.html)
function loadProjectDetail() {
    const container = document.getElementById('project-detail-container');
    if (!container) return; // Stop if not on project page

    // Get ID from URL (e.g., project.html?id=vertex-villa)
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const p = projectsData.find(item => item.id === projectId);

    if (!p) {
        container.innerHTML = "<h1>Project not found.</h1><a href='work.html'>Return to Works</a>";
        return;
    }

    // Inject Content
    document.title = `${p.title} | Architect Portfolio`;
    
    // Hero Section
    document.getElementById('p-hero-bg').style.backgroundImage = `url('${p.heroImage}')`;
    document.getElementById('p-title').innerText = p.title;
    document.getElementById('p-cat').innerText = p.category;

    // Stats
    document.getElementById('p-year').innerText = p.year;
    document.getElementById('p-loc').innerText = p.location;
    document.getElementById('p-role').innerText = p.role;
    
    // Description
    document.getElementById('p-desc').innerText = p.description;

    // Gallery Loop
    const galleryGrid = document.getElementById('p-gallery');
    p.gallery.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = "detail-image fade-up";
        img.loading = "lazy";
        galleryGrid.appendChild(img);
    });

    // Next Project Logic (UX)
    const currentIndex = projectsData.findIndex(item => item.id === projectId);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    const nextProject = projectsData[nextIndex];
    document.getElementById('next-project-link').href = `project.html?id=${nextProject.id}`;
    document.getElementById('next-project-name').innerText = nextProject.title;
}

// Initialize
loadWorkGrid();
loadProjectDetail();