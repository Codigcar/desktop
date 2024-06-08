class RecoryPasswordResponse {
    String estado;
    String mensaje;

    RecoryPasswordResponse({
        this.estado = '',
        this.mensaje = '',
    });

    factory RecoryPasswordResponse.fromJson(Map<String, dynamic> json) => RecoryPasswordResponse(
        estado: json["estado"],
        mensaje: json["mensaje"],
    );

    Map<String, dynamic> toJson() => {
        "estado": estado,
        "mensaje": mensaje,
    };
}
