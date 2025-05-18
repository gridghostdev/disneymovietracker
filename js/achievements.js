const ACHIEVEMENTS = {
    // Progress-based achievements
    progress: [
        {
            id: 'first-wish',
            title: 'First Wish',
            description: 'Log your first film.',
            icon: '🌟',
            requirement: (watchedMovies) => watchedMovies.length >= 1
        },
        {
            id: 'mouseketeer',
            title: 'Mouseketeer',
            description: 'Log 5 films.',
            icon: '🐭',
            requirement: (watchedMovies) => watchedMovies.length >= 5
        },
        {
            id: 'magic-carpet-ride',
            title: 'Magic Carpet Ride',
            description: 'Log 10 films.',
            icon: '🧞',
            requirement: (watchedMovies) => watchedMovies.length >= 10
        },
        {
            id: 'sorcerers-apprentice',
            title: 'Sorcerer\'s Apprentice',
            description: 'Log 25 films.',
            icon: '🧙‍♂️',
            requirement: (watchedMovies) => watchedMovies.length >= 25
        },
        {
            id: 'animators-vault',
            title: 'Animator\'s Vault',
            description: 'Log 50 films.',
            icon: '📝',
            requirement: (watchedMovies) => watchedMovies.length >= 50
        },
        {
            id: 'true-disney-fan',
            title: 'True Disney Fan',
            description: 'Log 100 films.',
            icon: '🎭',
            requirement: (watchedMovies) => watchedMovies.length >= 100
        },
        {
            id: '100-years-of-wonder',
            title: '100 Years of Wonder',
            description: 'Log every single Disney & Pixar animated film.',
            icon: '🏆',
            requirement: (watchedMovies) => watchedMovies.length >= ALL_FILMS.length
        }
    ],

    // Era-specific achievements
    eras: [
        {
            id: 'golden-age-graduate',
            title: 'Golden Age Graduate',
            description: 'Watch all Golden Age films.',
            icon: '✨',
            requirement: (watchedMovies) => {
                const goldenAgeFilms = ALL_FILMS.filter(film => film.era === 'golden');
                return goldenAgeFilms.every(film => watchedMovies.includes(film.id));
            }
        },
        {
            id: 'silver-screen-dreamer',
            title: 'Silver Screen Dreamer',
            description: 'Complete the Silver Age.',
            icon: '🥈',
            requirement: (watchedMovies) => {
                const silverAgeFilms = ALL_FILMS.filter(film => film.era === 'silver');
                return silverAgeFilms.every(film => watchedMovies.includes(film.id));
            }
        },
        {
            id: 'bronze-age-believer',
            title: 'Bronze Age Believer',
            description: 'Watch all Bronze Age films.',
            icon: '🥉',
            requirement: (watchedMovies) => {
                const bronzeAgeFilms = ALL_FILMS.filter(film => film.era === 'bronze');
                return bronzeAgeFilms.every(film => watchedMovies.includes(film.id));
            }
        },
        {
            id: 'renaissance-royalty',
            title: 'Renaissance Royalty',
            description: 'Complete the Disney Renaissance.',
            icon: '👑',
            requirement: (watchedMovies) => {
                const renaissanceFilms = ALL_FILMS.filter(film => film.era === 'renaissance');
                return renaissanceFilms.every(film => watchedMovies.includes(film.id));
            }
        },
        {
            id: 'experimental-explorer',
            title: 'Experimental Explorer',
            description: 'Watch all films from the Post-Renaissance era.',
            icon: '🔍',
            requirement: (watchedMovies) => {
                const postRenaissanceFilms = ALL_FILMS.filter(film => film.era === 'postRenaissance');
                return postRenaissanceFilms.every(film => watchedMovies.includes(film.id));
            }
        },
        {
            id: 'revival-completionist',
            title: 'Revival Completionist',
            description: 'Log all Revival-era films.',
            icon: '🌱',
            requirement: (watchedMovies) => {
                const revivalFilms = ALL_FILMS.filter(film => film.era === 'revival');
                return revivalFilms.every(film => watchedMovies.includes(film.id));
            }
        },
        {
            id: 'pixar-pioneer',
            title: 'Pixar Pioneer',
            description: 'Watch all Pixar films.',
            icon: '🚀',
            requirement: (watchedMovies) => {
                const pixarFilms = ALL_FILMS.filter(film => film.studio === 'pixar');
                return pixarFilms.every(film => watchedMovies.includes(film.id));
            }
        },
        {
            id: "golden_age_expert",
            title: "Golden Age Expert",
            description: "Watch all Golden Age Disney films (1937-1942).",
            icon: "👑",
            category: "Era Mastery",
            condition: (watchedMovies, allMovies) => {
                const goldenAgeMovies = allMovies.filter(movie => movie.era === "golden");
                const watchedGoldenAge = watchedMovies.filter(movie => movie.era === "golden");
                return watchedGoldenAge.length === goldenAgeMovies.length && goldenAgeMovies.length > 0;
            }
        },
        {
            id: "renaissance_connoisseur",
            title: "Renaissance Connoisseur",
            description: "Watch all Renaissance Disney films (1989-1999).",
            icon: "🎨",
            category: "Era Mastery",
            condition: (watchedMovies, allMovies) => {
                const renaissanceMovies = allMovies.filter(movie => movie.era === "renaissance");
                const watchedRenaissance = watchedMovies.filter(movie => movie.era === "renaissance");
                return watchedRenaissance.length === renaissanceMovies.length && renaissanceMovies.length > 0;
            }
        },
        {
            id: "time_traveler",
            title: "Time Traveler",
            description: "Watch at least one film from each Disney era.",
            icon: "⏰",
            category: "Era Mastery",
            condition: (watchedMovies) => {
                const eras = ["golden", "wartime", "silver", "bronze", "renaissance", "postRenaissance", "revival"];
                return eras.every(era => watchedMovies.some(movie => movie.era === era));
            }
        }
    ],

    // Genre-based achievements
    genres: [
        {
            id: 'villain-vibes',
            title: 'Villain Vibes',
            description: 'Watch 10 movies with iconic villains.',
            icon: '😈',
            // This is just a sample - you would need to define which films have iconic villains
            requirement: (watchedMovies) => {
                const villainsFilms = [1, 2, 4, 13, 14, 16, 17, 30, 31, 32, 34, 35, 36, 40, 53, 55, 56, 59];
                const watchCount = villainsFilms.filter(id => watchedMovies.includes(id)).length;
                return watchCount >= 10;
            }
        },
        {
            id: 'tearjerker-titan',
            title: 'Tearjerker Titan',
            description: 'Watch the 5 saddest Pixar films.',
            icon: '😢',
            requirement: (watchedMovies) => {
                const tearjerkerFilms = [110, 111, 115, 119, 123]; // Up, Toy Story 3, Inside Out, Coco, Soul
                return tearjerkerFilms.every(id => watchedMovies.includes(id));
            }
        },
        {
            id: 'royalty-rundown',
            title: 'Royalty Rundown',
            description: 'Watch 10 Disney princess films.',
            icon: '👸',
            // Define films with royalty/princesses
            requirement: (watchedMovies) => {
                const princessFilms = [1, 12, 13, 16, 30, 32, 33, 36, 49, 50, 53, 56, 59, 60];
                const watchCount = princessFilms.filter(id => watchedMovies.includes(id)).length;
                return watchCount >= 10;
            }
        },
        {
            id: "princess_parade",
            title: "Princess Parade",
            description: "Watch all Disney Princess films.",
            icon: "👸",
            category: "Themed Collections",
            condition: (watchedMovies, allMovies) => {
                const princessMovies = ["Snow White and the Seven Dwarfs", "Cinderella", "Sleeping Beauty", 
                                      "The Little Mermaid", "Beauty and the Beast", "Aladdin", "Pocahontas",
                                      "Mulan", "The Princess and the Frog", "Tangled", "Brave", "Frozen", "Moana"];
                return princessMovies.every(title => 
                    watchedMovies.some(movie => movie.title.includes(title)));
            }
        },
        {
            id: "animal_kingdom",
            title: "Animal Kingdom",
            description: "Watch 10 films featuring animal protagonists.",
            icon: "🐾",
            category: "Themed Collections",
            condition: (watchedMovies) => {
                const animalMovies = ["Dumbo", "Bambi", "Lady and the Tramp", "101 Dalmatians", 
                                     "The Jungle Book", "The Aristocats", "Robin Hood", "The Lion King", 
                                     "A Bug's Life", "Dinosaur", "Finding Nemo", "Chicken Little", 
                                     "Ratatouille", "Bolt", "The Princess and the Frog", "Zootopia", 
                                     "Finding Dory"];
                return watchedMovies.filter(movie => 
                    animalMovies.some(title => movie.title.includes(title))).length >= 10;
            }
        },
        {
            id: "villain_enthusiast",
            title: "Villain Enthusiast",
            description: "Watch 8 films with iconic Disney villains.",
            icon: "💀",
            category: "Themed Collections",
            condition: (watchedMovies) => {
                const villainMovies = ["Snow White", "Sleeping Beauty", "The Little Mermaid", 
                                      "Beauty and the Beast", "Aladdin", "The Lion King", 
                                      "Hercules", "Mulan", "The Emperor's New Groove", "The Princess and the Frog",
                                      "Tangled", "Wreck-It Ralph"];
                return watchedMovies.filter(movie => 
                    villainMovies.some(title => movie.title.includes(title))).length >= 8;
            }
        }
    ],

    // Setting-based achievements
    settings: [
        {
            id: 'under-the-sea',
            title: 'Under the Sea',
            description: 'Watch all ocean-set films.',
            icon: '🐠',
            requirement: (watchedMovies) => {
                const oceanFilms = [28, 56, 105, 117]; // Little Mermaid, Moana, Finding Nemo, Finding Dory
                return oceanFilms.every(id => watchedMovies.includes(id));
            }
        },
        {
            id: 'jungle-explorer',
            title: 'Jungle Explorer',
            description: 'Watch 5 jungle-themed films.',
            icon: '🌴',
            requirement: (watchedMovies) => {
                const jungleFilms = [5, 19, 36, 44, 109]; // Bambi, Jungle Book, Tarzan, Brother Bear, Up (partially)
                const watchCount = jungleFilms.filter(id => watchedMovies.includes(id)).length;
                return watchCount >= 5;
            }
        }
    ],

    // Challenge achievements
    challenges: [
        {
            id: 'double-feature',
            title: 'Double Feature',
            description: 'Watch two films back-to-back in one day.',
            icon: '🍿',
            // This needs special tracking logic with timestamps
            special: true,
            requirement: (watchedMovies, achievementData) => {
                if (!achievementData) return false;
                return achievementData.doubleFeatureCompleted || false;
            }
        },
        {
            id: "weekend_warrior",
            title: "Weekend Warrior",
            description: "Watch 5 films in a single weekend.",
            icon: "📅",
            category: "Viewing Habits",
            // This achievement would need custom tracking in your watchHistory data
            condition: () => false // Placeholder - implement custom logic
        },
        {
            id: "night_owl",
            title: "Night Owl",
            description: "Watch a Disney film after midnight.",
            icon: "🌙",
            category: "Viewing Habits",
            // This achievement would need custom tracking in your watchHistory data
            condition: () => false // Placeholder - implement custom logic
        },
        {
            id: "marathon_master",
            title: "Marathon Master",
            description: "Watch 3 films back-to-back in a single day.",
            icon: "⏩",
            category: "Viewing Habits",
            // This achievement would need custom tracking in your watchHistory data  
            condition: () => false // Placeholder - implement custom logic
        },
        {
            id: 'holiday-spirit',
            title: 'Holiday Spirit',
            description: 'Watch a Disney film on Christmas Day or New Year\'s Day.',
            icon: '🎄',
            special: true,
            requirement: (watchedMovies, achievementData) => {
                if (!achievementData?.watchDates) return false;
                return achievementData.watchDates.some(date => {
                    const d = new Date(date);
                    return (d.getMonth() === 11 && d.getDate() === 25) || // Christmas
                           (d.getMonth() === 0 && d.getDate() === 1);     // New Year's
                });
            }
        },
        {
            id: 'global-viewer',
            title: 'Global Viewer',
            description: 'Watch movies set in 5 different continents.',
            icon: '🌍',
            requirement: (watchedMovies) => {
                const continents = {
                    'Europe': [1, 12, 31],      // Snow White, Cinderella, Beauty and the Beast
                    'Asia': [36, 41, 53],       // Mulan, Big Hero 6, Raya
                    'Africa': [33, 44],         // Lion King, Brother Bear
                    'Americas': [32, 49],       // Pocahontas, Princess and the Frog
                    'Oceania': [56]             // Moana
                };
                return Object.values(continents).filter(movies => 
                    movies.some(id => watchedMovies.includes(id))
                ).length >= 5;
            }
        }
    ],

    // Thematic achievements
    thematic: [
        {
            id: 'beyond-infinity',
            title: 'Beyond Infinity',
            description: 'Watch all Toy Story movies.',
            icon: '🚀',
            requirement: (watchedMovies) => {
                const toyStoryFilms = [101, 103, 111, 121]; // Toy Story 1-4
                return toyStoryFilms.every(id => watchedMovies.includes(id));
            }
        },
        {
            id: 'musical-maestro',
            title: 'Musical Maestro',
            description: 'Watch 10 Disney musical films featuring iconic Sherman Brothers or Alan Menken songs.',
            icon: '🎵',
            requirement: (watchedMovies) => {
                const musicalFilms = [1, 4, 12, 13, 16, 28, 31, 32, 33, 36, 49, 50, 53];
                return musicalFilms.filter(id => watchedMovies.includes(id)).length >= 10;
            }
        },
        {
            id: 'animation-evolution',
            title: 'Animation Evolution',
            description: 'Watch films from all major animation styles: Traditional, Digital, and CG.',
            icon: '🎨',
            requirement: (watchedMovies) => {
                const traditional = [1, 2, 3, 4, 5].some(id => watchedMovies.includes(id));
                const digital = [31, 32, 33].some(id => watchedMovies.includes(id));
                const cg = [101, 102, 103].some(id => watchedMovies.includes(id));
                return traditional && digital && cg;
            }
        },
        {
            id: 'disney-decades',
            title: 'Disney Decades',
            description: 'Watch at least one film from each decade (1930s-2020s).',
            icon: '📅',
            requirement: (watchedMovies, achievementData) => {
                const decades = {
                    '1930s': [1],
                    '1940s': [2, 3, 4, 5],
                    '1950s': [12, 13],
                    '1960s': [14, 15, 16],
                    '1970s': [17, 18, 19],
                    '1980s': [20, 21, 22],
                    '1990s': [28, 29, 30, 31, 32],
                    '2000s': [40, 41, 42, 43],
                    '2010s': [50, 51, 52, 53],
                    '2020s': [60, 61, 62]
                };
                return Object.values(decades).every(ids => 
                    ids.some(id => watchedMovies.includes(id))
                );
            }
        }
    ],

    // Studio Achievements
    studio: [
        {
            id: "pixar_perfect",
            title: "Pixar Perfect",
            description: "Watch all Pixar films.",
            icon: "💡",
            category: "Studio Mastery",
            condition: (watchedMovies, allMovies) => {
                const pixarMovies = allMovies.filter(movie => movie.studio === "pixar");
                const watchedPixar = watchedMovies.filter(movie => movie.studio === "pixar");
                return watchedPixar.length === pixarMovies.length && pixarMovies.length > 0;
            }
        },
        {
            id: "studio_balance",
            title: "Perfectly Balanced",
            description: "Watch an equal number of Disney and Pixar films (minimum 10 each).",
            icon: "⚖️",
            category: "Studio Mastery",
            condition: (watchedMovies) => {
                const disneyCount = watchedMovies.filter(movie => movie.studio === "disney").length;
                const pixarCount = watchedMovies.filter(movie => movie.studio === "pixar").length;
                return disneyCount === pixarCount && disneyCount >= 10;
            }
        }
    ],

    // Special Achievements
    special: [
        {
            id: "oscar_collector",
            title: "Oscar Collector",
            description: "Watch all Oscar-winning Best Animated Feature films.",
            icon: "🏆",
            category: "Special Achievements",
            condition: (watchedMovies) => {
                const oscarWinners = ["Shrek", "Spirited Away", "Finding Nemo", "The Incredibles", 
                                     "Wallace & Gromit", "Happy Feet", "Ratatouille", "WALL-E", 
                                     "Up", "Toy Story 3", "Rango", "Brave", "Frozen", "Big Hero 6",
                                     "Inside Out", "Zootopia", "Coco", "Spider-Verse", "Toy Story 4", 
                                     "Soul", "Encanto"];
                // This needs customization based on your data model
                return oscarWinners.filter(title => 
                    watchedMovies.some(movie => movie.title.includes(title))).length >= 15;
            }
        },
        {
            id: "completionist",
            title: "Animation Completionist",
            description: "Watch every Disney and Pixar animated feature film.",
            icon: "🏆",
            category: "Special Achievements",
            condition: (watchedMovies, allMovies) => {
                return watchedMovies.length === allMovies.length && allMovies.length > 0;
            }
        },
        {
            id: 'five-star-fan',
            title: 'Five Star Fan',
            description: 'Rate 10 different movies with 5 stars.',
            icon: '⭐',
            requirement: (watchedMovies, achievementData, storageManager) => {
                const ratings = storageManager.getRatings();
                return Object.values(ratings)
                    .filter(r => r.rating === 5)
                    .length >= 10;
            }
        },
        {
            id: 'disney-historian',
            title: 'Disney Historian',
            description: 'Watch films spanning 80+ years of Disney animation history.',
            icon: '📚',
            requirement: (watchedMovies) => {
                const watchedYears = ALL_FILMS
                    .filter(film => watchedMovies.includes(film.id))
                    .map(film => film.year);
                const minYear = Math.min(...watchedYears);
                const maxYear = Math.max(...watchedYears);
                return maxYear - minYear >= 80;
            }
        }
    ]
};

// Helper function to get all achievements as a flat array
function getAllAchievements() {
    return Object.values(ACHIEVEMENTS).flat();
}
