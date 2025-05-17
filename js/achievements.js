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
            icon: "fa-crown",
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
            icon: "fa-palette",
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
            icon: "fa-clock-rotate-left",
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
            icon: "fa-crown",
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
            icon: "fa-paw",
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
            icon: "fa-skull",
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
            icon: "fa-calendar-day",
            category: "Viewing Habits",
            // This achievement would need custom tracking in your watchHistory data
            condition: () => false // Placeholder - implement custom logic
        },
        {
            id: "night_owl",
            title: "Night Owl",
            description: "Watch a Disney film after midnight.",
            icon: "fa-moon",
            category: "Viewing Habits",
            // This achievement would need custom tracking in your watchHistory data
            condition: () => false // Placeholder - implement custom logic
        },
        {
            id: "marathon_master",
            title: "Marathon Master",
            description: "Watch 3 films back-to-back in a single day.",
            icon: "fa-forward-fast",
            category: "Viewing Habits",
            // This achievement would need custom tracking in your watchHistory data  
            condition: () => false // Placeholder - implement custom logic
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
        }
    ],

    // Studio Achievements
    studio: [
        {
            id: "pixar_perfect",
            title: "Pixar Perfect",
            description: "Watch all Pixar films.",
            icon: "fa-lamp",
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
            icon: "fa-scale-balanced",
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
            icon: "fa-award",
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
            icon: "fa-trophy",
            category: "Special Achievements",
            condition: (watchedMovies, allMovies) => {
                return watchedMovies.length === allMovies.length && allMovies.length > 0;
            }
        }
    ]
};

// Helper function to get all achievements as a flat array
function getAllAchievements() {
    return Object.values(ACHIEVEMENTS).flat();
}
