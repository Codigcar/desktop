import moment from 'moment';

export class DateFormat {
    static defaultFormat = 'DD/MM/YYYY';
    static defaultFormatMonthName = 'DD-MM-YY';
    static defaultFormatMonthNameMovement = 'DD - MM - YY';

    static format(data, format = this.defaultFormat) {
        return moment(data).format(format);
    }

    static formatMonthName(data, format = this.defaultFormatMonthName) {
        return moment(data).format(format);
    }    
    
    static formatMonthNameMovement(data, format = this.defaultFormatMonthNameMovement) {
        return moment(data).format(format);
    }
}