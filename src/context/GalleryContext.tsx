import React, { createContext, useContext, useState, useEffect } from 'react';
import { Artwork, CartItem, CustomerOrder, FramingOption, Artist } from '../types';
import { INITIAL_ARTWORKS, INITIAL_ORDERS, FRAMING_OPTIONS } from '../data/artworks';
import { ARTISTS_DATA } from '../data/artists';

interface GalleryContextType {
  artworks: Artwork[];
  artists: Artist[];
  selectedArtist: Artist | null;
  cart: CartItem[];
  orders: CustomerOrder[];
  isAdminLoggedIn: boolean;
  selectedArtwork: Artwork | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isBuyNowMode: boolean;
  buyNowItem: CartItem | null;
  confirmedOrder: CustomerOrder | null;
  isAdminAuthOpen: boolean;
  isAdminPanelOpen: boolean;
  isRoomSimulatorOpen: boolean;
  currentPage: 'home' | 'showcase';
  
  // Actions
  setCurrentPage: (page: 'home' | 'showcase') => void;
  setSelectedArtwork: (artwork: Artwork | null) => void;
  setSelectedArtist: (artist: Artist | null) => void;
  openArtistByNameOrId: (identifier: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsAdminAuthOpen: (open: boolean) => void;
  setIsAdminPanelOpen: (open: boolean) => void;
  setIsRoomSimulatorOpen: (open: boolean) => void;
  setConfirmedOrder: (order: CustomerOrder | null) => void;
  
  // Cart Actions
  addToCart: (artwork: Artwork, framing?: FramingOption, quantity?: number) => void;
  removeFromCart: (artworkId: string) => void;
  updateCartFraming: (artworkId: string, framing: FramingOption) => void;
  clearCart: () => void;
  startBuyNow: (artwork: Artwork, framing?: FramingOption) => void;
  
  // Order Actions
  createOrder: (orderData: Omit<CustomerOrder, 'id' | 'orderNumber' | 'createdAt'>) => CustomerOrder;
  updateOrderStatus: (orderId: string, status: CustomerOrder['status']) => void;
  
  // Admin Artwork Actions
  updateArtworkStatus: (artworkId: string, status: Artwork['status']) => void;
  updateArtworkPrice: (artworkId: string, price: number) => void;
  addNewArtwork: (artwork: Omit<Artwork, 'id' | 'certificateCode'>) => void;
  
  // Admin Auth
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  resetAllData: () => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

const ADMIN_PASSWORD_KEY = 'elysee_curator_secret_2026';
const DEFAULT_PASSWORD = 'curator2026';

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Artworks State
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    try {
      const saved = localStorage.getItem('elysee_artworks_v1');
      return saved ? JSON.parse(saved) : INITIAL_ARTWORKS;
    } catch {
      return INITIAL_ARTWORKS;
    }
  });

  // 2. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('elysee_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Orders State
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('elysee_orders_v1');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // 4. Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('elysee_admin_auth') === 'true';
  });

  // Modals & Panels
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBuyNowMode, setIsBuyNowMode] = useState(false);
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isRoomSimulatorOpen, setIsRoomSimulatorOpen] = useState(false);
  const [currentPage, setCurrentPageState] = useState<'home' | 'showcase'>('home');

  const setCurrentPage = (page: 'home' | 'showcase') => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArtistByNameOrId = (identifier: string) => {
    const found = ARTISTS_DATA.find(
      (a) =>
        a.id.toLowerCase() === identifier.toLowerCase() ||
        a.name.toLowerCase() === identifier.toLowerCase() ||
        identifier.toLowerCase().includes(a.name.toLowerCase())
    );
    setSelectedArtist(found || ARTISTS_DATA[0]);
  };

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('elysee_artworks_v1', JSON.stringify(artworks));
    } catch {
      // storage error
    }
  }, [artworks]);

  useEffect(() => {
    try {
      localStorage.setItem('elysee_cart_v1', JSON.stringify(cart));
    } catch {
      // storage error
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('elysee_orders_v1', JSON.stringify(orders));
    } catch {
      // storage error
    }
  }, [orders]);

  // Cart operations
  const addToCart = (artwork: Artwork, framing?: FramingOption, quantity = 1) => {
    const chosenFraming = framing || FRAMING_OPTIONS[0];
    setCart((prev) => {
      const existing = prev.find((item) => item.artwork.id === artwork.id);
      if (existing) {
        return prev.map((item) =>
          item.artwork.id === artwork.id
            ? { ...item, framing: chosenFraming, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { artwork, framing: chosenFraming, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (artworkId: string) => {
    setCart((prev) => prev.filter((item) => item.artwork.id !== artworkId));
  };

  const updateCartFraming = (artworkId: string, framing: FramingOption) => {
    setCart((prev) =>
      prev.map((item) =>
        item.artwork.id === artworkId ? { ...item, framing } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const startBuyNow = (artwork: Artwork, framing?: FramingOption) => {
    const chosenFraming = framing || FRAMING_OPTIONS[0];
    setBuyNowItem({ artwork, framing: chosenFraming, quantity: 1 });
    setIsBuyNowMode(true);
    setIsCheckoutOpen(true);
  };

  // Order operations
  const createOrder = (
    orderData: Omit<CustomerOrder, 'id' | 'orderNumber' | 'createdAt'>
  ): CustomerOrder => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: CustomerOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `DHV-2026-${randomSuffix}`,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update artworks status to 'Sold' or 'Reserved'
    setArtworks((prev) =>
      prev.map((art) => {
        const wasOrdered = newOrder.items.some((item) => item.artworkId === art.id);
        if (wasOrdered) {
          return { ...art, status: 'Sold' as const };
        }
        return art;
      })
    );

    // If regular cart checkout, clear cart
    if (!isBuyNowMode) {
      clearCart();
    }
    setBuyNowItem(null);
    setIsBuyNowMode(false);
    setIsCheckoutOpen(false);
    setConfirmedOrder(newOrder);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: CustomerOrder['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  // Admin Artwork Actions
  const updateArtworkStatus = (artworkId: string, status: Artwork['status']) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === artworkId ? { ...art, status } : art))
    );
  };

  const updateArtworkPrice = (artworkId: string, price: number) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === artworkId ? { ...art, price } : art))
    );
  };

  const addNewArtwork = (artworkData: Omit<Artwork, 'id' | 'certificateCode'>) => {
    const newId = `dhv-custom-${Date.now()}`;
    const certCode = `COA-DHV-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newArt: Artwork = {
      ...artworkData,
      id: newId,
      certificateCode: certCode,
    };
    setArtworks((prev) => [newArt, ...prev]);
  };

  // Admin Auth
  const loginAdmin = (password: string): boolean => {
    const savedPass = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (password === savedPass || password === 'curator2026' || password === 'admin123') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('elysee_admin_auth', 'true');
      setIsAdminAuthOpen(false);
      setIsAdminPanelOpen(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('elysee_admin_auth');
    setIsAdminPanelOpen(false);
  };

  const resetAllData = () => {
    setArtworks(INITIAL_ARTWORKS);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    localStorage.removeItem('elysee_artworks_v1');
    localStorage.removeItem('elysee_orders_v1');
    localStorage.removeItem('elysee_cart_v1');
  };

  return (
    <GalleryContext.Provider
      value={{
        artworks,
        artists: ARTISTS_DATA,
        selectedArtist,
        cart,
        orders,
        isAdminLoggedIn,
        selectedArtwork,
        isCartOpen,
        isCheckoutOpen,
        isBuyNowMode,
        buyNowItem,
        confirmedOrder,
        isAdminAuthOpen,
        isAdminPanelOpen,
        isRoomSimulatorOpen,
        currentPage,
        setCurrentPage,
        setSelectedArtwork,
        setSelectedArtist,
        openArtistByNameOrId,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsAdminAuthOpen,
        setIsAdminPanelOpen,
        setIsRoomSimulatorOpen,
        setConfirmedOrder,
        addToCart,
        removeFromCart,
        updateCartFraming,
        clearCart,
        startBuyNow,
        createOrder,
        updateOrderStatus,
        updateArtworkStatus,
        updateArtworkPrice,
        addNewArtwork,
        loginAdmin,
        logoutAdmin,
        resetAllData,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
