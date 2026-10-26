import { Property } from '../types/property';

export interface SavedPropertyItem extends Property {
  savedTimestamp: number;
}

export const INITIAL_SAVED_PROPERTIES: SavedPropertyItem[] = [];
