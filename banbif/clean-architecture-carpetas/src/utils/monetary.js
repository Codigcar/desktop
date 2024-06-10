
export class Monetary {


  static format(value) {
    if (value == null)
      value = 0;
    return parseFloat(Math.round(value * 100) / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  static percentage(value) {
    return parseFloat(Math.round(value * 1000000.0) / 1000000.0);
  }

}