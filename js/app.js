// Main application logic
class MarketPulseApp {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        // Initialize Lucide icons
        lucide.createIcons();

        // Set up navigation
        this.setupNavigation();
        
        // Load initial page content
        this.loadPageContent(this.currentPage);
        
        // Set up mobile menu
        this.setupMobileMenu();
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(item.dataset.page);
            });
        });
    }

    setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    handleNavigation(pageName) {
        // Update active nav item
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(nav => {
            nav.classList.remove('active', 'bg-gradient-to-r', 'from-blue-900', 'to-blue-800', 'text-white', 'shadow-lg');
            nav.classList.add('text-slate-700');
        });
        
        const activeNav = document.querySelector(`[data-page="${pageName}"]`);
        activeNav.classList.remove('text-slate-700');
        activeNav.classList.add('active', 'bg-gradient-to-r', 'from-blue-900', 'to-blue-800', 'text-white', 'shadow-lg');
        
        // Show corresponding page
        this.showPage(pageName);
        
        // Close mobile sidebar
        document.querySelector('.sidebar').classList.remove('open');
        
        // Load page content
        this.loadPageContent(pageName);
    }

    showPage(pageName) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(`${pageName}-page`);
        targetPage.classList.remove('hidden');
        targetPage.classList.add('active');
        
        this.currentPage = pageName;
    }

    loadPageContent(pageName) {
        switch(pageName) {
            case 'home':
                this.renderHomePage();
                break;
            case 'portfolio':
                this.renderPortfolioPage();
                break;
            case 'watchlist':
                this.renderWatchlistPage();
                break;
            case 'settings':
                this.renderSettingsPage();
                break;
        }
        
        // Refresh icons for dynamically created content
        setTimeout(() => lucide.createIcons(), 100);
    }

    renderHomePage() {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = Components.newsCards();
    }

    renderPortfolioPage() {
        const summaryContainer = document.getElementById('portfolio-summary');
        const holdingsContainer = document.getElementById('portfolio-holdings');
        
        summaryContainer.innerHTML = Components.portfolioSummary();
        holdingsContainer.innerHTML = Components.portfolioHoldings();
    }

    renderWatchlistPage() {
        const watchlistContainer = document.getElementById('watchlist-container');
        watchlistContainer.innerHTML = Components.watchlistCards();
    }

    renderSettingsPage() {
        const settingsContainer = document.getElementById('settings-content');
        settingsContainer.innerHTML = Components.settingsContent();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MarketPulseApp();
});
