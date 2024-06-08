import 'package:card_swiper/card_swiper.dart';
import 'package:flutter/material.dart';

List imageList = [
  'http://placekitten.com/400/300',
  'http://placekitten.com/400/300',
  'http://placekitten.com/400/300',
];

class ImageSlider extends StatelessWidget {
  const ImageSlider({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 210,
      width: double.infinity,
      child: Swiper(
        autoplay: true,
        itemCount: imageList.length,
        pagination: const SwiperPagination(
          builder: DotSwiperPaginationBuilder(
            activeColor: Colors.grey,
            color: Colors.white,
          ),
        ),
        itemBuilder: (context, index) => Image.network(
          imageList[index],
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
