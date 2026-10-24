import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Linking,
} from 'react-native';
import { MessagesScreenProps } from '../../types/navigation';
import { MessageThread, MessageFilterTab, ChatMessage } from '../../types/message';
import { INITIAL_MESSAGES } from '../../constants/messages';
import { MessageCard } from '../../components/message/MessageCard';
import { Icons } from '../../components/common/Icons';
import { fontFamilies } from '../../theme/typography';

const botanicalRight = require('../../assets/images/details_botanical_clean.png');

export const MessagesScreen: React.FC<MessagesScreenProps> = ({ navigation }) => {
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_MESSAGES);
  const [activeTab, setActiveTab] = useState<MessageFilterTab>('all');
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [inputText, setInputText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Compute counts for tabs
  const allCount = threads.length;
  const unreadCount = threads.filter(t => t.unreadCount > 0).length;
  const archivedCount = threads.filter(t => t.isArchived).length;

  // Filtered threads based on selected tab
  const filteredThreads = useMemo(() => {
    if (activeTab === 'unread') {
      return threads.filter(t => t.unreadCount > 0);
    }
    if (activeTab === 'archived') {
      return threads.filter(t => t.isArchived);
    }
    return threads;
  }, [threads, activeTab]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const handleOpenThread = (thread: MessageThread) => {
    // Mark as read
    if (thread.unreadCount > 0) {
      setThreads(prev =>
        prev.map(t => (t.id === thread.id ? { ...t, unreadCount: 0 } : t))
      );
    }
    setSelectedThread({ ...thread, unreadCount: 0 });
  };

  const handleNavigateProperty = (propertyId: string) => {
    if (selectedThread) {
      setSelectedThread(null);
    }
    navigation.navigate('PropertyDetails', {
      propertyId,
    });
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || !selectedThread) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    const updatedThread: MessageThread = {
      ...selectedThread,
      lastMessage: text,
      timestamp: 'Just now',
      unreadCount: 0,
      messages: [...selectedThread.messages, newMessage],
    };

    setThreads(prev =>
      prev.map(t => (t.id === selectedThread.id ? updatedThread : t))
    );
    setSelectedThread(updatedThread);
    setInputText('');

    // Simulated reply after 1.5s
    setTimeout(() => {
      const replyMessage: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'contact',
        text: 'Thank you for your message! I will get back to you with the details shortly.',
        timestamp: 'Just now',
      };
      setThreads(prev =>
        prev.map(t =>
          t.id === updatedThread.id
            ? {
                ...t,
                lastMessage: replyMessage.text,
                messages: [...t.messages, replyMessage],
              }
            : t
        )
      );
      setSelectedThread(curr =>
        curr && curr.id === updatedThread.id
          ? {
              ...curr,
              lastMessage: replyMessage.text,
              messages: [...curr.messages, replyMessage],
            }
          : curr
      );
    }, 1200);
  };

  const handleCallContact = (phone?: string) => {
    if (phone) {
      Linking.openURL(`tel:${phone}`).catch(() => {});
    }
  };

  const QUICK_REPLIES = [
    'I would like to visit this Saturday',
    'Please share more photos',
    'Is the price negotiable?',
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Decorative Organic Blob & Botanical Leaf top-right */}
      <View style={styles.blobBackground} pointerEvents="none" />
      <Image
        source={botanicalRight}
        style={styles.botanicalImage}
        resizeMode="contain"
        pointerEvents="none"
      />

      {/* Title & Subtitle */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>
          Connect with property owners and agents.
        </Text>
      </View>

      {/* Segmented Filter Pills */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setActiveTab('all')}
          style={[styles.tabButton, activeTab === 'all' && styles.tabButtonActive]}
        >
          <Text
            style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}
          >
            All ({allCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setActiveTab('unread')}
          style={[
            styles.tabButton,
            activeTab === 'unread' && styles.tabButtonActive,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'unread' && styles.tabTextActive,
            ]}
          >
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setActiveTab('archived')}
          style={[
            styles.tabButton,
            activeTab === 'archived' && styles.tabButtonActive,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'archived' && styles.tabTextActive,
            ]}
          >
            Archived ({archivedCount})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={filteredThreads}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <MessageCard
            thread={item}
            onPress={() => handleOpenThread(item)}
            onPressProperty={() => handleNavigateProperty(item.property.id)}
          />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Icons.MessageDots size={32} color="#1E3E2F" />
            </View>
            <Text style={styles.emptyTitle}>No messages found</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'unread'
                ? "You're all caught up! No unread messages."
                : activeTab === 'archived'
                ? 'No archived conversations.'
                : 'Start a conversation with property owners or agents.'}
            </Text>
          </View>
        }
      />

      {/* Simulated Interactive Chat Modal */}
      {selectedThread && (
        <Modal
          visible={true}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedThread(null)}
        >
          <SafeAreaView style={styles.chatSafeArea}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.chatContainer}
            >
              {/* Chat Header */}
              <View style={styles.chatHeader}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelectedThread(null)}
                  style={styles.chatBackButton}
                >
                  <Icons.ArrowLeft size={22} color="#111827" />
                </TouchableOpacity>

                <View style={styles.chatContactAvatar}>
                  <Image
                    source={selectedThread.contact.avatar}
                    style={styles.chatAvatarImage}
                  />
                  <View
                    style={[
                      styles.chatStatusDot,
                      selectedThread.contact.isOnline
                        ? styles.statusDotOnline
                        : styles.statusDotOffline,
                    ]}
                  />
                </View>

                <View style={styles.chatContactText}>
                  <Text style={styles.chatContactName} numberOfLines={1}>
                    {selectedThread.contact.name}
                  </Text>
                  <Text style={styles.chatContactRole} numberOfLines={1}>
                    {selectedThread.contact.role} •{' '}
                    {selectedThread.contact.isOnline ? 'Online' : 'Offline'}
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => handleCallContact(selectedThread.contact.phone)}
                  style={styles.chatCallButton}
                >
                  <Icons.Phone size={18} color="#1E3E2F" />
                </TouchableOpacity>
              </View>

              {/* Property Banner in Chat */}
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => handleNavigateProperty(selectedThread.property.id)}
                style={styles.chatPropertyBanner}
              >
                <Image
                  source={selectedThread.property.image}
                  style={styles.chatPropertyImage}
                  resizeMode="cover"
                />
                <View style={styles.chatPropertyDetails}>
                  <Text style={styles.chatPropertyTitle} numberOfLines={1}>
                    {selectedThread.property.title}
                  </Text>
                  <Text style={styles.chatPropertyLocation} numberOfLines={1}>
                    {selectedThread.property.location}
                  </Text>
                  <Text style={styles.chatPropertyPrice}>
                    {selectedThread.property.price}
                  </Text>
                </View>
                <View style={styles.viewPropertyChip}>
                  <Text style={styles.viewPropertyText}>View</Text>
                  <Icons.ChevronRight size={14} color="#1E3E2F" />
                </View>
              </TouchableOpacity>

              {/* Message Bubbles ScrollView */}
              <ScrollView
                style={styles.messagesScroll}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
              >
                {selectedThread.messages.map(msg => {
                  const isUser = msg.sender === 'user';
                  return (
                    <View
                      key={msg.id}
                      style={[
                        styles.messageRow,
                        isUser ? styles.messageRowUser : styles.messageRowContact,
                      ]}
                    >
                      <View
                        style={[
                          styles.messageBubble,
                          isUser
                            ? styles.messageBubbleUser
                            : styles.messageBubbleContact,
                        ]}
                      >
                        <Text
                          style={[
                            styles.messageBubbleText,
                            isUser
                              ? styles.messageBubbleTextUser
                              : styles.messageBubbleTextContact,
                          ]}
                        >
                          {msg.text}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.messageTimestamp,
                          isUser
                            ? styles.messageTimestampUser
                            : styles.messageTimestampContact,
                        ]}
                      >
                        {msg.timestamp}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>

              {/* Quick Reply Pills */}
              <View style={styles.quickRepliesContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.quickRepliesScroll}
                >
                  {QUICK_REPLIES.map((reply, index) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      onPress={() => handleSendMessage(reply)}
                      style={styles.quickReplyChip}
                    >
                      <Text style={styles.quickReplyText}>{reply}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Bottom Input Bar */}
              <View style={styles.inputBarContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type a message..."
                  placeholderTextColor="#9CA3AF"
                  value={inputText}
                  onChangeText={setInputText}
                  multiline={false}
                  onSubmitEditing={() => handleSendMessage()}
                  returnKeyType="send"
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  style={[
                    styles.sendButton,
                    !inputText.trim() && styles.sendButtonDisabled,
                  ]}
                >
                  <Icons.Send size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  listContent: {
    paddingBottom: 24,
  },
  header: {
    position: 'relative',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 12 : 16,
    paddingHorizontal: 16,
    paddingBottom: 4,
    overflow: 'hidden',
  },
  blobBackground: {
    position: 'absolute',
    top: -25,
    right: -25,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#ECE7DC',
    opacity: 0.65,
  },
  botanicalImage: {
    position: 'absolute',
    top: -10,
    right: -5,
    width: 95,
    height: 175,
    opacity: 0.85,
  },
  titleContainer: {
    marginBottom: 16,
    maxWidth: '75%',
  },
  headerTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14.5,
    color: '#6B7280',
    marginTop: 5,
    lineHeight: 21,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    padding: 3,
    marginBottom: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabButtonActive: {
    backgroundColor: '#1E3E2F',
  },
  tabText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#374151',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EBE6DA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },

  /* Chat Modal Styles */
  chatSafeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 8 : 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEAE4',
  },
  chatBackButton: {
    padding: 6,
    marginRight: 6,
  },
  chatContactAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    position: 'relative',
  },
  chatAvatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E7EB',
  },
  chatStatusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 11,
    height: 11,
    borderRadius: 5.5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statusDotOnline: {
    backgroundColor: '#10B981',
  },
  statusDotOffline: {
    backgroundColor: '#9CA3AF',
  },
  chatContactText: {
    flex: 1,
    marginLeft: 12,
  },
  chatContactName: {
    fontFamily: fontFamilies.heading,
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  chatContactRole: {
    fontSize: 12.5,
    color: '#6B7280',
    marginTop: 1,
  },
  chatCallButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EDF5F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatPropertyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 6,
    padding: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECEAE4',
  },
  chatPropertyImage: {
    width: 60,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  chatPropertyDetails: {
    flex: 1,
    marginLeft: 10,
  },
  chatPropertyTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  chatPropertyLocation: {
    fontSize: 11.5,
    color: '#6B7280',
    marginTop: 1,
  },
  chatPropertyPrice: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#111827',
  },
  viewPropertyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3EFE6',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  viewPropertyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E3E2F',
    marginRight: 2,
  },
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
  messageRow: {
    marginBottom: 14,
    maxWidth: '82%',
  },
  messageRowUser: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageRowContact: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  messageBubbleUser: {
    backgroundColor: '#1E3E2F',
    borderBottomRightRadius: 4,
  },
  messageBubbleContact: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECEAE4',
    borderBottomLeftRadius: 4,
  },
  messageBubbleText: {
    fontSize: 14.5,
    lineHeight: 20,
  },
  messageBubbleTextUser: {
    color: '#FFFFFF',
  },
  messageBubbleTextContact: {
    color: '#111827',
  },
  messageTimestamp: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  messageTimestampUser: {
    textAlign: 'right',
    marginRight: 4,
  },
  messageTimestampContact: {
    textAlign: 'left',
    marginLeft: 4,
  },
  quickRepliesContainer: {
    paddingVertical: 6,
    backgroundColor: '#FAF8F5',
  },
  quickRepliesScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  quickReplyChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D4C8',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
  },
  quickReplyText: {
    fontSize: 12.5,
    color: '#374151',
    fontWeight: '500',
  },
  inputBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ECEAE4',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F5F3EF',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 14.5,
    color: '#111827',
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E3E2F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.5,
  },
});
