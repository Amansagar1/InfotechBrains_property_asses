import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { MessageThread } from '../../types/message';
import { Icons } from '../common/Icons';
import { fontFamilies } from '../../theme/typography';

export interface MessageCardProps {
  thread: MessageThread;
  onPress: () => void;
  onPressProperty: () => void;
  style?: ViewStyle;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  thread,
  onPress,
  onPressProperty,
  style,
}) => {
  const { contact, property, lastMessage, timestamp, unreadCount } = thread;

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={[styles.card, style]}
    >
      {/* Top Header: Avatar + Contact Info + Time/Chevron/Badge */}
      <View style={styles.headerRow}>
        {/* Left: Avatar with Status Dot */}
        <View style={styles.avatarContainer}>
          <Image
            source={contact.avatar}
            style={styles.avatarImage}
            resizeMode="cover"
          />
          <View
            style={[
              styles.statusDot,
              contact.isOnline ? styles.statusDotOnline : styles.statusDotOffline,
            ]}
          />
        </View>

        {/* Middle: Contact Name + Role */}
        <View style={styles.contactInfo}>
          <Text style={styles.contactName} numberOfLines={1}>
            {contact.name}
          </Text>
          <Text style={styles.contactRole} numberOfLines={1}>
            {contact.role}
          </Text>
        </View>

        {/* Right: Timestamp, Chevron & Unread Badge */}
        <View style={styles.rightMetaContainer}>
          <View style={styles.timeChevronRow}>
            <Text style={styles.timestampText}>{timestamp}</Text>
            <Icons.ChevronRight size={15} color="#4B5563" />
          </View>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Message Snippet */}
      <Text style={styles.messageSnippet} numberOfLines={2}>
        {lastMessage}
      </Text>

      {/* Attached Property Snippet Card */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onPressProperty}
        style={styles.propertyPreviewContainer}
      >
        <Image
          source={property.image}
          style={styles.propertyImage}
          resizeMode="cover"
        />
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyTitle} numberOfLines={1}>
            {property.title}
          </Text>
          <Text style={styles.propertyLocation} numberOfLines={1}>
            {property.location}
          </Text>
          <Text style={styles.propertyPrice}>{property.price}</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'relative',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 13,
    height: 13,
    borderRadius: 6.5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statusDotOnline: {
    backgroundColor: '#10B981',
  },
  statusDotOffline: {
    backgroundColor: '#9CA3AF',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 6,
    justifyContent: 'center',
  },
  contactName: {
    fontFamily: fontFamilies.heading,
    fontSize: 17.5,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.2,
  },
  contactRole: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  rightMetaContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 110,
  },
  timeChevronRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 0,
  },
  timestampText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 4,
    flexShrink: 0,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1E3E2F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginTop: 6,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
  messageSnippet: {
    fontSize: 14,
    lineHeight: 20.5,
    color: '#4B5563',
    marginTop: 10,
    marginBottom: 12,
  },
  propertyPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F5F0',
    borderRadius: 16,
    padding: 8,
  },
  propertyImage: {
    width: 96,
    height: 68,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  propertyInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  propertyTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 15.5,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.2,
  },
  propertyLocation: {
    fontSize: 12.5,
    color: '#6B7280',
    marginTop: 2,
  },
  propertyPrice: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#111827',
    marginTop: 3,
  },
});
