import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { shadows } from '../../theme/shadows';

export const PropertyCardSkeleton: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    return () => {
      pulseLoop.stop();
    };
  }, [pulseAnim]);

  return (
    <View style={[styles.card, shadows.card]}>
      <View style={styles.imageContainer}>
        <Animated.View style={[styles.imagePlaceholder, { opacity: pulseAnim }]} />
        <Animated.View style={[styles.typeBadgePlaceholder, { opacity: pulseAnim }]} />
        <Animated.View style={[styles.favoritePlaceholder, { opacity: pulseAnim }]} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.titlePriceRow}>
          <Animated.View style={[styles.titlePlaceholder, { opacity: pulseAnim }]} />
          <Animated.View style={[styles.pricePlaceholder, { opacity: pulseAnim }]} />
        </View>

        <View style={styles.locationRow}>
          <Animated.View style={[styles.locationIconPlaceholder, { opacity: pulseAnim }]} />
          <Animated.View style={[styles.locationTextPlaceholder, { opacity: pulseAnim }]} />
        </View>

        <View style={styles.specsRow}>
          <View style={styles.specsGroup}>
            <Animated.View style={[styles.specPillPlaceholder, { opacity: pulseAnim }]} />
            <Animated.View style={[styles.specPillPlaceholder, { opacity: pulseAnim }]} />
            <Animated.View style={[styles.specPillPlaceholder, { opacity: pulseAnim }]} />
          </View>

          <Animated.View style={[styles.actionButtonPlaceholder, { opacity: pulseAnim }]} />
        </View>
      </View>
    </View>
  );
};

//-------------------- Styles ----------------------
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 220,
    width: '100%',
    backgroundColor: '#E8E4DC',
    position: 'relative',
  },
  imagePlaceholder: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#DED9CE',
  },
  typeBadgePlaceholder: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    width: 64,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  favoritePlaceholder: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
  },
  infoContainer: {
    padding: 18,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titlePlaceholder: {
    width: '58%',
    height: 20,
    borderRadius: 6,
    backgroundColor: '#E2DDD4',
  },
  pricePlaceholder: {
    width: '24%',
    height: 20,
    borderRadius: 6,
    backgroundColor: '#E2DDD4',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIconPlaceholder: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D8D3C8',
    marginRight: 6,
  },
  locationTextPlaceholder: {
    width: '42%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#EAE6DD',
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  specsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  specPillPlaceholder: {
    width: 66,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#EFEBE3',
  },
  actionButtonPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E2DDD4',
  },
});
