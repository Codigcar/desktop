export class UpperCase {
    static upperCase(texto) {
        if (!isNaN(+texto)) {
            return texto;
        } else {
            return texto.trim().toUpperCase();
        }
    }
}