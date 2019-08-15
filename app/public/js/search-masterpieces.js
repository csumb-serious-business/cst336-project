$(document).ready(() => {
    //todo impl pagination or infinite scroll
    $('#smp-submit').on('click', () => {
        // gather the values
        const params = [
            'smp-title',
            'smp-type',
            'smp-mat',
            'smp-artist',
            'smp-price-min',
            'smp-price-max',
            'smp-result-count',
        ].map(it => $(`#${it}`).val());


        console.log(JSON.stringify(params));
        // call the api
        $.ajax({
            method: 'get',
            url: '/api/app/search-masterpieces',
            data: {
                params: params
            }
        }).done((res, status) => {
            console.log(`res: ${JSON.stringify(res)}, stat: ${status}`);
            populateTable(res[0])
        })
        // put result on the page

    })
});

/**
 * Populates the table given some table data
 * Note: the table data can be any homogeneous array of objects,
 * the header row will be based on the first element's keyset and
 * subsequent rows will be populated based on lookups against that
 * keyset.
 * @param data the data to populate into the table
 */
const populateTable = data => {
    let tableHeader = $('#header-row');
    let tableRows = $('#data-rows');
    // clear the table
    tableHeader.empty();
    tableRows.empty();

    if (data.length <= 0) {
        tableHeader.append(`<td>Query yielded 0 results.</td>`);
        return;
    }

    // populate header row
    let columns = Object.keys(data[0]);
    columns.forEach(c =>
        tableHeader.append(`<td>${c.replace('_', ' ')}</td>`));

    // todo if item ends in .jpg, make it an image
    // populate data item rows
    data.forEach(i => {
        let rowData = '';
        columns.forEach(c => rowData += (`<td>${i[c]}</td>`));
        tableRows.append(`<tr>${rowData}</tr>`)
    })
};