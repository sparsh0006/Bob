import { Bottle } from './Bottle';

export interface User {
  username: string;
  displayName?: string;
  barId?: string;
  joinDate?: string;
}

export interface UserPreferences {
  favoriteRegions: string[];
  favoriteDistillers: string[];
  favoriteTypes: string[];
  priceRange: {
    min: number;
    max: number;
  };
  tastePreferences: {
    sweet: number;
    fruity: number;
    floral: number;
    spicy: number;
    woody: number;
    smoky: number;
    peaty: number;
  };
}

export interface UserBar {
  user: User;
  bottles: Bottle[];
  wishlist: Bottle[];
}