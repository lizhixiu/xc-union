/**
 * 将时间戳转换为指定格式的日期字符串
 * @param {number} timestamp - 时间戳，单位为毫秒
 * @param {string} format - 日期格式，例如 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} - 格式化后的日期字符串
 */
function formatDate(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {

    let date;
    if (typeof timestamp === 'string') {
        date = new Date(parseInt(timestamp));
    } else {
        date = new Date(timestamp);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

export {formatDate};