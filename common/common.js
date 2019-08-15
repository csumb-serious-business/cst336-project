/**
 * Converts an array of objects to a single object with
 * keys containing arrays of the original array's object field values
 * ex:
 * [
 *      {a: 1, b: 2, c: 3},
 *      {a: 4: b: 5, c: 6}
 * ]
 * becomes:
 * {
 *     a: [1, 4],
 *     b: [2, 5],
 *     c: [3, 6]
 * }
 * @param arr the array to convert
 */
const arrayConvert = (arr) => {
    let result = {};
    arr.forEach(obj => {
        Object.keys(obj).forEach(k => {
            result[k] = (result[k] || []).concat([obj[k]]);
        });
    });
    return result;
};

module.exports = {
    arrayConvert: arrayConvert
};