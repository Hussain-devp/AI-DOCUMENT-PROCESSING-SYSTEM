document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const searchBtn = document.getElementById('search-btn');
    const tbody = document.getElementById('search-results-list');
    
    function renderResults() {
        const docs = JSON.parse(localStorage.getItem('documents') || '[]');
        const query = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        
        const filtered = docs.filter(doc => {
            const matchQuery = doc.name.toLowerCase().includes(query) || (doc.keywords && doc.keywords.toLowerCase().includes(query));
            const matchCat = category === '' || doc.category.toLowerCase() === category.toLowerCase();
            return matchQuery && matchCat;
        });
        
        tbody.innerHTML = '';
        
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500 font-medium">No documents found matching your criteria.</td></tr>';
            return;
        }
        
        filtered.reverse().forEach(doc => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-800/50 transition-colors border-b border-gray-800/50';
            
            const keysHtml = (doc.keywords || '').split(',').slice(0, 3).map(k => k.trim() ? `<span class="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-400 text-[10px] font-bold uppercase tracking-wider mr-1">#${k}</span>` : '').join('');
            
            tr.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <i data-lucide="file-text" class="w-4 h-4 text-blue-400"></i>
                        <span class="font-medium text-white">${doc.name}</span>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-gray-800 text-blue-400 border border-gray-700">${doc.category}</span>
                </td>
                <td class="px-6 py-4 max-w-xs truncate">
                    ${keysHtml}
                </td>
                <td class="px-6 py-4 text-gray-400">${doc.date}</td>
                <td class="px-6 py-4 text-right">
                    <button class="text-gray-500 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800 rounded-lg" title="View Details"><i data-lucide="eye" class="w-4 h-4"></i></button>
                    <button class="text-gray-500 hover:text-green-400 transition-colors p-2 hover:bg-gray-800 rounded-lg ml-1" title="Download"><i data-lucide="download" class="w-4 h-4"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        lucide.createIcons();
    }
    
    searchBtn.addEventListener('click', renderResults);
    searchInput.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') renderResults();
    });
    
    // Initial render
    renderResults();
});
