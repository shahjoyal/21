import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { AuthModal } from '../components/AuthModal';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { WorkshopInquiryModal } from '../components/WorkshopInquiryModal';
import { MobileStickyCartBar } from '../components/MobileStickyCartBar';
import { HelperChat } from '../components/HelperChat';
import { MessageCircle } from 'lucide-react';
import { CartItem, ModakProduct, StoreSettings } from '../types';

export interface OutletContextType {
  language: 'en' | 'mr';
  onToggleLanguage: () => void;
  products: ModakProduct[];
  settings: StoreSettings;
  cart: CartItem[];
  onAddToCart: (item: CartItem) => void;
  onOpenQuickView: (product: ModakProduct) => void;
  onOpenBulkInquiry: () => void;
  selectedDeliverySlot: string;
  onSelectDeliverySlot: (slot: string) => void;
  deliveryDate: string;
  onChangeDeliveryDate: (date: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
}

interface LayoutProps {
  ctx: OutletContextType;
  isCartOpen: boolean;
  onCloseCart: () => void;
  isAuthOpen: boolean;
  onCloseAuth: () => void;
  onAuthenticated: () => void;
  isHelperOpen: boolean;
  onOpenHelper: () => void;
  onCloseHelper: () => void;
  isBulkInquiryOpen: boolean;
  onCloseBulkInquiry: () => void;
  quickViewProduct: ModakProduct | null;
  onCloseQuickView: () => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onExploreMenu: () => void;
  onExploreWorkshops: () => void;
}

/**
 * Shared shell rendered around every route: sticky nav, footer, and all the
 * global overlays (cart drawer, auth, quick view, helper chat, WhatsApp
 * button). Route pages receive shared app state via useOutletContext().
 */
export const Layout: React.FC<LayoutProps> = ({
  ctx,
  isCartOpen,
  onCloseCart,
  isAuthOpen,
  onCloseAuth,
  onAuthenticated,
  isHelperOpen,
  onOpenHelper,
  onCloseHelper,
  isBulkInquiryOpen,
  onCloseBulkInquiry,
  quickViewProduct,
  onCloseQuickView,
  onOpenCart,
  onOpenAuth,
  onExploreMenu,
  onExploreWorkshops,
}) => {
  const cleanPhone = (ctx.settings.whatsappNumber || '+917304472460').replace(/[^0-9]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello 21 Kalya Culinary Studio! I would like to inquire about Modak Masterclasses & Artisan Orders.'
  )}`;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#FAF7F2] text-[#1E2923] font-sans selection:bg-[#EDA124] selection:text-[#18564D] pb-24 sm:pb-0">
      <Navbar
        cart={ctx.cart}
        onOpenCart={onOpenCart}
        onShopNowModaks={onExploreMenu}
        onOpenBulkInquiry={ctx.onOpenBulkInquiry}
        onOpenHelper={onOpenHelper}
        onOpenAuth={onOpenAuth}
        language={ctx.language}
        onToggleLanguage={ctx.onToggleLanguage}
      />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Outlet context={ctx} />
      </main>

      <Footer onOpenBulkInquiry={ctx.onOpenBulkInquiry} language={ctx.language} />

      <MobileStickyCartBar
        cart={ctx.cart}
        onOpenCart={onOpenCart}
        onExploreMenu={onExploreMenu}
        language={ctx.language}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={onCloseCart}
        cart={ctx.cart}
        onUpdateQuantity={ctx.onUpdateQuantity}
        onRemoveItem={ctx.onRemoveItem}
        onProceedToCheckout={ctx.onProceedToCheckout}
        selectedDeliverySlot={ctx.selectedDeliverySlot}
        onSelectDeliverySlot={ctx.onSelectDeliverySlot}
        deliveryDate={ctx.deliveryDate}
        onChangeDeliveryDate={ctx.onChangeDeliveryDate}
        language={ctx.language}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={onCloseAuth}
        onAuthenticated={onAuthenticated}
        language={ctx.language}
      />

      <ProductDetailModal
        product={quickViewProduct}
        onClose={onCloseQuickView}
        onAddToCart={ctx.onAddToCart}
        language={ctx.language}
      />

      <WorkshopInquiryModal
        isOpen={isBulkInquiryOpen}
        onClose={onCloseBulkInquiry}
        language={ctx.language}
      />

      <HelperChat
        isOpen={isHelperOpen}
        onOpen={onOpenHelper}
        onClose={onCloseHelper}
        onNavigateToWorkshops={onExploreWorkshops}
        onNavigateToProducts={onExploreMenu}
      />

      {!isHelperOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-30 flex flex-col items-end gap-2">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 sm:p-3 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group"
            aria-label="Chat on WhatsApp with 21 Kalya Modak Studio"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold font-devanagari pr-1">
              {ctx.language === 'mr' ? 'व्हॉट्सॲप' : 'WhatsApp'}
            </span>
          </a>
        </div>
      )}
    </div>
  );
};
