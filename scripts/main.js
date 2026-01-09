document.addEventListener('DOMContentLoaded', () => {
    // Settings Modal Logic
    const settingsBtn = document.getElementById('settings-button');
    const modal = document.getElementById('settings-modal');
    
    // Inject modal HTML if empty (for reusability)
    if(modal && !modal.innerHTML) {
        modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header"><h2>Settings</h2><button class="close-button">&times;</button></div>
            <div class="modal-body">
                <h3>Theme</h3>
                <div class="button-group">
                    <button id="theme-dark">Dark</button><button id="theme-light">Light</button><button id="theme-contrast">High Contrast</button>
                </div>
                <h3>Text Size</h3>
                <div class="button-group">
                    <button id="text-small">Small</button><button id="text-default">Default</button><button id="text-large">Large</button>
                </div>
                <h3>Motion</h3>
                <label>Reduced Motion <input type="checkbox" id="reduced-motion-toggle"></label>
            </div>
        </div>`;
    }

    if(modal) {
        const closeBtn = modal.querySelector('.close-button');
        settingsBtn.addEventListener('click', () => modal.classList.add('open'));
        closeBtn.addEventListener('click', () => modal.classList.remove('open'));
        modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('open'); });

        // Theme Handling
        const applyTheme = (t) => {
            document.body.className = document.body.className.replace(/light-mode|high-contrast-mode/g, '');
            if(t === 'light') document.body.classList.add('light-mode');
            if(t === 'contrast') document.body.classList.add('high-contrast-mode');
            localStorage.setItem('theme', t);
        };
        
        modal.querySelector('#theme-dark').onclick = () => applyTheme('dark');
        modal.querySelector('#theme-light').onclick = () => applyTheme('light');
        modal.querySelector('#theme-contrast').onclick = () => applyTheme('contrast');
        
        // Load saved settings
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme) applyTheme(savedTheme);

        // Text Size
        const applySize = (s) => {
            document.body.classList.remove('text-small', 'text-large');
            if(s !== 'default') document.body.classList.add(`text-${s}`);
            localStorage.setItem('size', s);
        }
        modal.querySelector('#text-small').onclick = () => applySize('small');
        modal.querySelector('#text-default').onclick = () => applySize('default');
        modal.querySelector('#text-large').onclick = () => applySize('large');
        
        const savedSize = localStorage.getItem('size');
        if(savedSize) applySize(savedSize);
    }
});
