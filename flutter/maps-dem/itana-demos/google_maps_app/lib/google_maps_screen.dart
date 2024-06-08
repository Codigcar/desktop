import 'dart:async';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:google_maps_app/utils/constans.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:intl/intl.dart';

class GoogleMapsScreen extends StatefulWidget {
  const GoogleMapsScreen({super.key});

  @override
  State<GoogleMapsScreen> createState() => _GoogleMapsScreenState();
}

class _GoogleMapsScreenState extends State<GoogleMapsScreen> {
  Completer<GoogleMapController> googleMapController = Completer();
  List<LatLng> posiciones = [];
  Set<Polyline> polylines = {};
  Set<Marker> markers = {};
  CameraPosition initialCameraPosition = const CameraPosition(
    zoom: 16,
    target: LatLng(-12.1973, -76.9702),
  );

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('Google Maps'),
      ),
      body: SafeArea(
        child: GoogleMap(
          // markers: markers,
          polylines: polylines,
          mapType: MapType.normal,
          initialCameraPosition: initialCameraPosition,
          onMapCreated: (GoogleMapController controller) {
            googleMapController.complete(controller);
          },
          onTap: (LatLng posicion) {
          },
        ),
      ),
    );
  }
}
