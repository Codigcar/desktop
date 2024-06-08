import 'package:flutter/material.dart';
// import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:jardinez_de_la_paz/screens/search_person/domain/entities/search_person.entity.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class PersonDetailScreen extends StatefulWidget {
  static const route = '/person-detail';
  static const name = 'person-detail';

  final SearchPersonEntity person;

  const PersonDetailScreen({super.key, required this.person});

  @override
  State<PersonDetailScreen> createState() => _PersonDetailScreenState();
}

class _PersonDetailScreenState extends State<PersonDetailScreen> {
  bool showMoreInfo = false;
  @override
  Widget build(BuildContext context) {
    final textStyleTheme = Theme.of(context).textTheme;
    final colorsTheme = Theme.of(context).colorScheme;

    return Scaffold(
        appBar: AppBar(),
        body: Column(
          children: [
            Expanded(
              child: _MapaGoogle(
                double.parse(widget.person.longitud),
                double.parse(widget.person.altitud),
              ),
            ),
            Container(
              color: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 20),
                  Row(
                    children: [
                      Flexible(
                        child: Text(widget.person.fullName,
                            style: textStyleTheme.titleLarge),
                      ),
                      GestureDetector(
                        onTap: () => {
                          setState(() {
                            showMoreInfo = !showMoreInfo;
                          })
                        },
                        child: Icon(
                          showMoreInfo
                              ? Icons.zoom_in_map_outlined
                              : Icons.zoom_out_map_rounded,
                          color: colorsTheme.primary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  showMoreInfo
                      ? Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Divider(
                                height: 10,
                                color: colorsTheme.primary,
                                thickness: 2),
                            const SizedBox(height: 10),
                            Text('Nació: ${widget.person.fechaNacimiento}'),
                            const SizedBox(height: 10),
                            Text('Falleció: ${widget.person.dateOfDeath}'),
                            const SizedBox(height: 10),
                          ],
                        )
                      : const SizedBox(),
                  Divider(height: 10, color: colorsTheme.primary, thickness: 2),
                  const SizedBox(height: 10),
                  Text('Camposanto: ${widget.person.camposanto}'),
                  const SizedBox(height: 10),
                  Text('Plataforma: ${widget.person.plataforma}'),
                  const SizedBox(height: 10),
                  Text('Espacio: ${widget.person.espacio}'),
                  const SizedBox(height: 10),
                  Text(
                      'Coordenadas: (${widget.person.ejeIzquierdo}-${widget.person.ejeDerecho},${widget.person.ejeInferior}-${widget.person.ejeSuperior})'),
                  const SizedBox(height: 10),
                  showMoreInfo
                      ? Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Divider(
                              height: 10,
                              color: colorsTheme.primary,
                              thickness: 2,
                            ),
                            const SizedBox(height: 10),
                            const Text('Horario visitas:'),
                            const SizedBox(height: 10),
                            SizedBox(
                              width: 280,
                              child: Text(widget.person.horarioVisita),
                            ),
                            const SizedBox(height: 20),
                          ],
                        )
                      : const SizedBox(height: 20)
                ],
              ),
            )
          ],
        ));
  }
}

class _MapaGoogle extends StatelessWidget {
  final double latitud;
  final double longitud;
  const _MapaGoogle(this.latitud, this.longitud);

  @override
  Widget build(BuildContext context) {
    // MapType _currentMapType = MapType.terrain;

    // Set<Polygon> polygons = {};

    // const List<LatLng> ubiLaMolina = [
    //   LatLng(-12.0720063, -76.9283025),
    //   LatLng(-12.0733282, -76.9293432),
    //   LatLng(-12.0736325, -76.9305019),
    //   LatLng(-12.0739787, -76.9306521),
    //   LatLng(-12.0743459, -76.9305663),
    //   LatLng(-12.0745137, -76.9302766),
    //   LatLng(-12.0745767, -76.9298689),
    //   LatLng(-12.0749544, -76.9281737),
    //   LatLng(-12.0751642, -76.9276695),
    //   LatLng(-12.0753216, -76.9274549),
    //   LatLng(-12.0755314, -76.9272296),
    //   LatLng(-12.0757832, -76.9270794),
    //   LatLng(-12.0762553, -76.9268112),
    //   LatLng(-12.0767274, -76.9265001),
    //   LatLng(-12.0770317, -76.9262318),
    //   LatLng(-12.077294, -76.9258563),
    //   LatLng(-12.0774408, -76.9254808),
    //   LatLng(-12.077315, -76.925234),
    //   LatLng(-12.0769058, -76.9251268),
    //   LatLng(-12.0764022, -76.9251375),
    //   LatLng(-12.0758986, -76.9252019),
    //   LatLng(-12.0753845, -76.9252126),
    //   LatLng(-12.0750803, -76.9253843),
    //   LatLng(-12.0744088, -76.9256632),
    //   LatLng(-12.0740102, -76.9256417),
    //   LatLng(-12.073559, -76.9255023),
    //   LatLng(-12.0733492, -76.9251589),
    //   LatLng(-12.0731603, -76.9247727),
    //   LatLng(-12.0725308, -76.9245474),
    //   LatLng(-12.0721217, -76.9244723),
    //   LatLng(-12.0717964, -76.9245903),
    //   LatLng(-12.0714607, -76.92488),
    //   LatLng(-12.0713243, -76.925277),
    //   LatLng(-12.0712823, -76.9257276),
    //   LatLng(-12.0713243, -76.9260924),
    //   LatLng(-12.0713138, -76.9264035),
    //   LatLng(-12.0715341, -76.9264464),
    //   LatLng(-12.071744, -76.9266181),
    //   LatLng(-12.0718279, -76.9271223),
    //   LatLng(-12.0717335, -76.9275837),
    //   LatLng(-12.0717125, -76.9278948),
    //   LatLng(-12.0720063, -76.9283025),
    // ];

    // const List<LatLng> ubiLurin = [
    //   LatLng(-12.2868789, -76.8716815),
    //   LatLng(-12.2871724, -76.8718854),
    //   LatLng(-12.2888078, -76.8693748),
    //   LatLng(-12.2869103, -76.8680337),
    //   LatLng(-12.284971, -76.870276),
    //   LatLng(-12.2868789, -76.8716815),
    // ];

    // Polygon laMolina = Polygon(
    //     polygonId: const PolygonId('laMolina'),
    //     points: ubiLaMolina,
    //     visible: true,
    //     fillColor: Colors.black.withOpacity(0.1),
    //     geodesic: true,
    //     strokeWidth: 5,
    //     strokeColor: Colors.green);

    // Polygon lurin = Polygon(
    //     polygonId: const PolygonId('lurin'),
    //     points: ubiLurin,
    //     visible: true,
    //     fillColor: Colors.black.withOpacity(0.1),
    //     geodesic: true,
    //     strokeWidth: 5,
    //     strokeColor: Colors.green);

    // polygons.add(laMolina);

    // return GoogleMap(
    //   mapType: _currentMapType,
    //   zoomControlsEnabled: true,
    //   zoomGesturesEnabled: true,
    //   scrollGesturesEnabled: true,
    //   compassEnabled: true,
    //   initialCameraPosition:
    //       CameraPosition(target: LatLng(latitud, longitud), zoom: 16),
    //   markers: {
    //     Marker(
    //       markerId: MarkerId('demo'),
    //       position: LatLng(latitud, longitud),
    //     )
    //   },
    //   polygons: polygons,
    // );
    print(latitud);
    print(longitud);
    return FlutterMap(
      options: MapOptions(
        // initialCenter: LatLng(51.509364, -0.128928),
        initialCenter: LatLng(latitud, longitud),
        // initialCenter: LatLng(-12.288121, -76.869825),

        // initialCenter: LatLng(45.3367881884556, 14.159452282322459),
        // initialZoom: 17,
        initialZoom: 16.5,
        // initialCameraFit: CameraFit.coordinates(coordinates: [LatLng(latitud, longitud)])
      ),
      children: [
        TileLayer(
          urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          userAgentPackageName: 'com.example.app',
        ),
        OverlayImageLayer(
          overlayImages: [
            OverlayImage(
              bounds: LatLngBounds(
                const LatLng(-12.069200, -76.931262),
                const LatLng(-12.077950, -76.922800),
              ),
              imageProvider: Image.asset(
                'assets/icon/molina2.png',
              ).image,
            ),
            OverlayImage(
              bounds: LatLngBounds(
                const LatLng(-12.284331, -76.872002),
                const LatLng(-12.289364, -76.867419),
              ),
              imageProvider: Image.asset(
                'assets/icon/lurin3-bg.png',
              ).image,
            ),
          ],
        ),
        MarkerLayer(
          markers: [
            Marker(
              point: LatLng(latitud, longitud),
              width: 80,
              height: 80,
              child: const Icon(
                Icons.location_on,
                size: 40,
                color: Colors.red,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
