import { MessageThread } from '../types/message';

export const INITIAL_MESSAGES: MessageThread[] = [
  {
    id: 'msg-1',
    contact: {
      id: 'agent-rohit',
      name: 'Rohit Sharma',
      role: 'Property Consultant',
      avatar: require('../assets/images/agent_rohit.jpg'),
      isOnline: true,
      phone: '+91 98450 12345',
    },
    lastMessage:
      'Hi Aman, the Maplewood Villa is available for site visit this weekend. Please let me know your preferred time.',
    timestamp: '10:30\u00A0AM',
    unreadCount: 2,
    isArchived: false,
    property: {
      id: 'prop-1',
      title: 'Maplewood Villa',
      location: 'Whitefield, Bangalore',
      price: '₹ 2.4 Cr',
      image: require('../assets/images/saved_maplewood.jpg'),
    },
    messages: [
      {
        id: 'm1-1',
        sender: 'user',
        text: 'Hi Rohit, I am interested in visiting Maplewood Villa.',
        timestamp: '10:15 AM',
      },
      {
        id: 'm1-2',
        sender: 'contact',
        text: 'Hello Aman! Great to connect with you.',
        timestamp: '10:20 AM',
      },
      {
        id: 'm1-3',
        sender: 'contact',
        text: 'Hi Aman, the Maplewood Villa is available for site visit this weekend. Please let me know your preferred time.',
        timestamp: '10:30 AM',
      },
    ],
  },
  {
    id: 'msg-2',
    contact: {
      id: 'agent-priya',
      name: 'Priya Nair',
      role: 'Sales Executive',
      avatar: require('../assets/images/agent_priya.jpg'),
      isOnline: true,
      phone: '+91 98765 43210',
    },
    lastMessage:
      'Thanks for your interest in Serene Heights. Would you like to schedule a visit this week?',
    timestamp: 'Yesterday',
    unreadCount: 1,
    isArchived: false,
    property: {
      id: 'prop-2',
      title: 'Serene Heights',
      location: 'Sarjapur Road, Bangalore',
      price: '₹ 1.35 Cr',
      image: require('../assets/images/saved_serene.jpg'),
    },
    messages: [
      {
        id: 'm2-1',
        sender: 'user',
        text: 'Hi Priya, could you share more details about Serene Heights?',
        timestamp: 'Yesterday, 3:30 PM',
      },
      {
        id: 'm2-2',
        sender: 'contact',
        text: 'Thanks for your interest in Serene Heights. Would you like to schedule a visit this week?',
        timestamp: 'Yesterday, 4:15 PM',
      },
    ],
  },
  {
    id: 'msg-3',
    contact: {
      id: 'agent-arjun',
      name: 'Arjun Mehta',
      role: 'Verified Owner',
      avatar: require('../assets/images/agent_arjun.jpg'),
      isOnline: false,
      phone: '+91 91234 56789',
    },
    lastMessage:
      'The property is still available. Let me know if you have any questions.',
    timestamp: '12 Oct 2026',
    unreadCount: 0,
    isArchived: false,
    property: {
      id: 'prop-3',
      title: 'Willow Creek Residence',
      location: 'Electronic City, Bangalore',
      price: '₹ 85 Lakh',
      image: require('../assets/images/saved_willow.jpg'),
    },
    messages: [
      {
        id: 'm3-1',
        sender: 'user',
        text: 'Is the pricing negotiable for Willow Creek?',
        timestamp: '11 Oct 2026, 11:00 AM',
      },
      {
        id: 'm3-2',
        sender: 'contact',
        text: 'The property is still available. Let me know if you have any questions.',
        timestamp: '12 Oct 2026, 2:45 PM',
      },
    ],
  },
  {
    id: 'msg-4',
    contact: {
      id: 'agent-neha',
      name: 'Neha Kapoor',
      role: 'Property Consultant',
      avatar: require('../assets/images/agent_neha.jpg'),
      isOnline: false,
      phone: '+91 99887 76655',
    },
    lastMessage:
      'I have shared some additional photos of Royal Residency. Please check and let me know your thoughts.',
    timestamp: '10 Oct 2026',
    unreadCount: 0,
    isArchived: true,
    property: {
      id: 'prop-4',
      title: 'Royal Residency',
      location: 'Koramangala, Bangalore',
      price: '₹ 1.15 Cr',
      image: require('../assets/images/saved_royal.jpg'),
    },
    messages: [
      {
        id: 'm4-1',
        sender: 'contact',
        text: 'I have shared some additional photos of Royal Residency. Please check and let me know your thoughts.',
        timestamp: '10 Oct 2026, 10:10 AM',
      },
    ],
  },
];
