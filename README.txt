Chronicle of Wars - website in 6 files
=======================================
Keep all files in the SAME folder and open index.html in a browser
(needs an internet connection for the map library).

1. index.html                                  page structure (home page + battles page)
2. styles.css                                  all styling (includes the background image)
3. data-ancient-and-medieval.js                starter battles, India, Punic Wars, Alexander,
                                               Greco-Persian Wars, Roman Empire
4. data-world-war-2-and-asia.js                WWII Eastern and Western Fronts,
                                               Sino-Japanese War, Pacific War
5. data-napoleonic-and-american-revolution.js  Napoleonic Wars, American Revolutionary War
6. app.js                                      all behaviour: map, filters, wars list, buttons

To add battles: put new add('Country', R(...)) lines at the end of one of the data files.
Load order in index.html must stay: data files first, app.js last.
Note: the live claude.ai page is a single combined file; these 6 files contain the same code.
