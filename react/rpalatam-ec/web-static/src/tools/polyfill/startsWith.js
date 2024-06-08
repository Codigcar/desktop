/* eslint-disable no-extend-native */

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(stringBuscada, posicion) {
    posicion = posicion || 0;
    return this.indexOf(stringBuscada, posicion) === posicion;
  };
}
