import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { colors } from '../../theme/colors';

interface IconProps {
  size?: number;
  color?: string;
}

export const Icons = {
  Bed: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 7V17M3 13H21M21 7V17M7 10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9C6.55228 9 7 9.44772 7 10ZM10 13V10C10 9.44772 10.4477 9 11 9H19C19.5523 9 20 9.44772 20 10V13"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Bath: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12H20C20 15.3137 17.3137 18 14 18H10C6.68629 18 4 15.3137 4 12ZM4 12V6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6V12M6 18V20M18 18V20"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Sqft: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 3H21M21 3V9M21 3L14 10M9 21H3M3 21V15M3 21L10 14"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Pin: ({ size = 16, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21C16 16.5 19 13.5 19 9.5C19 5.35786 15.866 2 12 2C8.13401 2 5 5.35786 5 9.5C5 13.5 8 16.5 12 21Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="9.5" r="2.5" stroke={color} strokeWidth="1.8" />
    </Svg>
  ),

  Home: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10L12 3L21 10V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 21V13H15V21"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Heart: ({ size = 20, color = colors.textPrimary, filled = false }: IconProps & { filled?: boolean }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
      <Path
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Share: ({ size = 20, color = colors.textPrimary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V12M12 3V15M12 3L7 8M12 3L17 8"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  ArrowRight: ({ size = 18, color = colors.textLight }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  ArrowLeft: ({ size = 20, color = colors.textPrimary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Search: ({ size = 18, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth="1.8" />
      <Path d="M20 20L16 16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),

  Filter: ({ size = 20, color = colors.textLight }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8H13M19 8H20M4 16H7M13 16H20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="16" cy="8" r="2.5" stroke={color} strokeWidth="2" fill="none" />
      <Circle cx="10" cy="16" r="2.5" stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  ),

  Calendar: ({ size = 18, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke={color}
        strokeWidth="1.8"
      />
      <Path d="M16 2V6M8 2V6M3 10H21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),

  Clock: ({ size = 18, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
      <Path d="M12 7V12L15 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),

  User: ({ size = 18, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.8" />
      <Path
        d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  ),

  Mail: ({ size = 18, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="1.8" />
      <Path d="M3 7L12 13L21 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),

  Phone: ({ size = 18, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 4H9L11 8.5L8.5 10.5C9.5 12.8 11.2 14.5 13.5 15.5L15.5 13L20 15V19C20 20.1 19.1 21 18 21C9.72 21 3 14.28 3 6C3 4.9 3.9 4 5 4Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Lock: ({ size = 16, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="11" width="16" height="10" rx="2" stroke={color} strokeWidth="1.8" />
      <Path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke={color} strokeWidth="1.8" />
    </Svg>
  ),

  Checkmark: ({ size = 20, color = colors.textLight }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 13L9 17L19 7" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),

  Close: ({ size = 20, color = colors.textPrimary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 18L18 6M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),

  ChevronDown: ({ size = 18, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),

  ChevronRight: ({ size = 18, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),

  Send: ({ size = 18, color = colors.textLight }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),

  Chat: ({ size = 20, color = colors.textPrimary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 11.5C21 16.1944 16.9706 20 12 20C10.4286 20 8.94827 19.6179 7.66667 18.946L3 20L4.2 16.4C3.44762 15.011 3 13.342 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Garden: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22V13M12 13C12 7 19 6 19 6C19 6 19 13 12 13ZM12 13C12 7 5 6 5 6C5 6 5 13 12 13Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Parking: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="3" width="16" height="18" rx="3" stroke={color} strokeWidth="1.8" />
      <Path d="M9 16V8H13C14.1046 8 15 8.89543 15 10C15 11.1046 14.1046 12 13 12H9" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),

  Security: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3L20 6.5V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6.5L12 3Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M9 12L11 14L15 10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),

  ClubHouse: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10L12 3L21 10V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10Z"
        stroke={color}
        strokeWidth="1.8"
      />
      <Circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.8" />
    </Svg>
  ),

  Info: ({ size = 18, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
      <Path d="M12 16V12M12 8H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  ),

  Bookmark: ({ size = 20, color = colors.textPrimary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 21L12 16.5L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  ExpandSquare: ({ size = 16, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 3H21V9M21 3L10 14M10 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21H17C18.1046 21 19 20.1046 19 19V14"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  CalendarCheck: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2.5"
        stroke={color}
        strokeWidth="1.8"
      />
      <Path d="M16 2V6M8 2V6M3 9.5H21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Path
        d="M9 15L11 17L15 13"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  MessageDots: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 11.5C21 16.1944 16.9706 20 12 20C10.4286 20 8.94827 19.6179 7.66667 18.946L3 20L4.2 16.4C3.44762 15.011 3 13.342 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="8.5" cy="11.5" r="1.2" fill={color} />
      <Circle cx="12" cy="11.5" r="1.2" fill={color} />
      <Circle cx="15.5" cy="11.5" r="1.2" fill={color} />
    </Svg>
  ),

  MoreVertical: ({ size = 18, color = colors.textPrimary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="5" r="1.8" fill={color} />
      <Circle cx="12" cy="12" r="1.8" fill={color} />
      <Circle cx="12" cy="19" r="1.8" fill={color} />
    </Svg>
  ),

  Bell: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21A2 2 0 0 1 10.27 21"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Settings: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8" />
      <Path
        d="M19.4 15A1.65 1.65 0 0 0 19.73 16.82L19.86 16.95A2 2 0 1 1 17 19.83L16.87 19.7A1.65 1.65 0 0 0 15.05 19.37A1.65 1.65 0 0 0 14 20.9V21A2 2 0 1 1 10 21V20.89A1.65 1.65 0 0 0 8.95 19.37A1.65 1.65 0 0 0 7.13 19.7L7 19.83A2 2 0 1 1 4.14 17L4.27 16.87A1.65 1.65 0 0 0 4.6 15.05A1.65 1.65 0 0 0 3.1 14H3A2 2 0 1 1 3 10H3.11A1.65 1.65 0 0 0 4.63 8.95A1.65 1.65 0 0 0 4.3 7.13L4.17 7A2 2 0 1 1 7 4.14L7.13 4.27A1.65 1.65 0 0 0 8.95 4.6A1.65 1.65 0 0 0 10 3.1V3A2 2 0 1 1 14 3V3.11A1.65 1.65 0 0 0 15.05 4.63A1.65 1.65 0 0 0 16.87 4.3L17 4.17A2 2 0 1 1 19.83 7L19.7 7.13A1.65 1.65 0 0 0 19.37 8.95A1.65 1.65 0 0 0 20.9 10H21A2 2 0 1 1 21 14H20.89A1.65 1.65 0 0 0 19.4 15Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  LogOut: ({ size = 20, color = '#DC2626' }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 17L21 12L16 7"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 12H9"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Pencil: ({ size = 14, color = '#FFFFFF' }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 3A2.82843 2.82843 0 1 1 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Shield: ({ size = 20, color = colors.textSecondary }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
};

