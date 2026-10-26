import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  ImageStyle,
  StyleProp,
  Text,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { APP_CONFIG } from '../../constants/config';
import { colors } from '../../theme/colors';
import { Icons } from './Icons';
import { resolveImageUrl } from '../../utils/imageHelper';

export interface PropertyImageProps {
  uri?: string;
  style?: StyleProp<ViewStyle | ImageStyle>;
  resizeMode?: 'cover' | 'contain';
  propertyType?: string;
}

export const PropertyImage: React.FC<PropertyImageProps> = ({
  uri,
  style,
  resizeMode = 'cover',
  propertyType,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (!uri || hasError) {
    return (
      <View style={[styles.fallbackContainer, style]}>
        <View style={styles.iconCircle}>
          <Icons.Home size={28} color={colors.primary} />
        </View>
        {propertyType ? (
          <Text style={styles.fallbackType}>{propertyType}</Text>
        ) : null}
      </View>
    );
  }

  const fullUrl = resolveImageUrl(uri, propertyType);
  const isSvg = fullUrl.toLowerCase().includes('.svg');

  return (
    <View style={[styles.container, style]}>
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}

      {isSvg ? (
        <SvgUri
          uri={fullUrl}
          width="100%"
          height="100%"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      ) : (
        <Image
          source={{ uri: fullUrl }}
          style={styles.image}
          resizeMode={resizeMode}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAE6DC',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(234, 230, 220, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  fallbackContainer: {
    backgroundColor: '#EFECE6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  fallbackType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#525252',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  captionBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 2,
  },
  captionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
  },
});
