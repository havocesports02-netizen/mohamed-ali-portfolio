// ============================================
// BACKGROUND MUSIC
// ============================================

const bgMusic = new Audio('musics/alimusic.mp3');
bgMusic.volume = 0.3; // 30% volume
bgMusic.loop = true; // Loop the music

// Start music on first user interaction (required by browsers)
let musicStarted = false;

function startMusic() {
    if (!musicStarted) {
        bgMusic.play().catch(error => {
            console.log('Autoplay prevented:', error);
        });
        musicStarted = true;
    }
}

// Try to start music on page load
window.addEventListener('load', startMusic);

// Fallback: Start on first click/scroll
document.addEventListener('click', startMusic, { once: true });
document.addEventListener('scroll', startMusic, { once: true });
document.addEventListener('keydown', startMusic, { once: true });

// Optional: Add music control button
const musicControl = document.createElement('button');
musicControl.innerHTML = '🔊';
musicControl.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF7A00, #ff9933);
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 5px 20px rgba(255, 122, 0, 0.5);
    transition: all 0.3s ease;
`;

musicControl.addEventListener('mouseenter', () => {
    musicControl.style.transform = 'scale(1.1)';
    musicControl.style.boxShadow = '0 8px 30px rgba(255, 122, 0, 0.7)';
});

musicControl.addEventListener('mouseleave', () => {
    musicControl.style.transform = 'scale(1)';
    musicControl.style.boxShadow = '0 5px 20px rgba(255, 122, 0, 0.5)';
});

musicControl.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicControl.innerHTML = '🔊';
    } else {
        bgMusic.pause();
        musicControl.innerHTML = '🔇';
    }
});

document.body.appendChild(musicControl);

// ============================================
// 3D ANIMATED BACKGROUND WITH THREE.JS
// ============================================

const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 30;

// ============================================
// PARTICLE SYSTEM
// ============================================

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i += 3) {
    // Position
    posArray[i] = (Math.random() - 0.5) * 100;
    posArray[i + 1] = (Math.random() - 0.5) * 100;
    posArray[i + 2] = (Math.random() - 0.5) * 100;
    
    // Color (orange gradient)
    colorArray[i] = 1.0; // R
    colorArray[i + 1] = 0.48 + Math.random() * 0.2; // G
    colorArray[i + 2] = 0; // B
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// ============================================
// GEOMETRIC SHAPES
// ============================================

const shapes = [];
const geometries = [
    new THREE.IcosahedronGeometry(1.5, 0),
    new THREE.OctahedronGeometry(1.5, 0),
    new THREE.TetrahedronGeometry(1.5, 0),
    new THREE.TorusGeometry(1, 0.4, 16, 100)
];

for(let i = 0; i < 20; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshBasicMaterial({
        color: 0xFF7A00,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.x = (Math.random() - 0.5) * 80;
    mesh.position.y = (Math.random() - 0.5) * 80;
    mesh.position.z = (Math.random() - 0.5) * 80;
    
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;
    
    const scale = 0.5 + Math.random() * 1.5;
    mesh.scale.set(scale, scale, scale);
    
    mesh.userData = {
        rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.01
        },
        floatSpeed: 0.0005 + Math.random() * 0.001,
        floatRange: 2 + Math.random() * 3
    };
    
    scene.add(mesh);
    shapes.push(mesh);
}

// ============================================
// CONNECTING LINES
// ============================================

const linesMaterial = new THREE.LineBasicMaterial({
    color: 0xFF7A00,
    transparent: true,
    opacity: 0.1
});

function createConnectingLines() {
    const positions = particlesGeometry.attributes.position.array;
    const maxDistance = 15;
    
    for(let i = 0; i < particlesCount; i++) {
        for(let j = i + 1; j < particlesCount; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if(distance < maxDistance && Math.random() > 0.98) {
                const lineGeometry = new THREE.BufferGeometry();
                const linePositions = new Float32Array([
                    positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                    positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                ]);
                lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
                const line = new THREE.Line(lineGeometry, linesMaterial);
                scene.add(line);
            }
        }
    }
}

createConnectingLines();

// ============================================
// MOUSE INTERACTION
// ============================================

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// ============================================
// ANIMATION LOOP
// ============================================

let scrollY = window.scrollY;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();

    // Smooth camera movement
    targetX = mouseX * 5;
    targetY = mouseY * 5;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Rotate particles
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = scrollY * 0.0002;

    // Animate particles
    const positions = particlesGeometry.attributes.position.array;
    for(let i = 0; i < particlesCount * 3; i += 3) {
        positions[i + 1] += Math.sin(elapsedTime + positions[i]) * 0.01;
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    // Animate shapes
    shapes.forEach((shape, index) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
        
        // Floating effect
        shape.position.y += Math.sin(elapsedTime * shape.userData.floatSpeed + index) * 0.03;
        shape.position.x += Math.cos(elapsedTime * shape.userData.floatSpeed + index) * 0.02;
        
        // Pulse effect
        const pulse = 1 + Math.sin(elapsedTime * 2 + index) * 0.05;
        shape.material.opacity = 0.15 + Math.sin(elapsedTime + index) * 0.05;
    });

    renderer.render(scene, camera);
}

animate();

// ============================================
// WINDOW RESIZE
// ============================================

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ============================================
// NAVBAR HIDE ON SCROLL
// ============================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 80) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL
// ============================================

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

// ============================================
// FORM SUBMISSION
// ============================================

const form = document.querySelector('#contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        
        // Send AJAX request to PHP
        fetch('php/contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Message envoyé avec succès! Je vous répondrai bientôt.');
                form.reset();
            } else {
                alert('Erreur: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        });
    });
}