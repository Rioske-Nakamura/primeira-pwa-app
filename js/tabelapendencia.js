window.onload = () => {
    "use strict";
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
};

const tabelasMacacos = [
    "", "SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO",
    "7:00¹7:45", "", "FISICA", "", "", "", "FISICA",
    "7:45²8:30", "", "FISICA", "", "", "", "FISICA",
    "8:30³9:15", "", "FISICA", "", "", "", "",
    "9:25'4'10:10", "", "", "", "", "PDM", "PTAS",
    "10:10'5'10:55", "", "", "", "ARTES", "PDM", "PTAS",
    "10:55'6'11:40", "", "", "", "", "", "PTAS",
    "13:00'7'13:45", "ARTES", "ESTAT", "", "", "", "ESTAT",
    "13:45'8'14:30", "ARTES", "ESTAT", "GCSI", "", "", "",
    "14:30'9'15:15", "", "", "GCSI", "", "", "",
    "15:25'10'16:10", "", "", "", "", "", "",
    "16:10'11'16:55", "", "", "", "", "PDM", "",
    "16:55'12'17:40", "", "", "", "", "PDM", "",
    "17:40'¿¿¿'18:50", "", "", "", "", "", "",
    "18:50'13'19:35", "", "", "", "", "", "",
    "19:35'14'20:20", "", "", "", "", "", "",
    "20:30'15'21:15", "", "GCSI", "", "", "", "",
    "21:15'16'22:00", "", "", "", "", "", "",
    "22:00'17'22:45", "", "", "", "", "", "",
];
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("table-container");
    const table = document.createElement("table");

    let rowspanCounters = new Array(7).fill(1);
    let previousTexts = new Array(7).fill("");

    for (let i = 0; i < tabelasMacacos.length; i += 7) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cellText = tabelasMacacos[i + j];

            if (cellText === previousTexts[j] && cellText !== "") {
                rowspanCounters[j]++;
            } else {
                if (rowspanCounters[j] > 1) {
                    const prevRow = table.rows[table.rows.length - rowspanCounters[j]];
                    if (prevRow && prevRow.cells[j]) {
                        prevRow.cells[j].rowSpan = rowspanCounters[j];
                    }
                }
                rowspanCounters[j] = 1;
                previousTexts[j] = cellText;

                if (cellText !== "" || i === 0) {
                    const cell = document.createElement("td");
                    cell.textContent = cellText || "";
                    
                    // Adiciona a classe 'class-cell' para células com aulas
                    if (cellText !== "") {
                        cell.classList.add("class-cell");
                    }

                    row.appendChild(cell);
                } else {
                    const emptyCell = document.createElement("td");
                    row.appendChild(emptyCell);
                }
            }
        }
        table.appendChild(row);
    }

    for (let j = 0; j < 7; j++) {
        if (rowspanCounters[j] > 1) {
            const prevRow = table.rows[table.rows.length - rowspanCounters[j]];
            if (prevRow && prevRow.cells[j]) {
                prevRow.cells[j].rowSpan = rowspanCounters[j];
            }
        }
    }

    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.querySelectorAll("td").forEach(cell => {
        cell.style.border = "1px solid #ddd";
        cell.style.padding = "8px";
        cell.style.textAlign = "center";
    });

    container.appendChild(table);
});
