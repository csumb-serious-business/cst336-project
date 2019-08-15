$(document).ready(() => {
    // disable the form
    $('form').submit(e => e.preventDefault());

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


        // console.log(JSON.stringify(params));
        // call the api
        $.ajax({
            method: 'get',
            url: '/api/app/search-masterpieces',
            data: {
                params: params
            }
        }).done((res, status) => {
            // put result on the page
            // console.log(`res: ${JSON.stringify(res)}, stat: ${status}`);
            populateTable(res)
        })
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
        tableHeader.append(`<td>Search yielded 0 results.</td>`);
        return;
    }

    // populate header row
    let columns = Object.keys(data[0]);
    columns.forEach(c => {
        // it it is the inventory id, capture it, but don't display
        if (c !== 'iid') {
            tableHeader.append(`<td>${c.replace('_', ' ')}</td>`)
        }
    });

    // populate data item rows
    data.forEach(i => {
        let rowData = '';

        // console.log(`i: ${JSON.stringify(i)}`);
        for (let key in i) {
            // if item ends in .jpg, make it an image
            if (typeof i[key] === 'string' && i[key].endsWith('.jpg')) {
                i[key] = `<img src="${i[key]}" alt="${i[key]}" height="200">`;
            }
        }

        // add non-iid colums to table
        columns.forEach(c => {
            if (c !== 'iid') {
                rowData += (`<td>${i[c]}</td>`)
            }
        });

        tableRows.append(`<tr class="table-row" id="iid-${i['iid']}">${rowData}</tr>`)
    });

    // wireup event handler for popover
    $('.table-row').on('click', function () {
        let iid = this.id.replace('iid-', '');
        console.log(`popover: ${iid}`);

        // call the api
        $.ajax({
            method: 'get',
            url: '/api/app/masterpiece-info',
            data: {
                iid: iid
            }
        }).done((res, status) => {
            // put result on the page
            console.log(`res: ${JSON.stringify(res)}, stat: ${status}`);
            $('#mi-image').attr('src', res.piece);
            $('#mi-title').text(res.title);
            $('#mi-price').text(res.price);
            $('#mi-artist').text(res.artist);
            $('#mi-year').text(res.year);
            $('#mi-type').text(res.type);
            $('#mi-materials').text(res.materials);
            // populate and show the modal
            $('#mp-modal').modal('show');
        });


    })
};
