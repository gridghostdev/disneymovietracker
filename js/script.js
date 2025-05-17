document.addEventListener('DOMContentLoaded', function() {
    // Initialize storage manager
    StorageManager.init();
    
    // Get watched movies from storage
    let watchedMovies = StorageManager.getWatchedMovies();
    
    // Create chronological merged array for display purposes
    const CHRONOLOGICAL_FILMS = [...ALL_FILMS].sort((a, b) => {
        // First sort by year
        if (a.year !== b.year) {
            return a.year - b.year;
        }
        
        // If same year, sort Disney before Pixar
        if (a.studio !== b.studio) {
            return a.studio === 'disney' ? -1 : 1;
        }
        
        // If same year and studio, sort by ID
        return a.id - b.id;
    });
    
    // Render movies
    renderMovies(CHRONOLOGICAL_FILMS);
    updateProgressStats();
    updateAchievementStats();
    
    // Event listeners
    document.getElementById('filter-btn').addEventListener('click', function() {
        document.querySelector('.filter-dropdown').classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const filterBtn = document.getElementById('filter-btn');
        const filterDropdown = document.querySelector('.filter-dropdown');
        
        if (!event.target.closest('#filter-btn') && !event.target.closest('.filter-dropdown')) {
            filterDropdown.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.era-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.era-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const era = this.getAttribute('data-era');
            if (era === 'all') {
                // Reset all era checkboxes to checked when "All Films" is clicked
                document.querySelectorAll('.era-filter').forEach(checkbox => {
                    checkbox.checked = true;
                });
                applyFilters();
            } else if (era === 'more') {
                // Show dropdown with all eras
                document.querySelector('.filter-dropdown').classList.add('active');
            } else {
                // Set only this era checkbox to checked
                document.querySelectorAll('.era-filter').forEach(checkbox => {
                    checkbox.checked = checkbox.value === era;
                });
                applyFilters();
            }
        });
    });
    
    document.getElementById('search-input').addEventListener('keyup', function() {
        applyFilters();
    });
    
    document.querySelectorAll('.studio-filter, .era-filter, .status-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    document.querySelector('.view-achievements-btn').addEventListener('click', function() {
        showAchievementsModal();
    });
    
    document.getElementById('grid-view').addEventListener('click', function() {
        document.getElementById('list-view').classList.remove('active');
        this.classList.add('active');
        document.getElementById('movies-container').className = 'grid-view';
    });
    
    document.getElementById('list-view').addEventListener('click', function() {
        document.getElementById('grid-view').classList.remove('active');
        this.classList.add('active');
        document.getElementById('movies-container').className = 'list-view';
    });
    
    // Functions
    function renderMovies(movies) {
        const container = document.getElementById('movies-container');
        container.innerHTML = '';
        
        // Update results count
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            resultsCount.textContent = movies.length;
        }
        
        movies.forEach(movie => {
            const isWatched = watchedMovies.includes(movie.id);
            
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.setAttribute('data-id', movie.id);
            movieCard.setAttribute('data-era', movie.era);
            movieCard.setAttribute('data-studio', movie.studio);
            movieCard.setAttribute('data-status', isWatched ? 'watched' : 'unwatched');
            
            movieCard.innerHTML = `
                <div class="movie-poster">
                    <div class="studio-badge ${movie.studio}-badge">${movie.studio}</div>
                    <img src="https://image.tmdb.org/t/p/w500/placeholder.jpg" alt="${movie.title}" 
                         data-tmdb-id="${movie.tmdbId}">
                    <div class="watch-status ${isWatched ? 'watched' : ''}" data-id="${movie.id}">
                        <i class="fas ${isWatched ? 'fa-check-circle' : 'fa-circle'}"></i>
                    </div>
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-year">${movie.year}</p>
                    <div class="movie-meta">
                        <span class="movie-era era-${movie.era}">
                            ${CONFIG.eras[movie.era].name}
                        </span>
                    </div>
                </div>
            `;
            
            container.appendChild(movieCard);
            
            // Fetch movie poster from TMDB
            fetchMoviePoster(movie.tmdbId, movieCard.querySelector('img'), movie.title, movie.year);
            
            // Add click event to movie card for details
            movieCard.addEventListener('click', function(e) {
                if (!e.target.closest('.watch-status')) {
                    showMovieDetails(movie);
                }
            });
            
            // Add click event to watch status toggle
            const watchStatusEl = movieCard.querySelector('.watch-status');
            watchStatusEl.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleWatchStatus(movie.id, this);
            });
        });
    }
    
    function toggleWatchStatus(movieId, element) {
        const isNowWatched = StorageManager.toggleMovieWatched(movieId);
        
        if (isNowWatched) {
            // Update to watched state
            element.classList.add('watched');
            element.querySelector('i').classList.remove('fa-circle');
            element.querySelector('i').classList.add('fa-check-circle');
            
            // Check for achievements
            const newAchievements = achievementManager.registerMovieWatched(movieId, StorageManager.getWatchedMovies());
            if (newAchievements.length > 0) {
                showAchievementToast(newAchievements[0]);
            }
        } else {
            // Update to unwatched state
            element.classList.remove('watched');
            element.querySelector('i').classList.remove('fa-check-circle');
            element.querySelector('i').classList.add('fa-circle');
        }
        
        // Update card status attribute
        element.closest('.movie-card').setAttribute('data-status', isNowWatched ? 'watched' : 'unwatched');
        
        // Update progress stats
        updateProgressStats();
        
        // Update achievement stats
        updateAchievementStats();
    }
    
    function updateProgressStats() {
        // Get latest watched movies
        watchedMovies = StorageManager.getWatchedMovies();
        
        // Update total counts
        document.getElementById('total-count').textContent = ALL_FILMS.length;
        document.getElementById('total-disney').textContent = DISNEY_FILMS.length;
        document.getElementById('total-pixar').textContent = PIXAR_FILMS.length;
        
        // Overall progress
        const watchedCount = watchedMovies.length;
        document.getElementById('watched-count').textContent = watchedCount;
        const overallProgress = Math.round((watchedCount / ALL_FILMS.length) * 100);
        updateProgressCircle('overall-progress', overallProgress);
        
        // Disney progress
        const watchedDisney = watchedMovies.filter(id => {
            const movie = ALL_FILMS.find(m => m.id === id && m.studio === "disney");
            return movie !== undefined;
        }).length;
        document.getElementById('watched-disney').textContent = watchedDisney;
        const disneyProgress = Math.round((watchedDisney / DISNEY_FILMS.length) * 100);
        updateProgressCircle('disney-progress', disneyProgress);
        
        // Pixar progress
        const watchedPixar = watchedMovies.filter(id => {
            const movie = ALL_FILMS.find(m => m.id === id && m.studio === "pixar");
            return movie !== undefined;
        }).length;
        document.getElementById('watched-pixar').textContent = watchedPixar;
        const pixarProgress = Math.round((watchedPixar / PIXAR_FILMS.length) * 100);
        updateProgressCircle('pixar-progress', pixarProgress);
    }
    
    function updateProgressCircle(id, percentage) {
        const circle = document.getElementById(id);
        circle.style.background = `conic-gradient(var(--primary-color) ${percentage}%, #e9ecef 0%)`;
        circle.querySelector('.percentage').textContent = `${percentage}%`;
    }
    
    function fetchMoviePoster(tmdbId, imgElement, title, year) {
        // Use search endpoint to find the movie by title and year
        const searchUrl = `${CONFIG.tmdb.baseUrl}/search/movie?api_key=${CONFIG.tmdb.apiKey}&query=${encodeURIComponent(title)}&year=${year}&include_adult=false`;
        
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    // Use the first result's poster path
                    if (data.results[0].poster_path) {
                        imgElement.src = `${CONFIG.tmdb.imageBaseUrl}w500${data.results[0].poster_path}`;
                    } else {
                        imgElement.src = 'img/placeholder.jpg';
                    }
                } else {
                    // If no results found, try without the year constraint
                    const fallbackSearchUrl = `${CONFIG.tmdb.baseUrl}/search/movie?api_key=${CONFIG.tmdb.apiKey}&query=${encodeURIComponent(title)}&include_adult=false`;
                    return fetch(fallbackSearchUrl)
                        .then(response => response.json())
                        .then(fallbackData => {
                            if (fallbackData.results && fallbackData.results.length > 0) {
                                if (fallbackData.results[0].poster_path) {
                                    imgElement.src = `${CONFIG.tmdb.imageBaseUrl}w500${fallbackData.results[0].poster_path}`;
                                } else {
                                    imgElement.src = 'img/placeholder.jpg';
                                }
                            } else {
                                imgElement.src = 'img/placeholder.jpg';
                            }
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching movie poster:', error);
                imgElement.src = 'img/placeholder.jpg';
            });
    }
    
    function showMovieDetails(movie) {
        const modal = document.getElementById('details-modal');
        const modalBody = modal.querySelector('.modal-body');
        
        // Show loading state
        modalBody.innerHTML = '<div class="loader"></div>';
        modal.classList.add('active');
        
        // Use search API to get movie details
        const searchUrl = `${CONFIG.tmdb.baseUrl}/search/movie?api_key=${CONFIG.tmdb.apiKey}&query=${encodeURIComponent(movie.title)}&year=${movie.year}&include_adult=false`;
        
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    // Get details using the first result's ID
                    const movieId = data.results[0].id;
                    return fetch(`${CONFIG.tmdb.baseUrl}/movie/${movieId}?api_key=${CONFIG.tmdb.apiKey}&append_to_response=credits,videos,images`)
                        .then(response => response.json());
                } else {
                    // If no results with year, try without year
                    const fallbackSearchUrl = `${CONFIG.tmdb.baseUrl}/search/movie?api_key=${CONFIG.tmdb.apiKey}&query=${encodeURIComponent(movie.title)}&include_adult=false`;
                    return fetch(fallbackSearchUrl)
                        .then(response => response.json())
                        .then(fallbackData => {
                            if (fallbackData.results && fallbackData.results.length > 0) {
                                // Get details using the first fallback result's ID
                                const movieId = fallbackData.results[0].id;
                                return fetch(`${CONFIG.tmdb.baseUrl}/movie/${movieId}?api_key=${CONFIG.tmdb.apiKey}&append_to_response=credits,videos,images`)
                                    .then(response => response.json());
                            } else {
                                // If still no results, return a placeholder object
                                return {
                                    title: movie.title,
                                    release_date: movie.year,
                                    overview: "No overview available.",
                                    poster_path: null
                                };
                            }
                        });
                }
            })
            .then(data => {
                const isWatched = watchedMovies.includes(movie.id);
                const releaseDate = data.release_date ? new Date(data.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : movie.year;
                
                modalBody.innerHTML = `
                    <div class="modal-header">
                        <h2>${movie.title} (${movie.year})</h2>
                        <div class="movie-meta">
                            <span class="movie-era era-${movie.era}">${CONFIG.eras[movie.era].name}</span>
                            <span class="studio-badge ${movie.studio}-badge">${movie.studio === 'disney' ? 'Disney' : 'Pixar'}</span>
                        </div>
                    </div>
                    <div class="modal-grid">
                        <div class="movie-detail-poster">
                            <img src="${data.poster_path ? CONFIG.tmdb.imageBaseUrl + 'w500' + data.poster_path : 'img/placeholder.jpg'}" 
                                 alt="${movie.title}">
                        </div>
                        <div class="movie-details">
                            <p>${data.overview || 'No overview available.'}</p>
                            <div class="movie-meta">
                                <p><strong>Release Date:</strong> ${releaseDate}</p>
                                <p><strong>Runtime:</strong> ${data.runtime ? data.runtime + ' minutes' : 'N/A'}</p>
                                <p><strong>Director:</strong> ${getDirector(data.credits) || 'N/A'}</p>
                                <p><strong>Rating:</strong> ${data.vote_average ? data.vote_average.toFixed(1) + '/10' : 'N/A'}</p>
                            </div>
                            <button class="watch-toggle-btn ${isWatched ? 'watched' : ''}" data-id="${movie.id}">
                                <i class="fas ${isWatched ? 'fa-check-circle' : 'fa-circle'}"></i>
                                ${isWatched ? 'Watched' : 'Mark as Watched'}
                            </button>
                        </div>
                    </div>
                `;
                
                // Add event listener to watch toggle button
                modalBody.querySelector('.watch-toggle-btn').addEventListener('click', function() {
                    const movieId = parseInt(this.getAttribute('data-id'));
                    const isCurrentlyWatched = watchedMovies.includes(movieId);
                    
                    if (isCurrentlyWatched) {
                        // Remove from watched
                        const index = watchedMovies.indexOf(movieId);
                        watchedMovies.splice(index, 1);
                        this.classList.remove('watched');
                        this.innerHTML = '<i class="fas fa-circle"></i> Mark as Watched';
                    } else {
                        // Add to watched
                        watchedMovies.push(movieId);
                        this.classList.add('watched');
                        this.innerHTML = '<i class="fas fa-check-circle"></i> Watched';
                    }
                    
                    // Update watch status on card
                    const card = document.querySelector(`.movie-card[data-id="${movieId}"]`);
                    if (card) {
                        const statusEl = card.querySelector('.watch-status');
                        if (isCurrentlyWatched) {
                            statusEl.classList.remove('watched');
                            statusEl.querySelector('i').classList.remove('fa-check-circle');
                            statusEl.querySelector('i').classList.add('fa-circle');
                        } else {
                            statusEl.classList.add('watched');
                            statusEl.querySelector('i').classList.remove('fa-circle');
                            statusEl.querySelector('i').classList.add('fa-check-circle');
                        }
                        card.setAttribute('data-status', isCurrentlyWatched ? 'unwatched' : 'watched');
                    }
                    
                    // Save to localStorage
                    localStorage.setItem(CONFIG.localStorageKey, JSON.stringify(watchedMovies));
                    
                    // Update progress stats
                    updateProgressStats();
                    
                    // Update achievement stats
                    updateAchievementStats();
                });
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                modalBody.innerHTML = '<p>Error loading movie details.</p>';
            });
    }
    
    function getDirector(credits) {
        if (!credits || !credits.crew) return null;
        
        const director = credits.crew.find(person => person.job === 'Director');
        return director ? director.name : null;
    }
    
    function applyFilters() {
        const searchQuery = document.getElementById('search-input').value.toLowerCase();
        const selectedStudios = Array.from(document.querySelectorAll('.studio-filter:checked')).map(cb => cb.value);
        const selectedEras = Array.from(document.querySelectorAll('.era-filter:checked')).map(cb => cb.value);
        const selectedStatuses = Array.from(document.querySelectorAll('.status-filter:checked')).map(cb => cb.value);
        
        // Filter movies based on selected criteria
        const filteredMovies = CHRONOLOGICAL_FILMS.filter(movie => {
            // Check if movie title matches search query
            const titleMatch = movie.title.toLowerCase().includes(searchQuery);
            
            // Check if movie studio is selected
            const studioMatch = selectedStudios.includes(movie.studio);
            
            // Check if movie era is selected
            const eraMatch = selectedEras.includes(movie.era);
            
            // Check if movie watch status is selected
            const isWatched = watchedMovies.includes(movie.id);
            const statusMatch = selectedStatuses.includes(isWatched ? 'watched' : 'unwatched');
            
            return titleMatch && studioMatch && eraMatch && statusMatch;
        });
        
        renderMovies(filteredMovies);
    }
    
    function showAchievementsModal() {
        const modal = document.getElementById('achievements-modal');
        const container = modal.querySelector('.achievements-container');
        
        // Clear existing content
        container.innerHTML = '';
        
        // Get all achievements organized by category
        const earnedAchievements = achievementManager.getAllEarnedAchievements();
        const earnedIds = earnedAchievements.map(a => a.id);
        
        // Create sections for each category
        const categories = {
            progress: { icon: '🎬', title: 'Progress Achievements' },
            eras: { icon: '🕰️', title: 'Era Achievements' },
            genres: { icon: '🎭', title: 'Genre Achievements' },
            settings: { icon: '🌍', title: 'Setting Achievements' },
            challenges: { icon: '🧠', title: 'Challenge Achievements' },
            thematic: { icon: '🎉', title: 'Thematic Achievements' }
        };
        
        // Create each category section
        for (const [catKey, catInfo] of Object.entries(categories)) {
            if (ACHIEVEMENTS[catKey] && ACHIEVEMENTS[catKey].length > 0) {
                const categorySection = document.createElement('div');
                categorySection.className = 'achievement-category';
                
                categorySection.innerHTML = `
                    <h3 class="achievement-category-title">
                        <span>${catInfo.icon}</span> ${catInfo.title}
                    </h3>
                    <div class="achievement-grid"></div>
                `;
                
                const grid = categorySection.querySelector('.achievement-grid');
                
                // Add achievements to this category
                ACHIEVEMENTS[catKey].forEach(achievement => {
                    const isEarned = earnedIds.includes(achievement.id);
                    
                    const achievementCard = document.createElement('div');
                    achievementCard.className = `achievement-item ${isEarned ? 'earned' : 'locked'}`;
                    
                    achievementCard.innerHTML = `
                        ${isEarned 
                            ? `<div class="achievement-icon">${achievement.icon}</div>`
                            : `<div class="achievement-locked-icon"><i class="fas fa-lock"></i></div>`
                        }
                        <h4 class="achievement-title">${achievement.title}</h4>
                        <p class="achievement-description">${achievement.description}</p>
                        ${isEarned ? '<div class="achievement-badge"><i class="fas fa-check"></i></div>' : ''}
                    `;
                    
                    grid.appendChild(achievementCard);
                });
                
                container.appendChild(categorySection);
            }
        }
        
        modal.classList.add('active');
    }
    
    function showAchievementToast(achievement) {
        const toast = document.getElementById('achievement-toast');
        const icon = toast.querySelector('.toast-icon');
        const title = toast.querySelector('.toast-message h4');
        const desc = toast.querySelector('.toast-message p');
        
        // Set achievement details
        icon.innerHTML = achievement.icon;
        title.textContent = `Achievement Unlocked: ${achievement.title}`;
        desc.textContent = achievement.description;
        
        // Show toast
        toast.classList.add('active');
        
        // Hide toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('active');
        }, 5000);
    }
    
    function updateAchievementStats() {
        const earnedAchievements = achievementManager.getAllEarnedAchievements();
        const totalAchievements = getAllAchievements().length;
        const percentage = Math.round((earnedAchievements.length / totalAchievements) * 100);
        
        // Update count
        document.getElementById('earned-achievements').textContent = earnedAchievements.length;
        document.getElementById('total-achievements').textContent = totalAchievements;
        
        // Update progress circle
        updateProgressCircle('achievements-progress', percentage);
    }
});
