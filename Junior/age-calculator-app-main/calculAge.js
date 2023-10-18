const inputs = document.querySelectorAll('input[type="number"]');
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


async function validateForm(day, month, year) {
    let isOk = true;

    if (year > todayYear || year < 0) {
        yearError.textContent = 'Must be in the past';
        yearError.style.visibility = 'visible';
        isOk = false;
        yearField.focus();
    }
    else if (year == todayYear) {
        if (month > todayMonth) {
            monthError.textContent = 'Must be a valid month';
            monthError.style.visibility = 'visible';
            isOk = false;
            monthField.focus();

        }
        else if (month == todayMonth && day >= todayDay) {
            dayError.textContent = 'Must be a valid day';
            dayError.style.visibility = 'visible';
            isOk = false;
            dayField.focus();
        }
    }
    else {
        yearError.style.visibility = 'hidden';
    }



    if (month > 12 || month < 1) {
        monthError.textContent = 'Must be a valid month';
        monthError.style.visibility = 'visible';
        isOk = false;
        monthField.focus();
    }
    else {
        monthError.style.visibility = 'hidden';
    }

    if ((day > daysPerMonth[month - 1] || day < 1 || day > 31)
        && !(month == 2 && isLeapYear(year) && day == 29)) {
        dayError.textContent = 'Must be a valid day';
        dayError.style.visibility = 'visible';
        isOk = false;
        dayField.focus();
    }
    else {
        dayError.style.visibility = 'hidden';
    }

    // :::::::::::::::::::::::::::

    
    if (year == '' && year != 0) {
        yearError.textContent = 'This field is required';
        yearError.style.visibility = 'visible';
        isOk = false;
        yearField.focus();

    }
    
    if (month == '') {
        monthError.textContent = 'This field is required';
        monthError.style.visibility = 'visible';
        isOk = false;
        monthField.focus();

    }

    if (day == '') {
        dayError.textContent = 'This field is required';
        dayError.style.visibility = 'visible';
        isOk = false;
        dayField.focus();

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
    // ::::::::::::::::::::::::::::::::::::::::::::::
    if (yearsDif == 0 && monthsDif == 0 && daysDif == 0) {
        days = `<p><em>It's</em> Todayy!!</p>`
    }


    resultField.innerHTML = `${years + months + days}`;
}

function printNoDate() {
    resultField.innerHTML =
        `<p><em>--</em> years</p>
        <p><em>--</em> months</p>
        <p><em>--</em> days</p>`;
}

function main() {

    inputs.forEach(input => {
        input.addEventListener("input", function () {

            if (this.value.length > this.maxLength ) {
                this.value = this.value.substring(1);
                // this.value = this.value.slice(0, this.maxLength);
            }
            else if (this.value.length < this.maxLength) {
                this.value = `${('0'.repeat(this.maxLength - this.value.length) + this.value)}`;
            }

        });
    });

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const day = Number(dayField.value);
        const month = Number(monthField.value);
        const year = Number(yearField.value);



        let formIsOk = await validateForm(day, month, year);

        if (formIsOk) {
            datesDifference(day, month, year);
        }
        else {
            printNoDate();
        }
    });
}
main();