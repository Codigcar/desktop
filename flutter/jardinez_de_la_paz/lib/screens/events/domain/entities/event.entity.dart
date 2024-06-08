// To parse this JSON data, do
//
//     final eventEntityResponse = eventEntityResponseFromJson(jsonString);

import 'dart:convert';

EventEntityResponse eventEntityResponseFromJson(String str) => EventEntityResponse.fromJson(json.decode(str));

class EventEntityResponse {
    final List<EventEntity> data;

    EventEntityResponse({
        required this.data,
    });

    factory EventEntityResponse.fromJson(Map<String, dynamic> json) => EventEntityResponse(
        data: List<EventEntity>.from(json["data"].map((x) => EventEntity.fromJson(x))),
    );
   
}

class EventEntity {
    final String cEmpresa;
    final String nEmpresa;
    final DateTime fProgramacion;
    final String cProgramacion;
    final String dTiempoDia;
    final String dNombre;
    final String dApellidoP;
    final String dApellidoM;
    final String cEspacio;
    final String dBien;
    final String dVelacion;
    final DCaracteristicaBien dCaracteristicaBien;
    final DCementerio dCementerio;
    final String dAgente;
    final String observaciones;
    final String agencia;

    EventEntity({
        required this.cEmpresa,
        required this.nEmpresa,
        required this.fProgramacion,
        required this.cProgramacion,
        required this.dTiempoDia,
        required this.dNombre,
        required this.dApellidoP,
        required this.dApellidoM,
        required this.cEspacio,
        required this.dBien,
        required this.dVelacion,
        required this.dCaracteristicaBien,
        required this.dCementerio,
        required this.dAgente,
        required this.observaciones,
        required this.agencia,
    });

    factory EventEntity.fromJson(Map<String, dynamic> json) => EventEntity(
        cEmpresa: json["cEmpresa"],
        nEmpresa: json["nEmpresa"],
        fProgramacion: DateTime.parse(json["FProgramacion"]),
        cProgramacion: json["cProgramacion"],
        dTiempoDia: json["dTiempoDia"],
        dNombre: json["dNombre"],
        dApellidoP: json["dApellidoP"],
        dApellidoM: json["dApellidoM"],
        cEspacio: json["cEspacio"],
        dBien: json["dBien"],
        dVelacion: json["dVelacion"],
        dCaracteristicaBien: dCaracteristicaBienValues.map[json["dCaracteristicaBien"]]!,
        dCementerio: dCementerioValues.map[json["dCementerio"]]!,
        dAgente: json["dAgente"],
        observaciones: json["Observaciones"],
        agencia: json["Agencia"],
    );
}

enum DCaracteristicaBien {
    APERTURA,
    EMPTY,
    REAPERTURA
}

final dCaracteristicaBienValues = EnumValues({
    "APERTURA": DCaracteristicaBien.APERTURA,
    "": DCaracteristicaBien.EMPTY,
    "REAPERTURA": DCaracteristicaBien.REAPERTURA
});

enum DCementerio {
    CENTRO_FUNERARIO_JDLP,
    JARDINES_DE_LA_PAZ_CHICLAYO,
    JARDINES_DE_LA_PAZ_LURIN,
    JARDINES_DE_LA_PAZ_MOLINA,
    JARDINES_DE_LA_PAZ_TRUJILLO
}

final dCementerioValues = EnumValues({
    "CENTRO FUNERARIO JDLP": DCementerio.CENTRO_FUNERARIO_JDLP,
    "JARDINES DE LA PAZ  - CHICLAYO": DCementerio.JARDINES_DE_LA_PAZ_CHICLAYO,
    "JARDINES DE LA PAZ - LURIN": DCementerio.JARDINES_DE_LA_PAZ_LURIN,
    "JARDINES DE LA PAZ  - MOLINA": DCementerio.JARDINES_DE_LA_PAZ_MOLINA,
    "JARDINES DE LA PAZ  - TRUJILLO": DCementerio.JARDINES_DE_LA_PAZ_TRUJILLO
});

class EnumValues<T> {
    Map<String, T> map;
    late Map<T, String> reverseMap;

    EnumValues(this.map);

    Map<T, String> get reverse {
        reverseMap = map.map((k, v) => MapEntry(v, k));
        return reverseMap;
    }
}
