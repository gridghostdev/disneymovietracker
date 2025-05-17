// Disney and Pixar film data with era classifications
const DISNEY_FILMS = [
    // Golden Age (1937-1942)
    { id: 1, title: "Snow White and the Seven Dwarfs", year: 1937, era: "golden", tmdbId: 408 },
    { id: 2, title: "Pinocchio", year: 1940, era: "golden", tmdbId: 10895 },
    { id: 3, title: "Fantasia", year: 1940, era: "golden", tmdbId: 756 },
    { id: 4, title: "Dumbo", year: 1941, era: "golden", tmdbId: 9988 },
    { id: 5, title: "Bambi", year: 1942, era: "golden", tmdbId: 3170 },
    
    // Wartime Era (1943-1949)
    { id: 6, title: "Saludos Amigos", year: 1943, era: "wartime", tmdbId: 13931 },
    { id: 7, title: "The Three Caballeros", year: 1945, era: "wartime", tmdbId: 13932 },
    { id: 8, title: "Make Mine Music", year: 1946, era: "wartime", tmdbId: 13933 },
    { id: 9, title: "Fun and Fancy Free", year: 1947, era: "wartime", tmdbId: 13934 },
    { id: 10, title: "Melody Time", year: 1948, era: "wartime", tmdbId: 13935 },
    { id: 11, title: "The Adventures of Ichabod and Mr. Toad", year: 1949, era: "wartime", tmdbId: 13936 },
    
    // Silver Age (1950-1959)
    { id: 12, title: "Cinderella", year: 1950, era: "silver", tmdbId: 11224 },
    { id: 13, title: "Alice in Wonderland", year: 1951, era: "silver", tmdbId: 863 },
    { id: 14, title: "Peter Pan", year: 1953, era: "silver", tmdbId: 10693 },
    { id: 15, title: "Lady and the Tramp", year: 1955, era: "silver", tmdbId: 10201 },
    { id: 16, title: "Sleeping Beauty", year: 1959, era: "silver", tmdbId: 9479 },
    
    // Bronze Age (1960-1988)
    { id: 17, title: "101 Dalmatians", year: 1961, era: "bronze", tmdbId: 12230 },
    { id: 18, title: "The Sword in the Stone", year: 1963, era: "bronze", tmdbId: 12225 },
    { id: 19, title: "The Jungle Book", year: 1967, era: "bronze", tmdbId: 9325 },
    { id: 20, title: "The Aristocats", year: 1970, era: "bronze", tmdbId: 12092 },
    { id: 21, title: "Robin Hood", year: 1973, era: "bronze", tmdbId: 11886 },
    { id: 22, title: "The Many Adventures of Winnie the Pooh", year: 1977, era: "bronze", tmdbId: 250480 },
    { id: 23, title: "The Rescuers", year: 1977, era: "bronze", tmdbId: 10009 },
    { id: 24, title: "The Fox and the Hound", year: 1981, era: "bronze", tmdbId: 11798 },
    { id: 25, title: "The Black Cauldron", year: 1985, era: "bronze", tmdbId: 11800 },
    { id: 26, title: "The Great Mouse Detective", year: 1986, era: "bronze", tmdbId: 11704 },
    { id: 27, title: "Oliver & Company", year: 1988, era: "bronze", tmdbId: 12233 },
    
    // Renaissance (1989-1999)
    { id: 28, title: "The Little Mermaid", year: 1989, era: "renaissance", tmdbId: 10144 },
    { id: 29, title: "The Rescuers Down Under", year: 1990, era: "renaissance", tmdbId: 10010 },
    { id: 30, title: "Beauty and the Beast", year: 1991, era: "renaissance", tmdbId: 10020 },
    { id: 31, title: "Aladdin", year: 1992, era: "renaissance", tmdbId: 812 },
    { id: 32, title: "The Lion King", year: 1994, era: "renaissance", tmdbId: 8587 },
    { id: 33, title: "Pocahontas", year: 1995, era: "renaissance", tmdbId: 10530 },
    { id: 34, title: "The Hunchback of Notre Dame", year: 1996, era: "renaissance", tmdbId: 10545 },
    { id: 35, title: "Hercules", year: 1997, era: "renaissance", tmdbId: 11970 },
    { id: 36, title: "Mulan", year: 1998, era: "renaissance", tmdbId: 10674 },
    { id: 37, title: "Tarzan", year: 1999, era: "renaissance", tmdbId: 37135 },
    
    // Post-Renaissance (2000-2009)
    { id: 38, title: "Fantasia 2000", year: 2000, era: "postRenaissance", tmdbId: 9928 },
    { id: 39, title: "Dinosaur", year: 2000, era: "postRenaissance", tmdbId: 10567 },
    { id: 40, title: "The Emperor's New Groove", year: 2000, era: "postRenaissance", tmdbId: 11688 },
    { id: 41, title: "Atlantis: The Lost Empire", year: 2001, era: "postRenaissance", tmdbId: 10638 },
    { id: 42, title: "Lilo & Stitch", year: 2002, era: "postRenaissance", tmdbId: 11544 },
    { id: 43, title: "Treasure Planet", year: 2002, era: "postRenaissance", tmdbId: 9016 },
    { id: 44, title: "Brother Bear", year: 2003, era: "postRenaissance", tmdbId: 36401 },
    { id: 45, title: "Home on the Range", year: 2004, era: "postRenaissance", tmdbId: 13583 },
    { id: 46, title: "Chicken Little", year: 2005, era: "postRenaissance", tmdbId: 9973 },
    { id: 47, title: "Meet the Robinsons", year: 2007, era: "postRenaissance", tmdbId: 1267 },
    { id: 48, title: "Bolt", year: 2008, era: "postRenaissance", tmdbId: 13053 },
    { id: 49, title: "The Princess and the Frog", year: 2009, era: "postRenaissance", tmdbId: 10198 },
    
    // Revival Era (2010-Present)
    { id: 50, title: "Tangled", year: 2010, era: "revival", tmdbId: 38757 },
    { id: 51, title: "Winnie the Pooh", year: 2011, era: "revival", tmdbId: 51162 },
    { id: 52, title: "Wreck-It Ralph", year: 2012, era: "revival", tmdbId: 82690 },
    { id: 53, title: "Frozen", year: 2013, era: "revival", tmdbId: 109445 },
    { id: 54, title: "Big Hero 6", year: 2014, era: "revival", tmdbId: 177572 },
    { id: 55, title: "Zootopia", year: 2016, era: "revival", tmdbId: 269149 },
    { id: 56, title: "Moana", year: 2016, era: "revival", tmdbId: 277834 },
    { id: 57, title: "Ralph Breaks the Internet", year: 2018, era: "revival", tmdbId: 404368 },
    { id: 58, title: "Frozen II", year: 2019, era: "revival", tmdbId: 330457 },
    { id: 59, title: "Raya and the Last Dragon", year: 2021, era: "revival", tmdbId: 527774 },
    { id: 60, title: "Encanto", year: 2021, era: "revival", tmdbId: 568124 },
    { id: 61, title: "Strange World", year: 2022, era: "revival", tmdbId: 877269 },
    { id: 62, title: "Wish", year: 2023, era: "revival", tmdbId: 1022789 }
];

// Add studio tag to Disney films
DISNEY_FILMS.forEach(film => film.studio = "disney");

const PIXAR_FILMS = [
    // Renaissance Era (1989-1999)
    { id: 101, title: "Toy Story", year: 1995, era: "renaissance", tmdbId: 862, studio: "pixar" },
    { id: 102, title: "A Bug's Life", year: 1998, era: "renaissance", tmdbId: 9487, studio: "pixar" },
    { id: 103, title: "Toy Story 2", year: 1999, era: "renaissance", tmdbId: 863, studio: "pixar" },
    
    // Post-Renaissance (2000-2009)
    { id: 104, title: "Monsters, Inc.", year: 2001, era: "postRenaissance", tmdbId: 585, studio: "pixar" },
    { id: 105, title: "Finding Nemo", year: 2003, era: "postRenaissance", tmdbId: 12, studio: "pixar" },
    { id: 106, title: "The Incredibles", year: 2004, era: "postRenaissance", tmdbId: 9806, studio: "pixar" },
    { id: 107, title: "Cars", year: 2006, era: "postRenaissance", tmdbId: 920, studio: "pixar" },
    { id: 108, title: "Ratatouille", year: 2007, era: "postRenaissance", tmdbId: 2062, studio: "pixar" },
    { id: 109, title: "WALL·E", year: 2008, era: "postRenaissance", tmdbId: 10681, studio: "pixar" },
    { id: 110, title: "Up", year: 2009, era: "postRenaissance", tmdbId: 14160, studio: "pixar" },
    
    // Revival Era (2010-Present)
    { id: 111, title: "Toy Story 3", year: 2010, era: "revival", tmdbId: 10193, studio: "pixar" },
    { id: 112, title: "Cars 2", year: 2011, era: "revival", tmdbId: 49013, studio: "pixar" },
    { id: 113, title: "Brave", year: 2012, era: "revival", tmdbId: 62177, studio: "pixar" },
    { id: 114, title: "Monsters University", year: 2013, era: "revival", tmdbId: 62211, studio: "pixar" },
    { id: 115, title: "Inside Out", year: 2015, era: "revival", tmdbId: 150540, studio: "pixar" },
    { id: 116, title: "The Good Dinosaur", year: 2015, era: "revival", tmdbId: 105864, studio: "pixar" },
    { id: 117, title: "Finding Dory", year: 2016, era: "revival", tmdbId: 127380, studio: "pixar" },
    { id: 118, title: "Cars 3", year: 2017, era: "revival", tmdbId: 260514, studio: "pixar" },
    { id: 119, title: "Coco", year: 2017, era: "revival", tmdbId: 354912, studio: "pixar" },
    { id: 120, title: "Incredibles 2", year: 2018, era: "revival", tmdbId: 260513, studio: "pixar" },
    { id: 121, title: "Toy Story 4", year: 2019, era: "revival", tmdbId: 301528, studio: "pixar" },
    { id: 122, title: "Onward", year: 2020, era: "revival", tmdbId: 508439, studio: "pixar" },
    { id: 123, title: "Soul", year: 2020, era: "revival", tmdbId: 508442, studio: "pixar" },
    { id: 124, title: "Luca", year: 2021, era: "revival", tmdbId: 508943, studio: "pixar" },
    { id: 125, title: "Turning Red", year: 2022, era: "revival", tmdbId: 508947, studio: "pixar" },
    { id: 126, title: "Lightyear", year: 2022, era: "revival", tmdbId: 718789, studio: "pixar" },
    { id: 127, title: "Elemental", year: 2023, era: "revival", tmdbId: 976573, studio: "pixar" },
    { id: 128, title: "Inside Out 2", year: 2024, era: "revival", tmdbId: 1033508, studio: "pixar" }
];

// Combine both arrays
const ALL_FILMS = [...DISNEY_FILMS, ...PIXAR_FILMS];

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
