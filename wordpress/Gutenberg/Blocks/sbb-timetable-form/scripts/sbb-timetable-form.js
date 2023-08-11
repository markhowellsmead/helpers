const submitHandler = event => {
    event.preventDefault();
    let form = event.target;

    let from = encodeURI(form.querySelector('[name="from"]').value);
    let to = encodeURI(form.querySelector('[name="to"]').value);

    let time = form.querySelector('[name="time"]').value;
    let date = form.querySelector('[name="date"]').value;

    let date_object = new Date(date),
        dd = date_object.getDate(),
        mm = date_object.getMonth() + 1,
        yyyy = date_object.getFullYear();

    date = dd + '.' + mm + '.' + yyyy;

    let arrival_departure = form.querySelectorAll('[name="arrival"]');
    let arrival = 'false';

    arrival_departure.forEach(function (checkbox) {
        if (checkbox.checked) {
            arrival = checkbox.value;
        }
    });

    let url = `${form.action}?von=${from}&nach=${to}&datum=${date}&zeit=${time}&an=${arrival}&suche=true`;

    window.open(url, '_blank');
};

const rememberFrom = event => {
    localStorage.setItem('sbb_timetable_from', event.target.value);
};

const rememberTo = event => {
    localStorage.setItem('sbb_timetable_to', event.target.value);
};

let forms = document.querySelectorAll('.wp-block-sht-sbb-timetable-form__form');

if (forms.length) {
    let month = new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'),
        today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth(),
        currentMonth = month[mm],
        yyyy = today.getFullYear(),
        hh = String(today.getHours()).padStart(2, '0'),
        min = String(today.getMinutes()).padStart(2, '0'),
        today_value = yyyy + '-' + currentMonth + '-' + dd,
        time_value = hh + ':' + min;

    forms.forEach(form => {
        form.querySelector('[name="date"]').value = today_value;
        form.querySelector('[name="time"]').value = time_value;
        form.addEventListener('submit', submitHandler);

        const stored_from = localStorage.getItem('sbb_timetable_from');
        if (!!stored_from) {
            form.querySelector('[name="from"]').value = stored_from;
        }

        const stored_to = localStorage.getItem('sbb_timetable_to');
        if (!!stored_to) {
            form.querySelector('[name="to"]').value = stored_to;
        }

        form.querySelector('[name="from"]').addEventListener('change', rememberFrom);
        form.querySelector('[name="to"]').addEventListener('change', rememberTo);
    });
}
