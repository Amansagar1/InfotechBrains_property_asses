import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Property } from './property';
import { BookingConfirmation } from './booking';

export type BottomTabParamList = {
  Discover: undefined;
  Saved: undefined;
  Visits: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList>;
  PropertyDetails: {
    propertyId: string;
    initialProperty?: Property;
  };
  BookVisit: {
    property: Property;
  };
  BookingConfirmation: {
    confirmation: BookingConfirmation;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type BottomTabProps<T extends keyof BottomTabParamList> = BottomTabScreenProps<
  BottomTabParamList,
  T
>;

export type DiscoverScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Discover'>,
  NativeStackScreenProps<RootStackParamList>
>;
