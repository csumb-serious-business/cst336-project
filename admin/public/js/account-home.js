$(document).ready(() => {
    //todo (won't) impl pagination or infinite scroll for tables

    //// inventory management
    $('#inv-item-create').on('click', () => {
        $('#inv-item-create-modal').modal('show');
    });

    $('#inv-item-create-submit').on('click', () => {
        // get values from form
        const params = [
            'inv-item-title',
            'inv-item-type',
            'inv-item-mat',
            'inv-item-artist',
            'inv-item-year',
            'inv-item-pic-src',
            'inv-item-value',
            'inv-item-req-price',
        ].map(it => $(`#${it}`).val());

        console.log(JSON.stringify(params));
        // call api to add item
        $.ajax({
            method: 'get',
            url: '/api/admin/inv-item-create',
            data: {
                params: params
            }
        }).done((res, status) => {
            // put result on the page
            console.log(`res: ${JSON.stringify(res)}, stat: ${status}`);
        })
        // todo on error highlight problems in the form

        // todo (won't) allow image upload instead of url
    });

    $('#inv-item-search').on('click', () => {
        // call api for options
        $.ajax({
            method: 'get',
            url: '/api/admin/inv-search-options'
        }).done((res, status) => {
            console.log(`res: ${JSON.stringify(res)}, stat: ${status}`);
            // clear search results (if any)
            let tableHeader = $('#header-row');
            let tableRows = $('#data-rows');
            // clear the table
            tableHeader.empty();
            tableRows.empty();


            // populate options in form
            let typeEl = $('#iis-type');
            let matEl = $('#iis-mat');
            let artistEl = $('#iis-artist');
            typeEl.empty();
            typeEl.append($('<option>', {value: '', text: 'choose a type'}));
            matEl.empty();
            matEl.append($('<option>', {value: '', text: 'choose a material'}));
            artistEl.empty();
            artistEl.append($('<option>', {value: '', text: 'choose an artist'}));

            res.types.forEach(it => {
                typeEl.append($('<option>', {
                    value: it.id,
                    text: it.name
                }))
            });

            res.materials.forEach(it => {
                matEl.append($('<option>', {
                    value: it.id,
                    text: it.name
                }))
            });
            res.artists.forEach(it => {
                artistEl.append($('<option>', {
                    value: it.id,
                    text: it.name
                }))
            });

            $('#inv-item-search-modal').modal('show');
        });

    });

    $('#iis-submit').on('click', () => {
        // gather the values
        const params = [
            'iis-title',
            'iis-type',
            'iis-mat',
            'iis-artist',
            'iis-price-min',
            'iis-price-max',
            'iis-result-count',
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
            // put result on the page
            // console.log(`res: ${JSON.stringify(res)}, stat: ${status}`);
            popSearchTable(res)
        })
    });


    //// reports
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
    });
});


const popReportTable = data => {
    let tableHeader = $('#rp-header-row');
    let tableRows = $('#rp-data-rows');
    let tableFooter = $('#rp-total-row');

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


/**
 * Populates the table given some table data
 * Note: the table data can be any homogeneous array of objects,
 * the header row will be based on the first element's keyset and
 * subsequent rows will be populated based on lookups against that
 * keyset.
 * @param data the data to populate into the table
 */
const popSearchTable = data => {
    let tableHeader = $('#header-row');
    let tableRows = $('#data-rows');
    // clear the table
    tableHeader.empty();
    tableRows.empty();


    // only include these results
    let toInclude = ['piece', 'title', 'artist'];


    if (data.length <= 0) {
        tableHeader.append(`<td>Search yielded 0 results.</td>`);
        return;
    }

    // populate header row
    let columns = Object.keys(data[0]);
    columns.forEach(c => {
        // it it is the inventory id, capture it, but don't display
        if (toInclude.includes(c)) {
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
            if (toInclude.includes(c)) {
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
            url: '/api/admin/inv-item-read',
            data: {
                iid: iid
            }
        }).done((res, status) => {
            console.log(`res: ${JSON.stringify(res)}, stat: ${status}`);
            // populate and show the modal
            $('#iu-item-title').val(res.title);
            $('#iu-item-type').val(res.type);
            $('#iu-item-mat').val(res.materials);
            $('#iu-item-artist').val(res.artist);
            $('#iu-item-year').val(res.year);
            $('#iu-item-pic-src').val(res.pic_src);
            $('#iu-item-iid').val(res.iid);
            $('#iu-item-mid').val(res.mid);

            // todo autopop causing false positive for validation fail
            $('#iu-item-value').val(res.value);
            $('#iu-item-req-price').val(res.requisition_price);

            // wire the update
            $('#iu-item-update-submit').on('click', () => {
                callUpdateApi();
            });

            // wire the delete
            $('#iu-item-delete-submit').on('click', () => {
                callDeleteApi();
            });

            $('#inv-item-update-modal').modal('show');
        });
    })
};

const callUpdateApi = () => {
    // get values to pass
    let params = [
        'iu-item-title',
        'iu-item-type',
        'iu-item-mat',
        'iu-item-artist',
        'iu-item-year',
        'iu-item-pic-src',
        'iu-item-value',
        'iu-item-req-price',
        'iu-item-iid',
        'iu-item-mid'].map(it => $(`#${it}`).val());

    console.log(JSON.stringify(params));

    // call the api
    $.ajax({
        method: 'get',
        url: '/api/admin/inv-item-update',
        data: {
            params: params
        }
    }).done((res, status) => {
        console.log(`res: ${JSON.stringify(res)}, stat: ${status}`);

        // todo handle error cases
        $('#inv-item-update-modal').modal('hide');
    });
};

const callDeleteApi = () => {
// get values to pass
    let params = ['iu-item-iid'].map(it => $(`#${it}`).val());
    console.log(JSON.stringify(params));

    // call the api
    $.ajax({
        method: 'get',
        url: '/api/admin/inv-item-delete',
        data: {
            params: params
        }
    }).done((res, status) => {
        console.log(`res: ${JSON.stringify(res)}, stat: ${status}`);

        // todo handle error cases
        $('#inv-item-update-modal').modal('hide');
    });
};