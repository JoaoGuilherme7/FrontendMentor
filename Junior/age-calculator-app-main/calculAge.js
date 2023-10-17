const dayField = document.querySelector('#day');
const monthField = document.querySelector('#month');
const yearField = document.querySelector('#year');
const submitButton = document.querySelector('#submitButton');
const resultField = document.querySelector('.result');

const dayError = document.querySelector('#dayError');
const monthError = document.querySelector('#monthError');
const yearError = document.querySelector('#yearError');

const todayDate = new Date();
const todayDay = todayDate.getDate();
const todayMonth = todayDate.getMonth() + 1;
const todayYear = todayDate.getFullYear();



let daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(ano) {
    if ((ano % 4 == 0 && ano % 100 != 0) || ano % 400 == 0)
        return true;
    return false;
}

function formError(isOk) {
    const labels = document.querySelectorAll('label');

    if (!isOk) {
        labels.forEach(label => {
            label.style.color = 'red';
            label.querySelector('input').style.borderColor = 'red';
        });
    }
    else {
        labels.forEach(label => {
            label.style.color = '#777';
            label.querySelector('input').style.borderColor = '#ddd';
        });
    }
}

// async function validateForm() {

//     const day = Number(dayField.value);
//     const month = Number(monthField.value);
//     const year = Number(yearField.value);

//     if (day > daysPerMonth[month - 1]) {
//         if (month == 2 && isLeapYear(year)) {
//             dayField.value = 29;
//         }
//         else {
//             dayField.value = daysPerMonth[month - 1];
//         }
//     }
//     else if (day < 1) {
//         dayField.value = 1;
//     }
//     // :::::::::::::::::::::::::
//     if (month > 12) {
//         monthField.value = 12;
//     }
//     else if (month < 1) {
//         monthField.value = 1;
//     }
//     // :::::::::::::::::::::::::
//     if (year >= todayYear) {
//         yearField.value = todayYear;
//         if (month >= todayMonth) {
//             monthField.value = todayMonth;
//             if (day >= todayDay) {
//                 dayField.value = todayDay;
//             }
//         }
//     }
//     else if (year < 0) {
//         yearField.value = 0;
//     }
// }

async function validateForm(day, month, year) {
    let isOk = true;

    if ((day > daysPerMonth[month - 1] || day < 1)
    && !(month == 2 && isLeapYear(year) && day == 29)) {
        dayError.textContent = 'Must be a valid day';
        dayError.style.visibility = 'visible';
        isOk = false;
    }
    else{
        dayError.style.visibility ='hidden';
    }


    if (month > 12 || month < 1) {
        monthError.textContent = 'Must be a valid month';
        monthError.style.visibility = 'visible';
        isOk = false;
    }
    else{
        monthError.style.visibility = 'hidden';
    }


    if (year > todayYear || year < 0) {
        yearError.textContent = 'Must be in the past';
        yearError.style.visibility = 'visible';
        isOk = false;
    }
    else if (year == todayYear) {  
        if (month > todayMonth) {
            monthError.textContent = 'Must be a valid month';
            monthError.style.visibility = 'visible';
            isOk = false;
        }
        else if (month == todayMonth && day >= todayDay) {
            dayError.textContent = 'Must be a valid day';
            dayError.style.visibility = 'visible';
            isOk = false;
        }
    }
    else{
        yearError.style.visibility='hidden';
    }

    if(day ==''){
        dayError.textContent = 'This fiels is required';
        dayError.style.visibility = 'visible';

    }
    if(month==''){
        monthError.textContent = 'This fiels is required';
        monthError.style.visibility = 'visible';

    }
    if(year==''){
        yearError.textContent = 'This fiels is required';
        yearError.style.visibility = 'visible';
    }


    console.log(isOk);
    if (!isOk) {
        formError(false);
    }
    else {
        formError(true)
    }
    return isOk;
}

function datesDifference(day, month, year) {

    let difDays = todayDay - day;
    let difMonths = todayMonth - month;
    let difYears = todayYear - year;

    if (difDays < 0) {
        difMonths = difMonths - 1;
        difDays = (daysPerMonth[todayMonth - 2] - day) + todayDay;
    }

    if (difMonths < 0) {
        difYears -= 1;
        difMonths = 12 + difMonths;
    }

    printDifference(difDays, difMonths, difYears);
}

function printDifference(daysDif, monthsDif, yearsDif) {
    let days;
    let months;
    let years;

    if (daysDif > 1) {
        days = `<p><em>${daysDif}</em> days</p>`;
    }
    else if (daysDif == 1) {
        days = `<p><em>${daysDif}</em> day</p>`;
    }
    else {
        days = '';
    }
    // ::::::::::::::::::::::::::::::::::::::::::::::
    if (monthsDif > 1) {
        months = `<p><em>${monthsDif}</em> months</p>`
    }
    else if (monthsDif == 1) {
        months = `<p><em>${monthsDif}</em> month</p>`;
    }
    else {
        months = '';
    }
    // ::::::::::::::::::::::::::::::::::::::::::::::
    if (yearsDif > 1) {
        years = `<p><em>${yearsDif}</em> years</p>`
    }
    else if (yearsDif == 1) {
        years = `<p><em>${yearsDif}</em> year</p>`;
    }
    else {
        years = '';
    }

    resultField.innerHTML = `${years + months + days}`;
}

function main() {
    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const day = Number(dayField.value);
        const month = Number(monthField.value);
        const year = Number(yearField.value);

        let formIsOk = await validateForm(day, month, year);
        if (formIsOk) {
            datesDifference(day, month, year);
        }
    });
}
main();