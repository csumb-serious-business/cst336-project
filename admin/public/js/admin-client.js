$(document).ready(() => {
    // disable form submissions
    $('form').submit(e => e.preventDefault());

    //todo impl pagination or infinite scroll
    $('#rp-artist-value').on('click', () => {

        // console.log(JSON.stringify(params));
        // call the api
        $.ajax({
            method: 'get',
            url: '/api/admin/artist-value'
        }).done((res, status) => {
            // put result on the page
            console.log(`res: ${JSON.stringify(res)}, stat: ${status}`);

            // populate table
            popReportTable(res);

            $('#rp-av-modal').modal('show');
        })
    })
});


const popReportTable = data => {
    let tableHeader = $('#header-row');
    let tableRows = $('#data-rows');
    let tableFooter = $('#total-row');

    // clear the table
    tableHeader.empty();
    tableRows.empty();
    tableFooter.empty();

    if (data.length <= 0) {
        tableHeader.append((`<td>Report yielded 0 results.</td>`));
        return;
    }
    // populate header row
    let columns = Object.keys(data[0]);
    columns.forEach(c => {
        tableHeader.append(`<td>${c.replace('_', ' ')}</td>`)
    });

    // populate data item rows
    data.forEach(d => {
            // skip the total row
            if (d.name !== null) {
                let rowData = '';

                console.log(`d: ${JSON.stringify(d)}`);

                // add columns to table
                columns.forEach(c =>
                    rowData += (`<td>${d[c]}</td>`)
                );

                tableRows.append(`<tr class="table-row">${rowData}</tr>`)

            }
        }
    );

    // populate the total row
    let totals = data[data.length - 1];

    console.log(`t: ${JSON.stringify(totals)}`);

    let rowData = '';

    // add columns to total row
    columns.forEach(c => {
            let v = totals[c] == null ? 'TOTAL' : totals[c];
            rowData += (`<td><strong>${v}</strong></td>`)
        }
    );
    tableFooter.append(`<tr class="table-row">${rowData}</tr>`)


};

