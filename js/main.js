/**
 * Quick and dirty page to generate number conversion exercises
 */

// List of bases used in the exercise
let bases = [
    { base: "10", name: "Décimal", place: "_ _ _" },
    { base: "2", name: "Binaire", place: "_ _ _ _  _ _ _ _" },
    { base: "16", name: "Hexa", place: "_ _" },
    { base: "8", name: "Octal", place: "_ _ _" },
];

// Expected results
let results = [];

/**
 * Generate a new results array
 */
function newExercice() {
    // Read how many values have to be generated
    let howmany = document.getElementById("howmany").value * 1;

    // Create the results
    for (let i = 0; i < howmany; i++) {
        results[i] = Math.floor(Math.random() * 256);
    }

    generateHTML();
}

/**
 * Show or hide the result depending on the check box state
 * @param {Event} event Event data
 */
function showExercice(event) {
    // Generate a new exercice if none
    if (results.length == 0) {
        newExercice();
    }
    generateHTML(event.target.checked);
}

/**
 * Generate the HTML output with or without the results
 * @param {boolean} showResult Show the results or not
 */
function generateHTML(showResult) {
    let target  = document.getElementById("exercice");
    let howmany = results.length;

    // default value for showResult if undefined
    showResult = showResult || false;

    // Create the HTML representation
    let html = "<table>\n";

    // Add table header
    html += "<tr>";
    for (let j = 0; j < bases.length; j++) {
        html += "<th>" + bases[j].base + "</th>";
    }
    html += "</tr>\n";

    // Add conversions
    let display = 0;
    for (let i = 0; i < howmany; i++) {

        html += "<tr>";
        display = 0;
        for (let j = 0; j < bases.length; j++) {
            if (display == i % 4) {
                html += "<td><span class=\"fixed\">" +
                        results[i].toString(bases[j].base) +
                        "</span></td>";
            }
            else {
                let temp = showResult ?
                    results[i].toString(bases[j].base) :
                    bases[j].place;
                html += "<td><span class=\"answer\">" +
                    temp +
                        "</span></td>";
            }
            display = (display + 1) % 4;
        }
        html += "</tr>\n";
    }

    html += "</table>";

    target.innerHTML = html;
}
