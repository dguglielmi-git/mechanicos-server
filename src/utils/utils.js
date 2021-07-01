
function formatDate(fullDate) {
	var year = fullDate.getUTCFullYear();
	var month = (fullDate.getUTCMonth() + 1).toString().padStart(2, '0');
	var day = fullDate.getUTCDate().toString().padStart(2, '0');
	var datePublish = day + '/' + month + '/' + year;
	return datePublish;
}

module.exports = {
	formatDate,
};