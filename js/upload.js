const fileInput = document.getElementById('file-input');
const uploadArea = document.getElementById('upload-area');
const loadingIndicator = document.getElementById('loading-indicator');
const resultContainer = document.getElementById('result-container');

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('border-blue-500', 'bg-blue-900/10');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('border-blue-500', 'bg-blue-900/10');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('border-blue-500', 'bg-blue-900/10');
    if(e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', () => {
    if(fileInput.files.length) {
        handleFile(fileInput.files[0]);
    }
});

async function handleFile(file) {
    if(file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
    }
    
    // UI Update
    uploadArea.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    
    // Reset steps
    for(let i=1; i<=5; i++) {
        const el = document.getElementById(`step-${i}`);
        if(el) el.className = 'flex items-center gap-4 text-gray-500 transition-colors duration-300';
    }
    
    try {
        const reader = new FileReader();
        const fileContent = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        // Simulate Step 1: OCR Progress
        document.getElementById('step-1').className = 'flex items-center gap-4 text-blue-400 font-bold transition-colors duration-300';
        await new Promise(r => setTimeout(r, 800));
        document.getElementById('step-1').className = 'flex items-center gap-4 text-green-400 transition-colors duration-300';
        
        // Simulate Step 2: AI Classification
        document.getElementById('step-2').className = 'flex items-center gap-4 text-blue-400 font-bold transition-colors duration-300';

        const response = await fetch('/api/process-document', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fileData: fileContent,
                mimeType: file.type,
                fileName: file.name
            })
        });

        const data = await response.json();
        
        document.getElementById('step-2').className = 'flex items-center gap-4 text-green-400 transition-colors duration-300';
        
        // Simulate Step 3: Information Extraction
        document.getElementById('step-3').className = 'flex items-center gap-4 text-blue-400 font-bold transition-colors duration-300';
        await new Promise(r => setTimeout(r, 800));
        document.getElementById('step-3').className = 'flex items-center gap-4 text-green-400 transition-colors duration-300';
        
        // Simulate Step 4: Structured Output
        document.getElementById('step-4').className = 'flex items-center gap-4 text-blue-400 font-bold transition-colors duration-300';
        await new Promise(r => setTimeout(r, 600));
        document.getElementById('step-4').className = 'flex items-center gap-4 text-green-400 transition-colors duration-300';
        
        // Simulate Step 5: Saved to Database
        document.getElementById('step-5').className = 'flex items-center gap-4 text-blue-400 font-bold transition-colors duration-300';
        await new Promise(r => setTimeout(r, 600));
        document.getElementById('step-5').className = 'flex items-center gap-4 text-green-400 transition-colors duration-300';
        
        await new Promise(r => setTimeout(r, 400));
        
        loadingIndicator.classList.add('hidden');
        uploadArea.classList.remove('hidden');

        if (data.success) {
            displayResult(data);
            saveToStorage(data);
        } else {
            alert('Error processing document: ' + data.error);
        }
    } catch (error) {
        loadingIndicator.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        alert('Upload Failed');
        console.error(error);
    }
}

function displayResult(data) {
    resultContainer.innerHTML = '';
    
    const tpl = document.getElementById('pipeline-template');
    const clone = tpl.content.cloneNode(true);
    
    clone.getElementById('tpl-filename').textContent = data.fileName;
    clone.getElementById('tpl-doctype').textContent = data.documentType;
    
    const tbody = clone.getElementById('tpl-fields');
    
    // Document Type row
    let typeRow = document.createElement('tr');
    typeRow.innerHTML = `<td class="px-5 py-3 border-b border-gray-700 text-gray-400 font-medium">Document Type</td><td class="px-5 py-3 border-b border-gray-700 font-bold text-white">${data.documentType}</td>`;
    tbody.appendChild(typeRow);

    for (const field of (data.extractedFields || [])) {
        let label = field.fieldName;
        let value = field.fieldValue;
        
        let displayValue = value;
        if (Array.isArray(value)) {
            displayValue = value.join(', ');
        } else if (typeof value === 'object' && value !== null) {
            displayValue = JSON.stringify(value);
        }
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-5 py-3 border-b border-gray-700 text-gray-400 font-medium">${label}</td>
            <td class="px-5 py-3 border-b border-gray-700 font-bold text-white break-words">${displayValue}</td>
        `;
        tbody.appendChild(tr);
    }
    
    if (data.confidenceScore) {
        const confRow = document.createElement('tr');
        confRow.innerHTML = `
            <td class="px-5 py-3 border-b border-gray-700 text-gray-400 font-medium">Confidence Score</td>
            <td class="px-5 py-3 border-b border-gray-700 font-bold text-green-400">${data.confidenceScore}</td>
        `;
        tbody.appendChild(confRow);
    }

    resultContainer.appendChild(clone);
    lucide.createIcons();
}

function saveToStorage(data) {
    const docs = JSON.parse(localStorage.getItem('documents') || '[]');
    docs.push({
        name: data.fileName,
        category: data.documentType,
        status: 'PROCESSED',
        date: new Date().toISOString().split('T')[0],
        keywords: (data.keywords || []).join(', '),
        confidence: data.confidenceScore || '98%'
    });
    localStorage.setItem('documents', JSON.stringify(docs));
    
    const stats = JSON.parse(localStorage.getItem('doc_stats') || '{"total":0,"processed":0}');
    stats.total++;
    stats.processed++;
    localStorage.setItem('doc_stats', JSON.stringify(stats));
}
