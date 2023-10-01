// ImageSlider.js
import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;

export default function ImageSlider({ imageUrls }) {
  const renderItem = ({ item }) => {
    return (
      <View style={{ width: ITEM_WIDTH, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: item }} style={{ width: ITEM_WIDTH, height: 400, borderRadius: 10 }} />
      </View>
    );
  };

  return (
    <Carousel
      data={imageUrls}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
      layout="default"
      loop
      autoplay
      autoplayInterval={3000} // Adjust the interval (in milliseconds) between slides
    />
  );
}
