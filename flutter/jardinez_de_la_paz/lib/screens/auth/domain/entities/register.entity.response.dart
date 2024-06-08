import 'dart:convert';

// class Body {
//   final String estado;
//   final String mensaje;

//   Body({required this.estado, required this.mensaje});
// }

// class RegisterEntityResponse {
//   final List<Body> data;

//   RegisterEntityResponse({required this.data});
// }

///
///

RegisterEntityResponse entitdadFromJson(String str) => RegisterEntityResponse.fromJson(json.decode(str));

String entitdadToJson(RegisterEntityResponse data) => json.encode(data.toJson());

class RegisterEntityResponse {
    List<DataBody> data;

    RegisterEntityResponse({
        required this.data,
    });

    factory RegisterEntityResponse.fromJson(Map<String, dynamic> json) => RegisterEntityResponse(
        data: List<DataBody>.from(json["data"].map((x) => DataBody.fromJson(x))),
    );

    Map<String, dynamic> toJson() => {
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
    };
}

class DataBody {
    String estado;
    String mensaje;

    DataBody({
        required this.estado,
        required this.mensaje,
    });

    factory DataBody.fromJson(Map<String, dynamic> json) => DataBody(
        estado: json["estado"],
        mensaje: json["mensaje"],
    );

    Map<String, dynamic> toJson() => {
        "estado": estado,
        "mensaje": mensaje,
    };
}
