import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Property, Photo } from '../../types/property';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { getPropertyPhotoGallery } from '../../utils/imageHelper';
import { Icons } from '../common/Icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GALLERY_HEIGHT = 415;

export interface PhotoGalleryProps {
  property?: Property;
  photos?: Photo[];
  onBackPress?: () => void;
  onFavoritePress?: () => void;
  onSharePress?: () => void;
  isFavorite?: boolean;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  property,
  photos,
  onBackPress,
  onFavoritePress,
  onSharePress,
  isFavorite = false,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const images = getPropertyPhotoGallery(property || (photos ? { photos } : null));

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SCREEN_WIDTH);
    if (currentIndex !== activeIndex && currentIndex >= 0 && currentIndex < images.length) {
      setActiveIndex(currentIndex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {images.map((imgSrc, index) => (
          <Image
            key={`photo-${index}`}
            source={typeof imgSrc === 'number' ? imgSrc : imgSrc}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Aesthetic Organic Wave Cut Overlay at Bottom */}
      <View style={styles.curveContainer} pointerEvents="none">
        <Svg
          width={SCREEN_WIDTH}
          height={75}
          viewBox="0 0 363 75"
          preserveAspectRatio="none"
        >
          <Path
            d="M 0,8 C 6,24 18,39 38,43 L 315,47 C 338,49 356,60 363,75 L 363,75 L 0,75 Z"
            fill="#FAF9F6"
          />
        </Svg>
      </View>

      {/* Top Floating Action Controls */}
      <View style={styles.topBar}>
        {onBackPress && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onBackPress}
            style={styles.iconButton}
          >
            <Icons.ArrowLeft size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        )}

        <View style={styles.rightIcons}>
          {onFavoritePress && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onFavoritePress}
              style={[styles.iconButton, styles.marginRight]}
            >
              <Icons.Heart
                size={18}
                color={isFavorite ? colors.errorText : colors.textPrimary}
                filled={isFavorite}
              />
            </TouchableOpacity>
          )}

          {onSharePress && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onSharePress}
              style={styles.iconButton}
            >
              <Icons.Share size={18} color={colors.textPrimary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Photo Counter Badge: 1/8 */}
      <View style={styles.counterPill}>
        <Text style={styles.counterText}>
          {activeIndex + 1}/{images.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: GALLERY_HEIGHT,
    width: '100%',
    position: 'relative',
    backgroundColor: '#FAF9F6',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: SCREEN_WIDTH,
    height: GALLERY_HEIGHT,
  },
  curveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
  },
  topBar: {
    position: 'absolute',
    top: (Platform.OS === 'android' ? (StatusBar.currentHeight || 28) : 44) + 12,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.round,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  marginRight: {
    marginRight: spacing.sm,
  },
  counterPill: {
    position: 'absolute',
    bottom: 38,
    right: spacing.lg,
    backgroundColor: 'rgba(20, 28, 20, 0.72)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: borderRadius.round,
    zIndex: 5,
  },
  counterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
