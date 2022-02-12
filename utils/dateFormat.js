module.exports ={
    dateFormat: (date) => {
        // Format date as MM/DD/YYYY
        // return date.toLocaleDateString();
        return Intl.DateTimeFormat('en-US').format(date);

      },
}