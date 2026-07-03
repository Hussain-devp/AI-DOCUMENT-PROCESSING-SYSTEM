const fs = require('fs');

const sidebarHtml = `
    <!-- Sidebar -->
    <aside class="w-64 border-r h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-20" style="background-color: #111827; border-color: #374151;">
        <div class="h-20 flex items-center px-6 border-b" style="border-color: #374151;">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg border border-white/10">
                    <i data-lucide="cpu" class="text-white w-5 h-5"></i>
                </div>
                <span class="text-xl font-bold tracking-tight text-white">DOC<span class="text-blue-500">AI</span></span>
            </div>
        </div>
        
        <div class="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            <a href="index.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
                <i data-lucide="home" class="w-5 h-5 group-hover:text-blue-400 transition-colors"></i>
                <span class="font-medium text-sm">Home</span>
            </a>
            <div class="pt-4 pb-2 px-4">
                <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Main Menu</p>
            </div>
            <a href="dashboard.html" id="nav-dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
                <i data-lucide="layout-dashboard" class="w-5 h-5 group-hover:text-blue-400 transition-colors"></i>
                <span class="font-medium text-sm">Dashboard</span>
            </a>
            <a href="upload.html" id="nav-upload" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
                <i data-lucide="upload-cloud" class="w-5 h-5 group-hover:text-blue-400 transition-colors"></i>
                <span class="font-medium text-sm">Upload</span>
            </a>
            <a href="search.html" id="nav-search" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
                <i data-lucide="search" class="w-5 h-5 group-hover:text-blue-400 transition-colors"></i>
                <span class="font-medium text-sm">Search</span>
            </a>
            <a href="analytics.html" id="nav-analytics" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
                <i data-lucide="pie-chart" class="w-5 h-5 group-hover:text-blue-400 transition-colors"></i>
                <span class="font-medium text-sm">Analytics</span>
            </a>
            <a href="reports.html" id="nav-reports" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
                <i data-lucide="file-bar-chart" class="w-5 h-5 group-hover:text-blue-400 transition-colors"></i>
                <span class="font-medium text-sm">Reports</span>
            </a>
        </div>
        
        <div class="p-4 border-t" style="border-color: #374151;">
            <div class="rounded-xl p-3 border border-gray-800 bg-gray-900/50 backdrop-blur-md">
                <div class="flex items-center gap-2 mb-1">
                    <div class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span class="text-xs font-semibold text-gray-300">System Online</span>
                </div>
                <p class="text-[10px] text-gray-500 font-mono">Engine: Gemini 1.5 Pro</p>
            </div>
        </div>
    </aside>
`;

const headerHtml = (title) => `
    <header class="h-20 backdrop-blur-xl border-b flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm transition-all" style="background-color: rgba(11, 17, 32, 0.7); border-color: #374151;">
        <h1 class="text-2xl font-bold text-white tracking-tight">${title}</h1>
        <div class="flex items-center gap-6">
            <div class="relative group">
                <i data-lucide="search" class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors"></i>
                <input type="text" placeholder="Global search..." class="pl-11 pr-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all w-64 text-white placeholder-gray-500 bg-gray-800/80 border border-gray-700 hover:border-gray-600">
            </div>
            <div class="flex items-center gap-3 border-l pl-6 border-gray-800">
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-900/20 border border-white/10">
                    A
                </div>
                <div class="hidden md:block">
                    <p class="text-sm font-semibold text-white">Admin User</p>
                    <p class="text-xs text-gray-400 font-medium">Enterprise Admin</p>
                </div>
            </div>
        </div>
    </header>
`;

const baseTemplate = (title, navId, content) => `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - DOCAI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { 
            font-family: 'Inter', sans-serif; 
            background-color: #0B1120; 
            color: #FFFFFF; 
        }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .glass-card {
            background-color: #111827;
            border: 1px solid #374151;
            border-radius: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .glass-card:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0B1120; 
        }
        ::-webkit-scrollbar-thumb {
            background: #374151; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #4B5563; 
        }
        
        /* Nav active state */
        .nav-active {
            background-color: rgba(59, 130, 246, 0.1);
            color: #FFFFFF !important;
            border: 1px solid rgba(59, 130, 246, 0.2);
        }
        .nav-active i {
            color: #3B82F6 !important;
        }
    </style>
</head>
<body class="flex min-h-screen">
    ${sidebarHtml}
    
    <main class="ml-64 flex-1 flex flex-col min-h-screen relative overflow-hidden">
        <!-- Subtle background glowing orbs -->
        <div class="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>
        <div class="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none"></div>
        
        ${headerHtml(title)}
        
        <div class="flex-1 p-8 overflow-y-auto relative z-10">
            ${content}
        </div>
    </main>
    
    <script>
        // Set active nav
        const activeNav = document.getElementById('${navId}');
        if(activeNav) {
            activeNav.classList.add('nav-active');
            activeNav.classList.remove('text-gray-400', 'hover:bg-white/5');
        }
        lucide.createIcons();
    </script>
    <!-- Page specific scripts -->
    ${navId === 'nav-dashboard' ? '<script src="js/dashboard.js"></script>' : ''}
    ${navId === 'nav-upload' ? '<script src="js/upload.js"></script>' : ''}
    ${navId === 'nav-search' ? '<script src="js/search.js"></script>' : ''}
    ${navId === 'nav-analytics' ? '<script src="js/analytics.js"></script>' : ''}
</body>
</html>
`;

// INDEX / HOME PAGE (NEW)
const indexContent = `
<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Document Processing System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { 
            font-family: 'Inter', sans-serif; 
            background-color: #0B1120; 
            color: #FFFFFF; 
            overflow-x: hidden;
        }
        .hero-gradient-text {
            background: linear-gradient(135deg, #3B82F6, #8B5CF6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
        }
        .typing-effect {
            overflow: hidden;
            border-right: .15em solid #3B82F6;
            white-space: nowrap;
            margin: 0 auto;
            animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
        }
        @keyframes typing {
            from { width: 0 }
            to { width: 100% }
        }
        @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: #3B82F6; }
        }
        .glass-nav {
            background: rgba(11, 17, 32, 0.7);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(55, 65, 81, 0.5);
        }
        .feature-card {
            background-color: #111827;
            border: 1px solid #374151;
            transition: all 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-5px);
            border-color: #3B82F6;
            box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.2);
        }
    </style>
</head>
<body class="min-h-screen flex flex-col relative">
    
    <!-- Background elements -->
    <div class="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none"></div>
    <div class="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none"></div>

    <!-- Navbar -->
    <nav class="fixed w-full z-50 glass-nav">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-white/20 relative group">
                        <i data-lucide="cpu" class="text-white w-5 h-5 group-hover:scale-110 transition-transform duration-300"></i>
                    </div>
                    <span class="text-xl font-bold tracking-tight text-white">DOC<span class="text-blue-500">AI</span></span>
                </div>
                <div class="hidden md:block">
                    <div class="flex items-center space-x-8">
                        <a href="#features" class="text-gray-300 hover:text-white text-sm font-medium transition-colors">Features</a>
                        <a href="#how-it-works" class="text-gray-300 hover:text-white text-sm font-medium transition-colors">How it Works</a>
                        <a href="#tech" class="text-gray-300 hover:text-white text-sm font-medium transition-colors">Technology</a>
                        <a href="dashboard.html" class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center gap-2 border border-blue-400/30">
                            Dashboard <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <main class="flex-grow pt-32 pb-20 px-6 lg:px-8 flex flex-col items-center justify-center text-center relative z-10 min-h-screen">
        <div class="max-w-5xl mx-auto w-full flex flex-col items-center">
            
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 text-blue-300 font-medium text-sm mb-8 border border-blue-700/50 shadow-[0_0_10px_rgba(59,130,246,0.2)] backdrop-blur-md">
                <span class="flex h-2 w-2 relative">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Enterprise AI Engine v2.0 Active
            </div>
            
            <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                <span class="block text-white mb-2">AI Document</span>
                <span class="block text-white mb-2">Processing System</span>
                <span class="hero-gradient-text typing-effect inline-block mt-2 text-4xl md:text-5xl">Transform Unstructured to Structured</span>
            </h1>
            
            <p class="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Automate your data extraction workflow with state-of-the-art OCR and Generative AI. Process invoices, resumes, medical reports, and certificates with pinpoint accuracy.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-md">
                <a href="upload.html" class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 border border-white/10">
                    <i data-lucide="zap" class="w-5 h-5"></i> Get Started
                </a>
                <a href="#how-it-works" class="flex-1 bg-[#111827] text-white border border-gray-700 hover:border-gray-500 hover:bg-gray-800 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2">
                    <i data-lucide="info" class="w-5 h-5"></i> Learn More
                </a>
            </div>
        </div>

        <!-- Animated Floating Dashboard Graphic -->
        <div class="mt-24 relative w-full max-w-5xl animate-float">
            <div class="bg-[#111827] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border border-gray-700 shadow-2xl relative overflow-hidden">
                
                <!-- Glowing line top -->
                <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                
                <div class="flex-1 bg-[#0B1120] rounded-xl p-6 border border-gray-800 shadow-inner relative overflow-hidden group w-full">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10"></div>
                    <div class="flex items-center gap-3 mb-6 text-gray-400 border-b border-gray-800 pb-4">
                        <i data-lucide="file-text" class="w-6 h-6 text-blue-400"></i>
                        <span class="font-mono text-sm text-gray-300">Invoice_TechCorp.pdf</span>
                    </div>
                    <div class="space-y-4 opacity-70 group-hover:opacity-100 transition-opacity">
                        <div class="h-4 bg-gray-800 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-800 rounded w-1/2"></div>
                        <div class="h-4 bg-gray-800 rounded w-5/6"></div>
                        <div class="h-4 bg-gray-800 rounded w-2/3"></div>
                        <div class="h-4 bg-gray-800 rounded w-4/5"></div>
                    </div>
                </div>
                
                <div class="flex flex-col items-center gap-3 text-blue-500 relative z-10">
                    <div class="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] relative">
                        <div class="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
                        <i data-lucide="cpu" class="w-8 h-8 text-blue-400"></i>
                    </div>
                    <div class="flex flex-col items-center animate-pulse">
                        <i data-lucide="chevron-right" class="w-6 h-6 -mb-3"></i>
                        <i data-lucide="chevron-right" class="w-6 h-6 -mb-3 opacity-75"></i>
                        <i data-lucide="chevron-right" class="w-6 h-6 opacity-50"></i>
                    </div>
                </div>
                
                <div class="flex-1 bg-[#0B1120] rounded-xl p-6 shadow-xl border border-gray-800 w-full relative">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full pointer-events-none"></div>
                    <div class="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
                        <div class="flex items-center gap-2 text-green-400 font-medium">
                            <i data-lucide="check-circle-2" class="w-5 h-5"></i> Structured Data
                        </div>
                        <span class="text-xs font-mono bg-blue-900/30 text-blue-400 px-2 py-1 rounded border border-blue-800/50">JSON</span>
                    </div>
                    <div class="space-y-3 font-mono text-sm">
                        <div class="flex justify-between items-center bg-gray-900/50 p-2 rounded">
                            <span class="text-gray-500">Document Type</span>
                            <span class="font-semibold text-blue-400">Invoice</span>
                        </div>
                        <div class="flex justify-between items-center bg-gray-900/50 p-2 rounded">
                            <span class="text-gray-500">Vendor</span>
                            <span class="font-semibold text-white">TechCorp Inc.</span>
                        </div>
                        <div class="flex justify-between items-center bg-gray-900/50 p-2 rounded">
                            <span class="text-gray-500">Total Amount</span>
                            <span class="font-semibold text-white">$4,250.00</span>
                        </div>
                        <div class="flex justify-between items-center p-2 rounded border border-green-900/50 bg-green-900/10">
                            <span class="text-gray-500">Confidence Score</span>
                            <span class="font-bold text-green-400">99.8%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    <!-- How it Works Section -->
    <section id="how-it-works" class="py-20 relative z-10 bg-[#111827] border-y border-gray-800">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Processing Pipeline</h2>
                <p class="text-gray-400 max-w-2xl mx-auto">How unstructured documents are transformed into clean, usable data.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                <!-- Connecting line for desktop -->
                <div class="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gray-800 -translate-y-1/2 z-0"></div>
                
                <div class="relative z-10 flex flex-col items-center text-center group">
                    <div class="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 group-hover:border-blue-500 group-hover:bg-blue-900/20 transition-all">
                        <i data-lucide="file-up" class="w-7 h-7 text-gray-400 group-hover:text-blue-400"></i>
                    </div>
                    <h3 class="text-white font-semibold mb-2">Upload</h3>
                    <p class="text-xs text-gray-500">Unstructured Document</p>
                </div>
                
                <div class="relative z-10 flex flex-col items-center text-center group">
                    <div class="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 group-hover:border-purple-500 group-hover:bg-purple-900/20 transition-all">
                        <i data-lucide="scan-text" class="w-7 h-7 text-gray-400 group-hover:text-purple-400"></i>
                    </div>
                    <h3 class="text-white font-semibold mb-2">OCR</h3>
                    <p class="text-xs text-gray-500">Text Extraction</p>
                </div>
                
                <div class="relative z-10 flex flex-col items-center text-center group">
                    <div class="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 group-hover:border-blue-500 group-hover:bg-blue-900/20 transition-all">
                        <i data-lucide="network" class="w-7 h-7 text-gray-400 group-hover:text-blue-400"></i>
                    </div>
                    <h3 class="text-white font-semibold mb-2">AI Engine</h3>
                    <p class="text-xs text-gray-500">Classification</p>
                </div>
                
                <div class="relative z-10 flex flex-col items-center text-center group">
                    <div class="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 group-hover:border-emerald-500 group-hover:bg-emerald-900/20 transition-all">
                        <i data-lucide="binary" class="w-7 h-7 text-gray-400 group-hover:text-emerald-400"></i>
                    </div>
                    <h3 class="text-white font-semibold mb-2">Extraction</h3>
                    <p class="text-xs text-gray-500">Key-Value Parsing</p>
                </div>
                
                <div class="relative z-10 flex flex-col items-center text-center group">
                    <div class="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 group-hover:border-blue-500 group-hover:bg-blue-900/20 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <i data-lucide="database" class="w-7 h-7 text-blue-400"></i>
                    </div>
                    <h3 class="text-white font-semibold mb-2 text-blue-400">Structured Data</h3>
                    <p class="text-xs text-gray-500">Ready for Analytics</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#0B1120] py-10 border-t border-gray-800 text-center relative z-10">
        <div class="flex items-center justify-center gap-2 mb-4">
            <i data-lucide="cpu" class="w-5 h-5 text-blue-500"></i>
            <span class="text-lg font-bold tracking-tight text-white">DOC<span class="text-blue-500">AI</span></span>
        </div>
        <p class="text-gray-500 text-sm">Enterprise Document Processing System</p>
    </footer>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>
`;
fs.writeFileSync('index.html', indexContent);

// DASHBOARD
const dashboardContent = `
    <div class="flex justify-between items-end mb-8">
        <div>
            <h2 class="text-3xl font-bold text-white tracking-tight mb-2">Dashboard Overview</h2>
            <p class="text-gray-400 text-sm">Real-time metrics for your document processing pipeline.</p>
        </div>
        <a href="upload.html" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-lg flex items-center gap-2">
            <i data-lucide="upload" class="w-4 h-4"></i> Upload Document
        </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="glass-card p-6 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Documents</p>
                    <h3 class="text-4xl font-bold text-white mt-2 font-mono tracking-tight" id="total-uploaded">0</h3>
                </div>
                <div class="p-3 bg-gray-800/80 rounded-xl text-blue-400 border border-gray-700 shadow-sm"><i data-lucide="files" class="w-6 h-6"></i></div>
            </div>
            <div class="flex items-center text-sm relative z-10"><span class="text-green-400 flex items-center font-medium"><i data-lucide="trending-up" class="w-4 h-4 mr-1"></i> 12%</span><span class="text-gray-500 ml-2">vs last month</span></div>
        </div>
        
        <div class="glass-card p-6 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Processed Today</p>
                    <h3 class="text-4xl font-bold text-white mt-2 font-mono tracking-tight" id="today-processed">24</h3>
                </div>
                <div class="p-3 bg-gray-800/80 rounded-xl text-purple-400 border border-gray-700 shadow-sm"><i data-lucide="activity" class="w-6 h-6"></i></div>
            </div>
            <div class="flex items-center text-sm relative z-10"><span class="text-green-400 flex items-center font-medium"><i data-lucide="trending-up" class="w-4 h-4 mr-1"></i> 5%</span><span class="text-gray-500 ml-2">vs yesterday</span></div>
        </div>
        
        <div class="glass-card p-6 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">AI Accuracy</p>
                    <h3 class="text-4xl font-bold text-white mt-2 font-mono tracking-tight">99.4%</h3>
                </div>
                <div class="p-3 bg-gray-800/80 rounded-xl text-green-400 border border-gray-700 shadow-sm"><i data-lucide="target" class="w-6 h-6"></i></div>
            </div>
            <div class="w-full bg-gray-800 rounded-full h-1.5 mt-4 relative z-10 border border-gray-700 overflow-hidden"><div class="bg-green-500 h-1.5 rounded-full relative" style="width: 99.4%"><div class="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-sm"></div></div></div>
        </div>
        
        <div class="glass-card p-6 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Avg Processing Time</p>
                    <h3 class="text-4xl font-bold text-white mt-2 font-mono tracking-tight">1.2s</h3>
                </div>
                <div class="p-3 bg-gray-800/80 rounded-xl text-orange-400 border border-gray-700 shadow-sm"><i data-lucide="zap" class="w-6 h-6"></i></div>
            </div>
            <div class="flex items-center text-sm relative z-10"><span class="text-green-400 flex items-center font-medium"><i data-lucide="trending-down" class="w-4 h-4 mr-1"></i> -0.2s</span><span class="text-gray-500 ml-2">improvement</span></div>
        </div>
    </div>
    
    <div class="glass-card overflow-hidden">
        <div class="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
            <h2 class="text-lg font-bold text-white">Recent Extractions</h2>
            <button class="text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors">View All Archive</button>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-[#0B1120] text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800">
                        <th class="px-6 py-4 font-bold">Document Name</th>
                        <th class="px-6 py-4 font-bold">Category</th>
                        <th class="px-6 py-4 font-bold">Processed Date</th>
                        <th class="px-6 py-4 font-bold">Confidence</th>
                        <th class="px-6 py-4 font-bold">Status</th>
                    </tr>
                </thead>
                <tbody id="recent-documents-list" class="divide-y divide-gray-800 bg-[#111827] text-sm">
                    <!-- Data populated by JS -->
                </tbody>
            </table>
        </div>
    </div>
`;
fs.writeFileSync('dashboard.html', baseTemplate('Dashboard', 'nav-dashboard', dashboardContent));

// UPLOAD
const uploadContent = `
    <div class="mb-8">
        <h2 class="text-3xl font-bold text-white tracking-tight mb-2">Process New Document</h2>
        <p class="text-gray-400 text-sm">Upload unstructured files. The AI will extract only the critical structured data.</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
        <div class="w-full lg:w-1/2 flex flex-col gap-6">
            <div class="glass-card p-10 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-700 hover:border-blue-500 hover:bg-blue-900/10 transition-all cursor-pointer group" id="upload-area" style="min-h: 420px;">
                <div class="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-900/40 transition-all border border-gray-700 group-hover:border-blue-500/50 shadow-xl">
                    <i data-lucide="cloud-upload" class="w-12 h-12 text-gray-400 group-hover:text-blue-400"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Drag & Drop Documents</h3>
                <p class="text-gray-500 mb-8 text-sm">Supports PDF, JPG, PNG, WEBP (Max 10MB)</p>
                <input type="file" id="file-input" class="hidden" accept=".pdf,.png,.jpg,.jpeg,.webp">
                <button class="bg-gray-800 border border-gray-700 shadow-md text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 hover:border-gray-600 transition-colors" onclick="document.getElementById('file-input').click()">
                    Browse Files
                </button>
            </div>
            
            <div id="loading-indicator" class="hidden glass-card p-8 flex flex-col items-center justify-center text-center" style="min-h: 420px;">
                <div class="relative w-24 h-24 mb-8">
                    <div class="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                    <div class="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    <div class="absolute inset-0 flex items-center justify-center text-blue-400">
                        <i data-lucide="cpu" class="w-8 h-8 animate-pulse"></i>
                    </div>
                </div>
                <h4 class="text-xl font-bold text-white mb-2">Processing Document</h4>
                <p class="text-sm text-gray-400 max-w-xs mx-auto mb-8">DOCAI Engine is performing OCR, classifying content, and extracting structured entities...</p>
                <div class="w-full max-w-xs bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-700">
                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full w-2/3 animate-[pulse_2s_ease-in-out_infinite]"></div>
                </div>
            </div>
        </div>
        
        <div class="w-full lg:w-1/2">
            <div class="glass-card h-full flex flex-col overflow-hidden relative">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div class="p-6 border-b border-gray-800 bg-[#0B1120]/50">
                    <div class="flex items-center gap-2">
                        <i data-lucide="database" class="w-5 h-5 text-blue-400"></i>
                        <h2 class="text-lg font-bold text-white">Structured Output</h2>
                    </div>
                    <p class="text-xs text-gray-500 mt-1 font-mono">STRICT_JSON_MODE: ENABLED</p>
                </div>
                <div class="p-6 flex-1 bg-[#0B1120]/80 overflow-y-auto" id="result-container">
                    <div class="h-full flex flex-col items-center justify-center text-gray-600">
                        <i data-lucide="braces" class="w-16 h-16 mb-4 opacity-30"></i>
                        <p class="font-mono text-sm">Awaiting document payload...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Template for processing pipeline -->
    <template id="pipeline-template">
        <div class="mb-8 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
            <div class="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 w-full max-w-md mx-auto">
                <span class="flex flex-col items-center gap-1"><i data-lucide="file-up" class="w-4 h-4"></i>Doc</span>
                <i data-lucide="arrow-right" class="w-3 h-3 text-gray-600"></i>
                <span class="flex flex-col items-center gap-1 text-purple-400"><i data-lucide="scan-text" class="w-4 h-4"></i>OCR</span>
                <i data-lucide="arrow-right" class="w-3 h-3 text-gray-600"></i>
                <span class="flex flex-col items-center gap-1 text-blue-400"><i data-lucide="cpu" class="w-4 h-4"></i>AI</span>
                <i data-lucide="arrow-right" class="w-3 h-3 text-gray-600"></i>
                <span class="flex flex-col items-center gap-1 text-green-400"><i data-lucide="database" class="w-4 h-4"></i>Data</span>
            </div>
        </div>
        
        <div class="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden shadow-lg">
            <div class="bg-gray-800/80 px-5 py-4 border-b border-gray-700 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <i data-lucide="file-text" class="w-5 h-5 text-gray-400"></i>
                    <span class="font-mono text-sm text-white" id="tpl-filename">filename.pdf</span>
                </div>
                <span class="px-3 py-1 rounded-lg text-xs font-bold tracking-wide bg-blue-900/50 text-blue-400 border border-blue-800/50 shadow-inner uppercase" id="tpl-doctype">TYPE</span>
            </div>
            <div class="p-0">
                <table class="w-full text-sm text-left">
                    <thead class="bg-[#0B1120]">
                        <tr>
                            <th class="px-5 py-3 font-semibold text-gray-400 border-b border-gray-700 w-1/3">Key Field</th>
                            <th class="px-5 py-3 font-semibold text-gray-400 border-b border-gray-700">Extracted Value</th>
                        </tr>
                    </thead>
                    <tbody id="tpl-fields" class="divide-y divide-gray-800 bg-[#111827]">
                        <!-- Fields go here -->
                    </tbody>
                </table>
            </div>
        </div>
    </template>
`;
fs.writeFileSync('upload.html', baseTemplate('Document Processing', 'nav-upload', uploadContent));

// SEARCH
const searchContent = `
    <div class="mb-6">
        <h2 class="text-3xl font-bold text-white tracking-tight mb-2">Search Archive</h2>
        <p class="text-gray-400 text-sm">Query extracted structured data across all processed documents.</p>
    </div>

    <div class="glass-card p-6 mb-8 bg-gradient-to-br from-[#111827] to-[#1a2333]">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
            <div class="space-y-2 md:col-span-2">
                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Search Query</label>
                <div class="relative group">
                    <i data-lucide="search" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors"></i>
                    <input type="text" id="search-input" placeholder="Search Names, Vendors, Dates, Keywords..." class="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-600 shadow-inner">
                </div>
            </div>
            <div class="space-y-2">
                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Category Filter</label>
                <select id="category-filter" class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none shadow-inner">
                    <option value="">All Categories</option>
                    <option value="Invoice">Invoice</option>
                    <option value="Receipt">Receipt</option>
                    <option value="Resume">Resume</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Medical Report">Medical Report</option>
                </select>
            </div>
            <div>
                <button id="search-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-900/50 flex items-center justify-center gap-2 border border-blue-500/50">
                    <i data-lucide="filter" class="w-4 h-4"></i> Apply Filters
                </button>
            </div>
        </div>
    </div>
    
    <div class="glass-card overflow-hidden border border-gray-700">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-[#0B1120] text-gray-500 text-xs uppercase tracking-wider border-b border-gray-700">
                        <th class="px-6 py-5 font-bold">Document Info</th>
                        <th class="px-6 py-5 font-bold">Category</th>
                        <th class="px-6 py-5 font-bold">Extracted Keywords</th>
                        <th class="px-6 py-5 font-bold">Date Processed</th>
                        <th class="px-6 py-5 font-bold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody id="search-results-list" class="divide-y divide-gray-800 bg-[#111827] text-sm">
                    <!-- Populated by JS -->
                </tbody>
            </table>
        </div>
    </div>
`;
fs.writeFileSync('search.html', baseTemplate('Search Archive', 'nav-search', searchContent));

// ANALYTICS
const analyticsContent = `
    <div class="mb-8">
        <h2 class="text-3xl font-bold text-white tracking-tight mb-2">System Analytics</h2>
        <p class="text-gray-400 text-sm">Performance metrics and data distribution insights.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="glass-card p-8 flex flex-col">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-lg font-bold text-white">AI Processing Trend</h2>
                <span class="text-xs font-mono bg-gray-800 px-2 py-1 rounded text-gray-400 border border-gray-700">Last 6 Months</span>
            </div>
            <div class="flex-1 flex items-end justify-between gap-3 h-56 px-2 relative">
                <!-- Mock Bar Chart -->
                <div class="w-full bg-blue-900/30 hover:bg-blue-600 border border-blue-500/30 rounded-t-md h-[70%] transition-all relative group cursor-pointer"><div class="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs font-bold bg-gray-800 text-white py-1 px-2 rounded shadow-lg border border-gray-700 pointer-events-none transition-opacity">70%</div></div>
                <div class="w-full bg-blue-900/40 hover:bg-blue-500 border border-blue-500/30 rounded-t-md h-[78%] transition-all relative group cursor-pointer"><div class="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs font-bold bg-gray-800 text-white py-1 px-2 rounded shadow-lg border border-gray-700 pointer-events-none transition-opacity">78%</div></div>
                <div class="w-full bg-blue-900/50 hover:bg-blue-500 border border-blue-500/30 rounded-t-md h-[85%] transition-all relative group cursor-pointer"><div class="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs font-bold bg-gray-800 text-white py-1 px-2 rounded shadow-lg border border-gray-700 pointer-events-none transition-opacity">85%</div></div>
                <div class="w-full bg-blue-800/60 hover:bg-blue-500 border border-blue-500/40 rounded-t-md h-[92%] transition-all relative group cursor-pointer"><div class="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs font-bold bg-gray-800 text-white py-1 px-2 rounded shadow-lg border border-gray-700 pointer-events-none transition-opacity">92%</div></div>
                <div class="w-full bg-blue-700/80 hover:bg-blue-400 border border-blue-500/50 rounded-t-md h-[97%] transition-all relative group cursor-pointer"><div class="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs font-bold bg-gray-800 text-white py-1 px-2 rounded shadow-lg border border-gray-700 pointer-events-none transition-opacity">97%</div></div>
                <div class="w-full bg-blue-600 hover:bg-blue-400 border border-blue-400/80 rounded-t-md h-[99%] transition-all relative group cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.5)]"><div class="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs font-bold bg-gray-800 text-white py-1 px-2 rounded shadow-lg border border-gray-700 pointer-events-none transition-opacity">99.4%</div></div>
                
                <div class="absolute bottom-0 left-0 w-full h-px bg-gray-700"></div>
            </div>
            <div class="flex justify-between text-xs font-semibold text-gray-500 mt-3 px-2">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span class="text-white">Jun</span>
            </div>
        </div>
        
        <div class="glass-card p-8">
            <h2 class="text-lg font-bold text-white mb-8">Category Distribution</h2>
            <div class="flex flex-col md:flex-row items-center justify-center gap-10 h-56">
                <!-- Mock Pie Chart -->
                <div class="relative w-48 h-48 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]" style="background: conic-gradient(#3B82F6 0% 45%, #8B5CF6 45% 70%, #22C55E 70% 88%, #F59E0B 88% 100%);">
                    <div class="absolute inset-6 bg-[#111827] rounded-full flex flex-col items-center justify-center border border-gray-800 shadow-inner">
                        <span class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total</span>
                        <span class="text-2xl font-bold text-white font-mono">4,821</span>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex items-center gap-3"><div class="w-4 h-4 rounded bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div><span class="text-sm font-medium text-gray-300">Invoices (45%)</span></div>
                    <div class="flex items-center gap-3"><div class="w-4 h-4 rounded bg-purple-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]"></div><span class="text-sm font-medium text-gray-300">Resumes (25%)</span></div>
                    <div class="flex items-center gap-3"><div class="w-4 h-4 rounded bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div><span class="text-sm font-medium text-gray-300">Receipts (18%)</span></div>
                    <div class="flex items-center gap-3"><div class="w-4 h-4 rounded bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div><span class="text-sm font-medium text-gray-300">Others (12%)</span></div>
                </div>
            </div>
        </div>
    </div>
`;
fs.writeFileSync('analytics.html', baseTemplate('AI Analytics', 'nav-analytics', analyticsContent));

// REPORTS
const reportsContent = `
    <div class="mb-8">
        <h2 class="text-3xl font-bold text-white tracking-tight mb-2">Report Generation</h2>
        <p class="text-gray-400 text-sm">Export structured datasets and analytical summaries.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="glass-card p-8 flex flex-col gap-5 border-t-4 border-t-blue-500 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>
            <div class="w-14 h-14 bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-400 mb-2 border border-blue-800/50 shadow-lg">
                <i data-lucide="file-spreadsheet" class="w-7 h-7"></i>
            </div>
            <div>
                <h3 class="text-xl font-bold text-white mb-2">Monthly Extraction</h3>
                <p class="text-sm text-gray-400 leading-relaxed">Generate a structured PDF report containing all extracted data from documents processed this month.</p>
            </div>
            <button class="mt-auto w-full bg-gray-800 border border-gray-700 text-white hover:bg-blue-600 hover:border-blue-500 px-4 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <i data-lucide="download" class="w-4 h-4"></i> Download PDF
            </button>
        </div>
        
        <div class="glass-card p-8 flex flex-col gap-5 border-t-4 border-t-purple-500 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full group-hover:bg-purple-500/10 transition-colors pointer-events-none"></div>
            <div class="w-14 h-14 bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-400 mb-2 border border-purple-800/50 shadow-lg">
                <i data-lucide="pie-chart" class="w-7 h-7"></i>
            </div>
            <div>
                <h3 class="text-xl font-bold text-white mb-2">AI Accuracy Metrics</h3>
                <p class="text-sm text-gray-400 leading-relaxed">Detailed report on OCR confidence scores and AI extraction accuracy across different document categories.</p>
            </div>
            <button class="mt-auto w-full bg-gray-800 border border-gray-700 text-white hover:bg-purple-600 hover:border-purple-500 px-4 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <i data-lucide="download" class="w-4 h-4"></i> Download PDF
            </button>
        </div>
        
        <div class="glass-card p-8 flex flex-col gap-5 border-t-4 border-t-green-500 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full group-hover:bg-green-500/10 transition-colors pointer-events-none"></div>
            <div class="w-14 h-14 bg-green-900/30 rounded-xl flex items-center justify-center text-green-400 mb-2 border border-green-800/50 shadow-lg">
                <i data-lucide="building-2" class="w-7 h-7"></i>
            </div>
            <div>
                <h3 class="text-xl font-bold text-white mb-2">Financial Data Export</h3>
                <p class="text-sm text-gray-400 leading-relaxed">Export structured data strictly from Invoices and Receipts for ERP system integration.</p>
            </div>
            <button class="mt-auto w-full bg-gray-800 border border-gray-700 text-white hover:bg-green-600 hover:border-green-500 px-4 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <i data-lucide="file-down" class="w-4 h-4"></i> Export CSV
            </button>
        </div>
    </div>
`;
fs.writeFileSync('reports.html', baseTemplate('Report Generator', 'nav-reports', reportsContent));

