const CONFIG = {
    tmdb: {
        // Credentials moved to credentials.js (gitignored)
        apiKey: typeof CREDENTIALS !== 'undefined' ? CREDENTIALS.tmdb.apiKey : '',
        accessToken: typeof CREDENTIALS !== 'undefined' ? CREDENTIALS.tmdb.accessToken : '',
        baseUrl: 'https://api.themoviedb.org/3',
        imageBaseUrl: 'https://image.tmdb.org/t/p/'
    },
    eras: {
        golden: {
            name: "Golden Age",
            years: "1937-1942",
            color: "era-golden"
        },
        wartime: {
            name: "Wartime Era",
            years: "1943-1949",
            color: "era-wartime"
        },
        silver: {
            name: "Silver Age",
            years: "1950-1959",
            color: "era-silver"
        },
        bronze: {
            name: "Bronze Age",
            years: "1960-1988",
            color: "era-bronze"
        },
        renaissance: {
            name: "Renaissance",
            years: "1989-1999",
            color: "era-renaissance"
        },
        postRenaissance: {
            name: "Post-Renaissance",
            years: "2000-2009",
            color: "era-postRenaissance"
        },
        revival: {
            name: "Revival Era",
            years: "2010-Present",
            color: "era-revival"
        }
    },
    localStorageKey: 'disneyTrackerData'
};
