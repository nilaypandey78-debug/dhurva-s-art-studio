export type ArtworkCategory = 'all' | 'painting' | 'sculpture' | 'limited-edition';

export type ArtworkStatus = 'Available' | 'Reserved' | 'Sold';

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  artistOrigin: string;
  year: number;
  medium: string;
  dimensions: string;
  price: number;
  category: 'painting' | 'sculpture' | 'limited-edition';
  image: string;
  exhibition: string;
  provenance: string;
  certificateCode: string;
  description: string;
  status: ArtworkStatus;
  featured?: boolean;
  scaleHeightCm: number;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  origin: string;
  bio: string;
  statement: string;
  portrait: string;
  disciplines: string[];
  activeExhibitions: string[];
  education: string;
}

export interface FramingOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface CartItem {
  artwork: Artwork;
  framing: FramingOption;
  customNotes?: string;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  suite?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  deliveryInstructions?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerDetails;
  items: {
    artworkId: string;
    title: string;
    artist: string;
    price: number;
    framingName: string;
    framingPrice: number;
    image: string;
    medium: string;
    dimensions: string;
    certificateCode: string;
  }[];
  subtotal: number;
  shippingOption: {
    name: string;
    price: number;
    description: string;
  };
  totalAmount: number;
  paymentMethod: string;
  paymentReference: string;
  status: 'Processing' | 'Curated & Packaged' | 'In Transit (Insured)' | 'Delivered';
  courierTracking?: string;
}
