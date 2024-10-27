window.onload = () => {
    "use strict";
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
};

const tabelasMacacos = [
    "", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO",
    "7:00¹7:45", "", "", "", "", "", "",
    "7:45²8:30", "", "", "", "", "", "",
    "8:30³9:15", "", "", "", "", "", "",
    "9:25'4'10:10", "", "", "", "", "", "",
    "10:10'5'10:55", "", "", "PTAS", "", "", "",
    "10:55'6'11:40", "", "", "GCSI", "", "", "",
    "13:00'7'13:45", "LPLB", "MATEM", "PTAS", "PTAC", "PDM", "",
    "13:45'8'14:30", "LPLB", "LPLB", "PTAS", "PTAC", "PDM", "",
    "14:30'9'15:15", "ARTE", "ESTAT", "MATEM", "PTAC", "PDM", "",
    "15:25'10'16:10", "ARTE", "ESTAT", "MATEM", "REDES", "GCSI", "",
    "16:10'11'16:55", "HIST", "FISICA", "GCSI", "REDES ", "SEGURANÇA", "",
    "16:55'12'17:40", "HIST", "FISICA", "GCSI", "REDES ", "SEGURANÇA", "",
    "17:40'¿¿¿'18:50", "", "", "", "", "", "",
    "18:50'13'19:35", "", "", "", "", "", "",
    "19:35'14'20:20", "", "", "", "", "", "",
    "20:30'15'21:15", "", "", "", "", "", "",
    "21:15'16'22:00", "", "", "", "", "", "",
    "22:00'17'22:45", "", "", "", "", "", ""
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

            // Ajuste da lógica para horários de manhã e tarde
            const isMorning = i < 5 * 9; // Até 12h55 (5º índice de 7)
            const isAfternoon = i >= 5 * 9 && i < 12 * 7; // De 13h até 17h40

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

                const cell = document.createElement("td");
                cell.textContent = cellText || "";

                // Adiciona as classes para manhã e tarde somente nas células com aulas
                if (cellText && isMorning) cell.classList.add("morning");
                if (cellText && isAfternoon) cell.classList.add("afternoon");

                row.appendChild(cell);
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

    table.classList.add("styled-table");
    container.appendChild(table);
});
