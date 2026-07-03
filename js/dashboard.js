document.addEventListener('DOMContentLoaded', () => {
    // Load stats
    const stats = JSON.parse(localStorage.getItem('doc_stats') || '{"total":4821,"processed":4795}');
    document.getElementById('total-uploaded').textContent = stats.total.toLocaleString();
    document.getElementById('today-processed').textContent = "24"; // Mock today

    // Load recent docs
    const docs = JSON.parse(localStorage.getItem('documents') || '[]');
    
    // Add some mock data if empty
    if(docs.length === 0) {
        docs.push(
            {name: 'INV_2024_082.pdf', category: 'Invoice', status: 'PROCESSED', date: '2024-05-18', confidence: '99.8%'},
            {name: 'Resume_JohnDoe.pdf', category: 'Resume', status: 'PROCESSED', date: '2024-05-18', confidence: '98.5%'},
            {name: 'Medical_Rpt_001.pdf', category: 'Medical Report', status: 'PENDING', date: '2024-05-17', confidence: 'N/A'}
        );
        localStorage.setItem('documents', JSON.stringify(docs));
    }
    
    const tbody = document.getElementById('recent-documents-list');
    tbody.innerHTML = '';
    
    docs.slice(-5).reverse().forEach(doc => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-800/50 transition-colors border-b border-gray-800/50';
        const isProcessed = doc.status === 'PROCESSED';
        const statusClass = isProcessed ? 'bg-green-900/30 text-green-400 border-green-800/50' : 'bg-orange-900/30 text-orange-400 border-orange-800/50';
        
        tr.innerHTML = `
            <td class="px-6 py-4 flex items-center gap-3">
                <i data-lucide="file-text" class="w-4 h-4 text-blue-400"></i>
                <span class="font-medium text-white">${doc.name}</span>
            </td>
            <td class="px-6 py-4">
                <span class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-gray-800 text-blue-400 border border-gray-700">${doc.category}</span>
            </td>
            <td class="px-6 py-4 text-gray-400">${doc.date}</td>
            <td class="px-6 py-4">
                <span class="font-mono text-xs ${isProcessed ? 'text-green-400' : 'text-gray-500'}">${doc.confidence || '98.0%'}</span>
            </td>
            <td class="px-6 py-4">
                <span class="px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider border ${statusClass}">${doc.status}</span>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    lucide.createIcons();
});
