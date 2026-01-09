document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.glossary-term h3').forEach(term => {
        term.addEventListener('click', () => {
            const def = term.nextElementSibling;
            const isOpen = def.style.maxHeight;
            // Close all
            document.querySelectorAll('.term-definition').forEach(d => d.style.maxHeight = null);
            // Toggle current
            if(!isOpen) def.style.maxHeight = def.scrollHeight + "px";
        });
    });
});
