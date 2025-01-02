const formatDate = (date) => {
    if (!(date instanceof Date)) {
        return 'Invalid date';
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let prefix;

    switch(date.getDate()) {
        case 1:
        case 21:
        case 31:
            prefix = "st"
            break;
        case 2:
        case 22:
            prefix = "nd"
            break;
        case 3:
        case 23:
            prefix = "rd"
            break;
        default:
            prefix = "th";
    }

    return `${date.getDate()}${prefix} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

module.exports = formatDate;
