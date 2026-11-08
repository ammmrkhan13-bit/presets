import React, { useState, useEffect, useRef, useMemo } from 'react';

// ==========================================
// 1. ZERO-DEPENDENCY INLINE SVG ICON COMPONENT
// Defined at the very top so <Icon /> never throws ReferenceError
// ==========================================
function Icon({ name, className = 'w-4 h-4' }) {
  const iconPaths = {
    bag: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0',
    trash: 'M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M10 11v6 M14 11v6',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
    sparkles: 'M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z',
    upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
    sheet: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h8 M10 9H8',
    download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
    check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3',
    xcircle: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M15 15l-6-6 M9 15l6-6',
    whatsapp: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
    message: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35',
    zoom: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35 M11 8v6 M8 11h6',
    bot: 'M12 8V4H8 M4 12v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z M9 15h.01 M15 15h.01',
    lock: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4',
    plus: 'M12 5v14 M5 12h14',
    edit: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
    ruler: 'M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z M14.5 12.5l2-2 M11.5 9.5l2-2 M8.5 6.5l2-2',
    wand: 'M15 4V2 M15 16v-2 M8 9h2 M20 9h2 M17.8 5.2L19 4 M16.2 15.8L19 17 M3 21l9-9 M12.2 6.2L11 5',
    x: 'M18 6L6 18 M6 6l12 12',
    arrowRight: 'M5 12h14 M12 5l7 7-7 7',
    chevronLeft: 'M15 18l-6-6 6-6',
    sliders: 'M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6',
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    power: 'M18.36 6.64a9 9 0 1 1-12.73 0 M12 2v10'
  };

  const d = iconPaths[name] || iconPaths.sparkles;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

// ==========================================
// 2. SAFE ERROR BOUNDARY (PREVENTS OBJECT CHILD CRASHES)
// ==========================================
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message ? String(error.message) : String(error)
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0D0602] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#160B04] border border-[#FF5500] rounded-2xl p-6 space-y-4 text-center">
            <h2 className="text-lg font-black text-[#FF5500]">PRESETS Recovery Mode</h2>
            <p className="text-xs text-orange-200/80 break-words">
              {String(this.state.errorMessage || 'Unexpected rendering error')}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, errorMessage: '' })}
              className="bg-[#FF5500] text-black font-black px-5 py-2.5 rounded-xl text-xs"
            >
              Reload Storefront
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// 3. STORE CONSTANTS & SUPABASE EXACT SCHEMA ENGINE
// ==========================================
const ADMIN_EMAIL = 'ammmrkhan13@gmail.com';
const ADMIN_PASSWORD = 'Pr$v9#Kx!8Lz$2mQ#7';
const WHATSAPP_NUMBER = '923328559003';
const BANK_IBAN = 'PK86JSBL9999903328559003';
const SHIPPING_FEE = 300; // Standard Rs. 300 delivery (FREE on orders >= Rs. 8,000 or Free Delivery pairs)
const FREE_DELIVERY_THRESHOLD = 8000;

// Fixed Sender Details for Boss Mode Delivery Slip Maker
const SENDER_DETAILS = {
  brand: 'PRESETS — 1-of-1 Authentic Kicks',
  name: 'Ali Ammar',
  phone: '03328559003',
  address: 'Soan Garden, Block E, Street 2, House Number 35',
  city: 'Islamabad'
};

// EmailJS 2FA OTP Credentials
const EMAILJS_SERVICE_ID = 'service_t35a2od';
const EMAILJS_TEMPLATE_ID = 'template_alfz9aj';
const EMAILJS_PUBLIC_KEY = '-l45_rte6MVpDLpo-';

// Supabase Credentials
const SUPABASE_URL = 'https://oirjamjggwnsuipbsksu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_pUhyrvDdYtvugo_9jbTEcA_-i8WP5mm';

const supabaseHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation,resolution=merge-duplicates'
};

const generateUUID = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const extractMetaFromDescription = (rawDesc = '') => {
  const str = String(rawDesc || '');
  const match = str.match(/^\[META:([^\]]+)\]\s*/);
  if (!match) {
    return {
      cleanDesc: str,
      customPairId: '',
      category: 'Casual',
      insoleInches: '10.8',
      discountPercent: 0,
      prepaidOnly: false,
      freeDelivery: false,
      soles: 9,
      body: 9,
      laces: 9,
      inside: 9,
      imageRatio: '1:1',
      imageFit: 'cover',
      imageZoom: 1,
      defectImages: []
    };
  }
  const parts = match[1].split('|');
  const meta = {};
  parts.forEach((p) => {
    const eqIdx = p.indexOf('=');
    if (eqIdx > 0) {
      const k = p.slice(0, eqIdx).trim();
      const v = p.slice(eqIdx + 1).trim();
      meta[k] = v;
    }
  });
  let defectImages = [];
  if (meta.defects) {
    try {
      defectImages = JSON.parse(decodeURIComponent(meta.defects));
    } catch (e) {
      defectImages = [];
    }
  }
  return {
    cleanDesc: str.slice(match[0].length),
    customPairId: meta.pairId || '',
    category: meta.cat || 'Casual',
    insoleInches: meta.insole || '10.8',
    discountPercent: Number(meta.disc) || 0,
    prepaidOnly: meta.prepaid === '1',
    freeDelivery: meta.freedel === '1',
    soles: Number(meta.soles) || 9,
    body: Number(meta.body) || 9,
    laces: Number(meta.laces) || 9,
    inside: Number(meta.inside) || 9,
    imageRatio: meta.ratio || '1:1',
    imageFit: meta.fit || 'cover',
    imageZoom: Number(meta.zoom) || 1,
    defectImages: Array.isArray(defectImages) ? defectImages : []
  };
};

const packMetaIntoDescription = (
  cleanDesc = '',
  customPairId = '',
  imageRatio = '1:1',
  imageFit = 'cover',
  imageZoom = 1,
  defectImages = [],
  extra = {}
) => {
  const clean = String(cleanDesc || '').replace(/^\[META:([^\]]+)\]\s*/, '').trim();
  const safeId = String(customPairId || '').trim();
  const safeRatio = String(imageRatio || '1:1').trim();
  const safeFit = String(imageFit || 'cover').trim();
  const safeZoom = Number(imageZoom) || 1;
  const safeCat = String(extra.category || 'Casual').trim();
  const safeInsole = String(extra.insoleInches || '10.8').trim();
  const safeDisc = Number(extra.discountPercent) || 0;
  const safePrepaid = extra.prepaidOnly ? '1' : '0';
  const safeFreeDel = extra.freeDelivery ? '1' : '0';
  const safeSoles = Number(extra.soles) || 9;
  const safeBody = Number(extra.body) || 9;
  const safeLaces = Number(extra.laces) || 9;
  const safeInside = Number(extra.inside) || 9;
  const safeDefects = encodeURIComponent(
    JSON.stringify(Array.isArray(defectImages) ? defectImages.slice(0, 5) : [])
  );
  return `[META:pairId=${safeId}|cat=${safeCat}|insole=${safeInsole}|disc=${safeDisc}|prepaid=${safePrepaid}|freedel=${safeFreeDel}|soles=${safeSoles}|body=${safeBody}|laces=${safeLaces}|inside=${safeInside}|ratio=${safeRatio}|fit=${safeFit}|zoom=${safeZoom}|defects=${safeDefects}] ${clean}`;
};

const ensureValidUUID = (idStr) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (typeof idStr === 'string' && uuidRegex.test(idStr)) return idStr;
  return generateUUID();
};

// ==========================================
// 4-TABLE SUPABASE MAPPERS:
// 1. presets_settings
// 2. presets_inventory
// 3. presets_orders
// 4. presets_delivery_slips
// ==========================================
const mapSettingsFromDB = (row, fallback = {}) => {
  if (!row) return fallback;
  let formattedTimerEnd = fallback.countdownEndTime || '';
  if (row.timer_end_time) {
    const dt = new Date(row.timer_end_time);
    if (!isNaN(dt.getTime())) {
      const localIso = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      formattedTimerEnd = localIso;
    }
  }
  return {
    ...fallback,
    codPolicyEnabled:
      row.cod_policy_enabled !== undefined
        ? Boolean(row.cod_policy_enabled)
        : Boolean(fallback.codPolicyEnabled),
    codAdvanceAmount: Number(
      row.cod_advance_amount ?? fallback.codAdvanceAmount ?? 500
    ),
    frontBannerText: String(
      row.marquee_text ?? fallback.frontBannerText ?? ''
    ),
    codPolicyText: String(row.cod_policy_text ?? fallback.codPolicyText ?? ''),
    returnExchangePolicy: String(
      row.return_exchange_policy ?? fallback.returnExchangePolicy ?? ''
    ),
    saleBannerEnabled:
      row.banner_enabled !== undefined
        ? Boolean(row.banner_enabled)
        : Boolean(fallback.saleBannerEnabled),
    saleBannerImage: String(
      row.banner_image_url ?? fallback.saleBannerImage ?? ''
    ),
    saleBannerBadge: String(
      row.banner_badge_text ?? fallback.saleBannerBadge ?? ''
    ),
    saleBannerTitle: String(
      row.banner_headline ?? fallback.saleBannerTitle ?? ''
    ),
    saleBannerSubtitle: String(
      row.banner_subtitle ?? fallback.saleBannerSubtitle ?? ''
    ),
    countdownEnabled:
      row.timer_enabled !== undefined
        ? Boolean(row.timer_enabled)
        : Boolean(fallback.countdownEnabled),
    countdownTitle: String(
      row.timer_headline ?? fallback.countdownTitle ?? ''
    ),
    countdownEndTime: formattedTimerEnd
  };
};

const mapSettingsToDB = (cfg) => {
  let isoTimer = new Date(Date.now() + 48 * 3600 * 1000).toISOString();
  if (cfg.countdownEndTime) {
    const parsed = new Date(cfg.countdownEndTime);
    if (!isNaN(parsed.getTime())) {
      isoTimer = parsed.toISOString();
    }
  }
  return {
    id: 'global_config',
    cod_policy_enabled: Boolean(cfg.codPolicyEnabled),
    cod_advance_amount: Number(cfg.codAdvanceAmount ?? 500),
    marquee_text: String(cfg.frontBannerText || ''),
    cod_policy_text: String(cfg.codPolicyText || ''),
    return_exchange_policy: String(cfg.returnExchangePolicy || ''),
    banner_enabled: Boolean(cfg.saleBannerEnabled),
    banner_image_url: String(cfg.saleBannerImage || ''),
    banner_badge_text: String(cfg.saleBannerBadge || ''),
    banner_headline: String(cfg.saleBannerTitle || ''),
    banner_subtitle: String(cfg.saleBannerSubtitle || ''),
    timer_enabled: Boolean(cfg.countdownEnabled),
    timer_headline: String(cfg.countdownTitle || ''),
    timer_end_time: isoTimer,
    updated_at: new Date().toISOString()
  };
};

const mapProductFromDB = (row) => {
  const metaInfo = extractMetaFromDescription(row.description || '');
  const displayName = String(
    row.name || row.title || 'Authentic 1-of-1 Sneaker'
  );
  const displayEuSize = String(row.size ?? row.eu_size ?? '43');
  const displayInsoleInches = String(
    row.insole_inches ??
      metaInfo.insoleInches ??
      EU_TO_INSOLE_MAP[displayEuSize] ??
      '10.8'
  );

  const origPrice = Number(
    row.original_price ?? row.price ?? row.sale_price ?? 0
  );
  const salePrice = Number(row.sale_price ?? row.price ?? origPrice);
  const computedDisc =
    origPrice > 0 && salePrice < origPrice
      ? Math.round(((origPrice - salePrice) / origPrice) * 100)
      : Number(row.discount_percent ?? metaInfo.discountPercent ?? 0);

  const isSold =
    row.is_sold === true || row.sold === true || row.in_stock === false;
  const isOnOffer = Boolean(row.is_on_offer || computedDisc > 0);
  const isPrepaidOnly = Boolean(
    row.prepaid_only || row.is_prepaid_only || metaInfo.prepaidOnly
  );
  const isFreeDelivery = Boolean(
    row.free_delivery || metaInfo.freeDelivery
  );

  const gallery =
    Array.isArray(row.images) && row.images.length > 0
      ? row.images.filter(Boolean).map(String)
      : [
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80'
        ];

  const parsedCondNum = parseFloat(String(row.condition || '9.0')) || 9;

  return {
    id: String(row.id || generateUUID()),
    customPairId: String(metaInfo.customPairId || row.id || '1'),
    imageRatio: String(metaInfo.imageRatio || '1:1'),
    imageFit: String(metaInfo.imageFit || 'cover'),
    imageZoom: Number(metaInfo.imageZoom || 1),
    defectImages: Array.isArray(metaInfo.defectImages)
      ? metaInfo.defectImages
      : [],
    name: displayName,
    title: displayName,
    brand: String(row.brand || 'PRESETS'),
    category: String(row.category || metaInfo.category || 'Casual'),
    sizeEU: displayEuSize,
    insoleInches: displayInsoleInches,
    price: origPrice > 0 ? origPrice : salePrice,
    salePrice: salePrice,
    discountPercent: computedDisc,
    isOnOffer: isOnOffer,
    prepaidOnly: isPrepaidOnly,
    freeDelivery: isFreeDelivery,
    status: isSold ? 'sold' : 'available',
    conditionText: String(row.condition || `${parsedCondNum.toFixed(1)}/10`),
    condition: {
      soles: Number(metaInfo.soles || Math.round(parsedCondNum) || 9),
      body: Number(metaInfo.body || Math.round(parsedCondNum) || 9),
      laces: Number(metaInfo.laces || Math.round(parsedCondNum) || 9),
      inside: Number(metaInfo.inside || Math.round(parsedCondNum) || 9)
    },
    description: String(
      metaInfo.cleanDesc ||
        '100% Authentic 1-of-1 pre-loved pair. High quality guaranteed by PRESETS.'
    ),
    images: gallery,
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now()
  };
};

const mapProductToDB = (pair) => {
  const cleanTitle = String(pair.name || pair.title || 'Authentic Pair').trim();
  const euStr = String(pair.sizeEU || pair.size || '43');
  const origPrice = Number(pair.price ?? pair.original_price) || 0;
  const discPct = Math.min(
    90,
    Math.max(0, Math.round(Number(pair.discountPercent) || 0))
  );
  const salePrice = Math.round(origPrice * (1 - discPct / 100));
  const isSold = pair.status === 'sold' || pair.is_sold === true;
  const isOnOffer = Boolean(pair.isOnOffer || discPct > 0);
  const avgCond = getAverageCondition(pair.condition);

  const firstImage =
    Array.isArray(pair.images) && pair.images.length > 0
      ? String(pair.images[0])
      : 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80';

  const packedDesc = packMetaIntoDescription(
    pair.description ||
      '100% Authentic 1-of-1 pre-loved pair. High quality guaranteed by PRESETS.',
    pair.customPairId || '',
    pair.imageRatio || '1:1',
    pair.imageFit || 'cover',
    pair.imageZoom || 1,
    pair.defectImages || [],
    {
      category: pair.category || 'Casual',
      insoleInches: pair.insoleInches || '10.8',
      discountPercent: discPct,
      prepaidOnly: Boolean(pair.prepaidOnly),
      freeDelivery: Boolean(pair.freeDelivery),
      soles: pair.condition?.soles ?? 9,
      body: pair.condition?.body ?? 9,
      laces: pair.condition?.laces ?? 9,
      inside: pair.condition?.inside ?? 9
    }
  );

  return {
    id: String(pair.id || pair.customPairId || generateUUID()),
    name: cleanTitle,
    brand: String(pair.brand || 'PRESETS'),
    size: euStr,
    condition: `${avgCond}/10`,
    original_price: origPrice,
    sale_price: salePrice,
    is_on_offer: isOnOffer,
    is_sold: isSold,
    images:
      Array.isArray(pair.images) && pair.images.length > 0
        ? pair.images.slice(0, 5).map(String)
        : [firstImage],
    description: packedDesc
  };
};

const mapOrderFromDB = (row, idx = 0) => {
  const statusStr = String(row.order_status || row.status || 'Pending');
  const paymentMethodStr = String(row.payment_method || 'PREPAID').toUpperCase();
  const subtotalAmt = Number(
    row.subtotal ?? row.total_amount ?? row.total_pkr ?? 0
  );
  const advancePaidAmt = Number(row.advance_paid ?? 0);
  const codCollectableAmt = Number(row.cod_collectable_amount ?? 0);

  const isPrepaidPaid =
    statusStr.toUpperCase().startsWith('PAID') &&
    !statusStr.toUpperCase().startsWith('UNPAID');
  const isCodAdvPaid =
    statusStr.toUpperCase().includes('ADV PAID') || advancePaidAmt > 0;
  const isOrderConfirmed = statusStr.toUpperCase().includes('CONFIRMED');

  const itemsArr = Array.isArray(row.items) ? row.items : [];
  const firstItemCode = itemsArr[0]?.pairCode || itemsArr[0]?.orderNumber || '';
  const fallbackNum = String(idx + 1);
  const orderIdStr = String(row.order_id || row.id || firstItemCode || fallbackNum);

  const hasFreeDeliveryPair = itemsArr.some((i) => Boolean(i.freeDelivery));
  const inferredShipping =
    subtotalAmt >= FREE_DELIVERY_THRESHOLD || hasFreeDeliveryPair ? 0 : SHIPPING_FEE;

  return {
    id: orderIdStr,
    orderNumber: String(firstItemCode || orderIdStr),
    customer: {
      fullName: String(row.customer_name || ''),
      phone: String(row.customer_phone || row.phone || ''),
      email: String(row.email || ''),
      city: String(row.customer_city || row.city || ''),
      address: String(row.customer_address || row.address || '')
    },
    paymentMethod: paymentMethodStr.includes('RETURN')
      ? 'RETURN_CLAIM'
      : paymentMethodStr.includes('CANCEL')
      ? 'CANCEL_REQUEST'
      : paymentMethodStr.includes('COD')
      ? 'COD'
      : 'PREPAID',
    prepaidPaidStatus: isPrepaidPaid ? 'PAID' : 'UNPAID',
    codAdvPaidStatus: isCodAdvPaid ? 'ADV PAID' : 'ADV UNPAID',
    orderConfirmed: isOrderConfirmed,
    items: itemsArr,
    totals: {
      finalTotalWithShipping: subtotalAmt,
      discountedProductSubtotal: Math.max(0, subtotalAmt - inferredShipping),
      shipping: inferredShipping,
      payableNow: advancePaidAmt,
      payableOnDelivery: codCollectableAmt
    },
    status: statusStr,
    createdAt: row.created_at
      ? new Date(row.created_at).toLocaleString()
      : new Date().toLocaleString()
  };
};

const mapOrderToDB = (order) => {
  const orderId = String(order.orderNumber || order.id || generateUUID());
  const totalAmt = Number(
    order.totals?.finalTotalWithShipping ?? order.subtotal ?? 0
  );
  const isPrepaid = order.paymentMethod === 'PREPAID';
  const advPaid = isPrepaid
    ? order.prepaidPaidStatus === 'PAID'
      ? totalAmt
      : 0
    : order.codAdvPaidStatus === 'ADV PAID'
    ? Number(order.totals?.payableNow || 500)
    : 0;
  const codCollectable = isPrepaid
    ? 0
    : Number(
        order.totals?.payableOnDelivery ?? Math.max(0, totalAmt - advPaid)
      );

  return {
    order_id: orderId,
    customer_name: String(order.customer?.fullName || ''),
    customer_phone: String(order.customer?.phone || ''),
    customer_city: String(order.customer?.city || ''),
    customer_address: String(order.customer?.address || ''),
    items: Array.isArray(order.items) ? order.items : [],
    payment_method: String(order.paymentMethod || 'PREPAID'),
    subtotal: totalAmt,
    advance_paid: advPaid,
    cod_collectable_amount: codCollectable,
    order_status: String(order.status || 'Pending')
  };
};

const mapSlipFromDB = (row) => ({
  slipId: String(row.slip_id || generateUUID()),
  orderNumber: String(row.order_id || '1'),
  trackingNumber: String(row.tracking_number || ''),
  courierName: String(row.courier_name || 'PostEx'),
  customerName: String(row.consignee_name || ''),
  customerPhone: String(row.consignee_phone || ''),
  customerCity: String(row.consignee_city || ''),
  customerAddress: String(row.consignee_address || ''),
  pairDetails: String(row.pair_details || ''),
  amountToCollect: String(row.cod_amount ?? 0),
  advanceDeducted: String(row.advance_deducted ?? 0),
  specialInstructions: String(row.special_instructions || ''),
  createdAt: row.created_at
    ? new Date(row.created_at).toLocaleString()
    : new Date().toLocaleString()
});

const mapSlipToDB = (slip) => ({
  slip_id: String(
    slip.slipId || `SLIP-${slip.orderNumber || '1'}-${Date.now()}`
  ),
  order_id: String(slip.orderNumber || '1'),
  tracking_number: String(slip.trackingNumber || ''),
  courier_name: String(slip.courierName || 'PostEx'),
  consignee_name: String(slip.customerName || ''),
  consignee_phone: String(slip.customerPhone || ''),
  consignee_city: String(slip.customerCity || ''),
  consignee_address: String(slip.customerAddress || ''),
  pair_details: String(slip.pairDetails || ''),
  cod_amount: Number(slip.amountToCollect || 0),
  advance_deducted: Number(slip.advanceDeducted || 0),
  special_instructions: String(slip.specialInstructions || '')
});

const mapReviewFromDB = (row) => {
  return {
    id: String(row.id || generateUUID()),
    name: String(row.customer_name || row.name || 'Verified Customer'),
    city: String(row.city || 'Pakistan'),
    pairName: String(row.product_name || row.pairName || '1-of-1 Authentic Pair'),
    rating: Number(row.rating || 5),
    comment: String(row.comment || ''),
    imageUrl: row.image_url ? String(row.image_url) : '',
    date: row.created_at
      ? new Date(row.created_at).toLocaleDateString('en-PK', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      : 'Just now'
  };
};

const mapReviewToDB = (rev) => {
  const payload = {
    customer_name: String(rev.name || rev.customer_name || 'Customer').trim(),
    city: String(rev.city || 'Pakistan').trim(),
    product_name: String(rev.pairName || rev.product_name || '1-of-1 Authentic Pair').trim(),
    rating: Math.min(5, Math.max(1, Number(rev.rating || 5))),
    comment: String(rev.comment || '').trim()
  };
  if (rev.imageUrl || rev.image_url) {
    payload.image_url = String(rev.imageUrl || rev.image_url).trim();
  }
  return payload;
};

const supabaseRest = {
  async fetchSettings() {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/presets_settings?id=eq.global_config&select=*`,
      {
        method: 'GET',
        headers: supabaseHeaders
      }
    );
    if (!res.ok) throw new Error(`Supabase presets_settings HTTP ${res.status}`);
    const rows = await res.json();
    return Array.isArray(rows) && rows[0] ? rows[0] : null;
  },
  async upsertSettings(cfg) {
    const payload = mapSettingsToDB(cfg);
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/presets_settings?on_conflict=id`,
      {
        method: 'POST',
        headers: supabaseHeaders,
        body: JSON.stringify(payload)
      }
    );
    if (!res.ok) throw new Error(`Supabase upsert settings HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) && data[0] ? data[0] : payload;
  },
  async fetchProducts() {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/presets_inventory?select=*&order=created_at.desc`,
      {
        method: 'GET',
        headers: supabaseHeaders
      }
    );
    if (!res.ok) throw new Error(`Supabase presets_inventory HTTP ${res.status}`);
    const rows = await res.json();
    return Array.isArray(rows) ? rows.map(mapProductFromDB) : [];
  },
  async upsertProduct(pair) {
    const payload = mapProductToDB(pair);
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/presets_inventory?on_conflict=id`,
      {
        method: 'POST',
        headers: supabaseHeaders,
        body: JSON.stringify(payload)
      }
    );
    if (!res.ok) throw new Error(`Supabase upsert inventory HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) && data[0] ? mapProductFromDB(data[0]) : pair;
  },
  async deleteProduct(id) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/presets_inventory?id=eq.${encodeURIComponent(id)}`,
      {
        method: 'DELETE',
        headers: supabaseHeaders
      }
    );
    if (!res.ok) throw new Error(`Supabase delete inventory HTTP ${res.status}`);
  },
  async fetchOrders() {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/presets_orders?select=*&order=created_at.desc`,
      {
        method: 'GET',
        headers: supabaseHeaders
      }
    );
    if (!res.ok) throw new Error(`Supabase presets_orders HTTP ${res.status}`);
    const rows = await res.json();
    return Array.isArray(rows)
      ? rows.map((r, i) => mapOrderFromDB(r, rows.length - 1 - i))
      : [];
  },
  async upsertOrder(order) {
    const payload = mapOrderToDB(order);
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/presets_orders?on_conflict=order_id`,
      {
        method: 'POST',
        headers: supabaseHeaders,
        body: JSON.stringify(payload)
      }
    );
    if (!res.ok) throw new Error(`Supabase upsert order HTTP ${res.status}`);
    return res.json();
  },
  async fetchDeliverySlips() {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/presets_delivery_slips?select=*&order=created_at.desc`,
      {
        method: 'GET',
        headers: supabaseHeaders
      }
    );
    if (!res.ok)
      throw new Error(`Supabase presets_delivery_slips HTTP ${res.status}`);
    const rows = await res.json();
    return Array.isArray(rows) ? rows.map(mapSlipFromDB) : [];
  },
  async upsertDeliverySlip(slip) {
    const payload = mapSlipToDB(slip);
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/presets_delivery_slips?on_conflict=slip_id`,
      {
        method: 'POST',
        headers: supabaseHeaders,
        body: JSON.stringify(payload)
      }
    );
    if (!res.ok)
      throw new Error(`Supabase upsert delivery slip HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) && data[0] ? mapSlipFromDB(data[0]) : slip;
  },
  async fetchReviews() {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/reviews?select=*&order=created_at.desc`,
      {
        method: 'GET',
        headers: supabaseHeaders
      }
    );
    if (!res.ok) throw new Error(`Supabase reviews HTTP ${res.status}`);
    const rows = await res.json();
    return Array.isArray(rows) ? rows.map(mapReviewFromDB) : [];
  },
  async insertReview(review) {
    const payload = mapReviewToDB(review);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
      method: 'POST',
      headers: supabaseHeaders,
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Supabase insert review HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) && data[0] ? mapReviewFromDB(data[0]) : null;
  }
};

const SHOE_CATEGORIES = [
  'All',
  'Casual',
  'Trainers',
  'Running',
  'Formal',
  'Slip-Ons & Loafers'
];

const EU_SIZES = [
  'All',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46'
];

const EU_TO_INSOLE_MAP = {
  '36': '9.0',
  '37': '9.3',
  '38': '9.5',
  '39': '9.8',
  '40': '10.0',
  '41': '10.2',
  '42': '10.5',
  '43': '10.8',
  '44': '11.2',
  '45': '11.5',
  '46': '11.8'
};

const INITIAL_SNEAKERS = [
  {
    id: '11111111-1111-4111-8111-111111111101',
    customPairId: '1',
    imageRatio: '1:1',
    imageFit: 'cover',
    name: 'Air Force 1 Low "Toasty" Brown Kelp',
    brand: 'Nike',
    category: 'Casual',
    sizeEU: '43',
    insoleInches: '10.8',
    price: 11500,
    discountPercent: 10,
    prepaidOnly: false,
    status: 'available',
    condition: { soles: 9, body: 9, laces: 10, inside: 9 },
    description:
      '100% authentic pre-loved pair. Deeply sanitized, quilted fleece lining intact, crisp stitching, and firm sole traction.',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80'
    ],
    createdAt: Date.now() - 86400000 * 3
  },
  {
    id: '22222222-2222-4222-8222-222222222202',
    customPairId: '2',
    imageRatio: '1:1',
    imageFit: 'cover',
    name: 'Air Jordan 1 Retro Low OG Shadow',
    brand: 'Jordan',
    category: 'Trainers',
    sizeEU: '44',
    insoleInches: '11.2',
    price: 14500,
    discountPercent: 0,
    prepaidOnly: true,
    status: 'available',
    condition: { soles: 9, body: 10, laces: 9, inside: 9 },
    description:
      'Premium leather panels with minimal creasing. Professionally detailed inside and out.',
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
    ],
    createdAt: Date.now() - 86400000 * 2
  }
];

const getAspectRatioClass = (ratio) => {
  switch (ratio) {
    case '4:5':
      return 'aspect-[4/5]';
    case '4:3':
      return 'aspect-[4/3]';
    case '16:9':
      return 'aspect-video';
    case '1:1':
    default:
      return 'aspect-square';
  }
};

const memoryStorageFallback = {};
const safeLoad = (key, fallbackVal) => {
  try {
    const raw = localStorage.getItem(key) || memoryStorageFallback[key];
    return raw ? JSON.parse(raw) : fallbackVal;
  } catch (e) {
    return memoryStorageFallback[key]
      ? JSON.parse(memoryStorageFallback[key])
      : fallbackVal;
  }
};
const safeSave = (key, val) => {
  const str = JSON.stringify(val);
  memoryStorageFallback[key] = str;
  try {
    localStorage.setItem(key, str);
  } catch (e) {}
};

const getEffectivePairPrice = (pair) => {
  const base = Number(pair?.price ?? pair?.price_pkr) || 0;
  const disc = Math.min(90, Math.max(0, Number(pair?.discountPercent ?? pair?.discount_percent) || 0));
  return Math.round(base * (1 - disc / 100));
};

const formatPKR = (amount) =>
  `Rs. ${Math.round(Number(amount) || 0).toLocaleString('en-PK')}`;

const getAverageCondition = (cond) => {
  if (!cond || typeof cond !== 'object') return '9.0';
  const s = Number(cond.soles) || 9;
  const b = Number(cond.body) || 9;
  const l = Number(cond.laces) || 9;
  const i = Number(cond.inside) || 9;
  return ((s + b + l + i) / 4).toFixed(1);
};

// ==========================================
// 3.5 PRESETS CYBER-FORTRESS SECURITY ENGINE (ANTI-XSS, ANTI-SQLi & TAMPER GUARD)
// ==========================================
const sanitizeUntrustedInput = (val = '') => {
  if (typeof val !== 'string') return String(val ?? '');
  return val
    .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/(--|;|\b(DROP|ALTER|TRUNCATE|EXEC|UNION\s+SELECT)\b)/gi, '')
    .replace(/[<>]/g, '');
};

const isSuspiciousPayload = (str = '') => {
  const s = String(str || '');
  return /<\s*script|javascript\s*:|onerror\s*=|onload\s*=|\bUNION\s+SELECT\b|\bDROP\s+TABLE\b/i.test(
    s
  );
};

// ==========================================
// 4. 3D CYBER-LUXURY GEOMETRIC PORTAL & SCROLL-REACTIVE PRISM RINGS (HERO CANVAS)
// ==========================================
function HeroRevolvingParticleRing() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    let width = (canvas.width =
      canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 460);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width =
        canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || 460;
    };
    window.addEventListener('resize', handleResize);

    const mouse = {
      x: width / 2,
      y: height / 2,
      tx: width / 2,
      ty: height / 2,
      active: false
    };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // 3D Sacred Geometric Prism Shards & Orbital Rings
    const shardCount = 96;
    const shards = Array.from({ length: shardCount }, (_, i) => {
      const ringIdx = i % 3;
      const baseRadius = 115 + ringIdx * 72;
      return {
        angle: (Math.PI * 2 * i) / shardCount,
        ringIdx,
        baseRadius,
        zOffset: (Math.random() - 0.5) * 160,
        speed:
          (0.006 + ringIdx * 0.003) * (ringIdx % 2 === 0 ? 1 : -1),
        size: Math.random() * 4.5 + 2.5,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.06,
        isGold: i % 2 === 0
      };
    });

    const portalShockwaves = [];
    const handleHeroClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const bx = e.clientX - rect.left;
      const by = e.clientY - rect.top;
      if (bx < 0 || by < 0 || bx > width || by > height) return;
      portalShockwaves.push({
        x: bx,
        y: by,
        r: 12,
        maxR: 280,
        alpha: 1,
        sides: 6
      });
    };
    window.addEventListener('click', handleHeroClick);

    let scrollVel = 0;
    let scrollPos = window.scrollY || 0;
    let lastY = window.scrollY || 0;
    const onScroll = () => {
      const curY = window.scrollY || 0;
      scrollVel = Math.max(-45, Math.min(45, (curY - lastY) * 0.65));
      scrollPos = curY;
      lastY = curY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const drawPolygon = (x, y, radius, sides, rotation, strokeStyle, fillStyle, lineWidth = 1.2) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let s = 0; s < sides; s++) {
        const a = (Math.PI * 2 * s) / sides;
        const px = Math.cos(a) * radius;
        const py = Math.sin(a) * radius;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
      if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = () => {
      time += 0.016 + Math.abs(scrollVel) * 0.0018;
      scrollVel *= 0.91;

      mouse.x += (mouse.tx - mouse.x) * 0.09;
      mouse.y += (mouse.ty - mouse.y) * 0.09;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + (mouse.active ? (mouse.x - width / 2) * 0.06 : 0);
      const cy =
        height / 2 +
        Math.sin(time * 0.9) * 6 -
        Math.min(55, scrollPos * 0.12) +
        scrollVel * 0.45;

      // 1. Central Cyber-Gold & Flame Core Aura
      const coreRadius = Math.max(width, height) * 0.48;
      const coreGrad = ctx.createRadialGradient(cx, cy, 8, cx, cy, coreRadius);
      coreGrad.addColorStop(0, 'rgba(255, 95, 0, 0.30)');
      coreGrad.addColorStop(0.35, 'rgba(212, 175, 55, 0.14)');
      coreGrad.addColorStop(0.7, 'rgba(255, 60, 0, 0.05)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. 3D Perspective Cyber Grid Floor & Ceiling Horizon Reactive to Scroll Up/Down
      const horizonShift = scrollVel * 1.4;
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 85, 0, 0.11)';
      ctx.lineWidth = 1;
      for (let i = -8; i <= 8; i++) {
        const xSpread = i * 95;
        ctx.beginPath();
        ctx.moveTo(cx + xSpread * 0.22, cy + horizonShift);
        ctx.lineTo(cx + xSpread * 1.85, height + 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx + xSpread * 0.22, cy + horizonShift);
        ctx.lineTo(cx + xSpread * 1.85, -20);
        ctx.stroke();
      }
      ctx.restore();

      // 3. Concentric Rotating Geometric Portal Rings (Hexagons & Octagons)
      for (let r = 0; r < 4; r++) {
        const ringRad =
          85 +
          r * 58 +
          Math.sin(time * 1.6 + r) * 8 +
          Math.abs(scrollVel) * 1.4;
        const rotDir = r % 2 === 0 ? 1 : -1;
        const rotAngle =
          time * 0.35 * rotDir + (scrollPos * 0.004 + scrollVel * 0.02) * rotDir;
        const alpha = 0.26 - r * 0.04;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1.35, 0.62 + Math.sin(time * 0.7 + r) * 0.08);
        drawPolygon(
          0,
          0,
          ringRad,
          r % 2 === 0 ? 6 : 8,
          rotAngle,
          r % 2 === 0
            ? `rgba(255, 95, 0, ${alpha})`
            : `rgba(212, 175, 55, ${alpha})`,
          null,
          1.5
        );
        ctx.restore();
      }

      // 4. 3D Revolving Geometric Prism Shards & Laser Beams
      const projected = [];
      const tiltX = 0.45 + scrollVel * 0.015 + (mouse.active ? (mouse.y - height / 2) * 0.0008 : 0);
      const tiltY = time * 0.25 + scrollPos * 0.003;

      for (let i = 0; i < shards.length; i++) {
        const s = shards[i];
        s.angle += s.speed * (1 + Math.abs(scrollVel) * 0.14);
        s.rot += s.rotSpeed + scrollVel * 0.005;

        const expansion = 1 + Math.abs(scrollVel) * 0.012;
        const rad = s.baseRadius * expansion;

        const rawX = Math.cos(s.angle) * rad * 1.35;
        const rawZ = Math.sin(s.angle) * rad;
        const rawY =
          Math.sin(s.angle * 2 + time * 1.5) * 36 +
          s.zOffset * 0.35 -
          scrollVel * 1.6;

        // 3D Rotation Matrix
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);
        const y1 = rawY * cosX - rawZ * sinX;
        const z1 = rawY * sinX + rawZ * cosX;

        const cosY = Math.cos(tiltY * 0.25);
        const sinY = Math.sin(tiltY * 0.25);
        const x2 = rawX * cosY + z1 * sinY;
        const z2 = -rawX * sinY + z1 * cosY;

        const fov = 460;
        const scale = fov / Math.max(80, fov + z2 + 240);
        const px = cx + x2 * scale;
        const py = cy + y1 * scale;

        projected.push({
          px,
          py,
          scale,
          size: s.size,
          rot: s.rot,
          isGold: s.isGold,
          ringIdx: s.ringIdx
        });
      }

      // Draw Energy Constellation Filaments
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          const d = Math.hypot(a.px - b.px, a.py - b.py);
          if (d < 72) {
            const lineAlpha = (1 - d / 72) * 0.28 * ((a.scale + b.scale) * 0.5);
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.strokeStyle = a.isGold
              ? `rgba(212, 175, 55, ${lineAlpha})`
              : `rgba(255, 95, 0, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Draw Rotating Diamond & Triangle Prism Shards
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const sz = Math.max(1.6, p.size * p.scale * 1.3);

        // Velocity Streak Tail on Scroll Up / Down
        if (Math.abs(scrollVel) > 1.2) {
          ctx.beginPath();
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(p.px, p.py + scrollVel * 1.8 * p.scale);
          ctx.strokeStyle = p.isGold
            ? 'rgba(212, 175, 55, 0.45)'
            : 'rgba(255, 95, 0, 0.55)';
          ctx.lineWidth = Math.max(1, sz * 0.45);
          ctx.stroke();
        }

        drawPolygon(
          p.px,
          p.py,
          sz,
          i % 3 === 0 ? 3 : 4,
          p.rot,
          p.isGold ? 'rgba(255, 240, 200, 0.9)' : 'rgba(255, 165, 90, 0.9)',
          p.isGold ? 'rgba(212, 175, 55, 0.45)' : 'rgba(255, 85, 0, 0.50)',
          1.1
        );
      }

      // 5. Hexagonal Shockwaves on Click
      for (let i = portalShockwaves.length - 1; i >= 0; i--) {
        const sw = portalShockwaves[i];
        sw.r += (sw.maxR - sw.r) * 0.09;
        sw.alpha -= 0.024;
        if (sw.alpha <= 0) {
          portalShockwaves.splice(i, 1);
          continue;
        }
        drawPolygon(
          sw.x,
          sw.y,
          sw.r,
          6,
          time * 0.8,
          `rgba(255, 115, 25, ${sw.alpha * 0.75})`,
          null,
          2
        );
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleHeroClick);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

// ==========================================
// 5. GLOBAL 3D CYBER-PRISM MATRIX, SCROLL STREAKS & PLASMASPARK UNIVERSE
// ==========================================
function GlobalParticleUniverse({ hyperMode, burstTrigger }) {
  const canvasRef = useRef(null);
  const burstFnRef = useRef(null);

  useEffect(() => {
    if (burstTrigger > 0 && burstFnRef.current) {
      burstFnRef.current(window.innerWidth / 2, window.innerHeight / 2);
    }
  }, [burstTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const pointer = { x: width / 2, y: height / 2, active: false };
    const plasmaNodes = [];

    const handlePointerMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      plasmaNodes.push({
        x: e.clientX,
        y: e.clientY,
        rot: Math.random() * Math.PI,
        life: 1,
        size: 7
      });
      if (plasmaNodes.length > 22) plasmaNodes.shift();
    };
    const handlePointerLeave = () => {
      pointer.active = false;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    // Floating 3D Geometric Prisms + Rising Ember Streaks
    const count = hyperMode ? 64 : 44;
    const prisms = Array.from({ length: count }, (_, idx) => {
      const depth = 0.35 + Math.random() * 0.85;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        depth,
        vx: (Math.random() - 0.5) * 0.35 * depth,
        vy: (-Math.random() * 0.45 - 0.12) * depth,
        size: (Math.random() * 4.2 + 2.2) * depth,
        sides: idx % 3 === 0 ? 6 : idx % 2 === 0 ? 4 : 3,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        palette: idx % 3 === 0 ? 'gold' : idx % 2 === 0 ? 'orange' : 'amber',
        phase: Math.random() * Math.PI * 2
      };
    });

    const shardBursts = [];
    const hexRipples = [];
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity = Math.max(
        -42,
        Math.min(42, (currentY - lastScrollY) * 0.48)
      );
      lastScrollY = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const createPrismBurst = (bx, by) => {
      hexRipples.push({ x: bx, y: by, r: 8, maxR: 150, life: 1 });
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20 + (Math.random() - 0.5) * 0.2;
        const speed = Math.random() * 5.2 + 1.6;
        shardBursts.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.18,
          life: 1,
          size: Math.random() * 4.5 + 2,
          isGold: i % 2 === 0
        });
      }
    };
    burstFnRef.current = createPrismBurst;

    const handleGlobalClick = (e) => {
      createPrismBurst(e.clientX, e.clientY);
    };
    window.addEventListener('click', handleGlobalClick);

    const drawShape = (cx, cy, r, sides, rot, stroke, fill) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = (Math.PI * 2 * i) / sides;
        const sx = Math.cos(a) * r;
        const sy = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);
      scrollVelocity *= 0.92;

      // 1. Geometric Diamond Cursor Trail
      for (let i = plasmaNodes.length - 1; i >= 0; i--) {
        const n = plasmaNodes[i];
        n.life -= 0.05;
        n.rot += 0.08;
        if (n.life <= 0) {
          plasmaNodes.splice(i, 1);
          continue;
        }
        drawShape(
          n.x,
          n.y,
          n.size * n.life,
          4,
          n.rot,
          `rgba(255, 130, 30, ${n.life * 0.7})`,
          `rgba(212, 175, 55, ${n.life * 0.25})`
        );
      }

      // 2. Render 3D Prisms & Scroll Warp Beams
      for (let i = 0; i < prisms.length; i++) {
        const p = prisms[i];
        p.phase += 0.02;
        p.rot += p.rotSpeed + scrollVelocity * 0.004;

        // Magnetic Cursor Repel / Swirl
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 190 && dist > 1) {
            const force = ((190 - dist) / 190) * 0.65;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        p.x += p.vx + Math.sin(time + p.phase) * 0.22;
        p.y += p.vy - scrollVelocity * p.depth * 0.85;

        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        const alpha = (0.35 + Math.sin(p.phase) * 0.18) * p.depth;

        // Vertical Warp Streak When Scrolling Up or Down
        if (Math.abs(scrollVelocity) > 1.5) {
          const streakLen = scrollVelocity * p.depth * 2.4;
          const grad = ctx.createLinearGradient(
            p.x,
            p.y,
            p.x,
            p.y + streakLen
          );
          grad.addColorStop(
            0,
            p.palette === 'gold'
              ? `rgba(212, 175, 55, ${alpha * 1.4})`
              : `rgba(255, 85, 0, ${alpha * 1.4})`
          );
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + streakLen);
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(1.2, p.size * 0.45);
          ctx.stroke();
        }

        const strokeCol =
          p.palette === 'gold'
            ? `rgba(255, 225, 150, ${alpha * 1.5})`
            : p.palette === 'orange'
            ? `rgba(255, 105, 20, ${alpha * 1.5})`
            : `rgba(255, 180, 90, ${alpha * 1.5})`;

        const fillCol =
          p.palette === 'gold'
            ? `rgba(212, 175, 55, ${alpha * 0.45})`
            : `rgba(255, 85, 0, ${alpha * 0.45})`;

        drawShape(p.x, p.y, p.size, p.sides, p.rot, strokeCol, fillCol);
      }

      // 3. Expanding Hexagonal Click Ripples
      for (let i = hexRipples.length - 1; i >= 0; i--) {
        const hr = hexRipples[i];
        hr.r += (hr.maxR - hr.r) * 0.12;
        hr.life -= 0.032;
        if (hr.life <= 0) {
          hexRipples.splice(i, 1);
          continue;
        }
        drawShape(
          hr.x,
          hr.y,
          hr.r,
          6,
          time,
          `rgba(255, 110, 20, ${hr.life * 0.65})`,
          null
        );
      }

      // 4. Geometric Shard Burst on Click
      for (let i = shardBursts.length - 1; i >= 0; i--) {
        const b = shardBursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.94;
        b.vy *= 0.94;
        b.rot += b.rotSpeed;
        b.life -= 0.028;
        if (b.life <= 0) {
          shardBursts.splice(i, 1);
          continue;
        }
        drawShape(
          b.x,
          b.y,
          b.size * b.life,
          3,
          b.rot,
          b.isGold
            ? `rgba(255, 235, 180, ${b.life})`
            : `rgba(255, 120, 30, ${b.life})`,
          b.isGold
            ? `rgba(212, 175, 55, ${b.life * 0.6})`
            : `rgba(255, 85, 0, ${b.life * 0.6})`
        );
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hyperMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.92 }}
    />
  );
}

// ==========================================
// 6. MAIN PRESETS STOREFRONT COMPONENT
// ==========================================
function PresetsStoreApp() {
  const [codSuccessModal, setCodSuccessModal] = useState(null);
  const [prepaidConfirmScreen, setPrepaidConfirmScreen] = useState(null);
  const [simplePrepaidSuccessOrder, setSimplePrepaidSuccessOrder] =
    useState(null);
  const [customerForm, setCustomerForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    address: ''
  });

  const [sneakers, setSneakers] = useState(() =>
    safeLoad('presets_sneakers_v16', INITIAL_SNEAKERS)
  );
  useEffect(() => safeSave('presets_sneakers_v16', sneakers), [sneakers]);

  const [orders, setOrders] = useState(() => safeLoad('presets_orders_v16', []));
  useEffect(() => safeSave('presets_orders_v16', orders), [orders]);

  const [deliverySlips, setDeliverySlips] = useState(() =>
    safeLoad('presets_slips_v16', [])
  );
  useEffect(
    () => safeSave('presets_slips_v16', deliverySlips),
    [deliverySlips]
  );

  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState(
    'Connecting to Supabase...'
  );

  const showToast = (msg) => {
    setToast(String(msg || ''));
    setTimeout(() => setToast(null), 3800);
  };

  const syncSettingsToSupabase = async (nextConfig, toastMessage = '') => {
    try {
      await supabaseRest.upsertSettings(nextConfig);
      setSupabaseSyncStatus('Cloud Database Connected');
      if (toastMessage) showToast(toastMessage);
    } catch (err) {
      setSupabaseSyncStatus('Local Fallback Mode');
      if (toastMessage) showToast(`${toastMessage} (Saved locally)`);
    }
  };

  const syncFromSupabase = async (silent = false) => {
    try {
      const [
        remoteSettings,
        remoteProducts,
        remoteOrders,
        remoteSlips,
        remoteReviews
      ] = await Promise.all([
        supabaseRest.fetchSettings().catch(() => null),
        supabaseRest.fetchProducts(),
        supabaseRest.fetchOrders(),
        supabaseRest.fetchDeliverySlips().catch(() => []),
        supabaseRest.fetchReviews().catch(() => [])
      ]);

      if (remoteSettings) {
        setStoreConfig((prev) => mapSettingsFromDB(remoteSettings, prev));
      } else {
        supabaseRest.upsertSettings(storeConfig).catch(() => {});
      }

      if (remoteProducts.length > 0) {
        setSneakers(remoteProducts);
      } else {
        await Promise.all(
          INITIAL_SNEAKERS.map((p) =>
            supabaseRest.upsertProduct(p).catch(() => {})
          )
        );
      }

      if (remoteOrders.length > 0) {
        setOrders(remoteOrders);
      }

      if (remoteSlips.length > 0) {
        setDeliverySlips(remoteSlips);
      }

      if (remoteReviews.length > 0) {
        setReviews(remoteReviews);
      }

      setSupabaseSyncStatus('Cloud Database Connected');
      if (!silent) {
        showToast(
          'Synced all 4 Supabase tables (Settings, Inventory, Orders & Slips)!'
        );
      }
    } catch (err) {
      setSupabaseSyncStatus('Local Fallback Mode');
      if (!silent) {
        showToast('Using local data fallback (Run SQL schema in Supabase).');
      }
    }
  };

  const pushAllLocalToSupabase = async () => {
    try {
      setSupabaseSyncStatus('Pushing all 4 tables to Cloud...');
      await Promise.all([
        supabaseRest.upsertSettings(storeConfig),
        ...sneakers.map((pair) => supabaseRest.upsertProduct(pair)),
        ...orders.map((ord) => supabaseRest.upsertOrder(ord)),
        ...deliverySlips.map((slip) => supabaseRest.upsertDeliverySlip(slip))
      ]);
      setSupabaseSyncStatus('Cloud Database Connected');
      showToast(
        `Pushed Settings, ${sneakers.length} Pairs, ${orders.length} Orders & ${deliverySlips.length} Slips to Supabase!`
      );
    } catch (err) {
      setSupabaseSyncStatus('Local Fallback Mode');
      showToast(`Sync notice: ${err?.message || 'Check database settings'}`);
    }
  };

  useEffect(() => {
    syncFromSupabase(true);
  }, []);

  const [reviews, setReviews] = useState(() =>
    safeLoad('presets_reviews_v16', [
      {
        id: 'REV-101',
        name: 'Hamza Tariq',
        city: 'Islamabad',
        pairName: 'Air Force 1 Low Brown Kelp',
        rating: 5,
        comment:
          'Received my pair today. The insole measurement in inches was 100% accurate and condition is super clean.',
        imageUrl: '',
        date: '2 days ago'
      },
      {
        id: 'REV-102',
        name: 'Zainab Raza',
        city: 'Lahore',
        pairName: 'Air Jordan 1 Retro Low',
        rating: 5,
        comment:
          'Used full prepayment via WhatsApp and got the 5% discount. Clean packaging and authentic 1-of-1 sneaker.',
        imageUrl: '',
        date: '5 days ago'
      }
    ])
  );
  useEffect(() => safeSave('presets_reviews_v16', reviews), [reviews]);

  const [reviewForm, setReviewForm] = useState({
    name: '',
    city: '',
    pairName: '',
    rating: 5,
    comment: '',
    imageUrl: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const [storeConfig, setStoreConfig] = useState(() => {
    const loaded = safeLoad('presets_config_v16', {
      frontBannerText:
        '5% OFF ON FULL PREPAYMENT • FREE HOME DELIVERY ON ORDERS ABOVE RS. 8,000 • 1-OF-1 AUTHENTIC KICKS',
      codPolicyEnabled: true,
      codAdvanceAmount: 500,
      codPolicyText:
        'For Cash on Delivery (COD) orders, a Rs. 500 advance booking deposit is required in our official JS Bank account (Ali Ammar - 03328559003 | IBAN: PK86JSBL9999903328559003) to lock your 1-of-1 sneaker. The Rs. 500 deposit is deducted from your total bill, and you pay the remaining balance upon delivery. Orders above Rs. 8,000 (or pairs marked with Free Delivery) enjoy FREE Home Delivery!',
      returnExchangePolicy:
        'Every sneaker at PRESETS is a 1-of-1 pre-loved authentic pair inspected across Soles, Body, Laces, and Inside. Customers will be delivered a detailed inspection video along with their order confirmation. A pair can only be returned or exchanged if it arrives severely damaged or completely different from what was shown and described on the inspection page (PRESETS takes 100% responsibility). Strictly no returns or exchanges for size issues as exact insole measurements in inches are provided for every pair.',
      saleBannerEnabled: true,
      saleBannerBadge: '🔥 MEGA VAULT SALE LIVE NOW',
      saleBannerTitle: 'EXPERIENCE THE 1-OF-1 DROP',
      saleBannerSubtitle:
        'Flat discounts on select pairs + Extra 5% OFF on Full Prepayment • FREE Delivery on Orders Above Rs. 8,000',
      saleBannerImage:
        'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1600&q=80',
      countdownEnabled: true,
      countdownTitle: '⚡ FLASH VAULT SALE ENDS IN:',
      countdownEndTime: new Date(Date.now() + 48 * 3600 * 1000).toISOString().slice(0, 16)
    });
    return {
      ...loaded,
      frontBannerText: String(loaded.frontBannerText || '').replace(/3%/g, '5%'),
      saleBannerSubtitle: String(loaded.saleBannerSubtitle || '').replace(/3%/g, '5%'),
      countdownEnabled: loaded.countdownEnabled !== undefined ? loaded.countdownEnabled : true,
      countdownTitle: loaded.countdownTitle || '⚡ FLASH VAULT SALE ENDS IN:',
      countdownEndTime:
        loaded.countdownEndTime ||
        new Date(Date.now() + 48 * 3600 * 1000).toISOString().slice(0, 16)
    };
  });
  useEffect(() => safeSave('presets_config_v16', storeConfig), [storeConfig]);

  const [countdownRemaining, setCountdownRemaining] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    expired: false
  });

  useEffect(() => {
    const updateTimer = () => {
      if (!storeConfig.countdownEnabled || !storeConfig.countdownEndTime) return;
      const target = new Date(storeConfig.countdownEndTime).getTime();
      const now = Date.now();
      const diff = target - now;
      if (isNaN(target) || diff <= 0) {
        setCountdownRemaining({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          expired: true
        });
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdownRemaining({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
        expired: false
      });
    };
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [storeConfig.countdownEnabled, storeConfig.countdownEndTime]);

  const [cart, setCart] = useState(() => safeLoad('presets_cart_v16', []));
  useEffect(() => safeSave('presets_cart_v16', cart), [cart]);

  const [activeView, setActiveView] = useState('home');
  const [selectedPairId, setSelectedPairId] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeDefectIdx, setActiveDefectIdx] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('PREPAID');
  const [toast, setToast] = useState(null);

  const [userFootInches, setUserFootInches] = useState('');
  const [aiProductTab, setAiProductTab] = useState('fit');

  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [queryForm, setQueryForm] = useState({ name: '', question: '' });
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelForm, setCancelForm] = useState({
    name: '',
    phone: '',
    orderId: '',
    reason: ''
  });
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [returnForm, setReturnForm] = useState({
    name: '',
    phone: '',
    pairId: '',
    damageDetails: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');

  const [hyperParticles] = useState(true);
  const [burstCount] = useState(0);

  // Boss Mode Delivery Slip Maker State (PostEx Only)
  const [deliverySlipForm, setDeliverySlipForm] = useState({
    slipId: '',
    orderNumber: '1',
    trackingNumber: '',
    courierName: 'PostEx',
    customerName: '',
    customerPhone: '',
    customerCity: '',
    customerAddress: '',
    pairDetails: '',
    paymentMethod: 'PREPAID',
    amountToCollect: '0',
    advanceDeducted: '0',
    specialInstructions: 'Handle with Care • 1-of-1 Authentic Footwear'
  });

  // Sequential Pair Code Lookup Map Starting from 1 (Respects Boss Mode Custom Pair ID)
  const pairCodeMap = useMemo(() => {
    const map = {};
    const chronological = [...sneakers].sort(
      (a, b) => (a.createdAt || 0) - (b.createdAt || 0)
    );
    chronological.forEach((s, idx) => {
      const rawCustom = String(s.customPairId || '').trim();
      const normalizedCustom = /^\d+$/.test(rawCustom)
        ? String(parseInt(rawCustom, 10))
        : rawCustom;
      map[s.id] = normalizedCustom || String(idx + 1);
    });
    return map;
  }, [sneakers]);

  const getPairCode = (pairOrId) => {
    if (!pairOrId) return '1';
    if (typeof pairOrId === 'object') {
      if (pairOrId.customPairId && String(pairOrId.customPairId).trim()) {
        const raw = String(pairOrId.customPairId).trim();
        return /^\d+$/.test(raw) ? String(parseInt(raw, 10)) : raw;
      }
      if (pairOrId.pairCode && String(pairOrId.pairCode).trim()) {
        const raw = String(pairOrId.pairCode).trim();
        return /^\d+$/.test(raw) ? String(parseInt(raw, 10)) : raw;
      }
    }
    const id = typeof pairOrId === 'object' ? pairOrId.id : pairOrId;
    return pairCodeMap[id] || '1';
  };

  const getNextOrderNumber = (orderedCartItems = []) => {
    if (orderedCartItems.length > 0) {
      const codes = orderedCartItems.map((item) => getPairCode(item));
      return codes.join('-');
    }
    return String(orders.length + 1);
  };

  const getOrderDisplayNumber = (order, fallbackIdx = 0) => {
    if (!order) return '1';
    const fromItem =
      order.items?.[0]?.pairCode || order.items?.[0]?.orderNumber;
    if (fromItem) {
      const raw = String(fromItem).trim();
      return /^\d+$/.test(raw) ? String(parseInt(raw, 10)) : raw;
    }
    if (order.orderNumber) {
      const raw = String(order.orderNumber).trim();
      return /^\d+$/.test(raw) ? String(parseInt(raw, 10)) : raw;
    }
    const uuidRegex = /^[0-9a-f]{8}-/i;
    if (order.id && !uuidRegex.test(String(order.id))) {
      const raw = String(order.id).trim();
      return /^\d+$/.test(raw) ? String(parseInt(raw, 10)) : raw;
    }
    return String(fallbackIdx + 1);
  };

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [otpStep, setOtpStep] = useState('password');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userEnteredOtp, setUserEnteredOtp] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [otpStatusMessage, setOtpStatusMessage] = useState('');
  const [otpStatusType, setOtpStatusType] = useState('info');

  // Brute-Force & Intrusion Protection State
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(() =>
    Number(safeLoad('presets_sec_attempts', 0))
  );
  const [lockoutUntil, setLockoutUntil] = useState(() =>
    Number(safeLoad('presets_sec_lockout', 0))
  );
  const [cursorGlow, setCursorGlow] = useState({ x: -500, y: -500 });

  useEffect(() => {
    safeSave('presets_sec_attempts', failedLoginAttempts);
    safeSave('presets_sec_lockout', lockoutUntil);
  }, [failedLoginAttempts, lockoutUntil]);

  // Anti-Tamper, Shortcut Guard & Interactive Luxury Spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorGlow({ x: e.clientX, y: e.clientY });
    };
    const handleKeyDown = (e) => {
      // Block unauthorized F12 / Ctrl+Shift+I / Ctrl+U source inspection shortcuts
      if (
        e.key === 'F12' ||
        (e.ctrlKey &&
          e.shiftKey &&
          ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
        showToast('🛡️ PRESETS Security Shield: Source inspection is restricted.');
      }
    };
    const handleContextMenu = (e) => {
      if (e.target?.tagName === 'IMG') {
        e.preventDefault();
        showToast('🛡️ PRESETS Vault: 1-of-1 Image Assets are Protected.');
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    if (window.emailjs) {
      try {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
      } catch (e) {}
      return;
    }
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if (window.emailjs) {
        try {
          window.emailjs.init(EMAILJS_PUBLIC_KEY);
        } catch (e) {}
      }
    };
    document.head.appendChild(script);
  }, []);

  const sendBossMode2FAEmail = async () => {
    setIsSendingEmail(true);
    setOtpStatusMessage('Sending 6-digit 2FA security code...');
    setOtpStatusType('info');

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    const templateParams = {
      to_email: ADMIN_EMAIL,
      email: ADMIN_EMAIL,
      user_email: ADMIN_EMAIL,
      to_name: 'Admin',
      from_name: 'PRESETS Security',
      passcode: code,
      otp: code,
      code: code,
      verification_code: code,
      message: `Your PRESETS Boss Mode 2FA Verification Code is: ${code}`
    };

    try {
      if (window.emailjs && typeof window.emailjs.send === 'function') {
        await window.emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
      } else {
        const response = await fetch(
          'https://api.emailjs.com/api/v1.0/email/send',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              service_id: EMAILJS_SERVICE_ID,
              template_id: EMAILJS_TEMPLATE_ID,
              user_id: EMAILJS_PUBLIC_KEY,
              template_params: templateParams
            })
          }
        );
        if (!response.ok) {
          const errText = await response.text();
          throw new Error(errText || '2FA service error');
        }
      }

      setOtpStatusType('success');
      setOtpStatusMessage(
        'Verification code sent! Please check your email inbox.'
      );
      setOtpStep('otp_verify');
      showToast('2FA Code Sent to your Email!');
    } catch (error) {
      setOtpStatusType('error');
      setOtpStatusMessage(
        `Failed to send email (${String(
          error?.text || error?.message || 'Check verification settings'
        )}). Please try again.`
      );
      showToast('Failed to send 2FA email.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const [bossTab, setBossTab] = useState('inventory');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [editingPairId, setEditingPairId] = useState(null);
  const [pairForm, setPairForm] = useState({
    customPairId: '',
    imageRatio: '1:1',
    imageFit: 'cover',
    imageZoom: 1,
    name: '',
    brand: 'PRESETS',
    category: 'Casual',
    sizeEU: '43',
    insoleInches: '10.8',
    price: '',
    discountPercent: 0,
    prepaidOnly: false,
    freeDelivery: false,
    status: 'available',
    soles: 9,
    body: 9,
    laces: 9,
    inside: 9,
    description: '',
    images: [],
    defectImages: []
  });
  const [aiVisionStatus, setAiVisionStatus] = useState('');

  const isCodAdvancePolicyActive = Boolean(storeConfig.codPolicyEnabled);
  const activeCodDepositAmount = isCodAdvancePolicyActive
    ? Number(storeConfig.codAdvanceAmount) || 500
    : 0;

  const effectiveCodPolicyDescription = isCodAdvancePolicyActive
    ? storeConfig.codPolicyText ||
      `For Cash on Delivery (COD) orders, a Rs. ${activeCodDepositAmount} advance booking deposit is required in our official JS Bank account (Ali Ammar - 03328559003 | IBAN: ${BANK_IBAN}) to lock your 1-of-1 sneaker. The Rs. ${activeCodDepositAmount} deposit is deducted from your total bill, and you pay the remaining balance upon delivery.`
    : 'Cash on Delivery (COD) is active with Rs. 0 Advance Required! You will pay 100% of your total bill in cash upon doorstep delivery. No returns or exchanges except for serious undisclosed damage or receiving the wrong pair.';

  const toggleCodPolicyMasterSwitch = () => {
    setStoreConfig((prev) => {
      const nextState = !prev.codPolicyEnabled;
      const updated = { ...prev, codPolicyEnabled: nextState };
      syncSettingsToSupabase(
        updated,
        nextState
          ? `COD Advance Policy ON (Rs. ${
              prev.codAdvanceAmount || 500
            } Deposit Synced to Supabase)`
          : 'COD Advance Policy OFF (Rs. 0 Advance — Synced to Supabase)'
      );
      return updated;
    });
  };

  const handleBannerPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1400;
        let w = img.width;
        let h = img.height;
        if (w > h && w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedBanner = canvas.toDataURL('image/jpeg', 0.82);
        setStoreConfig((prev) => {
          const updated = {
            ...prev,
            saleBannerImage: compressedBanner,
            saleBannerEnabled: true
          };
          syncSettingsToSupabase(
            updated,
            'Sale Banner photo uploaded & synced to Supabase!'
          );
          return updated;
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const cartItems = useMemo(() => {
    return cart
      .map((id) => sneakers.find((s) => s.id === id))
      .filter((s) => Boolean(s) && s.status === 'available');
  }, [cart, sneakers]);

  const cartRequiresPrepaidOnly = useMemo(
    () => cartItems.some((item) => Boolean(item.prepaidOnly || item.is_prepaid_only)),
    [cartItems]
  );

  useEffect(() => {
    if (cartRequiresPrepaidOnly && paymentMethod === 'COD') {
      setPaymentMethod('PREPAID');
    }
  }, [cartRequiresPrepaidOnly, paymentMethod]);

  const orderTotals = useMemo(() => {
    const rawOriginalSubtotal = cartItems.reduce(
      (acc, item) => acc + (Number(item.price ?? item.price_pkr) || 0),
      0
    );
    const discountedProductSubtotal = cartItems.reduce(
      (acc, item) => acc + getEffectivePairPrice(item),
      0
    );
    const pairLevelSavings = rawOriginalSubtotal - discountedProductSubtotal;

    const hasFreeDeliveryPair = cartItems.some((item) => Boolean(item.freeDelivery));
    const qualifiesForFreeDelivery =
      discountedProductSubtotal >= FREE_DELIVERY_THRESHOLD || hasFreeDeliveryPair;
    const shipping =
      cartItems.length > 0
        ? qualifiesForFreeDelivery
          ? 0
          : SHIPPING_FEE
        : 0;
    const isPrepaid = paymentMethod === 'PREPAID';
    const prepaidFivePercentDiscount = isPrepaid
      ? Math.round(discountedProductSubtotal * 0.05)
      : 0;

    const netSneakerTotal =
      discountedProductSubtotal - prepaidFivePercentDiscount;
    const finalTotalWithShipping = netSneakerTotal + shipping;

    const codAdvanceRequired =
      cartItems.length > 0 && isCodAdvancePolicyActive
        ? activeCodDepositAmount
        : 0;

    const payableNow = isPrepaid ? finalTotalWithShipping : codAdvanceRequired;
    const payableOnDelivery = isPrepaid
      ? 0
      : Math.max(0, finalTotalWithShipping - codAdvanceRequired);

    return {
      rawOriginalSubtotal,
      discountedProductSubtotal,
      pairLevelSavings,
      prepaidThreePercentDiscount: prepaidFivePercentDiscount,
      shipping,
      hasFreeDeliveryPair,
      qualifiesForFreeDelivery,
      finalTotalWithShipping,
      payableNow,
      payableOnDelivery
    };
  }, [
    cartItems,
    paymentMethod,
    isCodAdvancePolicyActive,
    activeCodDepositAmount
  ]);

  const addToCart = (pair) => {
    if (!pair || pair.status !== 'available') {
      showToast('This 1-of-1 pair is already sold.');
      return;
    }
    if (cart.includes(pair.id)) {
      showToast('Already in your bag.');
      setIsCartOpen(true);
      return;
    }
    setCart((prev) => [...prev, pair.id]);
    showToast(`Added ${pair.name || pair.title} to bag.`);
  };

  const removeFromCart = (pairId) => {
    setCart((prev) => prev.filter((id) => id !== pairId));
    showToast('Removed shoe from bag.');
  };

  const handleReviewPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 700;
        let w = img.width;
        let h = img.height;
        if (w > h && w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.72);
        setReviewForm((prev) => ({ ...prev, imageUrl: compressedDataUrl }));
        showToast('Review photo attached!');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRequestDetailedInspectionWhatsApp = (pair) => {
    if (!pair) return;
    const pairCode = getPairCode(pair);
    const title = pair.name || pair.title || '1-of-1 Authentic Pair';
    const size = pair.sizeEU || pair.eu_size || pair.size || '43';
    const insole = pair.insoleInches || '10.8';
    const priceStr = formatPKR(getEffectivePairPrice(pair));

    const msg =
      `Assalam-o-Alaikum PRESETS Team!\n` +
      `I would like to request a *Detailed Inspection (Close-up Photos / Video)* of this 1-of-1 pair:\n\n` +
      `• *Pair ID:* #${pairCode}\n` +
      `• *Sneaker:* ${title}\n` +
      `• *Size:* EU ${size} (Insole ${insole} Inches)\n` +
      `• *Price:* ${priceStr}\n` +
      `• *Overall Condition:* ${getAverageCondition(pair.condition)}/10\n\n` +
      `Kindly share detailed inspection video/pictures of the soles, body, and inside. Thank you!`;

    launchWhatsApp(WHATSAPP_NUMBER, msg);
    showToast('Opening WhatsApp for Detailed Inspection...');
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) {
      showToast('Please enter your name and review comment.');
      return;
    }

    setIsSubmittingReview(true);
    const newRevPayload = {
      id: generateUUID(),
      name: reviewForm.name.trim(),
      city: reviewForm.city.trim() || 'Pakistan',
      pairName: reviewForm.pairName.trim() || '1-of-1 Authentic Pair',
      rating: Number(reviewForm.rating) || 5,
      comment: reviewForm.comment.trim(),
      imageUrl: reviewForm.imageUrl.trim() || '',
      date: 'Just now'
    };

    try {
      await supabaseRest.insertReview(newRevPayload);
      const freshReviews = await supabaseRest.fetchReviews();
      if (freshReviews.length > 0) {
        setReviews(freshReviews);
      } else {
        setReviews((prev) => [newRevPayload, ...prev]);
      }
      showToast('Thank you! Your review is live on screen.');
    } catch (err) {
      setReviews((prev) => [newRevPayload, ...prev]);
      showToast('Thank you! Your review has been posted.');
    } finally {
      setReviewForm({
        name: '',
        city: '',
        pairName: '',
        rating: 5,
        comment: '',
        imageUrl: ''
      });
      setIsSubmittingReview(false);
    }
  };

  const filteredSneakers = useMemo(() => {
    return sneakers.filter((item) => {
      const itemTitle = String(item.name || item.title || '');
      const itemSize = String(item.sizeEU ?? item.eu_size ?? item.size ?? '');
      const itemCode = String(getPairCode(item)).toLowerCase();
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSize =
        selectedSize === 'All' || itemSize === String(selectedSize);
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        itemTitle.toLowerCase().includes(q) ||
        itemCode.includes(q) ||
        String(item.category || '')
          .toLowerCase()
          .includes(q) ||
        itemSize.includes(q) ||
        String(item.insoleInches || '').includes(q);
      return matchesCategory && matchesSize && matchesQuery;
    });
  }, [sneakers, selectedCategory, selectedSize, searchQuery, pairCodeMap]);

  const launchWhatsApp = (phone, plainTextMessage) => {
    const cleanPhone = String(phone || WHATSAPP_NUMBER).replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(plainTextMessage);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendWhatsAppQuery = (e) => {
    e.preventDefault();
    if (!queryForm.name.trim() || !queryForm.question.trim()) return;
    const msg =
      `Assalam-o-Alaikum PRESETS Team!\n` +
      `*Customer Query*\n` +
      `• *Name:* ${queryForm.name.trim()}\n` +
      `• *Question:* ${queryForm.question.trim()}`;
    launchWhatsApp(WHATSAPP_NUMBER, msg);
    setQueryModalOpen(false);
    setQueryForm({ name: '', question: '' });
  };

  const handleSendWhatsAppCancellation = (e) => {
    e.preventDefault();
    if (
      !cancelForm.name.trim() ||
      !cancelForm.phone.trim() ||
      !cancelForm.orderId.trim()
    )
      return;

    const cancelOrderRecord = {
      id: `CANCEL-${cancelForm.orderId.trim()}-${Date.now().toString().slice(-4)}`,
      orderNumber: cancelForm.orderId.trim(),
      customer: {
        fullName: cancelForm.name.trim(),
        phone: cancelForm.phone.trim(),
        city: 'Cancellation Request',
        address: `Reason: ${cancelForm.reason.trim()}`
      },
      paymentMethod: 'CANCEL_REQUEST',
      items: [
        {
          pairCode: cancelForm.orderId.trim(),
          name: `Cancel Request for Pair #${cancelForm.orderId.trim()}`,
          reason: cancelForm.reason.trim()
        }
      ],
      totals: {
        finalTotalWithShipping: 0,
        payableNow: 0,
        payableOnDelivery: 0
      },
      status: `CANCELLATION REQUESTED (Pair #${cancelForm.orderId.trim()}) — ${cancelForm.reason.trim()}`,
      createdAt: new Date().toLocaleString()
    };

    setOrders((prev) => [cancelOrderRecord, ...prev]);
    supabaseRest.upsertOrder(cancelOrderRecord).catch(() => {});

    const msg =
      `Assalam-o-Alaikum PRESETS Team!\n` +
      `*Order Cancellation Request*\n` +
      `• *Customer Name:* ${cancelForm.name.trim()}\n` +
      `• *Phone:* ${cancelForm.phone.trim()}\n` +
      `• *Pair ID / Order Number:* #${cancelForm.orderId.trim()}\n` +
      `• *Reason:* ${cancelForm.reason.trim()}`;
    launchWhatsApp(WHATSAPP_NUMBER, msg);
    setCancelModalOpen(false);
    setCancelForm({ name: '', phone: '', orderId: '', reason: '' });
    showToast('Cancellation logged to Supabase & opening WhatsApp...');
  };

  const handleSendWhatsAppReturn = (e) => {
    e.preventDefault();
    if (
      !returnForm.name.trim() ||
      !returnForm.phone.trim() ||
      !returnForm.pairId.trim() ||
      !returnForm.damageDetails.trim()
    )
      return;

    const returnOrderRecord = {
      id: `RETURN-${returnForm.pairId.trim()}-${Date.now().toString().slice(-4)}`,
      orderNumber: returnForm.pairId.trim(),
      customer: {
        fullName: returnForm.name.trim(),
        phone: returnForm.phone.trim(),
        city: 'Return Claim',
        address: `Damage Claim: ${returnForm.damageDetails.trim()}`
      },
      paymentMethod: 'RETURN_CLAIM',
      items: [
        {
          pairCode: returnForm.pairId.trim(),
          name: `Return Claim for Pair #${returnForm.pairId.trim()}`,
          damageDetails: returnForm.damageDetails.trim()
        }
      ],
      totals: {
        finalTotalWithShipping: 0,
        payableNow: 0,
        payableOnDelivery: 0
      },
      status: `RETURN / DAMAGE CLAIM (Pair #${returnForm.pairId.trim()}) — ${returnForm.damageDetails.trim()}`,
      createdAt: new Date().toLocaleString()
    };

    setOrders((prev) => [returnOrderRecord, ...prev]);
    supabaseRest.upsertOrder(returnOrderRecord).catch(() => {});

    const msg =
      `Assalam-o-Alaikum PRESETS Team!\n` +
      `*Return / Exchange Claim (Damaged / Not as Described)*\n` +
      `• *Customer Name:* ${returnForm.name.trim()}\n` +
      `• *Phone:* ${returnForm.phone.trim()}\n` +
      `• *Pair ID / Order Number:* #${returnForm.pairId.trim()}\n` +
      `• *Issue / Damage Description:* ${returnForm.damageDetails.trim()}\n\n` +
      `I have taken the Pair ID (#${returnForm.pairId.trim()}) of the sneaker I ordered and I am ready to share my unboxing video/photos for verification.`;
    launchWhatsApp(WHATSAPP_NUMBER, msg);
    setReturnModalOpen(false);
    setReturnForm({ name: '', phone: '', pairId: '', damageDetails: '' });
    showToast('Return request saved to Supabase & opening WhatsApp...');
  };

  const buildAndSavePrepaidOrder = () => {
    const dbUuid = generateUUID();
    const orderNum = getNextOrderNumber(cartItems);

    const safeCustomer = {
      fullName: sanitizeUntrustedInput(customerForm.fullName).trim(),
      phone: sanitizeUntrustedInput(customerForm.phone).trim(),
      email: sanitizeUntrustedInput(customerForm.email).trim(),
      city: sanitizeUntrustedInput(customerForm.city).trim(),
      address: sanitizeUntrustedInput(customerForm.address).trim()
    };

    const pairsList = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. [Pair #${getPairCode(item)}] ${
            item.name || item.title
          } (EU ${item.sizeEU || item.eu_size || item.size} | Insole ${
            item.insoleInches
          }") — ${formatPKR(getEffectivePairPrice(item))}${
            item.freeDelivery ? ' [FREE DELIVERY PAIR]' : ''
          }`
      )
      .join('\n');

    const newOrder = {
      id: dbUuid,
      orderNumber: orderNum,
      customer: safeCustomer,
      items: cartItems.map((i) => ({
        id: i.id,
        pairCode: getPairCode(i),
        orderNumber: orderNum,
        name: i.name || i.title,
        sizeEU: i.sizeEU || i.eu_size || i.size,
        insoleInches: i.insoleInches,
        freeDelivery: Boolean(i.freeDelivery),
        price: getEffectivePairPrice(i)
      })),
      paymentMethod: 'PREPAID',
      prepaidPaidStatus: 'UNPAID',
      codPolicyWasEnabled: isCodAdvancePolicyActive,
      totals: {
        ...orderTotals,
        payableNow: orderTotals.finalTotalWithShipping,
        payableOnDelivery: 0
      },
      status: `Order #${orderNum} • UNPAID — Pending Full Payment`,
      createdAt: new Date().toLocaleString()
    };

    const orderedIds = cartItems.map((i) => i.id);
    setSneakers((prev) =>
      prev.map((s) => {
        if (orderedIds.includes(s.id)) {
          const updated = { ...s, status: 'sold', sold: true, in_stock: false };
          supabaseRest.upsertProduct(updated).catch(() => {});
          return updated;
        }
        return s;
      })
    );
    setOrders((prev) => [newOrder, ...prev]);
    supabaseRest.upsertOrder(newOrder).catch(() => {});
    setCart([]);

    return { newOrder, orderNum, pairsList };
  };

  const handlePrepaidWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      showToast('Your bag is empty.');
      return;
    }
    if (
      !customerForm.fullName.trim() ||
      !customerForm.phone.trim() ||
      !customerForm.city.trim() ||
      !customerForm.address.trim()
    ) {
      showToast('Please complete your Name, Phone, City, and Address.');
      return;
    }

    const { newOrder, orderNum, pairsList } = buildAndSavePrepaidOrder();

    const deliveryLine = orderTotals.qualifiesForFreeDelivery
      ? orderTotals.hasFreeDeliveryPair
        ? 'FREE (Rs. 0 — Free Delivery Pair!)'
        : 'FREE (Rs. 0 — Order Above Rs. 8,000!)'
      : formatPKR(orderTotals.shipping);

    const plainMessage =
      `Assalam-o-Alaikum PRESETS!\n` +
      `I want to place a *100% FULL PREPAID ORDER (with 5% Prepaid Discount)*.\n\n` +
      `*Order Number:* #${orderNum}\n` +
      `*Customer:* ${customerForm.fullName}\n` +
      `*Phone:* ${customerForm.phone}\n` +
      `*City:* ${customerForm.city}\n` +
      `*Delivery Address:* ${customerForm.address}\n\n` +
      `*Pair(s):*\n${pairsList}\n\n` +
      `• Sneaker Subtotal: ${formatPKR(
        orderTotals.discountedProductSubtotal
      )}\n` +
      `• 5% Full Prepaid Discount: -${formatPKR(
        orderTotals.prepaidThreePercentDiscount
      )}\n` +
      `• Home Delivery: ${deliveryLine}\n` +
      `*100% Full Prepaid Amount Payable Now: ${formatPKR(
        orderTotals.finalTotalWithShipping
      )}*\n` +
      `*Remaining Balance on Delivery: Rs. 0*\n\n` +
      `*Official Bank Account Details:*\n` +
      `• Bank: JS Bank\n` +
      `• Account Title: Ali Ammar\n` +
      `• Account Number: 03328559003\n` +
      `• IBAN: ${BANK_IBAN}\n\n` +
      `Kindly confirm your bank account details so I can transfer the full payment of *${formatPKR(
        orderTotals.finalTotalWithShipping
      )}* and receive my detailed pair inspection video with order confirmation.`;

    setPrepaidConfirmScreen({
      order: newOrder,
      whatsappMessage: plainMessage,
      whatsappPhone: WHATSAPP_NUMBER
    });

    launchWhatsApp(WHATSAPP_NUMBER, plainMessage);
    showToast(`Order #${orderNum} Created! Opening WhatsApp...`);
    setActiveView('prepaid_confirm');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimpleDirectPrepaidOrder = () => {
    if (cartItems.length === 0) {
      showToast('Your bag is empty.');
      return;
    }
    if (
      !customerForm.fullName.trim() ||
      !customerForm.phone.trim() ||
      !customerForm.city.trim() ||
      !customerForm.address.trim()
    ) {
      showToast('Please complete your Name, Phone, City, and Address.');
      return;
    }

    const { newOrder, orderNum } = buildAndSavePrepaidOrder();
    setSimplePrepaidSuccessOrder(newOrder);
    showToast(`Order #${orderNum} Placed Successfully!`);
    setActiveView('simple_prepaid_done');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceCODOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      showToast('Your bag is empty.');
      return;
    }
    if (cartRequiresPrepaidOnly) {
      showToast('This pair is strictly Prepaid Only. COD is not available.');
      return;
    }
    if (
      !customerForm.fullName.trim() ||
      !customerForm.phone.trim() ||
      !customerForm.city.trim() ||
      !customerForm.address.trim()
    ) {
      showToast('Please complete your Name, Phone, City, and Address.');
      return;
    }

    if (
      isSuspiciousPayload(customerForm.fullName) ||
      isSuspiciousPayload(customerForm.address)
    ) {
      showToast('🛡️ Security Alert: Invalid characters blocked.');
      return;
    }

    const dbUuid = generateUUID();
    const orderNum = getNextOrderNumber(cartItems);
    const safeCustomer = {
      fullName: sanitizeUntrustedInput(customerForm.fullName).trim(),
      phone: sanitizeUntrustedInput(customerForm.phone).trim(),
      email: sanitizeUntrustedInput(customerForm.email).trim(),
      city: sanitizeUntrustedInput(customerForm.city).trim(),
      address: sanitizeUntrustedInput(customerForm.address).trim()
    };
    const newOrder = {
      id: dbUuid,
      orderNumber: orderNum,
      customer: safeCustomer,
      items: cartItems.map((i) => ({
        id: i.id,
        pairCode: getPairCode(i),
        orderNumber: orderNum,
        name: i.name || i.title,
        sizeEU: i.sizeEU || i.eu_size || i.size,
        insoleInches: i.insoleInches,
        freeDelivery: Boolean(i.freeDelivery),
        price: getEffectivePairPrice(i)
      })),
      paymentMethod: 'COD',
      codAdvPaidStatus: 'ADV UNPAID',
      codPolicyWasEnabled: isCodAdvancePolicyActive,
      totals: { ...orderTotals },
      status: isCodAdvancePolicyActive
        ? `Order #${orderNum} • ADV UNPAID — Awaiting Rs. ${activeCodDepositAmount}`
        : `Order #${orderNum} • COD Order Placed (No Advance Required)`,
      createdAt: new Date().toLocaleString()
    };

    const orderedIds = cartItems.map((i) => i.id);
    setSneakers((prev) =>
      prev.map((s) => {
        if (orderedIds.includes(s.id)) {
          const updated = { ...s, status: 'sold', sold: true, in_stock: false };
          supabaseRest.upsertProduct(updated).catch(() => {});
          return updated;
        }
        return s;
      })
    );
    setOrders((prev) => [newOrder, ...prev]);
    supabaseRest.upsertOrder(newOrder).catch(() => {});
    setCart([]);
    setCodSuccessModal(newOrder);
  };

  const togglePrepaidOrderPaidStatus = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const nextPaid = o.prepaidPaidStatus === 'PAID' ? 'UNPAID' : 'PAID';
        showToast(`Prepaid Order marked as ${nextPaid}`);
        const updatedOrder = {
          ...o,
          prepaidPaidStatus: nextPaid,
          status:
            nextPaid === 'PAID'
              ? 'PAID — 100% Full Payment Verified'
              : 'UNPAID — Pending Full Payment'
        };
        supabaseRest.upsertOrder(updatedOrder).catch(() => {});
        return updatedOrder;
      })
    );
  };

  const toggleCodOrderAdvPaidStatus = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const nextAdv =
          o.codAdvPaidStatus === 'ADV PAID' ? 'ADV UNPAID' : 'ADV PAID';
        showToast(`COD Order marked as ${nextAdv}`);
        const updatedOrder = {
          ...o,
          codAdvPaidStatus: nextAdv,
          status:
            nextAdv === 'ADV PAID'
              ? `ADV PAID (Rs. ${activeCodDepositAmount} Received)`
              : `ADV UNPAID — Awaiting Rs. ${activeCodDepositAmount}`
        };
        supabaseRest.upsertOrder(updatedOrder).catch(() => {});
        return updatedOrder;
      })
    );
  };

  const toggleOrderConfirmedStatus = (order) => {
    const dispOrderNum = getOrderDisplayNumber(order);
    const nextConfirmed = !order.orderConfirmed;

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== order.id) return o;
        const baseStatus = String(o.status || '').replace(/ • ORDER CONFIRMED/g, '');
        const updatedOrder = {
          ...o,
          orderConfirmed: nextConfirmed,
          status: nextConfirmed
            ? `${baseStatus} • ORDER CONFIRMED`
            : baseStatus
        };
        supabaseRest.upsertOrder(updatedOrder).catch(() => {});
        return updatedOrder;
      })
    );

    if (nextConfirmed) {
      let rawPhone = String(order.customer?.phone || '').replace(/[^0-9]/g, '');
      if (rawPhone.startsWith('03')) rawPhone = '92' + rawPhone.slice(1);
      const totalBill = order.totals?.finalTotalWithShipping || 0;
      const hasFreePair = (order.items || []).some((i) => Boolean(i.freeDelivery));
      const isFreeDel = (order.totals?.shipping ?? SHIPPING_FEE) === 0 || hasFreePair;
      const pairDetails = (order.items || [])
        .map(
          (i, idx) =>
            `${idx + 1}. [Pair #${i.pairCode || dispOrderNum}] ${
              i.name || i.title
            } (EU ${i.sizeEU} | Insole ${i.insoleInches || '10.8'}") — ${formatPKR(
              i.price
            )}${i.freeDelivery ? ' [FREE DELIVERY]' : ''}`
        )
        .join('\n');

      const confirmMsg =
        `Assalam-o-Alaikum ${order.customer?.fullName}!\n` +
        `✅ *YOUR ORDER IS OFFICIALLY CONFIRMED BY PRESETS!*\n\n` +
        `• *Order Number:* #${dispOrderNum}\n` +
        `• *Payment Method:* ${order.paymentMethod}\n` +
        `• *Home Delivery:* ${
          isFreeDel
            ? 'FREE (Rs. 0 — Free Home Delivery Applied!)'
            : formatPKR(SHIPPING_FEE)
        }\n` +
        `• *Total Order Bill:* ${formatPKR(totalBill)}\n\n` +
        `*Confirmed Sneaker(s):*\n${pairDetails}\n\n` +
        `*Delivery Address:* ${order.customer?.address}, ${order.customer?.city}\n\n` +
        `🎥 *Detailed Inspection Video:* We are sharing the detailed inspection video of your exact 1-of-1 pair right here with your order confirmation before dispatch. Thank you for shopping with PRESETS!`;

      launchWhatsApp(rawPhone || WHATSAPP_NUMBER, confirmMsg);
      showToast(`Order #${dispOrderNum} Confirmed & WhatsApp Opened!`);
    } else {
      showToast(`Order #${dispOrderNum} unmarked as confirmed.`);
    }
  };

  // ==========================================
  // 3-STEP BOSS MODE WHATSAPP ORDER WORKFLOW
  // Step 1: Address Verification + Detailed Video Notice
  // Step 2: Payment Request (Auto-adapts to Prepaid vs COD)
  // Step 3: Payment Received & Parcel Ready for Dispatch
  // ==========================================
  const sendBossOrderStep1AddressAndVideo = (order) => {
    let rawPhone = String(order.customer?.phone || '').replace(/[^0-9]/g, '');
    if (rawPhone.startsWith('03')) rawPhone = '92' + rawPhone.slice(1);

    const dispOrderNum = getOrderDisplayNumber(order);
    const pairDetails = (order.items || [])
      .map(
        (i, idx) =>
          `${idx + 1}. [Pair #${i.pairCode || dispOrderNum}] ${
            i.name || i.title
          } (EU ${i.sizeEU} | Insole ${i.insoleInches || '10.8'}") — ${formatPKR(
            i.price
          )}${i.freeDelivery ? ' [FREE DELIVERY]' : ''}`
      )
      .join('\n');

    const msg =
      `Assalam-o-Alaikum ${order.customer?.fullName}!\n` +
      `Thank you for placing *Order #${dispOrderNum}* at *PRESETS — 1-of-1 Authentic Kicks*.\n\n` +
      `📍 *STEP 1: KINDLY CONFIRM YOUR DELIVERY ADDRESS*\n` +
      `• *Customer Name:* ${order.customer?.fullName}\n` +
      `• *Phone Number:* ${order.customer?.phone}\n` +
      `• *City:* ${order.customer?.city}\n` +
      `• *Complete Address:* ${order.customer?.address}\n\n` +
      `👟 *Ordered Sneaker(s):*\n${pairDetails}\n\n` +
      `🎥 *Detailed Pair Inspection Video:*\n` +
      `Hum apko is message ke sath apke exact 1-of-1 pair ki *detailed inspection video* bhej rahe hain taake ap shoes ki condition (soles, body, inside) achi tarhan dekh saken.\n\n` +
      `Kindly reply *YES* to confirm that your delivery address above is 100% correct!`;

    launchWhatsApp(rawPhone || WHATSAPP_NUMBER, msg);
    showToast(`Step 1 (Address + Video Message) opened for Order #${dispOrderNum}`);
  };

  const sendBossOrderStep2PaymentDetails = (order) => {
    let rawPhone = String(order.customer?.phone || '').replace(/[^0-9]/g, '');
    if (rawPhone.startsWith('03')) rawPhone = '92' + rawPhone.slice(1);

    const dispOrderNum = getOrderDisplayNumber(order);
    const totalBill = order.totals?.finalTotalWithShipping || 0;
    const hasFreePair = (order.items || []).some((i) => Boolean(i.freeDelivery));
    const isFreeDelivery =
      (order.totals?.shipping ?? SHIPPING_FEE) === 0 || hasFreePair;
    const deliveryLabel = isFreeDelivery
      ? 'FREE (Rs. 0 — Free Home Delivery Applied!)'
      : formatPKR(SHIPPING_FEE);
    const isPrepaidOrder = order.paymentMethod === 'PREPAID';

    let msg = '';
    if (isPrepaidOrder) {
      msg =
        `Assalam-o-Alaikum ${order.customer?.fullName}!\n` +
        `💳 *STEP 2: FULL PREPAYMENT DETAILS (5% DISCOUNT APPLIED) — ORDER #${dispOrderNum}*\n\n` +
        `Thank you for verifying your address and pair video! Since you selected *Full Prepayment (5% OFF)*, here are your final bill and official bank details:\n\n` +
        `• *Home Delivery:* ${deliveryLabel}\n` +
        `• *Total Full Prepaid Amount Payable Now:* *${formatPKR(totalBill)}*\n` +
        `• *Remaining Balance on Delivery:* Rs. 0\n\n` +
        `🏦 *Official Bank Account Details:*\n` +
        `• *Bank Name:* JS Bank\n` +
        `• *Account Title:* Ali Ammar\n` +
        `• *Account / Wallet Number:* 03328559003\n` +
        `• *IBAN:* ${BANK_IBAN}\n\n` +
        `Kindly transfer *${formatPKR(
          totalBill
        )}* and share the payment screenshot here so we can mark your parcel ready for dispatch!`;
    } else if (isCodAdvancePolicyActive) {
      const depositAmt = activeCodDepositAmount;
      const remainingCOD = Math.max(0, totalBill - depositAmt);
      msg =
        `Assalam-o-Alaikum ${order.customer?.fullName}!\n` +
        `💳 *STEP 2: CASH ON DELIVERY (COD) ADVANCE BOOKING — ORDER #${dispOrderNum}*\n\n` +
        `Thank you for verifying your address and pair video! Since you selected *Cash on Delivery (COD)*, here is your payment breakdown:\n\n` +
        `• *Home Delivery:* ${deliveryLabel}\n` +
        `• *Total Order Bill:* ${formatPKR(totalBill)}\n` +
        `• *Advance Booking Deposit Required Now:* *${formatPKR(depositAmt)}*\n` +
        `• *Remaining Balance Payable on Delivery (COD):* *${formatPKR(
          remainingCOD
        )}*\n\n` +
        `🏦 *Official Bank Account Details for Rs. ${depositAmt} Advance:*\n` +
        `• *Bank Name:* JS Bank\n` +
        `• *Account Title:* Ali Ammar\n` +
        `• *Account / Wallet Number:* 03328559003\n` +
        `• *IBAN:* ${BANK_IBAN}\n\n` +
        `Kindly transfer the *${formatPKR(
          depositAmt
        )}* advance deposit and share the screenshot here so we can lock and dispatch your 1-of-1 parcel!`;
    } else {
      msg =
        `Assalam-o-Alaikum ${order.customer?.fullName}!\n` +
        `💳 *STEP 2: CASH ON DELIVERY (COD) CONFIRMATION — ORDER #${dispOrderNum}*\n\n` +
        `Thank you for verifying your address and pair video! Your COD order is booked with *Rs. 0 Advance Required*:\n\n` +
        `• *Home Delivery:* ${deliveryLabel}\n` +
        `• *Advance Payable Now:* Rs. 0\n` +
        `• *Total Cash Payable on Delivery:* *${formatPKR(totalBill)}*\n\n` +
        `Your 1-of-1 sneaker is now moving to our dispatch desk!`;
    }

    launchWhatsApp(rawPhone || WHATSAPP_NUMBER, msg);
    showToast(`Step 2 (Payment Message) opened for Order #${dispOrderNum}`);
  };

  const sendBossOrderStep3PaymentReceivedAndDispatch = (order) => {
    let rawPhone = String(order.customer?.phone || '').replace(/[^0-9]/g, '');
    if (rawPhone.startsWith('03')) rawPhone = '92' + rawPhone.slice(1);

    const dispOrderNum = getOrderDisplayNumber(order);
    const totalBill = order.totals?.finalTotalWithShipping || 0;
    const isPrepaidOrder = order.paymentMethod === 'PREPAID';
    const depositAmt = isCodAdvancePolicyActive ? activeCodDepositAmount : 0;
    const remainingCOD = isPrepaidOrder
      ? 0
      : Math.max(0, totalBill - depositAmt);

    // Automatically mark as PAID / ADV PAID and ORDER CONFIRMED in state + Supabase
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== order.id) return o;
        const updatedOrder = {
          ...o,
          orderConfirmed: true,
          prepaidPaidStatus: isPrepaidOrder ? 'PAID' : o.prepaidPaidStatus,
          codAdvPaidStatus: !isPrepaidOrder ? 'ADV PAID' : o.codAdvPaidStatus,
          status: isPrepaidOrder
            ? `PAID (100% Received) • PARCEL READY FOR DISPATCH • ORDER CONFIRMED`
            : `ADV PAID (Rs. ${depositAmt} Received) • PARCEL READY FOR DISPATCH • ORDER CONFIRMED`
        };
        supabaseRest.upsertOrder(updatedOrder).catch(() => {});
        return updatedOrder;
      })
    );

    const pairDetails = (order.items || [])
      .map(
        (i, idx) =>
          `${idx + 1}. [Pair #${i.pairCode || dispOrderNum}] ${
            i.name || i.title
          } (EU ${i.sizeEU} | Insole ${i.insoleInches || '10.8'}")`
      )
      .join('\n');

    const msg =
      `Assalam-o-Alaikum ${order.customer?.fullName}!\n` +
      `✅ *PAYMENT RECEIVED & PARCEL READY FOR DISPATCH!*\n\n` +
      `Your payment has been received and your parcel is ready for dispatch!\n\n` +
      `• *Order Number:* #${dispOrderNum}\n` +
      `• *Payment Status:* ${
        isPrepaidOrder
          ? `100% Full Payment Received (${formatPKR(totalBill)} PAID)`
          : isCodAdvancePolicyActive
          ? `COD Advance Deposit Received (${formatPKR(depositAmt)} PAID)`
          : 'Confirmed for Cash on Delivery'
      }\n` +
      `• *Balance to Pay Courier on Delivery:* *${formatPKR(remainingCOD)}*\n\n` +
      `📦 *Parcel Contents:*\n${pairDetails}\n\n` +
      `📍 *Dispatching To:* ${order.customer?.address}, ${order.customer?.city} (${order.customer?.phone})\n\n` +
      `Your 1-of-1 sneaker is packed and ready for courier handover. Thank you for shopping with *PRESETS*!`;

    launchWhatsApp(rawPhone || WHATSAPP_NUMBER, msg);
    showToast(
      `Order #${dispOrderNum} marked PAID & Ready for Dispatch on WhatsApp!`
    );
  };

  const sendBossModeOrderWhatsAppConfirmation = (order) => {
    let rawPhone = String(order.customer?.phone || '').replace(/[^0-9]/g, '');
    if (rawPhone.startsWith('03')) rawPhone = '92' + rawPhone.slice(1);

    const dispOrderNum = getOrderDisplayNumber(order);
    const pairDetails = (order.items || [])
      .map(
        (i, idx) =>
          `${idx + 1}. [Pair #${i.pairCode || dispOrderNum}] ${
            i.name || i.title
          } (EU ${i.sizeEU} | Insole ${i.insoleInches || '10.8'}") — ${formatPKR(
            i.price
          )}${i.freeDelivery ? ' [FREE DELIVERY]' : ''}`
      )
      .join('\n');

    const totalBill = order.totals?.finalTotalWithShipping || 0;
    const hasFreePair = (order.items || []).some((i) => Boolean(i.freeDelivery));
    const isFreeDelivery = (order.totals?.shipping ?? SHIPPING_FEE) === 0 || hasFreePair;
    const deliveryLabel = isFreeDelivery
      ? 'FREE (Rs. 0 — Free Home Delivery Applied!)'
      : formatPKR(SHIPPING_FEE);
    const isPrepaidOrder = order.paymentMethod === 'PREPAID';
    const isAlreadyPaid = order.prepaidPaidStatus === 'PAID';
    const isCodAdvPaid = order.codAdvPaidStatus === 'ADV PAID';

    let plainMsg = '';
    if (isPrepaidOrder) {
      plainMsg =
        `Assalam-o-Alaikum ${order.customer?.fullName}!\n` +
        `Thank you for placing your *FULL PREPAID ORDER* with *PRESETS*.\n\n` +
        `*Order Number:* #${dispOrderNum}\n` +
        `*Payment Status:* ${
          isAlreadyPaid
            ? 'PAID (100% Verified)'
            : 'UNPAID (Awaiting Full Payment)'
        }\n` +
        `*Pair Details:*\n${pairDetails}\n\n` +
        `*Home Delivery:* ${deliveryLabel}\n` +
        `*Total Full Payment (100% Prepaid):* ${formatPKR(totalBill)}\n` +
        `*Remaining Balance on Delivery:* Rs. 0\n\n` +
        (isAlreadyPaid
          ? `We have received your full payment of *${formatPKR(
              totalBill
            )}*! Your pair is confirmed and we are sending your detailed pair inspection video right now before dispatch.`
          : `• Bank: JS Bank\n• Account Title: Ali Ammar\n• Account / Wallet Number: 03328559003\n• IBAN: ${BANK_IBAN}\n\nPlease transfer the *full payment of ${formatPKR(
              totalBill
            )}* into our JS Bank account above. You will receive a detailed video of your pair with your order confirmation!`);
    } else if (!isCodAdvancePolicyActive) {
      plainMsg =
        `Assalam-o-Alaikum ${order.customer?.fullName}!\n` +
        `Thank you for placing your *Cash on Delivery (COD)* order with *PRESETS*.\n\n` +
        `*Order Number:* #${dispOrderNum}\n` +
        `*COD Policy:* Rs. 0 Advance Required (100% Cash on Delivery)\n` +
        `*Pair Details:*\n${pairDetails}\n\n` +
        `*Home Delivery:* ${deliveryLabel}\n` +
        `*Total Bill Payable on Delivery:* ${formatPKR(totalBill)}\n` +
        `*Advance Deposit Required Now:* Rs. 0\n\n` +
        `Please reply *YES* to confirm your address so we can share your detailed sneaker inspection video and dispatch your 1-of-1 pair!`;
    } else {
      const depositAmt = activeCodDepositAmount;
      const remainingCOD = Math.max(0, totalBill - depositAmt);
      plainMsg =
        `Assalam-o-Alaikum ${order.customer?.fullName}!\n` +
        `Thank you for placing your *Cash on Delivery (COD)* order with *PRESETS*.\n\n` +
        `*Order Number:* #${dispOrderNum}\n` +
        `*Advance Status:* ${
          isCodAdvPaid
            ? `ADV PAID (Rs. ${depositAmt} Received)`
            : `ADV UNPAID (Rs. ${depositAmt} Pending)`
        }\n` +
        `*Pair Details:*\n${pairDetails}\n\n` +
        `*Home Delivery:* ${deliveryLabel}\n` +
        `*Total Bill:* ${formatPKR(totalBill)}\n` +
        `*Advance Deposit:* ${formatPKR(depositAmt)}\n` +
        `*Remaining Balance on Delivery (COD):* ${formatPKR(remainingCOD)}\n\n` +
        (isCodAdvPaid
          ? `Your *Rs. ${depositAmt} Advance Deposit* is confirmed! Remaining balance on delivery: *${formatPKR(
              remainingCOD
            )}*. We are sharing your detailed sneaker inspection video along with this confirmation!`
          : `• Bank: JS Bank\n• Account Title: Ali Ammar\n• Account Number: 03328559003\n• IBAN: ${BANK_IBAN}\n\nPlease deposit *${formatPKR(
              depositAmt
            )}* into our JS Bank account above. You will be delivered a detailed video of your pair with your order confirmation.`);
    }

    launchWhatsApp(rawPhone || WHATSAPP_NUMBER, plainMsg);
    showToast(`Opened WhatsApp for ${order.customer?.fullName}.`);
  };

  const loadOrderIntoDeliverySlip = (order) => {
    if (!order) return;
    const dispNum = getOrderDisplayNumber(order);
    const itemsText = (order.items || [])
      .map(
        (i) =>
          `Pair #${i.pairCode || dispNum} — ${i.name || i.title} (EU ${
            i.sizeEU
          })`
      )
      .join(', ');
    const fullBill = order.totals?.finalTotalWithShipping || 0;
    const isPrepaid = order.paymentMethod === 'PREPAID';
    const advDeducted = isPrepaid
      ? fullBill
      : isCodAdvancePolicyActive
      ? activeCodDepositAmount
      : 0;
    const collectAmt = isPrepaid
      ? 0
      : isCodAdvancePolicyActive
      ? Math.max(0, fullBill - activeCodDepositAmount)
      : fullBill;

    setDeliverySlipForm({
      slipId: `SLIP-${dispNum}-${Date.now().toString().slice(-4)}`,
      orderNumber: dispNum,
      trackingNumber: '',
      courierName: 'PostEx',
      customerName: String(order.customer?.fullName || ''),
      customerPhone: String(order.customer?.phone || ''),
      customerCity: String(order.customer?.city || ''),
      customerAddress: String(order.customer?.address || ''),
      pairDetails: itemsText || '1-of-1 Authentic Sneaker',
      paymentMethod: order.paymentMethod || 'PREPAID',
      amountToCollect: String(collectAmt),
      advanceDeducted: String(advDeducted),
      specialInstructions: 'Handle with Care • 1-of-1 Authentic Footwear'
    });
    setBossTab('delivery_slip');
    showToast(`Loaded Order #${dispNum} into PostEx Delivery Slip Maker!`);
  };

  const saveCurrentSlipToSupabase = async (silent = false) => {
    const newSlip = {
      ...deliverySlipForm,
      courierName: 'PostEx',
      slipId:
        deliverySlipForm.slipId ||
        `SLIP-${deliverySlipForm.orderNumber || '1'}-${Date.now()
          .toString()
          .slice(-5)}`,
      createdAt: new Date().toLocaleString()
    };
    setDeliverySlips((prev) => {
      const filtered = prev.filter((s) => s.slipId !== newSlip.slipId);
      return [newSlip, ...filtered];
    });
    try {
      await supabaseRest.upsertDeliverySlip(newSlip);
      setSupabaseSyncStatus('Cloud Database Connected');
      if (!silent) {
        showToast(
          `Saved PostEx Delivery Slip #${newSlip.orderNumber} to presets_delivery_slips!`
        );
      }
    } catch (e) {
      if (!silent) {
        showToast(
          `Saved PostEx Delivery Slip #${newSlip.orderNumber} locally.`
        );
      }
    }
    return newSlip;
  };

  const printOrDownloadDeliverySlip = async (
    customSlip = null,
    mode = 'download'
  ) => {
    const targetSlip = customSlip || (await saveCurrentSlipToSupabase(true));
    const slipHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>PRESETS PostEx Delivery Slip - Order #${targetSlip.orderNumber}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 24px; color: #111; }
    .slip { max-width: 720px; margin: 0 auto; background: #fff; border: 3px solid #111; border-radius: 12px; padding: 28px; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #ff5500; padding-bottom: 16px; margin-bottom: 20px; }
    .brand { background: #ff5500; color: #000; font-weight: 900; font-size: 24px; padding: 6px 16px; border-radius: 6px; display: inline-block; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 20px; }
    .box { border: 2px solid #222; border-radius: 10px; padding: 16px; }
    .box h3 { margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #ff5500; background: #111; padding: 6px 10px; border-radius: 4px; display: inline-block; }
    .row { margin: 6px 0; font-size: 14px; line-height: 1.4; }
    .footer { border-top: 2px dashed #444; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: bold; }
    .cod-badge { background: #111; color: #ff5500; padding: 10px 16px; border-radius: 8px; font-size: 18px; font-weight: 900; }
    @media print { body { background: #fff; padding: 0; } .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="slip">
    <div class="header">
      <div>
        <span class="brand">PRESETS</span>
        <div style="font-size:12px; font-weight:bold; margin-top:4px;">1-OF-1 AUTHENTIC KICKS ARCHIVE • PAKISTAN</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:20px; font-weight:900;">ORDER #${targetSlip.orderNumber}</div>
        <div style="font-size:12px; color:#111; font-weight:bold;">Courier: PostEx ${targetSlip.trackingNumber ? `• Tracking: ${targetSlip.trackingNumber}` : ''}</div>
        <div style="font-size:12px; color:#555;">Date: ${new Date().toLocaleDateString('en-PK')}</div>
      </div>
    </div>

    <div class="grid">
      <div class="box">
        <h3>FROM (SENDER DETAILS)</h3>
        <div class="row"><strong>Name:</strong> ${SENDER_DETAILS.name} (PRESETS)</div>
        <div class="row"><strong>Phone:</strong> ${SENDER_DETAILS.phone}</div>
        <div class="row"><strong>Address:</strong> ${SENDER_DETAILS.address}</div>
        <div class="row"><strong>City:</strong> ${SENDER_DETAILS.city}</div>
      </div>

      <div class="box">
        <h3>TO (CUSTOMER RECIPIENT)</h3>
        <div class="row"><strong>Name:</strong> ${targetSlip.customerName || 'N/A'}</div>
        <div class="row"><strong>Phone:</strong> ${targetSlip.customerPhone || 'N/A'}</div>
        <div class="row"><strong>Address:</strong> ${targetSlip.customerAddress || 'N/A'}</div>
        <div class="row"><strong>City:</strong> ${targetSlip.customerCity || 'N/A'}</div>
      </div>
    </div>

    <div class="box" style="margin-bottom:18px;">
      <h3>PACKAGE & PAYMENT DETAILS (POSTEX)</h3>
      <div class="row"><strong>Sneaker / Pair Details:</strong> ${targetSlip.pairDetails || '1-of-1 Authentic Pair'}</div>
      <div class="row"><strong>Advance Deducted:</strong> Rs. ${Number(targetSlip.advanceDeducted || 0).toLocaleString('en-PK')}</div>
      <div class="row"><strong>Special Instructions:</strong> ${targetSlip.specialInstructions || 'Handle with care'}</div>
    </div>

    <div class="footer">
      <div>POSTEX COURIER • HANDLE WITH CARE</div>
      <div class="cod-badge">
        CASH TO COLLECT ON DELIVERY: Rs. ${Number(targetSlip.amountToCollect || 0).toLocaleString('en-PK')}
      </div>
    </div>
  </div>
  <div class="no-print" style="text-align:center; margin-top:20px;">
    <button onclick="window.print()" style="background:#ff5500; color:#000; border:none; padding:12px 24px; font-weight:900; border-radius:8px; cursor:pointer;">Print / Save as PDF</button>
  </div>
</body>
</html>`;

    if (mode === 'print') {
      const printWin = window.open('', '_blank', 'width=850,height=700');
      if (printWin) {
        printWin.document.open();
        printWin.document.write(slipHtml);
        printWin.document.close();
        setTimeout(() => printWin.print(), 350);
        return;
      }
    }

    const blob = new Blob([slipHtml], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `PRESETS_PostEx_Slip_Order_${targetSlip.orderNumber}.html`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(
      `Saved to Supabase & Downloaded PostEx Slip for Order #${targetSlip.orderNumber}`
    );
  };

  const downloadDeliverySlipDocument = () => {
    const slipHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>PRESETS PostEx Delivery Slip - Order #${deliverySlipForm.orderNumber}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 24px; color: #111; }
    .slip { max-width: 720px; margin: 0 auto; background: #fff; border: 3px solid #111; border-radius: 12px; padding: 28px; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #ff5500; padding-bottom: 16px; margin-bottom: 20px; }
    .brand { background: #ff5500; color: #000; font-weight: 900; font-size: 24px; padding: 6px 16px; border-radius: 6px; display: inline-block; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 20px; }
    .box { border: 2px solid #222; border-radius: 10px; padding: 16px; }
    .box h3 { margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #ff5500; background: #111; padding: 6px 10px; border-radius: 4px; display: inline-block; }
    .row { margin: 6px 0; font-size: 14px; line-height: 1.4; }
    .footer { border-top: 2px dashed #444; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: bold; }
    .cod-badge { background: #111; color: #ff5500; padding: 10px 16px; border-radius: 8px; font-size: 18px; font-weight: 900; }
    @media print { body { background: #fff; padding: 0; } .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="slip">
    <div class="header">
      <div>
        <span class="brand">PRESETS</span>
        <div style="font-size:12px; font-weight:bold; margin-top:4px;">1-OF-1 AUTHENTIC KICKS ARCHIVE • PAKISTAN</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:20px; font-weight:900;">ORDER #${deliverySlipForm.orderNumber}</div>
        <div style="font-size:12px; font-weight:bold;">Courier: PostEx</div>
        <div style="font-size:12px; color:#555;">Date: ${new Date().toLocaleDateString('en-PK')}</div>
      </div>
    </div>

    <div class="grid">
      <div class="box">
        <h3>FROM (SENDER DETAILS)</h3>
        <div class="row"><strong>Name:</strong> ${SENDER_DETAILS.name} (PRESETS)</div>
        <div class="row"><strong>Phone:</strong> ${SENDER_DETAILS.phone}</div>
        <div class="row"><strong>Address:</strong> ${SENDER_DETAILS.address}</div>
        <div class="row"><strong>City:</strong> ${SENDER_DETAILS.city}</div>
      </div>

      <div class="box">
        <h3>TO (CUSTOMER RECIPIENT)</h3>
        <div class="row"><strong>Name:</strong> ${deliverySlipForm.customerName || 'N/A'}</div>
        <div class="row"><strong>Phone:</strong> ${deliverySlipForm.customerPhone || 'N/A'}</div>
        <div class="row"><strong>Address:</strong> ${deliverySlipForm.customerAddress || 'N/A'}</div>
        <div class="row"><strong>City:</strong> ${deliverySlipForm.customerCity || 'N/A'}</div>
      </div>
    </div>

    <div class="box" style="margin-bottom:18px;">
      <h3>PACKAGE & PAYMENT DETAILS (POSTEX)</h3>
      <div class="row"><strong>Sneaker / Pair Details:</strong> ${deliverySlipForm.pairDetails || '1-of-1 Authentic Pair'}</div>
      <div class="row"><strong>Payment Method:</strong> ${deliverySlipForm.paymentMethod}</div>
    </div>

    <div class="footer">
      <div>POSTEX COURIER • HANDLE WITH CARE</div>
      <div class="cod-badge">
        CASH TO COLLECT ON DELIVERY: Rs. ${Number(deliverySlipForm.amountToCollect || 0).toLocaleString('en-PK')}
      </div>
    </div>
  </div>
  <div class="no-print" style="text-align:center; margin-top:20px;">
    <button onclick="window.print()" style="background:#ff5500; color:#000; border:none; padding:12px 24px; font-weight:900; border-radius:8px; cursor:pointer;">Print / Save as PDF</button>
  </div>
</body>
</html>`;

    const blob = new Blob([slipHtml], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `PRESETS_PostEx_Slip_Order_${deliverySlipForm.orderNumber}.html`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded PostEx Delivery Slip for Order #${deliverySlipForm.orderNumber}`);
  };

  const handleDevicePhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = 5 - pairForm.images.length;
    if (remainingSlots <= 0) {
      showToast('Maximum 5 photos allowed per pair.');
      e.target.value = '';
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);
    setAiVisionStatus('Checking photo...');

    const readAndCompressImage = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxDim = 800;
            let w = img.width;
            let h = img.height;
            if (w > h && w > maxDim) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else if (h > maxDim) {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);

            resolve({
              dataUrl: canvas.toDataURL('image/jpeg', 0.72),
              fileName: file.name
            });
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });

    const processed = await Promise.all(
      selectedFiles.map(readAndCompressImage)
    );
    const newImages = [
      ...pairForm.images,
      ...processed.map((p) => p.dataUrl)
    ].slice(0, 5);

    setPairForm((prev) => ({
      ...prev,
      images: newImages,
      name: prev.name.trim() ? prev.name : 'Air Force 1 Low Retro'
    }));

    setAiVisionStatus(`Uploaded ${processed.length} photo(s).`);
    showToast(`Uploaded ${processed.length} photo(s).`);
    e.target.value = '';
  };

  const handleDefectPhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentDefects = Array.isArray(pairForm.defectImages)
      ? pairForm.defectImages
      : [];
    const remainingSlots = 5 - currentDefects.length;
    if (remainingSlots <= 0) {
      showToast('Maximum 5 defect photos allowed per pair.');
      e.target.value = '';
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);
    const readAndCompressDefect = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxDim = 750;
            let w = img.width;
            let h = img.height;
            if (w > h && w > maxDim) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else if (h > maxDim) {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL('image/jpeg', 0.72));
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });

    const compressedDefects = await Promise.all(
      selectedFiles.map(readAndCompressDefect)
    );
    setPairForm((prev) => ({
      ...prev,
      defectImages: [...(prev.defectImages || []), ...compressedDefects].slice(
        0,
        5
      )
    }));
    showToast(`Uploaded ${compressedDefects.length} defect/condition photo(s).`);
    e.target.value = '';
  };

  const handleSaveSneaker = (e) => {
    e.preventDefault();
    if (!pairForm.name.trim() || !pairForm.price) {
      showToast('Please enter a Sneaker Name and Base Price.');
      return;
    }
    if (pairForm.images.length === 0) {
      showToast('Please upload at least 1 photo.');
      return;
    }

    const defaultNextCode = String(sneakers.length + 1);
    const finalCustomPairId =
      String(pairForm.customPairId || '').trim() || defaultNextCode;
    const discPct = Math.min(
      90,
      Math.max(0, Number(pairForm.discountPercent) || 0)
    );
    const origPrice = Number(pairForm.price) || 0;
    const salePrice = Math.round(origPrice * (1 - discPct / 100));

    const formattedPair = {
      id: editingPairId ? String(editingPairId) : finalCustomPairId,
      customPairId: finalCustomPairId,
      imageRatio: '1:1',
      imageFit: pairForm.imageFit || 'cover',
      imageZoom: Number(pairForm.imageZoom) || 1,
      defectImages: Array.isArray(pairForm.defectImages)
        ? pairForm.defectImages.slice(0, 5)
        : [],
      name: pairForm.name.trim(),
      title: pairForm.name.trim(),
      brand: pairForm.brand || 'PRESETS',
      category: pairForm.category,
      sizeEU: String(pairForm.sizeEU),
      insoleInches: String(
        pairForm.insoleInches || EU_TO_INSOLE_MAP[pairForm.sizeEU] || '10.8'
      ),
      price: origPrice,
      salePrice: salePrice,
      discountPercent: discPct,
      isOnOffer: discPct > 0,
      prepaidOnly: Boolean(pairForm.prepaidOnly),
      freeDelivery: Boolean(pairForm.freeDelivery),
      status: pairForm.status || 'available',
      condition: {
        soles: Number(pairForm.soles) || 9,
        body: Number(pairForm.body) || 9,
        laces: Number(pairForm.laces) || 9,
        inside: Number(pairForm.inside) || 9
      },
      description:
        pairForm.description.trim() ||
        '100% Authentic 1-of-1 pre-loved pair. High quality guaranteed by PRESETS.',
      images: pairForm.images.slice(0, 5),
      createdAt: Date.now()
    };

    if (editingPairId) {
      setSneakers((prev) =>
        prev.map((s) => (s.id === editingPairId ? formattedPair : s))
      );
      supabaseRest.upsertProduct(formattedPair).catch(() => {});
      showToast(
        `Updated ${formattedPair.name} (Pair ID #${finalCustomPairId}) in presets_inventory!`
      );
    } else {
      setSneakers((prev) => [formattedPair, ...prev]);
      supabaseRest.upsertProduct(formattedPair).catch(() => {});
      showToast(
        `Published ${formattedPair.name} (Pair ID #${finalCustomPairId}) to presets_inventory!`
      );
    }

    resetPairForm();
    setBossTab('inventory');
  };

  const resetPairForm = () => {
    setEditingPairId(null);
    setAiVisionStatus('');
    setPairForm({
      customPairId: '',
      imageRatio: '1:1',
      imageFit: 'cover',
      imageZoom: 1,
      name: '',
      brand: 'PRESETS',
      category: 'Casual',
      sizeEU: '43',
      insoleInches: '10.8',
      price: '',
      discountPercent: 0,
      prepaidOnly: false,
      freeDelivery: false,
      status: 'available',
      soles: 9,
      body: 9,
      laces: 9,
      inside: 9,
      description: '',
      images: [],
      defectImages: []
    });
  };

  const startEditPair = (pair) => {
    setEditingPairId(pair.id);
    setPairForm({
      customPairId: getPairCode(pair),
      imageRatio: '1:1',
      imageFit: pair.imageFit || 'cover',
      imageZoom: Number(pair.imageZoom) || 1,
      name: pair.name || pair.title || '',
      brand: pair.brand || 'PRESETS',
      category: pair.category || 'Casual',
      sizeEU: String(pair.sizeEU ?? pair.eu_size ?? pair.size ?? '43'),
      insoleInches: String(pair.insoleInches ?? pair.insole_inches ?? '10.8'),
      price: pair.price ?? pair.price_pkr ?? '',
      discountPercent: pair.discountPercent ?? pair.discount_percent ?? 0,
      prepaidOnly: Boolean(pair.prepaidOnly || pair.is_prepaid_only),
      freeDelivery: Boolean(pair.freeDelivery),
      status: pair.status || 'available',
      soles: pair.condition?.soles ?? 9,
      body: pair.condition?.body ?? 9,
      laces: pair.condition?.laces ?? 9,
      inside: pair.condition?.inside ?? 9,
      description: pair.description || '',
      images: Array.isArray(pair.images) ? pair.images : [],
      defectImages: Array.isArray(pair.defectImages) ? pair.defectImages : []
    });
    setBossTab('upload');
  };

  const deletePairPermanently = (pairId) => {
    setSneakers((prev) => prev.filter((s) => s.id !== pairId));
    setCart((prev) => prev.filter((id) => id !== pairId));
    supabaseRest.deleteProduct(pairId).catch(() => {});
    setDeleteConfirmId(null);
    showToast('Pair removed from store.');
  };

  const triggerCSVDownload = (filename, rowsArray) => {
    const csvString = '\uFEFF' + rowsArray.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportInventoryToExcelCSV = () => {
    const headers = [
      'ID',
      'Sneaker Name',
      'Category',
      'Size EU',
      'Insole (Inches)',
      'Base Price (PKR)',
      'Discount %',
      'Net Price (PKR)',
      'Prepaid Only',
      'Status',
      'Avg Condition'
    ];
    const rows = sneakers.map((s) => [
      s.id,
      `"${String(s.name || s.title || '').replace(/"/g, '""')}"`,
      s.category,
      s.sizeEU || s.eu_size || s.size,
      s.insoleInches || '10.8',
      s.price || s.price_pkr,
      s.discountPercent || 0,
      getEffectivePairPrice(s),
      s.prepaidOnly ? 'YES' : 'NO',
      String(s.status || 'available').toUpperCase(),
      getAverageCondition(s.condition)
    ]);
    triggerCSVDownload(
      `PRESETS_Inventory_${new Date().toISOString().slice(0, 10)}.csv`,
      [headers, ...rows]
    );
    showToast('Downloaded Inventory CSV.');
  };

  const exportOrdersToExcelCSV = () => {
    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Phone',
      'City',
      'Address',
      'Payment Type',
      'Total Bill (PKR)',
      'Status'
    ];
    const rows = orders.map((o) => [
      o.id,
      `"${o.createdAt}"`,
      `"${String(o.customer?.fullName || '').replace(/"/g, '""')}"`,
      `"${String(o.customer?.phone || '')}"`,
      `"${String(o.customer?.city || '')}"`,
      `"${String(o.customer?.address || '').replace(/"/g, '""')}"`,
      o.paymentMethod,
      o.totals?.finalTotalWithShipping || 0,
      `"${o.status}"`
    ]);
    triggerCSVDownload(
      `PRESETS_Orders_${new Date().toISOString().slice(0, 10)}.csv`,
      [headers, ...rows]
    );
    showToast('Downloaded Orders CSV.');
  };

  const selectedPair = useMemo(
    () => sneakers.find((s) => s.id === selectedPairId) || null,
    [sneakers, selectedPairId]
  );

  // ==========================================
  // LIVE SCROLL UP / DOWN MOTION & 3D KINETIC ENGINE
  // ==========================================
  const [scrollMotion, setScrollMotion] = useState({
    y: 0,
    velocity: 0,
    direction: 'idle',
    progress: 0
  });

  useEffect(() => {
    let lastY = window.scrollY || 0;
    let rafId = null;
    let decayTimer = null;

    const handleScrollMotion = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const currentY = window.scrollY || 0;
        const rawDelta = currentY - lastY;
        const clampedVel = Math.max(-32, Math.min(32, rawDelta));
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const pct = Math.min(100, Math.max(0, (currentY / maxScroll) * 100));

        setScrollMotion({
          y: currentY,
          velocity: clampedVel,
          direction: rawDelta > 1 ? 'down' : rawDelta < -1 ? 'up' : 'idle',
          progress: pct
        });

        lastY = currentY;
        rafId = null;

        if (decayTimer) clearTimeout(decayTimer);
        decayTimer = setTimeout(() => {
          setScrollMotion((prev) => ({
            ...prev,
            velocity: 0,
            direction: 'idle'
          }));
        }, 120);
      });
    };

    window.addEventListener('scroll', handleScrollMotion, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollMotion);
      if (rafId) cancelAnimationFrame(rafId);
      if (decayTimer) clearTimeout(decayTimer);
    };
  }, []);

  const heroTiltX = Math.max(-16, Math.min(16, scrollMotion.velocity * 0.48));
  const heroTiltY = Math.max(
    -10,
    Math.min(10, Math.sin(scrollMotion.y * 0.015) * 6)
  );
  const heroScale = Math.max(
    0.88,
    1 - Math.min(0.12, scrollMotion.y * 0.00028) + Math.abs(scrollMotion.velocity) * 0.0018
  );
  const heroTranslateY = Math.min(64, scrollMotion.y * 0.18) - scrollMotion.velocity * 0.65;
  const cardKineticSkew = Math.max(
    -2.5,
    Math.min(2.5, scrollMotion.velocity * 0.08)
  );

  return (
    <div className="min-h-screen bg-[#0D0602] text-zinc-100 font-sans selection:bg-[#FF5500] selection:text-black relative overflow-x-hidden">
      <style>{`
        @keyframes presetsFloatPulse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-9px) rotate(0.6deg); }
        }
        @keyframes presetsGlowSweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes presetsLuxurySheen {
          0% { transform: translateX(-140%) skewX(-24deg); }
          100% { transform: translateX(240%) skewX(-24deg); }
        }
        @keyframes presetsAuraBreath {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.92; transform: scale(1.12); }
        }
        @keyframes presetsBorderFlow {
          0%, 100% { box-shadow: 0 0 22px rgba(255, 85, 0, 0.25), inset 0 0 12px rgba(212, 175, 55, 0.08); }
          50% { box-shadow: 0 0 38px rgba(255, 85, 0, 0.55), inset 0 0 22px rgba(212, 175, 55, 0.24); }
        }
        @keyframes presetsOrbitSpin {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
          50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.06); }
          100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
        }
        @keyframes presetsOrbitSpinReverse {
          0% { transform: translate(-50%, -50%) rotate(360deg) scale(1.04); }
          50% { transform: translate(-50%, -50%) rotate(180deg) scale(0.96); }
          100% { transform: translate(-50%, -50%) rotate(0deg) scale(1.04); }
        }
        @keyframes presetsTitleShimmer {
          0% { filter: drop-shadow(0 0 18px rgba(255, 85, 0, 0.45)); }
          50% { filter: drop-shadow(0 0 36px rgba(212, 175, 55, 0.75)); }
          100% { filter: drop-shadow(0 0 18px rgba(255, 85, 0, 0.45)); }
        }
        .presets-3d-card {
          position: relative;
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
          will-change: transform;
          backdrop-filter: blur(16px);
        }
        .presets-3d-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(circle at 50% 0%, rgba(255, 115, 25, 0.18), transparent 65%);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
          z-index: 1;
        }
        .presets-3d-card:hover::before {
          opacity: 1;
        }
        .presets-3d-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 55%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 225, 160, 0.28), transparent);
          transform: translateX(-160%) skewX(-24deg);
          pointer-events: none;
          z-index: 2;
        }
        .presets-3d-card:hover::after {
          animation: presetsLuxurySheen 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .presets-3d-card:hover {
          transform: translateY(-14px) scale(1.04) rotateX(4.5deg) rotateY(-2.5deg);
          box-shadow: 0 30px 60px -12px rgba(255, 85, 0, 0.58), 0 0 38px rgba(212, 175, 55, 0.36);
        }
        .presets-hero-title {
          background-size: 200% auto;
          animation: presetsGlowSweep 4s ease infinite, presetsTitleShimmer 3.5s ease-in-out infinite;
        }
        .presets-luxury-badge {
          animation: presetsFloatPulse 3.8s ease-in-out infinite, presetsBorderFlow 3.2s ease-in-out infinite;
        }
        .presets-aura-orb {
          animation: presetsAuraBreath 5s ease-in-out infinite;
        }
        .presets-orbit-ring-1 {
          animation: presetsOrbitSpin 26s linear infinite;
        }
        .presets-orbit-ring-2 {
          animation: presetsOrbitSpinReverse 34s linear infinite;
        }
      `}</style>

      {/* Ambient Luxury Motion Graphics Layer (Floating Gold & Neon-Orange Rings) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="presets-orbit-ring-1 absolute left-1/2 top-[28%] w-[540px] h-[540px] sm:w-[760px] sm:h-[760px] rounded-full border border-[#FF5500]/15"
          style={{
            boxShadow:
              '0 0 90px rgba(255, 85, 0, 0.08), inset 0 0 60px rgba(212, 175, 55, 0.06)'
          }}
        />
        <div
          className="presets-orbit-ring-2 absolute left-1/2 top-[28%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full border border-dashed border-amber-400/15"
        />
      </div>

      {/* Interactive Luxury Cursor Spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(520px circle at ${cursorGlow.x}px ${cursorGlow.y}px, rgba(255, 95, 0, 0.11), rgba(212, 175, 55, 0.045) 42%, transparent 78%)`
        }}
      />

      {/* Top Neon Scroll Progress & Velocity Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-black/40">
        <div
          className="h-full bg-gradient-to-r from-[#FF5500] via-amber-400 to-[#FF5500] shadow-[0_0_18px_#FF5500] transition-all duration-150"
          style={{ width: `${scrollMotion.progress}%` }}
        />
      </div>

      {/* Floating Scroll Up / Down Quick Warp Controls */}
      {scrollMotion.y > 260 && (
        <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Scroll to Top"
            className="w-10 h-10 rounded-full bg-[#160B04]/90 hover:bg-[#FF5500] text-[#FF5500] hover:text-black border border-[#FF5500]/50 shadow-[0_0_20px_rgba(255,85,0,0.4)] flex items-center justify-center transition duration-300 hover:scale-110"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
              })
            }
            title="Scroll to Bottom"
            className="w-10 h-10 rounded-full bg-[#160B04]/90 hover:bg-[#FF5500] text-[#FF5500] hover:text-black border border-[#FF5500]/50 shadow-[0_0_20px_rgba(255,85,0,0.4)] flex items-center justify-center transition duration-300 hover:scale-110"
          >
            ↓
          </button>
        </div>
      )}

      <GlobalParticleUniverse
        hyperMode={hyperParticles}
        burstTrigger={burstCount}
      />

      <div
        className="fixed inset-x-0 top-0 h-96 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(255, 85, 0, 0.22), rgba(255, 85, 0, 0.04) 55%, transparent 80%)'
        }}
      />

      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#FF5500] text-black font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-[0_0_30px_rgba(255,85,0,0.65)] border border-white/20">
          {String(toast)}
        </div>
      )}

      {/* Top Announcement Marquee */}
      <div className="relative z-30 bg-[#FF5500] text-black text-[11px] sm:text-xs font-black tracking-wider uppercase py-1.5 px-3 text-center">
        {String(
          storeConfig.frontBannerText ||
            '5% OFF ON FULL PREPAYMENT • FREE HOME DELIVERY ON ORDERS ABOVE RS. 8,000 • 1-OF-1 AUTHENTIC KICKS'
        )}
      </div>

      {/* Live Front Header Sale Countdown Bar (Customizable in Boss Mode) */}
      {storeConfig.countdownEnabled && (
        <div className="relative z-30 bg-[#140802] border-b border-[#FF5500]/40 py-2 px-3">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="font-black uppercase tracking-widest text-[#FF5500] flex items-center gap-1.5">
              <Icon name="zap" className="w-3.5 h-3.5" />
              <span>
                {String(
                  storeConfig.countdownTitle || '⚡ FLASH VAULT SALE ENDS IN:'
                )}
              </span>
            </span>

            {countdownRemaining.expired ? (
              <span className="bg-[#FF5500] text-black font-black px-3 py-0.5 rounded-md text-[11px]">
                FINAL HOURS — LIVE NOW
              </span>
            ) : (
              <div className="flex items-center gap-1.5 font-mono">
                {[
                  { label: 'DAYS', val: countdownRemaining.days },
                  { label: 'HRS', val: countdownRemaining.hours },
                  { label: 'MIN', val: countdownRemaining.minutes },
                  { label: 'SEC', val: countdownRemaining.seconds }
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="bg-[#090301] border border-[#FF5500]/50 px-2 py-0.5 rounded-md flex items-baseline gap-1 shadow-[0_0_12px_rgba(255,85,0,0.25)]"
                  >
                    <span className="text-white font-black text-xs sm:text-sm">
                      {unit.val}
                    </span>
                    <span className="text-[9px] text-[#FF5500] font-bold">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <span className="hidden md:inline-block text-[11px] text-orange-200/85 font-semibold">
              • Free Home Delivery on Orders Above Rs. 8,000!
            </span>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-30 bg-[#0D0602]/95 backdrop-blur-xl border-b border-[#FF5500]/25">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <button
              onClick={() => setActiveView('home')}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="bg-[#FF5500] text-black font-black tracking-tight px-3.5 py-1 rounded-md text-base sm:text-lg shadow-[0_0_20px_rgba(255,85,0,0.55)]">
                PRESETS
              </div>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="sm:hidden flex items-center gap-1.5 bg-[#1A0D05] hover:bg-[#FF5500]/20 border border-[#FF5500]/45 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-[0_0_15px_rgba(255,85,0,0.2)]"
            >
              <Icon name="bag" className="w-3.5 h-3.5 text-[#FF5500]" />
              <span className="text-orange-100">Bag</span>
              <span className="bg-[#FF5500] text-black px-2 py-0.5 rounded-full text-[11px] font-black">
                {cartItems.length}
              </span>
            </button>
          </div>

          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveView('home')}
              className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
                activeView === 'home'
                  ? 'bg-[#FF5500] text-black font-bold shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                  : 'text-orange-200/80 hover:text-white bg-[#1A0D05] border border-[#FF5500]/20'
              }`}
            >
              Store
            </button>

            <button
              onClick={() => setActiveView('policies')}
              className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
                activeView === 'policies'
                  ? 'bg-[#FF5500] text-black font-bold shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                  : 'text-orange-200/80 hover:text-white bg-[#1A0D05] border border-[#FF5500]/20'
              }`}
            >
              Policies
            </button>

            <button
              type="button"
              onClick={() => setQueryModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A0D05] hover:bg-[#FF5500]/20 border border-[#FF5500]/35 text-orange-200 hover:text-white transition shrink-0"
            >
              <Icon name="whatsapp" className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Queries</span>
            </button>

            <button
              type="button"
              onClick={() => setReturnModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A0D05] hover:bg-[#FF5500]/20 border border-[#FF5500]/35 text-orange-200 hover:text-white transition shrink-0"
            >
              <Icon name="shield" className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Return Pair</span>
            </button>

            <button
              type="button"
              onClick={() => setCancelModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A0D05] hover:bg-[#FF5500]/20 border border-[#FF5500]/35 text-orange-200 hover:text-white transition shrink-0"
            >
              <Icon name="xcircle" className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Cancel Order</span>
            </button>
          </nav>

          <button
            onClick={() => setIsCartOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-[#1A0D05] hover:bg-[#FF5500]/20 border border-[#FF5500]/45 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition shadow-[0_0_15px_rgba(255,85,0,0.2)]"
          >
            <Icon name="bag" className="w-4 h-4 text-[#FF5500]" />
            <span className="text-orange-100">Bag</span>
            <span className="bg-[#FF5500] text-black px-2 py-0.5 rounded-full text-xs font-black">
              {cartItems.length}
            </span>
          </button>
        </div>
      </header>

      {/* ==========================================
          HOME VIEW
         ========================================== */}
      {activeView === 'home' && (
        <main className="relative z-10">
          <section className="relative py-20 sm:py-28 px-4 border-b border-[#FF5500]/25 overflow-hidden">
            <HeroRevolvingParticleRing />

            <div
              style={{
                transform: `perspective(1100px) rotateX(${heroTiltX}deg) rotateY(${heroTiltY}deg) translateY(${heroTranslateY}px) scale(${heroScale})`,
                transition: 'transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="relative z-10 max-w-4xl mx-auto text-center space-y-6"
            >
              <div className="py-4 space-y-3 relative">
                <div className="presets-aura-orb absolute -inset-x-10 -inset-y-6 bg-gradient-to-r from-[#FF5500]/15 via-amber-500/20 to-[#FF5500]/15 blur-3xl rounded-full pointer-events-none" />

                <div
                  style={{
                    transform: `translateY(${scrollMotion.velocity * -0.45}px) scale(${
                      1 + Math.min(0.08, Math.abs(scrollMotion.velocity) * 0.003)
                    })`,
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <span className="presets-luxury-badge inline-block text-[11px] sm:text-xs font-black uppercase tracking-[0.35em] text-orange-200 bg-gradient-to-r from-[#1A0C04] via-[#2A1205] to-[#1A0C04] border border-[#FF5500]/50 px-5 py-1.5 rounded-full shadow-[0_0_30px_rgba(255,85,0,0.4)]">
                    EXCLUSIVE ARCHIVE • PAKISTAN
                  </span>
                </div>

                <h1
                  style={{
                    letterSpacing: `${Math.min(
                      14,
                      Math.abs(scrollMotion.velocity) * 0.32 +
                        Math.min(6, scrollMotion.y * 0.015)
                    )}px`,
                    transform: `translateZ(40px) skewX(${
                      scrollMotion.velocity * -0.18
                    }deg)`,
                    textShadow: `0 ${Math.max(
                      -18,
                      Math.min(18, scrollMotion.velocity * 0.6)
                    )}px 45px rgba(255, 85, 0, 0.78), 0 0 22px rgba(212, 175, 55, 0.45)`,
                    transition:
                      'letter-spacing 0.18s ease-out, transform 0.18s ease-out, text-shadow 0.18s ease-out'
                  }}
                  className="text-6xl sm:text-8xl font-black tracking-tighter text-white"
                >
                  PRESETS<span className="text-[#FF5500]">.</span>
                </h1>

                <p
                  style={{
                    transform: `translateY(${scrollMotion.velocity * 0.35}px)`,
                    letterSpacing: `${
                      3 + Math.min(6, Math.abs(scrollMotion.velocity) * 0.15)
                    }px`,
                    transition:
                      'transform 0.2s ease-out, letter-spacing 0.2s ease-out'
                  }}
                  className="presets-hero-title text-xl sm:text-3xl font-black uppercase bg-gradient-to-r from-orange-200 via-[#FF6600] to-amber-300 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,85,0,0.35)]"
                >
                  1-of-1 Authentic Kicks.
                </p>
              </div>

              <div
                style={{
                  transform: `translateY(${scrollMotion.velocity * 0.25}px)`,
                  transition: 'transform 0.2s ease-out'
                }}
                className="flex flex-wrap items-center justify-center gap-3 pt-2"
              >
                <a
                  href="#vault-catalog"
                  className="bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black px-8 py-3.5 rounded-full text-xs sm:text-sm transition shadow-[0_0_30px_rgba(255,85,0,0.55)]"
                >
                  Explore 1-of-1 Vault
                </a>
                <a
                  href="#community-reviews"
                  className="bg-[#1A0D05] hover:bg-[#FF5500]/20 border border-[#FF5500]/40 text-orange-200 font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm transition"
                >
                  Customer Reviews ({reviews.length})
                </a>
              </div>

              <div className="max-w-xl mx-auto pt-1 text-xs text-orange-200/80 flex items-center justify-center gap-2">
                <Icon
                  name="ruler"
                  className="w-3.5 h-3.5 text-[#FF5500] shrink-0"
                />
                <span>
                  Reminder: Always check the{' '}
                  <strong className="text-[#FF5500]">
                    Insole Size in Inches
                  </strong>{' '}
                  on each sneaker before ordering.
                </span>
              </div>
            </div>
          </section>

          {storeConfig.saleBannerEnabled && storeConfig.saleBannerImage && (
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#FF5500]/60 shadow-[0_0_45px_rgba(255,85,0,0.3)] group h-64 sm:h-80 md:h-96 bg-[#140903]">
                <img
                  src={storeConfig.saleBannerImage}
                  alt={storeConfig.saleBannerTitle || 'PRESETS Sale Banner'}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 scale-105 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent flex flex-col justify-center p-6 sm:p-12 space-y-3">
                  <div className="inline-flex items-center gap-2 bg-[#FF5500] text-black text-[11px] sm:text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full w-fit shadow-[0_0_20px_rgba(255,85,0,0.8)]">
                    <Icon name="zap" className="w-3.5 h-3.5" />
                    <span>
                      {String(storeConfig.saleBannerBadge || '🔥 MEGA SALE LIVE')}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight max-w-xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                    {String(
                      storeConfig.saleBannerTitle || 'PRESETS EXCLUSIVE SALE'
                    )}
                  </h2>

                  <p className="text-xs sm:text-base text-orange-100/90 max-w-lg font-medium leading-relaxed">
                    {String(storeConfig.saleBannerSubtitle || '')}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="#vault-catalog"
                      className="bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black px-6 py-2.5 rounded-full text-xs sm:text-sm transition shadow-[0_0_25px_rgba(255,85,0,0.6)] inline-flex items-center gap-2"
                    >
                      <span>Shop Sale Pairs</span>
                      <Icon name="arrowRight" className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section
            id="vault-catalog"
            className="max-w-[1440px] mx-auto px-3 sm:px-6 py-10 space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Icon
                  name="search"
                  className="w-4 h-4 text-[#FF5500] absolute left-3.5 top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sneakers, size, or insole inches..."
                  className="w-full bg-[#160B04] border border-[#FF5500]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-orange-200/40 focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs text-[#FF5500] font-bold mr-1 shrink-0">
                  EU Size:
                </span>
                {EU_SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                      selectedSize === sz
                        ? 'bg-[#FF5500] text-black shadow-[0_0_12px_rgba(255,85,0,0.4)]'
                        : 'bg-[#160B04] text-orange-200/70 hover:text-white border border-[#FF5500]/20'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {SHOE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.45)]'
                      : 'bg-[#160B04] text-orange-200/75 hover:text-white border border-[#FF5500]/25'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 6 PAIRS PER ROW STOREFRONT GRID */}
            <div
              style={{
                transform: `skewY(${cardKineticSkew * 0.25}deg)`,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5"
            >
              {filteredSneakers.map((pair) => {
                const displayTitle = String(pair.name || pair.title || 'Authentic Sneaker');
                const displaySize = String(pair.sizeEU ?? pair.eu_size ?? pair.size ?? '43');
                const finalPrice = getEffectivePairPrice(pair);
                const hasDiscount = (Number(pair.discountPercent) || 0) > 0;
                const isSold = pair.status !== 'available' || pair.sold === true || pair.in_stock === false;
                const avgScore = getAverageCondition(pair.condition);
                const coverImg =
                  pair.images?.[0] || pair.image_url || pair.image;
                const fitClass =
                  pair.imageFit === 'contain' ? 'object-contain p-2' : 'object-cover';
                const zoomScale = Number(pair.imageZoom) || 1;

                return (
                  <div
                    key={pair.id}
                    className="presets-3d-card group bg-[#150A03] border border-[#FF5500]/25 hover:border-[#FF5500] rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div
                        onClick={() => {
                          setSelectedPairId(pair.id);
                          setActiveImageIdx(0);
                          setActiveDefectIdx(0);
                          setActiveView('product');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="relative w-full aspect-square bg-[#090401] overflow-hidden cursor-pointer"
                      >
                        <img
                          src={coverImg}
                          alt={displayTitle}
                          style={{ transform: `scale(${zoomScale})` }}
                          className={`w-full h-full ${fitClass} transition duration-500 ${
                            isSold ? 'opacity-45 grayscale' : ''
                          }`}
                        />

                        {/* Pair ID intentionally hidden on storefront; shown inside Inspection Page */}
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          <span className="bg-black/80 backdrop-blur-md text-orange-200 border border-[#FF5500]/30 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            {String(pair.category || 'Casual')}
                          </span>
                          {hasDiscount && (
                            <span className="bg-[#FF5500] text-black text-[9px] font-black px-1.5 py-0.5 rounded">
                              -{pair.discountPercent}%
                            </span>
                          )}
                          {(pair.prepaidOnly || pair.is_prepaid_only) && (
                            <span className="bg-[#FF5500] text-black text-[9px] font-black px-1.5 py-0.5 rounded">
                              Prepaid Only
                            </span>
                          )}
                          {(pair.freeDelivery || finalPrice >= FREE_DELIVERY_THRESHOLD) && (
                            <span className="bg-emerald-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded">
                              Free Delivery
                            </span>
                          )}
                        </div>

                        <div className="absolute top-2 right-2 bg-black/85 border border-[#FF5500]/50 text-[#FF5500] text-[10px] font-black px-1.5 py-0.5 rounded">
                          {avgScore}/10
                        </div>

                        {isSold && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="bg-[#FF5500] text-black font-black tracking-wider uppercase px-3 py-1 rounded-full text-[10px]">
                              Sold Out
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-orange-200/80 font-semibold">
                          <span>EU {displaySize}</span>
                          <span className="text-[#FF5500]">
                            Insole {pair.insoleInches || '10.8'}"
                          </span>
                        </div>

                        <h3
                          onClick={() => {
                            setSelectedPairId(pair.id);
                            setActiveImageIdx(0);
                            setActiveView('product');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="font-bold text-xs text-white line-clamp-1 cursor-pointer hover:text-[#FF5500] transition"
                        >
                          {displayTitle}
                        </h3>

                        <div className="grid grid-cols-2 gap-1 pt-1 text-[9px] text-orange-200/75 border-t border-[#FF5500]/20">
                          <div>Soles {pair.condition?.soles ?? 9}/10</div>
                          <div>Body {pair.condition?.body ?? 9}/10</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 pt-0">
                      <div className="flex items-center justify-between gap-1">
                        <div>
                          {hasDiscount && (
                            <span className="text-[10px] text-orange-200/40 line-through block">
                              {formatPKR(pair.price || pair.price_pkr)}
                            </span>
                          )}
                          <span className="text-xs sm:text-sm font-black text-[#FF5500]">
                            {formatPKR(finalPrice)}
                          </span>
                        </div>

                        {isSold ? (
                          <span className="text-[10px] text-orange-200/40 font-bold">
                            Sold
                          </span>
                        ) : (
                          <button
                            onClick={() => addToCart(pair)}
                            className="bg-[#FF5500] hover:bg-[#ff661a] text-black font-black text-[11px] px-2.5 py-1.5 rounded-lg transition shadow-[0_0_12px_rgba(255,85,0,0.35)]"
                          >
                            + Bag
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* COMMUNITY REVIEWS SECTION */}
          <section
            id="community-reviews"
            className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-[#FF5500]/25 space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
                  VERIFIED COMMUNITY FEEDBACK
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Customer Reviews ({reviews.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={async () => {
                  try {
                    const latest = await supabaseRest.fetchReviews();
                    if (latest.length > 0) setReviews(latest);
                    showToast('Refreshed latest customer reviews!');
                  } catch (e) {
                    showToast('Reviews are up to date.');
                  }
                }}
                className="text-xs bg-[#160B04] hover:bg-[#FF5500]/20 border border-[#FF5500]/40 text-orange-200 px-3.5 py-1.5 rounded-xl font-bold transition w-fit"
              >
                ↻ Refresh Reviews
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-[#160B04] border border-[#FF5500]/30 rounded-2xl p-5 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="bg-[#FF5500]/15 border border-[#FF5500]/40 text-[#FF5500] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                          Verified Buyer • {String(rev.city || 'Pakistan')}
                        </span>
                        <span className="text-[11px] text-orange-200/50">
                          {String(rev.date || '')}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-orange-50/90 leading-relaxed">
                        "{String(rev.comment || '')}"
                      </p>
                      {rev.imageUrl && (
                        <img
                          src={rev.imageUrl}
                          alt="Customer review"
                          className="w-full h-32 object-cover rounded-xl border border-[#FF5500]/25 mt-2"
                        />
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#FF5500]/15 flex items-center justify-between text-xs">
                      <span className="font-bold text-white">
                        {String(rev.name || '')}
                      </span>
                      <span className="text-[#FF5500] font-semibold truncate max-w-[150px]">
                        {String(rev.pairName || '')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleAddReview}
                className="lg:col-span-5 bg-[#160B04] border border-[#FF5500]/35 rounded-2xl p-6 space-y-4 h-fit"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#FF5500] font-black text-sm">
                    <Icon name="message" className="w-4 h-4" />
                    <span>Share Your Experience</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, name: e.target.value })
                    }
                    placeholder="Your Name *"
                    className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={reviewForm.city}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, city: e.target.value })
                    }
                    placeholder="City (e.g. Islamabad, Lahore)"
                    className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                </div>

                <input
                  type="text"
                  value={reviewForm.pairName}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, pairName: e.target.value })
                  }
                  placeholder="Pair Purchased (Optional)"
                  className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />

                <div className="bg-[#0A0401] border border-dashed border-[#FF5500]/40 rounded-xl p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {reviewForm.imageUrl ? (
                      <img
                        src={reviewForm.imageUrl}
                        alt="Review preview"
                        className="w-11 h-11 rounded-lg object-cover border border-[#FF5500]/50"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-[#160B04] border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500]">
                        <Icon name="upload" className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {reviewForm.imageUrl
                          ? 'Sneaker Photo Attached'
                          : 'Upload Sneaker Photo (Optional)'}
                      </span>
                      <span className="text-[10px] text-orange-200/60">
                        Choose a photo directly from your phone or PC
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {reviewForm.imageUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setReviewForm((prev) => ({ ...prev, imageUrl: '' }))
                        }
                        className="text-rose-400 text-[11px] font-bold px-2 py-1 rounded bg-rose-500/10"
                      >
                        Remove
                      </button>
                    )}
                    <label className="bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black px-3 py-1.5 rounded-lg text-[11px] cursor-pointer transition shrink-0">
                      {reviewForm.imageUrl ? 'Change Photo' : '+ Upload Photo'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleReviewPhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <textarea
                  rows={3}
                  required
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                  placeholder="Write your honest feedback about the shoe condition & insole fit..."
                  className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl p-3.5 text-xs text-white"
                />

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] disabled:opacity-50 text-black font-black py-3 rounded-xl text-xs transition"
                >
                  {isSubmittingReview ? 'Posting Review...' : 'Post Review'}
                </button>
              </form>
            </div>
          </section>
        </main>
      )}

      {/* ==========================================
          BIG STORE INSPECTION SHOWROOM PAGE
         ========================================== */}
      {activeView === 'product' && selectedPair && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#160B04] border border-[#FF5500]/35 rounded-2xl px-5 py-3.5">
            <button
              onClick={() => setActiveView('home')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-orange-200 hover:text-white font-bold"
            >
              <Icon name="chevronLeft" className="w-4 h-4 text-[#FF5500]" />
              <span>Back to Full Vault</span>
            </button>

            <span className="text-xs text-black font-black font-mono bg-[#FF5500] px-3.5 py-1.5 rounded-lg shadow-[0_0_15px_rgba(255,85,0,0.5)]">
              PAIR ID / ORDER ID: #{getPairCode(selectedPair)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#160B04] border border-[#FF5500]/45 rounded-3xl p-5 sm:p-10 shadow-[0_0_50px_rgba(255,85,0,0.16)]">
            <div className="lg:col-span-7 space-y-4">
              <div
                onClick={() => setIsImageZoomed((z) => !z)}
                className="relative w-full aspect-square max-h-[560px] bg-[#080301] rounded-2xl overflow-hidden border border-[#FF5500]/35 cursor-zoom-in group"
              >
                <img
                  src={
                    selectedPair.images?.[activeImageIdx] ||
                    selectedPair.images?.[0] ||
                    selectedPair.image_url ||
                    selectedPair.image
                  }
                  alt={String(selectedPair.name || selectedPair.title || '')}
                  style={{
                    transform: `scale(${
                      isImageZoomed
                        ? (Number(selectedPair.imageZoom) || 1) * 1.25
                        : Number(selectedPair.imageZoom) || 1
                    })`
                  }}
                  className={`w-full h-full ${
                    selectedPair.imageFit === 'contain'
                      ? 'object-contain p-4'
                      : 'object-cover'
                  } transition duration-500 ${
                    isImageZoomed ? 'cursor-zoom-out' : ''
                  }`}
                />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-[#FF5500] text-black text-xs font-black px-3 py-1 rounded-lg">
                    Pair ID: #{getPairCode(selectedPair)}
                  </span>
                  <span className="bg-black/85 border border-[#FF5500]/40 text-orange-200 text-xs font-bold px-3 py-1 rounded-lg">
                    Angle {activeImageIdx + 1} of{' '}
                    {selectedPair.images?.length || 1}
                  </span>
                  <span className="bg-black/85 border border-[#FF5500]/50 text-[#FF5500] text-xs font-black px-3 py-1 rounded-lg">
                    Overall {getAverageCondition(selectedPair.condition)}/10
                  </span>
                </div>
              </div>

              {selectedPair.images && selectedPair.images.length > 0 && (
                <div className="grid grid-cols-5 gap-3">
                  {selectedPair.images.slice(0, 5).map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImageIdx(idx);
                        setIsImageZoomed(false);
                      }}
                      className={`h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition ${
                        activeImageIdx === idx
                          ? 'border-[#FF5500] scale-105'
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* DETAILED VIDEO WITH ORDER CONFIRMATION ASSURANCE BANNER */}
              <div className="bg-[#0B0502] border border-emerald-500/45 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-[0_0_25px_rgba(16,185,129,0.12)]">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shrink-0 mt-0.5">
                  <Icon name="check" className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-emerald-500 text-black text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                      100% Video Verification Guarantee
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-white">
                      Detailed Inspection Video Delivered With Order Confirmation
                    </h3>
                  </div>
                  <p className="text-xs text-orange-100/85 leading-relaxed">
                    Every customer will be delivered a complete, close-up{' '}
                    <strong className="text-emerald-400">
                      detailed inspection video of this exact 1-of-1 pair on WhatsApp along with their order confirmation
                    </strong>{' '}
                    before dispatch so you can verify the soles, body, and condition with 100% peace of mind.
                  </p>
                </div>
              </div>

              <div className="bg-[#0B0502] border border-[#FF5500]/35 rounded-2xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FF5500]/20 pb-3">
                  <div className="flex items-center gap-2 text-[#FF5500] font-black text-xs sm:text-sm">
                    <Icon name="bot" className="w-4 h-4" />
                    <span>AI 1-OF-1 SNEAKER INTELLIGENCE LAB</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'fit', label: 'AI Insole Fit' },
                      { id: 'authenticity', label: 'AI Condition Audit' },
                      { id: 'outfit', label: 'AI Style Match' },
                      { id: 'care', label: 'AI Care Guide' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setAiProductTab(tab.id)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                          aiProductTab === tab.id
                            ? 'bg-[#FF5500] text-black'
                            : 'bg-[#160B04] text-orange-200/75 border border-[#FF5500]/20'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {aiProductTab === 'fit' && (
                  <div className="space-y-3 text-xs">
                    <p className="text-orange-100/85">
                      Verified insole length:{' '}
                      <strong className="text-[#FF5500]">
                        {selectedPair.insoleInches || '10.8'} inches (EU{' '}
                        {selectedPair.sizeEU || selectedPair.eu_size || selectedPair.size})
                      </strong>
                      . Enter your foot/insole inches:
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="number"
                        step="0.1"
                        value={userFootInches}
                        onChange={(e) => setUserFootInches(e.target.value)}
                        placeholder="Your insole inches (e.g. 10.7)"
                        className="bg-[#160B04] border border-[#FF5500]/40 rounded-xl px-3.5 py-2 text-xs text-white w-60"
                      />
                      {userFootInches && (
                        <span className="font-bold text-[#FF5500]">
                          {Math.abs(
                            Number(selectedPair.insoleInches || 10.8) -
                              Number(userFootInches)
                          ) <= 0.25
                            ? '✅ 99% PERFECT TRUE-TO-SIZE FIT!'
                            : Number(userFootInches) <
                              Number(selectedPair.insoleInches || 10.8)
                            ? '👍 Slightly Roomy.'
                            : '⚠️ Snug fit.'}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {aiProductTab === 'authenticity' && (
                  <div className="text-xs text-orange-100/85 space-y-1.5 leading-relaxed">
                    <div className="font-bold text-[#FF5500]">
                      AI 4-Point Inspection (
                      {getAverageCondition(selectedPair.condition)}/10):
                    </div>
                    <p>
                      • Soles ({selectedPair.condition?.soles ?? 9}/10): Firm
                      tread grip.
                    </p>
                    <p>
                      • Body ({selectedPair.condition?.body ?? 9}/10): Clean
                      upper panels.
                    </p>
                    <p>
                      • Laces & Inside: Deeply sanitized interior lining ready
                      to wear.
                    </p>
                  </div>
                )}

                {aiProductTab === 'outfit' && (
                  <div className="text-xs text-orange-100/85 space-y-1.5">
                    <div className="font-bold text-[#FF5500]">
                      AI Streetwear Pairing:
                    </div>
                    <p>
                      Pairs effortlessly with relaxed cargo trousers or
                      straight-fit denim.
                    </p>
                  </div>
                )}

                {aiProductTab === 'care' && (
                  <div className="text-xs text-orange-100/85 space-y-1.5">
                    <div className="font-bold text-[#FF5500]">
                      AI Care Protocol:
                    </div>
                    <p>
                      Use soft-bristle brush with mild sneaker foam, air dry
                      indoors.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="bg-[#FF5500] text-black font-black px-3 py-1 rounded-lg">
                    Pair ID: #{getPairCode(selectedPair)}
                  </span>
                  <span className="bg-[#FF5500]/15 border border-[#FF5500]/40 text-orange-200 font-bold px-3 py-1 rounded-lg">
                    {String(selectedPair.category || 'Casual')}
                  </span>
                  <span className="bg-[#FF5500]/20 border border-[#FF5500]/50 text-[#FF5500] font-black px-3 py-1 rounded-lg">
                    Insole: {selectedPair.insoleInches || '10.8'} Inches
                  </span>
                  {(selectedPair.prepaidOnly || selectedPair.is_prepaid_only) && (
                    <span className="bg-amber-400 text-black font-black px-3 py-1 rounded-lg">
                      Prepaid Only
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  {String(selectedPair.name || selectedPair.title || '')}
                </h1>

                <div className="bg-[#0B0502] border border-[#FF5500]/30 rounded-xl p-3 text-[11px] text-orange-200/85">
                  <strong className="text-[#FF5500]">
                    Official Pair & Order ID (#{getPairCode(selectedPair)}):
                  </strong>{' '}
                  When you order this sneaker, your Order Number will be{' '}
                  <strong className="text-white">#{getPairCode(selectedPair)}</strong>.
                  Save this Pair ID if you ever need to contact us for order
                  support, cancellation, or a damage return claim.
                </div>

                <div className="bg-[#0B0502] border border-[#FF5500]/35 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-orange-200/60 uppercase font-bold block">
                      PRESETS Price
                    </span>
                    <div className="flex items-baseline gap-3 mt-0.5">
                      <span className="text-3xl font-black text-[#FF5500]">
                        {formatPKR(getEffectivePairPrice(selectedPair))}
                      </span>
                      {(Number(selectedPair.discountPercent) || 0) > 0 && (
                        <span className="text-sm text-orange-200/40 line-through">
                          {formatPKR(selectedPair.price || selectedPair.price_pkr)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    {selectedPair.freeDelivery ||
                    getEffectivePairPrice(selectedPair) >=
                      FREE_DELIVERY_THRESHOLD ? (
                      <span className="inline-block bg-emerald-500 text-black text-[11px] font-black px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                        ✓ FREE HOME DELIVERY
                      </span>
                    ) : (
                      <span className="inline-block bg-[#160B04] border border-[#FF5500]/40 text-orange-200 text-[11px] font-bold px-3 py-1 rounded-full">
                        Free Delivery Above Rs. 8,000
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-orange-100/85 leading-relaxed">
                  {String(selectedPair.description || '')}
                </p>

                <div className="bg-[#0B0502] border border-[#FF5500]/30 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-orange-200">
                      CONDITION REPORT (/10)
                    </span>
                    <span className="bg-[#FF5500] text-black font-black px-2.5 py-0.5 rounded-md">
                      Avg {getAverageCondition(selectedPair.condition)}/10
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: 'Soles',
                        val: selectedPair.condition?.soles ?? 9
                      },
                      { label: 'Body', val: selectedPair.condition?.body ?? 9 },
                      {
                        label: 'Laces',
                        val: selectedPair.condition?.laces ?? 9
                      },
                      {
                        label: 'Inside',
                        val: selectedPair.condition?.inside ?? 9
                      }
                    ].map((c) => (
                      <div
                        key={c.label}
                        className="bg-[#160B04] border border-[#FF5500]/20 rounded-xl p-3 space-y-1"
                      >
                        <div className="flex justify-between text-xs">
                          <span className="text-orange-200/80">{c.label}</span>
                          <span className="font-black text-white">
                            {c.val}/10
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedPair.status === 'available' ? (
                <div className="space-y-2.5 pt-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        addToCart(selectedPair);
                        setIsCartOpen(true);
                      }}
                      className="flex-1 bg-[#FF5500] hover:bg-[#ff661a] text-black font-black py-4 px-6 rounded-xl text-sm transition shadow-[0_0_25px_rgba(255,85,0,0.45)]"
                    >
                      Add to Bag —{' '}
                      {formatPKR(getEffectivePairPrice(selectedPair))}
                    </button>
                    <button
                      onClick={() => {
                        addToCart(selectedPair);
                        setActiveView('checkout');
                      }}
                      className="bg-white hover:bg-orange-100 text-black font-black py-4 px-6 rounded-xl text-sm transition"
                    >
                      Buy Now
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleRequestDetailedInspectionWhatsApp(selectedPair)
                    }
                    className="w-full bg-[#1A0D05] hover:bg-[#FF5500]/20 border border-[#FF5500]/50 text-orange-100 font-black py-3.5 px-5 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,85,0,0.18)]"
                  >
                    <Icon name="whatsapp" className="w-4 h-4 text-[#FF5500]" />
                    <span>
                      Ask for Detailed Inspection / Live Video on WhatsApp
                    </span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="bg-[#0B0502] border border-[#FF5500]/30 text-[#FF5500] font-bold p-4 rounded-xl text-center text-sm">
                    Sold Out (1-of-1 Pair)
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SHOP MORE AVAILABLE PAIRS SECTION INSIDE INSPECTION PAGE */}
          <section className="space-y-5 pt-6 border-t border-[#FF5500]/30">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#FF5500]">
                  MORE 1-OF-1 PAIRS FROM OUR VAULT
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white mt-0.5">
                  Explore More Store Pairs You'll Love
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs bg-[#FF5500] hover:bg-[#ff6a1a] text-black px-4 py-2.5 rounded-xl font-black transition shadow-[0_0_20px_rgba(255,85,0,0.4)]"
              >
                View Full Storefront ({sneakers.length} Pairs) →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
              {sneakers
                .filter((p) => p.id !== selectedPair.id)
                .sort((a, b) => {
                  const aAvail = a.status === 'available' ? 0 : 1;
                  const bAvail = b.status === 'available' ? 0 : 1;
                  return aAvail - bAvail;
                })
                .map((pair) => {
                  const displayTitle = String(
                    pair.name || pair.title || 'Authentic Sneaker'
                  );
                  const displaySize = String(
                    pair.sizeEU ?? pair.eu_size ?? pair.size ?? '43'
                  );
                  const finalPrice = getEffectivePairPrice(pair);
                  const hasDiscount = (Number(pair.discountPercent) || 0) > 0;
                  const isSold =
                    pair.status !== 'available' ||
                    pair.sold === true ||
                    pair.in_stock === false;
                  const avgScore = getAverageCondition(pair.condition);
                  const coverImg =
                    pair.images?.[0] || pair.image_url || pair.image;
                  const fitClass =
                    pair.imageFit === 'contain'
                      ? 'object-contain p-2'
                      : 'object-cover';
                  const zoomScale = Number(pair.imageZoom) || 1;

                  return (
                    <div
                      key={pair.id}
                      className="group bg-[#150A03] border border-[#FF5500]/25 hover:border-[#FF5500] rounded-2xl overflow-hidden flex flex-col justify-between transition shadow-[0_0_20px_rgba(255,85,0,0.08)] hover:shadow-[0_0_25px_rgba(255,85,0,0.25)]"
                    >
                      <div
                        onClick={() => {
                          setSelectedPairId(pair.id);
                          setActiveImageIdx(0);
                          setActiveDefectIdx(0);
                          setIsImageZoomed(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="relative w-full aspect-square bg-[#090401] overflow-hidden cursor-pointer"
                      >
                        <img
                          src={coverImg}
                          alt={displayTitle}
                          style={{ transform: `scale(${zoomScale})` }}
                          className={`w-full h-full ${fitClass} transition duration-500 ${
                            isSold ? 'opacity-45 grayscale' : ''
                          }`}
                        />
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          <span className="bg-black/80 text-orange-200 border border-[#FF5500]/30 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            {String(pair.category || 'Casual')}
                          </span>
                          {hasDiscount && (
                            <span className="bg-[#FF5500] text-black text-[9px] font-black px-1.5 py-0.5 rounded">
                              -{pair.discountPercent}%
                            </span>
                          )}
                          {(pair.freeDelivery ||
                            finalPrice >= FREE_DELIVERY_THRESHOLD) && (
                            <span className="bg-emerald-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded">
                              Free Delivery
                            </span>
                          )}
                        </div>
                        <div className="absolute top-2 right-2 bg-black/85 border border-[#FF5500]/50 text-[#FF5500] text-[10px] font-black px-1.5 py-0.5 rounded">
                          {avgScore}/10
                        </div>
                        {isSold && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="bg-[#FF5500] text-black font-black uppercase px-2.5 py-1 rounded-full text-[9px]">
                              Sold Out
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] text-orange-200/80 font-semibold">
                          <span>EU {displaySize}</span>
                          <span className="text-[#FF5500]">
                            Insole {pair.insoleInches || '10.8'}"
                          </span>
                        </div>
                        <h4
                          onClick={() => {
                            setSelectedPairId(pair.id);
                            setActiveImageIdx(0);
                            setActiveDefectIdx(0);
                            setIsImageZoomed(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="font-bold text-xs text-white line-clamp-1 cursor-pointer group-hover:text-[#FF5500]"
                        >
                          {displayTitle}
                        </h4>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-black text-[#FF5500]">
                            {formatPKR(finalPrice)}
                          </span>
                          {!isSold ? (
                            <button
                              type="button"
                              onClick={() => addToCart(pair)}
                              className="text-[10px] bg-[#FF5500] hover:bg-[#ff661a] text-black font-black px-2.5 py-1 rounded-lg transition"
                            >
                              + Bag
                            </button>
                          ) : (
                            <span className="text-[10px] text-orange-200/40 font-bold">
                              Sold
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        </main>
      )}

      {/* ==========================================
          CHECKOUT VIEW
         ========================================== */}
      {activeView === 'checkout' && (
        <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <button
            onClick={() => setActiveView('home')}
            className="inline-flex items-center gap-1.5 text-xs text-orange-200/80 hover:text-white mb-6 font-bold"
          >
            <Icon name="chevronLeft" className="w-4 h-4 text-[#FF5500]" />
            <span>Back to Store</span>
          </button>

          {cartItems.length === 0 ? (
            <div className="bg-[#160B04] border border-[#FF5500]/30 rounded-2xl p-10 text-center space-y-3">
              <h2 className="text-lg font-bold">Your Bag is Empty</h2>
              <button
                onClick={() => setActiveView('home')}
                className="bg-[#FF5500] text-black font-black px-5 py-2.5 rounded-xl text-xs"
              >
                Browse Store
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-[#160B04] border border-[#FF5500]/35 rounded-2xl p-6 space-y-5">
                <h2 className="text-lg font-black text-white">
                  Delivery & Payment
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="text"
                    required
                    value={customerForm.fullName}
                    onChange={(e) =>
                      setCustomerForm({
                        ...customerForm,
                        fullName: e.target.value
                      })
                    }
                    placeholder="Full Name *"
                    className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                  <input
                    type="tel"
                    required
                    value={customerForm.phone}
                    onChange={(e) =>
                      setCustomerForm({
                        ...customerForm,
                        phone: e.target.value
                      })
                    }
                    placeholder="WhatsApp Phone (03XX-XXXXXXX) *"
                    className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                  <input
                    type="text"
                    required
                    value={customerForm.city}
                    onChange={(e) =>
                      setCustomerForm({ ...customerForm, city: e.target.value })
                    }
                    placeholder="City *"
                    className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                  <input
                    type="text"
                    required
                    value={customerForm.address}
                    onChange={(e) =>
                      setCustomerForm({
                        ...customerForm,
                        address: e.target.value
                      })
                    }
                    placeholder="Complete Delivery Address *"
                    className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                {cartRequiresPrepaidOnly ? (
                  <div className="p-4 rounded-xl border border-[#FF5500] bg-[#FF5500]/15 space-y-1">
                    <div className="flex justify-between items-center text-xs font-black text-white">
                      <span>
                        100% Full Prepayment via WhatsApp (Prepaid-Only Pair)
                      </span>
                      <span className="bg-[#FF5500] text-black px-2 py-0.5 rounded">
                        5% OFF APPLIED
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('PREPAID')}
                      className={`p-3.5 rounded-xl border text-left transition ${
                        paymentMethod === 'PREPAID'
                          ? 'border-[#FF5500] bg-[#FF5500]/20'
                          : 'border-[#FF5500]/25 bg-[#0A0401]'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs font-bold text-white">
                        <span>Full Prepayment (WhatsApp)</span>
                        <span className="text-[#FF5500] font-black">
                          5% OFF
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      className={`p-3.5 rounded-xl border text-left transition ${
                        paymentMethod === 'COD'
                          ? 'border-[#FF5500] bg-[#FF5500]/20'
                          : 'border-[#FF5500]/25 bg-[#0A0401]'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs font-bold text-white">
                        <span>Cash on Delivery</span>
                        <span className="text-[#FF5500]">
                          {isCodAdvancePolicyActive
                            ? `Rs. ${activeCodDepositAmount} Advance`
                            : 'No Advance (Rs. 0)'}
                        </span>
                      </div>
                    </button>
                  </div>
                )}

                <div className="bg-[#0A0401] border border-[#FF5500]/30 rounded-xl p-4 text-xs space-y-1.5">
                  <div className="font-bold text-white">
                    {paymentMethod === 'PREPAID' ? (
                      <span>
                        Full Prepayment (5% Discount Applied) • JS Bank (Ali Ammar) •{' '}
                        <span className="text-[#FF5500] font-black">
                          03328559003 | IBAN: {BANK_IBAN}
                        </span>
                      </span>
                    ) : isCodAdvancePolicyActive ? (
                      <span>
                        COD Advance Deposit (Rs. {activeCodDepositAmount}) • JS Bank • Ali Ammar •{' '}
                        <span className="text-[#FF5500] font-black">
                          03328559003 | IBAN: {BANK_IBAN}
                        </span>
                      </span>
                    ) : (
                      <span>
                        100% Cash on Delivery •{' '}
                        <span className="text-emerald-400 font-black">
                          Rs. 0 Advance Required
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="text-orange-100/80 leading-relaxed">
                    {paymentMethod === 'PREPAID'
                      ? 'Click the WhatsApp button below to place your 5% discounted Full Prepayment order. You will also be delivered a detailed video of your pair with your order confirmation.'
                      : effectiveCodPolicyDescription}
                  </p>
                </div>

                {paymentMethod === 'PREPAID' ? (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handlePrepaidWhatsAppOrder}
                      className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black py-3.5 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,85,0,0.45)]"
                    >
                      <Icon name="whatsapp" className="w-4 h-4 shrink-0" />
                      <span>
                        Confirm Full Prepaid Order on WhatsApp ({formatPKR(orderTotals.finalTotalWithShipping)})
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSimpleDirectPrepaidOrder}
                      className="w-full bg-white hover:bg-orange-100 text-black font-black py-3.5 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 border border-[#FF5500]"
                    >
                      <Icon name="check" className="w-4 h-4 shrink-0" />
                      <span>Order Now Prepaid</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handlePlaceCODOrder}
                    className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black py-3.5 rounded-xl text-sm transition"
                  >
                    {isCodAdvancePolicyActive
                      ? `Place COD Order (Rs. ${activeCodDepositAmount} Advance Deposit)`
                      : `Place COD Order (Pay ${formatPKR(
                          orderTotals.finalTotalWithShipping
                        )} on Delivery)`}
                  </button>
                )}
              </div>

              <div className="lg:col-span-5 bg-[#160B04] border border-[#FF5500]/35 rounded-2xl p-6 space-y-4 h-fit">
                <h3 className="text-base font-black text-white">
                  Order Summary Cart ({cartItems.length})
                </h3>

                <div className="space-y-2.5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 bg-[#0A0401] border border-[#FF5500]/25 p-2.5 rounded-xl"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.images?.[0] || item.image_url || item.image}
                          alt={String(item.name || item.title || '')}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">
                            {String(item.name || item.title || '')}
                          </h4>
                          <span className="text-xs font-black text-[#FF5500]">
                            {formatPKR(getEffectivePairPrice(item))}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#FF5500] text-xs font-bold px-2.5 py-1 rounded-lg bg-[#FF5500]/15"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#FF5500]/25 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-orange-200/80">
                    <span>Sneaker Subtotal</span>
                    <span className="text-white font-bold">
                      {formatPKR(orderTotals.discountedProductSubtotal)}
                    </span>
                  </div>
                  {paymentMethod === 'PREPAID' && (
                    <div className="flex justify-between text-[#FF5500] font-bold">
                      <span>5% Full Prepaid Discount</span>
                      <span>
                        -{formatPKR(orderTotals.prepaidThreePercentDiscount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-orange-200/80">
                    <span>
                      Home Delivery{' '}
                      {orderTotals.qualifiesForFreeDelivery
                        ? orderTotals.hasFreeDeliveryPair
                          ? '(Free Delivery Pair)'
                          : '(Orders ≥ Rs. 8,000)'
                        : '(Below Rs. 8,000)'}
                    </span>
                    <span
                      className={`font-black ${
                        orderTotals.qualifiesForFreeDelivery
                          ? 'text-emerald-400'
                          : 'text-white'
                      }`}
                    >
                      {orderTotals.qualifiesForFreeDelivery
                        ? 'FREE (Rs. 0)'
                        : formatPKR(orderTotals.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-[#FF5500]/25">
                    <span>Total Order Bill</span>
                    <span className="text-[#FF5500]">
                      {formatPKR(orderTotals.finalTotalWithShipping)}
                    </span>
                  </div>
                  <div className="bg-[#0A0401] border border-[#FF5500]/30 rounded-xl p-3 mt-2 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-orange-200/80">
                        {paymentMethod === 'PREPAID'
                          ? 'Payable Now (100% Prepaid)'
                          : isCodAdvancePolicyActive
                          ? `COD Advance Deposit Now`
                          : 'Advance Required Now'}
                      </span>
                      <span className="font-black text-[#FF5500]">
                        {formatPKR(orderTotals.payableNow)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-orange-200/80">
                        Remaining Balance on Delivery
                      </span>
                      <span className="font-black text-white">
                        {formatPKR(orderTotals.payableOnDelivery)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ==========================================
          POLICIES VIEW (EXCHANGE, RETURN, SIZING & HOW TO CONTACT)
         ========================================== */}
      {activeView === 'prepaid_confirm' && prepaidConfirmScreen && (
        <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-[#160B04] border border-[#FF5500]/50 rounded-3xl p-6 sm:p-10 text-center space-y-5 shadow-[0_0_45px_rgba(255,85,0,0.25)]">
            <div className="w-14 h-14 rounded-full bg-[#FF5500]/20 border border-[#FF5500] flex items-center justify-center mx-auto text-[#FF5500]">
              <Icon name="whatsapp" className="w-7 h-7" />
            </div>
            <span className="inline-block bg-[#FF5500] text-black text-xs font-black px-3.5 py-1 rounded-full">
              ORDER #{getOrderDisplayNumber(prepaidConfirmScreen.order)} LOGGED
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Agar Pehla Button Kaam Nahi Kiya To Dubara Is Par Click Karein
            </h1>
            <p className="text-xs sm:text-sm text-orange-100/85 leading-relaxed">
              If the first WhatsApp button did not open or you faced any issue,
              please click the button below again to send your prepaid order
              message and receive our bank account details on WhatsApp.
            </p>
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  launchWhatsApp(
                    prepaidConfirmScreen.whatsappPhone,
                    prepaidConfirmScreen.whatsappMessage
                  )
                }
                className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black py-4 px-6 rounded-xl text-xs sm:text-sm transition shadow-[0_0_25px_rgba(255,85,0,0.5)] flex items-center justify-center gap-2"
              >
                <Icon name="whatsapp" className="w-4 h-4" />
                <span>
                  Agar Pehla Kaam Nahi Kiya To Dubara Is Par Click Karein (Open WhatsApp)
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView('home')}
                className="w-full bg-[#0A0401] hover:bg-[#FF5500]/20 border border-[#FF5500]/35 text-orange-200 font-bold py-3 rounded-xl text-xs transition"
              >
                Return to Storefront
              </button>
            </div>
          </div>
        </main>
      )}

      {activeView === 'simple_prepaid_done' && simplePrepaidSuccessOrder && (
        <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-[#160B04] border border-[#FF5500]/50 rounded-3xl p-6 sm:p-10 text-center space-y-5 shadow-[0_0_45px_rgba(255,85,0,0.25)]">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <Icon name="check" className="w-7 h-7" />
            </div>
            <span className="inline-block bg-[#FF5500] text-black text-xs font-black px-3.5 py-1 rounded-full">
              ORDER #{getOrderDisplayNumber(simplePrepaidSuccessOrder)} CONFIRMED
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Your Order Has Been Placed!
            </h1>
            <div className="bg-[#0A0401] border border-emerald-500/45 rounded-2xl p-4 text-sm sm:text-base text-emerald-300 font-bold leading-relaxed shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              Your order has been placed, soon our team will contact you for
              payment and order confirmation.
            </div>
            <div className="bg-[#0A0401] border border-[#FF5500]/30 rounded-2xl p-4 text-xs text-orange-200/85 space-y-1">
              <div>
                <strong>Pair ID / Order Number:</strong> #
                {getOrderDisplayNumber(simplePrepaidSuccessOrder)}
              </div>
              <div>
                <strong>Total Prepaid Bill (5% OFF):</strong>{' '}
                {formatPKR(
                  simplePrepaidSuccessOrder.totals?.finalTotalWithShipping
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('home')}
              className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black py-3.5 rounded-xl text-xs sm:text-sm transition"
            >
              Back to Store
            </button>
          </div>
        </main>
      )}

      {activeView === 'policies' && (
        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-[#160B04] border border-[#FF5500]/35 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FF5500]/25 pb-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#FF5500]">
                  OFFICIAL PRESETS BUYER PROTECTION & TERMS
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  Store Return, Exchange & Payment Policies
                </h1>
              </div>
              {isCodAdvancePolicyActive && (
                <span className="text-xs font-black px-3 py-1 rounded-full bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/40">
                  COD Rs. {activeCodDepositAmount} Advance Policy: ACTIVE
                </span>
              )}
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-orange-100/90 leading-relaxed">
              <div className="bg-[#0A0401] border border-[#FF5500]/35 rounded-xl p-4 space-y-1.5">
                <h3 className="font-black text-[#FF5500] text-sm sm:text-base">
                  1. Severe Damage Exchange Guarantee (100% Our Responsibility)
                </h3>
                <p>
                  {storeConfig.returnExchangePolicy ||
                    'Every sneaker at PRESETS is a 1-of-1 pre-loved authentic pair inspected across Soles, Body, Laces, and Inside. A pair can only be returned or exchanged if it arrives severely damaged or completely different from what was shown and described on the inspection page. In the case of a severely damaged or misrepresented pair, PRESETS will be 100% responsible for everything (including return pickup/shipping and full replacement or refund).'}
                </p>
              </div>

              <div className="bg-[#0A0401] border border-[#FF5500]/35 rounded-xl p-4 space-y-1.5">
                <h3 className="font-black text-[#FF5500] text-sm sm:text-base">
                  2. Strictly No Returns or Exchanges for Size Issues
                </h3>
                <p>
                  We do <strong className="text-white">NOT</strong> accept
                  returns or exchanges for sizing issues. Because pre-loved
                  sneakers across different brands can vary slightly in EU tag
                  sizing, we manually measure and display the{' '}
                  <strong className="text-[#FF5500]">
                    exact Insole Measurement in Inches
                  </strong>{' '}
                  for every single pair on our website. Please measure your own
                  comfortable shoe insole in inches and match it before placing
                  your order so there can never be a sizing issue.
                </p>
              </div>

              <div className="bg-[#0A0401] border border-[#FF5500]/35 rounded-xl p-4 space-y-1.5">
                <h3 className="font-black text-[#FF5500] text-sm sm:text-base">
                  3. How to Return a Damaged Pair or Cancel an Order (Using Pair ID)
                </h3>
                <p>
                  Every sneaker has its own unique{' '}
                  <strong className="text-white">Pair ID</strong> shown inside
                  its <strong className="text-[#FF5500]">Inspection Page</strong>{' '}
                  (and your Pair ID is also your Order Number):
                </p>
                <ul className="list-disc pl-5 space-y-1 text-orange-100/85">
                  <li>
                    <strong>Step 1:</strong> Open the sneaker's Inspection Page
                    and copy the <strong>Pair ID</strong> (e.g.,{' '}
                    <code className="text-[#FF5500] font-bold">#001</code>).
                  </li>
                  <li>
                    <strong>Step 2:</strong> Click the{' '}
                    <strong className="text-[#FF5500]">Return Pair</strong> or{' '}
                    <strong className="text-[#FF5500]">Cancel Order</strong>{' '}
                    button at the top of the website.
                  </li>
                  <li>
                    <strong>Step 3:</strong> Enter your Name, Phone Number, and
                    that exact <strong>Pair ID</strong>, and click Send to
                    dispatch it directly to our official WhatsApp support desk (
                    <strong className="text-white">0332-8559003</strong>).
                  </li>
                </ul>
              </div>

              <div className="bg-[#0A0401] border border-[#FF5500]/35 rounded-xl p-4 space-y-1.5">
                <h3 className="font-black text-[#FF5500] text-sm sm:text-base">
                  4. Full Prepayment (5% OFF), Free Delivery Above Rs. 8,000 & COD Policy
                </h3>
                <p>
                  • <strong>FREE Home Delivery on Orders Above Rs. 8,000:</strong>{' '}
                  Any order with a sneaker subtotal of{' '}
                  <strong className="text-emerald-400">
                    Rs. 8,000 or above automatically qualifies for FREE Home Delivery (Rs. 0)
                  </strong>
                  ! Orders below Rs. 8,000 have a standard Rs. {SHIPPING_FEE} nationwide delivery fee.
                </p>
                <p>
                  • <strong>Full Prepayment (5% Discount):</strong> Enjoy an
                  instant 5% discount on your sneaker subtotal when paying 100%
                  upfront.
                </p>
                <p>• <strong>Cash on Delivery (COD):</strong> {effectiveCodPolicyDescription}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReturnModalOpen(true)}
                className="bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black px-5 py-3 rounded-xl text-xs flex items-center gap-2"
              >
                <Icon name="shield" className="w-4 h-4" />
                <span>Submit Return Pair Request (With Pair ID)</span>
              </button>
              <button
                type="button"
                onClick={() => setCancelModalOpen(true)}
                className="bg-[#0A0401] hover:bg-[#FF5500]/20 border border-[#FF5500]/40 text-orange-200 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2"
              >
                <Icon name="xcircle" className="w-4 h-4 text-[#FF5500]" />
                <span>Cancel an Order (With Pair ID)</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ==========================================
          BOSS MODE ADMIN SUITE
         ========================================== */}
      {activeView === 'boss' && (
        <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {!isAdminAuthenticated ? (
            <div className="max-w-md mx-auto bg-[#160B04] border border-[#FF5500]/45 rounded-2xl p-6 sm:p-8 space-y-5 shadow-[0_0_40px_rgba(255,85,0,0.2)]">
              <div className="flex items-center justify-between border-b border-[#FF5500]/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#FF5500]/20 text-[#FF5500]">
                    <Icon name="lock" className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-white">
                      Admin 2FA Verification
                    </h2>
                    <p className="text-[11px] text-orange-200/60">
                      Protected by 2FA Security
                    </p>
                  </div>
                </div>
              </div>

              {otpStep === 'password' ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (Date.now() < lockoutUntil) {
                      const waitSec = Math.ceil(
                        (lockoutUntil - Date.now()) / 1000
                      );
                      setOtpStatusType('error');
                      setOtpStatusMessage(
                        `🛡️ Security Lockout Active: Too many failed attempts. Try again in ${waitSec}s.`
                      );
                      showToast(`Locked out for ${waitSec}s.`);
                      return;
                    }
                    if (adminPasswordInput.trim() === ADMIN_PASSWORD) {
                      setFailedLoginAttempts(0);
                      setLockoutUntil(0);
                      await sendBossMode2FAEmail();
                    } else {
                      const nextFails = failedLoginAttempts + 1;
                      setFailedLoginAttempts(nextFails);
                      if (nextFails >= 4) {
                        const lockTime = Date.now() + 60 * 1000;
                        setLockoutUntil(lockTime);
                        setOtpStatusType('error');
                        setOtpStatusMessage(
                          '🛡️ Brute-Force Protection Triggered: Locked for 60 seconds.'
                        );
                        showToast('Security Lockout: 60s cooldown activated.');
                      } else {
                        setOtpStatusType('error');
                        setOtpStatusMessage(
                          `Invalid Owner Security Password (${
                            4 - nextFails
                          } attempt(s) remaining).`
                        );
                        showToast('Invalid Owner Security Password.');
                      }
                    }
                  }}
                  className="space-y-4"
                >
                  <p className="text-xs text-orange-200/80 leading-relaxed">
                    Enter your Owner Security Password below to receive a
                    6-digit 2FA verification code.
                  </p>
                  <input
                    type="password"
                    required
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    placeholder="Enter Owner Security Password"
                    className="w-full bg-black border border-[#FF5500]/35 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                  />
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] disabled:opacity-50 text-black font-black py-3 rounded-xl text-xs sm:text-sm transition shadow-[0_0_20px_rgba(255,85,0,0.4)]"
                  >
                    {isSendingEmail
                      ? 'Sending 2FA Code...'
                      : 'Send 2FA Code'}
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (userEnteredOtp.trim() === generatedOtp.trim()) {
                      setIsAdminAuthenticated(true);
                      setOtpStatusMessage('');
                      showToast('Access Granted! Welcome to Boss Mode.');
                    } else {
                      setOtpStatusType('error');
                      setOtpStatusMessage(
                        'Invalid 6-digit code. Please try again.'
                      );
                      showToast('Incorrect OTP code.');
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-xs text-orange-200/80 font-bold block mb-2">
                      Step 2: Enter 6-Digit Security Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={userEnteredOtp}
                      onChange={(e) => setUserEnteredOtp(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="w-full bg-black border border-[#FF5500]/45 rounded-xl px-4 py-3 text-center tracking-[0.35em] text-lg text-white font-mono focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3 rounded-xl text-xs sm:text-sm transition shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                  >
                    Verify Code & Unlock Boss Mode
                  </button>

                  <div className="flex items-center justify-between pt-2 text-xs">
                    <button
                      type="button"
                      disabled={isSendingEmail}
                      onClick={sendBossMode2FAEmail}
                      className="text-[#FF5500] font-bold hover:underline"
                    >
                      {isSendingEmail ? 'Resending...' : '↻ Resend 2FA Code'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpStep('password');
                        setUserEnteredOtp('');
                        setOtpStatusMessage('');
                      }}
                      className="text-orange-200/60 hover:text-white underline"
                    >
                      Back to Password
                    </button>
                  </div>
                </form>
              )}

              {otpStatusMessage && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold text-center border ${
                    otpStatusType === 'success'
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : otpStatusType === 'error'
                      ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                      : 'bg-[#FF5500]/15 border-[#FF5500]/40 text-orange-200'
                  }`}
                >
                  {String(otpStatusMessage)}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#FF5500]/25 pb-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-bold text-white">
                    Boss Mode ({sneakers.length} Pairs)
                  </h1>

                  <button
                    type="button"
                    onClick={() => syncFromSupabase(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-[#160B04] border border-[#FF5500]/40 text-orange-200 hover:text-white transition"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        supabaseSyncStatus.includes('Connected')
                          ? 'bg-emerald-400'
                          : 'bg-amber-400'
                      }`}
                    />
                    <span>{String(supabaseSyncStatus)} (↻ Sync)</span>
                  </button>

                  <button
                    type="button"
                    onClick={pushAllLocalToSupabase}
                    className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-[#FF5500]/15 border border-[#FF5500]/40 text-[#FF5500] hover:bg-[#FF5500]/25 transition"
                  >
                    ↑ Push Local Data to Cloud
                  </button>

                  <button
                    type="button"
                    onClick={toggleCodPolicyMasterSwitch}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      isCodAdvancePolicyActive
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                        : 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    <Icon name="power" className="w-3.5 h-3.5" />
                    <span>
                      {isCodAdvancePolicyActive
                        ? `COD Rs. ${activeCodDepositAmount} Policy: ON`
                        : 'COD Advance Policy: OFF'}
                    </span>
                  </button>
                </div>

                {/* BOSS MODE NAVIGATION TABS */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'inventory', label: `Inventory (${sneakers.length})` },
                    {
                      id: 'upload',
                      label: editingPairId ? 'Edit Pair' : '+ Upload Pair'
                    },
                    { id: 'orders', label: `Orders (${orders.length})` },
                    { id: 'delivery_slip', label: '📦 Delivery Slip Maker' },
                    { id: 'policy', label: 'COD Policy & Banner' },
                    { id: 'excel_ai', label: 'Excel CSV Hub' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setBossTab(t.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                        bossTab === t.id
                          ? 'bg-[#FF5500] text-black font-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                          : 'bg-[#160B04] text-orange-200 border border-[#FF5500]/30 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {bossTab === 'upload' && (
                <form
                  onSubmit={handleSaveSneaker}
                  className="bg-[#160B04] border border-[#FF5500]/35 rounded-2xl p-6 space-y-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FF5500]/20 pb-3">
                    <h3 className="text-base font-black text-white">
                      {editingPairId
                        ? `Editing Sneaker (Pair ID #${pairForm.customPairId || '001'})`
                        : 'Upload New 1-of-1 Sneaker'}
                    </h3>
                    {editingPairId && (
                      <button
                        type="button"
                        onClick={resetPairForm}
                        className="text-xs text-orange-200 underline"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  {/* 5-Photo Upload Bar */}
                  <div className="bg-[#0A0401] border border-dashed border-[#FF5500]/45 rounded-xl p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Main Sneaker Photos ({pairForm.images.length}/5 Uploaded) *
                        </span>
                        <span className="text-[11px] text-orange-200/60">
                          Upload up to 5 main angles from your laptop or phone
                        </span>
                      </div>
                      <label className="bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black px-4 py-2 rounded-xl text-xs cursor-pointer">
                        + Select Main Photos
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleDevicePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {aiVisionStatus && (
                      <p className="text-[11px] text-[#FF5500] font-semibold">
                        {aiVisionStatus}
                      </p>
                    )}
                    {pairForm.images.length > 0 && (
                      <div className="grid grid-cols-5 gap-2.5 pt-1">
                        {pairForm.images.map((imgSrc, i) => (
                          <div
                            key={i}
                            className="relative h-20 rounded-xl overflow-hidden border border-[#FF5500]/40 group"
                          >
                            <img
                              src={imgSrc}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setPairForm((prev) => ({
                                  ...prev,
                                  images: prev.images.filter((_, idx) => idx !== i)
                                }))
                              }
                              className="absolute top-1 right-1 bg-black/80 text-rose-400 text-[10px] font-bold px-1.5 py-0.5 rounded"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* STANDARD SIZE PHOTO ZOOM IN / ZOOM OUT SYSTEM */}
                  <div className="bg-[#0A0401] border border-[#FF5500]/35 rounded-xl p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-black text-[#FF5500] uppercase tracking-wider">
                        Standard Frame Photo Zoom In / Zoom Out Control
                      </span>
                      <span className="text-[11px] text-orange-200/70">
                        All sneaker cards stay in the standard 1:1 square size while you zoom the photo in or out
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-orange-200/80 font-bold">
                              Photo Zoom Level: {Number(pairForm.imageZoom || 1).toFixed(2)}x
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  setPairForm((prev) => ({
                                    ...prev,
                                    imageZoom: Math.max(
                                      0.6,
                                      Number((Number(prev.imageZoom || 1) - 0.1).toFixed(2))
                                    )
                                  }))
                                }
                                className="bg-[#160B04] border border-[#FF5500]/40 text-white px-2.5 py-1 rounded text-xs font-black"
                              >
                                − Zoom Out
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setPairForm((prev) => ({
                                    ...prev,
                                    imageZoom: 1
                                  }))
                                }
                                className="bg-[#160B04] border border-[#FF5500]/30 text-orange-200 px-2.5 py-1 rounded text-xs font-bold"
                              >
                                Reset 1.0x
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setPairForm((prev) => ({
                                    ...prev,
                                    imageZoom: Math.min(
                                      1.8,
                                      Number((Number(prev.imageZoom || 1) + 0.1).toFixed(2))
                                    )
                                  }))
                                }
                                className="bg-[#FF5500] text-black px-2.5 py-1 rounded text-xs font-black"
                              >
                                + Zoom In
                              </button>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="0.6"
                            max="1.8"
                            step="0.05"
                            value={pairForm.imageZoom || 1}
                            onChange={(e) =>
                              setPairForm({
                                ...pairForm,
                                imageZoom: parseFloat(e.target.value) || 1
                              })
                            }
                            className="w-full accent-[#FF5500] cursor-pointer"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'cover', label: 'Fill Standard Frame (Cover)' },
                            { id: 'contain', label: 'Fit Full Shoe Inside Frame (Contain)' }
                          ].map((f) => (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() =>
                                setPairForm({ ...pairForm, imageFit: f.id })
                              }
                              className={`py-2 px-3 rounded-lg text-[11px] font-bold border transition ${
                                (pairForm.imageFit || 'cover') === f.id
                                  ? 'bg-[#FF5500] text-black border-[#FF5500] font-black'
                                  : 'bg-[#160B04] text-orange-200 border-[#FF5500]/25'
                              }`}
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-4 flex flex-col items-center">
                        <span className="text-[10px] text-orange-200/60 mb-1">
                          Standard Store Card Preview
                        </span>
                        <div className="w-32 h-32 aspect-square rounded-xl bg-[#060200] border border-[#FF5500]/50 overflow-hidden flex items-center justify-center">
                          {pairForm.images?.[0] ? (
                            <img
                              src={pairForm.images[0]}
                              alt="Zoom preview"
                              style={{
                                transform: `scale(${Number(pairForm.imageZoom) || 1})`
                              }}
                              className={`w-full h-full ${
                                pairForm.imageFit === 'contain'
                                  ? 'object-contain p-2'
                                  : 'object-cover'
                              } transition`}
                            />
                          ) : (
                            <span className="text-[10px] text-orange-200/40 text-center px-2">
                              Upload photo to preview zoom
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SNEAKER DETAILS INPUTS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    <div>
                      <label className="text-[11px] text-[#FF5500] font-black block mb-1">
                        Custom Pair ID (Syncs Order #) *
                      </label>
                      <input
                        type="text"
                        value={pairForm.customPairId}
                        onChange={(e) =>
                          setPairForm({
                            ...pairForm,
                            customPairId: e.target.value
                          })
                        }
                        placeholder="e.g. 1, 2, 3..."
                        className="w-full bg-[#0A0401] border border-[#FF5500] rounded-xl px-3.5 py-2 text-sm text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-orange-200/70 block mb-1">
                        Sneaker Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={pairForm.name}
                        onChange={(e) =>
                          setPairForm({ ...pairForm, name: e.target.value })
                        }
                        placeholder="Air Force 1 Low"
                        className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-orange-200/70 block mb-1">
                        Category
                      </label>
                      <select
                        value={pairForm.category}
                        onChange={(e) =>
                          setPairForm({ ...pairForm, category: e.target.value })
                        }
                        className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2 text-sm text-white"
                      >
                        {SHOE_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-orange-200/70 block mb-1">
                        EU Size
                      </label>
                      <select
                        value={pairForm.sizeEU}
                        onChange={(e) => {
                          const sz = e.target.value;
                          setPairForm({
                            ...pairForm,
                            sizeEU: sz,
                            insoleInches:
                              EU_TO_INSOLE_MAP[sz] || pairForm.insoleInches
                          });
                        }}
                        className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2 text-sm text-white"
                      >
                        {EU_SIZES.filter((s) => s !== 'All').map((s) => (
                          <option key={s} value={s}>
                            EU {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    <div>
                      <label className="text-[11px] text-orange-200/70 block mb-1">
                        Insole Measurement (Inches) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={pairForm.insoleInches}
                        onChange={(e) =>
                          setPairForm({
                            ...pairForm,
                            insoleInches: e.target.value
                          })
                        }
                        placeholder="10.8"
                        className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-orange-200/70 block mb-1">
                        Base Price (PKR) *
                      </label>
                      <input
                        type="number"
                        required
                        value={pairForm.price}
                        onChange={(e) =>
                          setPairForm({ ...pairForm, price: e.target.value })
                        }
                        placeholder="11500"
                        className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-orange-200/70 block mb-1">
                        Discount % (0–90)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="90"
                        value={pairForm.discountPercent}
                        onChange={(e) =>
                          setPairForm({
                            ...pairForm,
                            discountPercent: e.target.value
                          })
                        }
                        className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-orange-200/70 block mb-1">
                        Availability Status
                      </label>
                      <select
                        value={pairForm.status}
                        onChange={(e) =>
                          setPairForm({ ...pairForm, status: e.target.value })
                        }
                        className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl px-3.5 py-2 text-sm text-white"
                      >
                        <option value="available">Available (1-of-1)</option>
                        <option value="sold">Sold Out</option>
                      </select>
                    </div>
                  </div>

                  {/* 4-Point Condition Sliders */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0A0401] border border-[#FF5500]/25 rounded-xl p-4">
                    {[
                      { key: 'soles', label: 'Soles (/10)' },
                      { key: 'body', label: 'Body (/10)' },
                      { key: 'laces', label: 'Laces (/10)' },
                      { key: 'inside', label: 'Inside (/10)' }
                    ].map((c) => (
                      <div key={c.key}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-orange-200/80">{c.label}</span>
                          <span className="font-black text-[#FF5500]">
                            {pairForm[c.key]}/10
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={pairForm[c.key]}
                          onChange={(e) =>
                            setPairForm({
                              ...pairForm,
                              [c.key]: Number(e.target.value)
                            })
                          }
                          className="w-full accent-[#FF5500]"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2.5 bg-[#0A0401] border border-[#FF5500]/30 rounded-xl p-3">
                      <input
                        id="chk-prepaid-only"
                        type="checkbox"
                        checked={pairForm.prepaidOnly}
                        onChange={(e) =>
                          setPairForm({
                            ...pairForm,
                            prepaidOnly: e.target.checked
                          })
                        }
                        className="w-4 h-4 accent-[#FF5500]"
                      />
                      <label
                        htmlFor="chk-prepaid-only"
                        className="text-xs font-bold text-white cursor-pointer"
                      >
                        Prepaid Only Pair (Disable COD for this sneaker)
                      </label>
                    </div>

                    <div className="flex items-center justify-between gap-2.5 bg-[#0A0401] border border-emerald-500/45 rounded-xl p-3">
                      <div className="flex items-center gap-2.5">
                        <input
                          id="chk-free-delivery"
                          type="checkbox"
                          checked={Boolean(pairForm.freeDelivery)}
                          onChange={(e) =>
                            setPairForm({
                              ...pairForm,
                              freeDelivery: e.target.checked
                            })
                          }
                          className="w-4 h-4 accent-emerald-500"
                        />
                        <label
                          htmlFor="chk-free-delivery"
                          className="text-xs font-black text-emerald-400 cursor-pointer"
                        >
                          ✓ Free Home Delivery on This Pair (Rs. 0 Shipping)
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setPairForm((prev) => ({
                            ...prev,
                            freeDelivery: !prev.freeDelivery
                          }))
                        }
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition ${
                          pairForm.freeDelivery
                            ? 'bg-emerald-500 text-black'
                            : 'bg-[#160B04] text-orange-200 border border-[#FF5500]/30'
                        }`}
                      >
                        {pairForm.freeDelivery ? 'FREE DELIVERY: ON' : 'OFF'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-orange-200/70 block mb-1">
                      Inspection Description & Notes
                    </label>
                    <textarea
                      rows={3}
                      value={pairForm.description}
                      onChange={(e) =>
                        setPairForm({
                          ...pairForm,
                          description: e.target.value
                        })
                      }
                      placeholder="Describe condition, authenticity, and fit notes..."
                      className="w-full bg-[#0A0401] border border-[#FF5500]/30 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black py-3.5 rounded-xl text-xs sm:text-sm transition shadow-[0_0_25px_rgba(255,85,0,0.45)]"
                  >
                    {editingPairId
                      ? 'Save Updated Sneaker'
                      : 'Publish 1-of-1 Sneaker to Storefront'}
                  </button>
                </form>
              )}

              {/* BOSS MODE INVENTORY TAB */}
              {bossTab === 'inventory' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sneakers.map((pair) => {
                    const code = getPairCode(pair);
                    const isSold = pair.status === 'sold';
                    return (
                      <div
                        key={pair.id}
                        className="bg-[#160B04] border border-[#FF5500]/30 rounded-2xl p-4 flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-xl bg-[#080301] overflow-hidden border border-[#FF5500]/30 shrink-0">
                            <img
                              src={
                                pair.images?.[0] || pair.image_url || pair.image
                              }
                              alt=""
                              style={{
                                transform: `scale(${Number(pair.imageZoom) || 1})`
                              }}
                              className={`w-full h-full ${
                                pair.imageFit === 'contain'
                                  ? 'object-contain p-1'
                                  : 'object-cover'
                              }`}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-[#FF5500] text-black text-[10px] font-black px-2 py-0.5 rounded font-mono">
                                Pair #{code}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const nextStatus = isSold
                                    ? 'available'
                                    : 'sold';
                                  const updated = {
                                    ...pair,
                                    status: nextStatus
                                  };
                                  setSneakers((prev) =>
                                    prev.map((s) =>
                                      s.id === pair.id ? updated : s
                                    )
                                  );
                                  supabaseRest
                                    .upsertProduct(updated)
                                    .catch(() => {});
                                  showToast(
                                    `Pair #${code} marked as ${nextStatus.toUpperCase()} in presets_inventory`
                                  );
                                }}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                                  isSold
                                    ? 'bg-rose-500/20 text-rose-300'
                                    : 'bg-emerald-500/20 text-emerald-300'
                                }`}
                              >
                                {isSold ? 'SOLD (Click to Toggle)' : 'AVAILABLE'}
                              </button>
                            </div>
                            <h4 className="text-xs font-bold text-white truncate mt-1">
                              {String(pair.name || pair.title || '')}
                            </h4>
                            <div className="text-[11px] text-orange-200/75">
                              EU {pair.sizeEU || pair.eu_size || pair.size} •
                              Insole {pair.insoleInches}" •{' '}
                              <strong className="text-[#FF5500]">
                                {formatPKR(getEffectivePairPrice(pair))}
                              </strong>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#FF5500]/20 text-xs">
                          <button
                            type="button"
                            onClick={() => startEditPair(pair)}
                            className="flex-1 bg-[#0A0401] hover:bg-[#FF5500]/20 border border-[#FF5500]/35 text-orange-200 font-bold py-1.5 rounded-lg"
                          >
                            Edit Pair / Zoom / Free Delivery
                          </button>
                          {deleteConfirmId === pair.id ? (
                            <button
                              type="button"
                              onClick={() => deletePairPermanently(pair.id)}
                              className="bg-rose-600 text-white font-black px-3 py-1.5 rounded-lg"
                            >
                              Confirm Delete
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(pair.id)}
                              className="bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold px-3 py-1.5 rounded-lg"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* BOSS MODE ORDERS TAB */}
              {bossTab === 'orders' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* SECTION 1: PREPAID ORDERS */}
                  <div className="bg-[#160B04] border border-[#FF5500]/35 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#FF5500]/25 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5500]">
                          SECTION 1 • FULL PREPAID ORDERS (5% OFF)
                        </span>
                        <h3 className="text-base font-black text-white">
                          Prepaid Orders (
                          {
                            orders.filter((o) => o.paymentMethod === 'PREPAID')
                              .length
                          }
                          )
                        </h3>
                      </div>
                      <span className="bg-[#FF5500] text-black text-xs font-black px-2.5 py-1 rounded-lg">
                        PAID / UNPAID
                      </span>
                    </div>

                    {orders.filter((o) => o.paymentMethod === 'PREPAID')
                      .length === 0 ? (
                      <p className="text-xs text-orange-200/50 py-6 text-center">
                        No Prepaid orders yet.
                      </p>
                    ) : (
                      <div className="space-y-3.5">
                        {orders
                          .filter((o) => o.paymentMethod === 'PREPAID')
                          .map((order, idx) => {
                            const fullBill =
                              order.totals?.finalTotalWithShipping || 0;
                            const isPaid = order.prepaidPaidStatus === 'PAID';
                            const isConfirmed = Boolean(order.orderConfirmed);
                            const dispNum = getOrderDisplayNumber(order, idx);

                            return (
                              <div
                                key={order.id}
                                className="bg-[#0A0401] border border-[#FF5500]/30 rounded-xl p-4 space-y-3"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-black text-[#FF5500]">
                                      Order #{dispNum}
                                    </span>
                                    {isConfirmed && (
                                      <span className="bg-emerald-500 text-black text-[10px] font-black px-2 py-0.5 rounded">
                                        ✓ CONFIRMED
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        toggleOrderConfirmedStatus(order)
                                      }
                                      className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition ${
                                        isConfirmed
                                          ? 'bg-emerald-500 text-black'
                                          : 'bg-[#FF5500] text-black'
                                      }`}
                                    >
                                      {isConfirmed
                                        ? '✓ Order Confirmed'
                                        : 'Confirm Order'}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        loadOrderIntoDeliverySlip(order)
                                      }
                                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#160B04] text-orange-200 border border-[#FF5500]/40 hover:bg-[#FF5500]/20"
                                    >
                                      📦 Delivery Slip
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        togglePrepaidOrderPaidStatus(order.id)
                                      }
                                      className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition ${
                                        isPaid
                                          ? 'bg-emerald-500 text-black'
                                          : 'bg-[#1A0D05] text-orange-200 border border-[#FF5500]/30'
                                      }`}
                                    >
                                      {isPaid ? 'PAID (100%)' : 'MARK PAID'}
                                    </button>
                                  </div>
                                </div>

                                <div className="text-xs text-white font-bold">
                                  {String(order.customer?.fullName || '')} (
                                  {String(order.customer?.phone || '')}) —{' '}
                                  {String(order.customer?.city || '')}
                                </div>
                                <div className="text-[11px] text-orange-200/75">
                                  Address: {String(order.customer?.address || '')}
                                </div>
                                <div className="text-xs text-[#FF5500] font-bold">
                                  Full Amount: {formatPKR(fullBill)}
                                </div>

                                {/* 3-STEP BOSS MODE WHATSAPP WORKFLOW FOR PREPAID */}
                                <div className="bg-[#160B04] border border-[#FF5500]/30 rounded-xl p-2.5 space-y-2">
                                  <div className="text-[10px] font-black uppercase tracking-wider text-orange-200/80">
                                    3-Step WhatsApp Order Flow (Click in Order):
                                  </div>
                                  <div className="grid grid-cols-1 gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        sendBossOrderStep1AddressAndVideo(order)
                                      }
                                      className="w-full bg-[#1A0D05] hover:bg-[#FF5500]/20 border border-[#FF5500]/45 text-orange-100 font-bold px-3 py-2 rounded-lg text-[11px] text-left flex items-center justify-between"
                                    >
                                      <span>
                                        1️⃣ Step 1: Confirm Address + Send Detailed Video
                                      </span>
                                      <span className="text-[#FF5500] font-black">
                                        Send →
                                      </span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        sendBossOrderStep2PaymentDetails(order)
                                      }
                                      className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black px-3 py-2 rounded-lg text-[11px] text-left flex items-center justify-between"
                                    >
                                      <span>
                                        2️⃣ Step 2: Send Full Prepaid ({formatPKR(fullBill)}) Bank Details
                                      </span>
                                      <span>Send →</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        sendBossOrderStep3PaymentReceivedAndDispatch(
                                          order
                                        )
                                      }
                                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black px-3 py-2 rounded-lg text-[11px] text-left flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                    >
                                      <span>
                                        3️⃣ Step 3: Payment Received & Parcel Ready for Dispatch
                                      </span>
                                      <span>✓ Dispatch →</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  {/* SECTION 2: CASH ON DELIVERY (COD) ORDERS */}
                  <div className="bg-[#160B04] border border-[#FF5500]/35 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#FF5500]/25 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5500]">
                          SECTION 2 • CASH ON DELIVERY (COD) ORDERS
                        </span>
                        <h3 className="text-base font-black text-white">
                          COD Orders (
                          {orders.filter((o) => o.paymentMethod === 'COD').length})
                        </h3>
                      </div>
                      <span className="bg-[#FF5500] text-black text-xs font-black px-2.5 py-1 rounded-lg">
                        ADV PAID / UNPAID
                      </span>
                    </div>

                    {orders.filter((o) => o.paymentMethod === 'COD').length ===
                    0 ? (
                      <p className="text-xs text-orange-200/50 py-6 text-center">
                        No COD orders yet.
                      </p>
                    ) : (
                      <div className="space-y-3.5">
                        {orders
                          .filter((o) => o.paymentMethod === 'COD')
                          .map((order, idx) => {
                            const fullBill =
                              order.totals?.finalTotalWithShipping || 0;
                            const isAdvPaid =
                              order.codAdvPaidStatus === 'ADV PAID';
                            const isConfirmed = Boolean(order.orderConfirmed);
                            const dispNum = getOrderDisplayNumber(order, idx);
                            const remainingOnDel = isCodAdvancePolicyActive
                              ? Math.max(0, fullBill - activeCodDepositAmount)
                              : fullBill;

                            return (
                              <div
                                key={order.id}
                                className="bg-[#0A0401] border border-[#FF5500]/30 rounded-xl p-4 space-y-3"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-black text-[#FF5500]">
                                      Order #{dispNum}
                                    </span>
                                    {isConfirmed && (
                                      <span className="bg-emerald-500 text-black text-[10px] font-black px-2 py-0.5 rounded">
                                        ✓ CONFIRMED
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        toggleOrderConfirmedStatus(order)
                                      }
                                      className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition ${
                                        isConfirmed
                                          ? 'bg-emerald-500 text-black'
                                          : 'bg-[#FF5500] text-black'
                                      }`}
                                    >
                                      {isConfirmed
                                        ? '✓ Order Confirmed'
                                        : 'Confirm Order'}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        loadOrderIntoDeliverySlip(order)
                                      }
                                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#160B04] text-orange-200 border border-[#FF5500]/40 hover:bg-[#FF5500]/20"
                                    >
                                      📦 Delivery Slip
                                    </button>
                                    {isCodAdvancePolicyActive && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          toggleCodOrderAdvPaidStatus(order.id)
                                        }
                                        className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition ${
                                          isAdvPaid
                                            ? 'bg-emerald-500 text-black'
                                            : 'bg-[#1A0D05] text-orange-200 border border-[#FF5500]/30'
                                        }`}
                                      >
                                        {isAdvPaid
                                          ? `ADV PAID (Rs. ${activeCodDepositAmount})`
                                          : 'MARK ADV PAID'}
                                      </button>
                                    )}
                                  </div>
                                </div>

                                <div className="text-xs text-white font-bold">
                                  {String(order.customer?.fullName || '')} (
                                  {String(order.customer?.phone || '')}) —{' '}
                                  {String(order.customer?.city || '')}
                                </div>
                                <div className="text-[11px] text-orange-200/75">
                                  Address: {String(order.customer?.address || '')}
                                </div>
                                <div className="text-xs text-[#FF5500] font-bold">
                                  Total Bill: {formatPKR(fullBill)} • COD Balance:{' '}
                                  {formatPKR(remainingOnDel)}
                                </div>

                                {/* 3-STEP BOSS MODE WHATSAPP WORKFLOW FOR COD */}
                                <div className="bg-[#160B04] border border-[#FF5500]/30 rounded-xl p-2.5 space-y-2">
                                  <div className="text-[10px] font-black uppercase tracking-wider text-orange-200/80">
                                    3-Step WhatsApp Order Flow (Click in Order):
                                  </div>
                                  <div className="grid grid-cols-1 gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        sendBossOrderStep1AddressAndVideo(order)
                                      }
                                      className="w-full bg-[#1A0D05] hover:bg-[#FF5500]/20 border border-[#FF5500]/45 text-orange-100 font-bold px-3 py-2 rounded-lg text-[11px] text-left flex items-center justify-between"
                                    >
                                      <span>
                                        1️⃣ Step 1: Confirm Address + Send Detailed Video
                                      </span>
                                      <span className="text-[#FF5500] font-black">
                                        Send →
                                      </span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        sendBossOrderStep2PaymentDetails(order)
                                      }
                                      className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black px-3 py-2 rounded-lg text-[11px] text-left flex items-center justify-between"
                                    >
                                      <span>
                                        {isCodAdvancePolicyActive
                                          ? `2️⃣ Step 2: Send Rs. ${activeCodDepositAmount} COD Advance Details`
                                          : '2️⃣ Step 2: Send COD Bill Breakdown'}
                                      </span>
                                      <span>Send →</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        sendBossOrderStep3PaymentReceivedAndDispatch(
                                          order
                                        )
                                      }
                                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black px-3 py-2 rounded-lg text-[11px] text-left flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                    >
                                      <span>
                                        3️⃣ Step 3: Payment Received & Parcel Ready for Dispatch
                                      </span>
                                      <span>✓ Dispatch →</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                  </div>

                  {/* SECTION 3: RETURN PAIR & CANCEL ORDER REQUESTS (SYNCED IN PRESETS_ORDERS) */}
                  <div className="bg-[#160B04] border border-[#FF5500]/35 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#FF5500]/25 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5500]">
                          SECTION 3 • RETURN PAIR & ORDER CANCELLATION REQUESTS
                        </span>
                        <h3 className="text-base font-black text-white">
                          Customer Return & Cancellation Logs (
                          {
                            orders.filter(
                              (o) =>
                                o.paymentMethod === 'RETURN_CLAIM' ||
                                o.paymentMethod === 'CANCEL_REQUEST'
                            ).length
                          }
                          )
                        </h3>
                      </div>
                      <span className="bg-[#FF5500]/20 border border-[#FF5500]/40 text-[#FF5500] text-xs font-black px-2.5 py-1 rounded-lg">
                        Synced with presets_orders
                      </span>
                    </div>

                    {orders.filter(
                      (o) =>
                        o.paymentMethod === 'RETURN_CLAIM' ||
                        o.paymentMethod === 'CANCEL_REQUEST'
                    ).length === 0 ? (
                      <p className="text-xs text-orange-200/50 py-4 text-center">
                        No Return Pair or Cancel Order requests logged yet.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {orders
                          .filter(
                            (o) =>
                              o.paymentMethod === 'RETURN_CLAIM' ||
                              o.paymentMethod === 'CANCEL_REQUEST'
                          )
                          .map((reqOrder) => (
                            <div
                              key={reqOrder.id}
                              className="bg-[#0A0401] border border-[#FF5500]/30 rounded-xl p-4 space-y-2 text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={`font-black px-2 py-0.5 rounded text-[10px] ${
                                    reqOrder.paymentMethod === 'RETURN_CLAIM'
                                      ? 'bg-amber-500 text-black'
                                      : 'bg-rose-500 text-white'
                                  }`}
                                >
                                  {reqOrder.paymentMethod === 'RETURN_CLAIM'
                                    ? 'RETURN / DAMAGE CLAIM'
                                    : 'CANCEL ORDER REQUEST'}
                                </span>
                                <span className="font-mono text-[#FF5500] font-black">
                                  Pair ID #{reqOrder.orderNumber}
                                </span>
                              </div>
                              <div className="font-bold text-white">
                                {reqOrder.customer?.fullName} (
                                {reqOrder.customer?.phone})
                              </div>
                              <div className="text-orange-200/80">
                                {reqOrder.status}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {bossTab === 'delivery_slip' && (
                <div className="bg-[#160B04] border border-[#FF5500]/40 rounded-2xl p-5 sm:p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#FF5500]/25 pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5500]">
                        BOSS MODE COURIER DISPATCH SYSTEM (SYNCED TO PRESETS_DELIVERY_SLIPS)
                      </span>
                      <h2 className="text-lg font-black text-white">
                        FROM / TO Delivery Slip Maker
                      </h2>
                    </div>

                    {orders.length > 0 && (
                      <select
                        onChange={(e) => {
                          const found = orders.find(
                            (o) => o.id === e.target.value
                          );
                          if (found) loadOrderIntoDeliverySlip(found);
                        }}
                        defaultValue=""
                        className="bg-[#0A0401] border border-[#FF5500]/40 rounded-xl px-3.5 py-2 text-xs text-white"
                      >
                        <option value="" disabled>
                          Quick Fill from Existing Order...
                        </option>
                        {orders.map((o, i) => (
                          <option key={o.id} value={o.id}>
                            Order #{getOrderDisplayNumber(o, i)} —{' '}
                            {o.customer?.fullName} ({o.customer?.city})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* FIXED FROM SENDER CARD */}
                    <div className="bg-[#0A0401] border border-[#FF5500]/40 rounded-2xl p-5 space-y-3">
                      <span className="bg-[#FF5500] text-black text-[11px] font-black px-3 py-1 rounded-md uppercase">
                        FROM (FIXED SENDER DETAILS)
                      </span>
                      <div className="space-y-2 text-xs sm:text-sm text-orange-100 pt-1">
                        <div>
                          <span className="text-orange-200/60">Sender / Store:</span>{' '}
                          <strong className="text-white">
                            {SENDER_DETAILS.name} (PRESETS)
                          </strong>
                        </div>
                        <div>
                          <span className="text-orange-200/60">Phone Number:</span>{' '}
                          <strong className="text-[#FF5500]">
                            {SENDER_DETAILS.phone}
                          </strong>
                        </div>
                        <div>
                          <span className="text-orange-200/60">Address:</span>{' '}
                          <strong className="text-white">
                            {SENDER_DETAILS.address}
                          </strong>
                        </div>
                        <div>
                          <span className="text-orange-200/60">City:</span>{' '}
                          <strong className="text-white">
                            {SENDER_DETAILS.city}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* EDITABLE TO CUSTOMER CARD */}
                    <div className="bg-[#0A0401] border border-[#FF5500]/40 rounded-2xl p-5 space-y-3">
                      <span className="bg-white text-black text-[11px] font-black px-3 py-1 rounded-md uppercase">
                        TO (CUSTOMER RECIPIENT DETAILS)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <input
                          type="text"
                          value={deliverySlipForm.orderNumber}
                          onChange={(e) =>
                            setDeliverySlipForm({
                              ...deliverySlipForm,
                              orderNumber: e.target.value
                            })
                          }
                          placeholder="Order # (e.g. 1)"
                          className="bg-[#160B04] border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={deliverySlipForm.trackingNumber || ''}
                          onChange={(e) =>
                            setDeliverySlipForm({
                              ...deliverySlipForm,
                              trackingNumber: e.target.value
                            })
                          }
                          placeholder="PostEx Tracking # (Optional)"
                          className="bg-[#160B04] border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          readOnly
                          value="PostEx"
                          className="bg-[#160B04] border border-[#FF5500]/50 rounded-xl px-3 py-2 text-xs text-[#FF5500] font-black cursor-not-allowed"
                        />
                        <input
                          type="text"
                          value={deliverySlipForm.customerName}
                          onChange={(e) =>
                            setDeliverySlipForm({
                              ...deliverySlipForm,
                              customerName: e.target.value
                            })
                          }
                          placeholder="Customer Full Name"
                          className="bg-[#160B04] border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={deliverySlipForm.customerPhone}
                          onChange={(e) =>
                            setDeliverySlipForm({
                              ...deliverySlipForm,
                              customerPhone: e.target.value
                            })
                          }
                          placeholder="Customer Phone Number"
                          className="bg-[#160B04] border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={deliverySlipForm.customerCity}
                          onChange={(e) =>
                            setDeliverySlipForm({
                              ...deliverySlipForm,
                              customerCity: e.target.value
                            })
                          }
                          placeholder="Customer City"
                          className="bg-[#160B04] border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={deliverySlipForm.customerAddress}
                          onChange={(e) =>
                            setDeliverySlipForm({
                              ...deliverySlipForm,
                              customerAddress: e.target.value
                            })
                          }
                          placeholder="Customer Complete Delivery Address"
                          className="sm:col-span-2 bg-[#160B04] border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={deliverySlipForm.pairDetails}
                          onChange={(e) =>
                            setDeliverySlipForm({
                              ...deliverySlipForm,
                              pairDetails: e.target.value
                            })
                          }
                          placeholder="Sneaker / Pair Details"
                          className="bg-[#160B04] border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="number"
                          value={deliverySlipForm.amountToCollect}
                          onChange={(e) =>
                            setDeliverySlipForm({
                              ...deliverySlipForm,
                              amountToCollect: e.target.value
                            })
                          }
                          placeholder="COD Collectable Amount (PKR)"
                          className="bg-[#160B04] border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="number"
                          value={deliverySlipForm.advanceDeducted || '0'}
                          onChange={(e) =>
                            setDeliverySlipForm({
                              ...deliverySlipForm,
                              advanceDeducted: e.target.value
                            })
                          }
                          placeholder="Advance Deducted (PKR)"
                          className="bg-[#160B04] border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={deliverySlipForm.specialInstructions || ''}
                          onChange={(e) =>
                            setDeliverySlipForm({
                              ...deliverySlipForm,
                              specialInstructions: e.target.value
                            })
                          }
                          placeholder="Special Instructions"
                          className="bg-[#160B04] border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        printOrDownloadDeliverySlip(null, 'download')
                      }
                      className="bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black px-6 py-3.5 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,85,0,0.45)]"
                    >
                      <Icon name="download" className="w-4 h-4" />
                      <span>
                        Save to Cloud & Download Slip (Order #
                        {deliverySlipForm.orderNumber})
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => printOrDownloadDeliverySlip(null, 'print')}
                      className="bg-white hover:bg-orange-100 text-black font-black px-6 py-3.5 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
                    >
                      <span>🖨️ Save & Print Slip Now</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => saveCurrentSlipToSupabase(false)}
                      className="bg-[#0A0401] hover:bg-[#FF5500]/20 border border-[#FF5500]/40 text-orange-200 font-bold px-5 py-3.5 rounded-xl text-xs transition"
                    >
                      Save Slip to Supabase Only
                    </button>
                  </div>

                  {/* SAVED DELIVERY SLIPS HISTORY FROM PRESETS_DELIVERY_SLIPS */}
                  <div className="border-t border-[#FF5500]/25 pt-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-white">
                        Saved Delivery Slips History ({deliverySlips.length})
                      </h3>
                      <span className="text-[11px] text-orange-200/70">
                        Synced with presets_delivery_slips
                      </span>
                    </div>

                    {deliverySlips.length === 0 ? (
                      <p className="text-xs text-orange-200/50">
                        No saved delivery slips yet. Generate or save a slip
                        above to store it in Supabase.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {deliverySlips.map((slip) => (
                          <div
                            key={slip.slipId}
                            className="bg-[#0A0401] border border-[#FF5500]/30 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="space-y-0.5">
                              <div className="font-black text-[#FF5500]">
                                Order #{slip.orderNumber} •{' '}
                                {slip.customerName || 'Customer'} (
                                {slip.customerCity || 'PK'})
                              </div>
                              <div className="text-[11px] text-orange-200/80">
                                {slip.pairDetails} • COD:{' '}
                                {formatPKR(slip.amountToCollect)}
                              </div>
                              <div className="text-[10px] text-orange-200/50">
                                {slip.courierName}{' '}
                                {slip.trackingNumber
                                  ? `• #${slip.trackingNumber}`
                                  : ''}{' '}
                                • {slip.createdAt}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => setDeliverySlipForm(slip)}
                                className="bg-[#160B04] border border-[#FF5500]/35 text-orange-200 px-2.5 py-1.5 rounded-lg font-bold"
                              >
                                Load
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  printOrDownloadDeliverySlip(slip, 'print')
                                }
                                className="bg-[#FF5500] text-black px-2.5 py-1.5 rounded-lg font-black"
                              >
                                Re-Print
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* FIXED COD POLICY & SALE BANNER MANAGER TAB IN BOSS MODE */}
              {bossTab === 'policy' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Card: COD Advance Policy Controls */}
                  <div className="bg-[#160B04] border border-[#FF5500]/40 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-[#FF5500]/25 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5500]">
                          CASH ON DELIVERY MASTER CONTROL (PRESETS_SETTINGS)
                        </span>
                        <h3 className="text-base font-black text-white">
                          COD Advance Deposit & Return Policy
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={toggleCodPolicyMasterSwitch}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                          isCodAdvancePolicyActive
                            ? 'bg-emerald-500 text-black'
                            : 'bg-rose-500 text-white'
                        }`}
                      >
                        {isCodAdvancePolicyActive ? 'POLICY: ON' : 'POLICY: OFF'}
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-orange-200/80 font-bold block mb-1">
                          COD Advance Deposit Amount (PKR)
                        </label>
                        <input
                          type="number"
                          value={storeConfig.codAdvanceAmount}
                          onChange={(e) =>
                            setStoreConfig((prev) => ({
                              ...prev,
                              codAdvanceAmount: Number(e.target.value) || 0
                            }))
                          }
                          className="w-full bg-[#0A0401] border border-[#FF5500]/35 rounded-xl px-3.5 py-2.5 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-orange-200/80 font-bold block mb-1">
                          Top Announcement Marquee Text
                        </label>
                        <input
                          type="text"
                          value={storeConfig.frontBannerText}
                          onChange={(e) =>
                            setStoreConfig((prev) => ({
                              ...prev,
                              frontBannerText: e.target.value
                            }))
                          }
                          className="w-full bg-[#0A0401] border border-[#FF5500]/35 rounded-xl px-3.5 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-orange-200/80 font-bold block mb-1">
                          COD Policy Text (Shown on Checkout & Policies)
                        </label>
                        <textarea
                          rows={3}
                          value={storeConfig.codPolicyText}
                          onChange={(e) =>
                            setStoreConfig((prev) => ({
                              ...prev,
                              codPolicyText: e.target.value
                            }))
                          }
                          className="w-full bg-[#0A0401] border border-[#FF5500]/35 rounded-xl p-3 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-orange-200/80 font-bold block mb-1">
                          Return & Exchange Policy Text
                        </label>
                        <textarea
                          rows={3}
                          value={storeConfig.returnExchangePolicy || ''}
                          onChange={(e) =>
                            setStoreConfig((prev) => ({
                              ...prev,
                              returnExchangePolicy: e.target.value
                            }))
                          }
                          className="w-full bg-[#0A0401] border border-[#FF5500]/35 rounded-xl p-3 text-xs text-white"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          syncSettingsToSupabase(
                            storeConfig,
                            'Saved & synced COD, Marquee & Return Policy to presets_settings!'
                          )
                        }
                        className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black py-3 rounded-xl text-xs transition"
                      >
                        Save & Sync COD Policy Settings
                      </button>
                    </div>
                  </div>

                  {/* Right Card: Editable Sale Banner & Laptop Photo Upload */}
                  <div className="bg-[#160B04] border border-[#FF5500]/40 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-[#FF5500]/25 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5500]">
                          STOREFRONT HERO SALE BANNER
                        </span>
                        <h3 className="text-base font-black text-white">
                          Sale Banner Editor & Photo Upload
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setStoreConfig((prev) => {
                            const next = !prev.saleBannerEnabled;
                            const updated = {
                              ...prev,
                              saleBannerEnabled: next
                            };
                            syncSettingsToSupabase(
                              updated,
                              next
                                ? 'Sale Banner Enabled & Synced to Supabase!'
                                : 'Sale Banner Hidden & Synced to Supabase!'
                            );
                            return updated;
                          })
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                          storeConfig.saleBannerEnabled
                            ? 'bg-emerald-500 text-black'
                            : 'bg-zinc-700 text-zinc-200'
                        }`}
                      >
                        {storeConfig.saleBannerEnabled ? 'BANNER: ON' : 'BANNER: OFF'}
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-[#0A0401] border border-dashed border-[#FF5500]/45 rounded-xl p-3.5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {storeConfig.saleBannerImage && (
                            <img
                              src={storeConfig.saleBannerImage}
                              alt="Banner preview"
                              className="w-16 h-12 rounded-lg object-cover border border-[#FF5500]/40"
                            />
                          )}
                          <div>
                            <span className="text-xs font-bold text-white block">
                              Banner Background Photo
                            </span>
                            <span className="text-[10px] text-orange-200/60">
                              Upload directly from your laptop or phone
                            </span>
                          </div>
                        </div>

                        <label className="bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black px-3.5 py-2 rounded-lg text-xs cursor-pointer shrink-0">
                          + Upload Photo from Laptop
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerPhotoUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="text-xs text-orange-200/80 font-bold block mb-1">
                          Sale Badge Text
                        </label>
                        <input
                          type="text"
                          value={storeConfig.saleBannerBadge}
                          onChange={(e) =>
                            setStoreConfig((prev) => ({
                              ...prev,
                              saleBannerBadge: e.target.value
                            }))
                          }
                          className="w-full bg-[#0A0401] border border-[#FF5500]/35 rounded-xl px-3.5 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-orange-200/80 font-bold block mb-1">
                          Banner Main Headline
                        </label>
                        <input
                          type="text"
                          value={storeConfig.saleBannerTitle}
                          onChange={(e) =>
                            setStoreConfig((prev) => ({
                              ...prev,
                              saleBannerTitle: e.target.value
                            }))
                          }
                          className="w-full bg-[#0A0401] border border-[#FF5500]/35 rounded-xl px-3.5 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-orange-200/80 font-bold block mb-1">
                          Banner Subtitle
                        </label>
                        <textarea
                          rows={2}
                          value={storeConfig.saleBannerSubtitle}
                          onChange={(e) =>
                            setStoreConfig((prev) => ({
                              ...prev,
                              saleBannerSubtitle: e.target.value
                            }))
                          }
                          className="w-full bg-[#0A0401] border border-[#FF5500]/35 rounded-xl p-3 text-xs text-white"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          syncSettingsToSupabase(
                            storeConfig,
                            'Sale Banner changes saved & synced to presets_settings!'
                          )
                        }
                        className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black py-3 rounded-xl text-xs transition"
                      >
                        Save Sale Banner Changes
                      </button>

                      {/* FRONT HEADER SALE COUNTDOWN CUSTOMIZER IN BOSS MODE */}
                      <div className="border-t border-[#FF5500]/25 pt-4 mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5500] block">
                              FRONT HEADER LIVE SALE TIMER
                            </span>
                            <h4 className="text-sm font-black text-white">
                              Custom Sale Countdown Clock
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setStoreConfig((prev) => {
                                const next = !prev.countdownEnabled;
                                const updated = {
                                  ...prev,
                                  countdownEnabled: next
                                };
                                syncSettingsToSupabase(
                                  updated,
                                  next
                                    ? 'Sale Countdown Timer Enabled & Synced!'
                                    : 'Sale Countdown Timer Hidden & Synced!'
                                );
                                return updated;
                              })
                            }
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition ${
                              storeConfig.countdownEnabled
                                ? 'bg-emerald-500 text-black'
                                : 'bg-zinc-700 text-zinc-200'
                            }`}
                          >
                            {storeConfig.countdownEnabled
                              ? 'TIMER: ON'
                              : 'TIMER: OFF'}
                          </button>
                        </div>

                        <div>
                          <label className="text-xs text-orange-200/80 font-bold block mb-1">
                            Countdown Headline Text
                          </label>
                          <input
                            type="text"
                            value={storeConfig.countdownTitle || ''}
                            onChange={(e) =>
                              setStoreConfig((prev) => ({
                                ...prev,
                                countdownTitle: e.target.value
                              }))
                            }
                            placeholder="⚡ FLASH VAULT SALE ENDS IN:"
                            className="w-full bg-[#0A0401] border border-[#FF5500]/35 rounded-xl px-3.5 py-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-orange-200/80 font-bold block mb-1">
                            Sale End Date & Time
                          </label>
                          <input
                            type="datetime-local"
                            value={storeConfig.countdownEndTime || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setStoreConfig((prev) => {
                                const updated = {
                                  ...prev,
                                  countdownEndTime: val
                                };
                                syncSettingsToSupabase(
                                  updated,
                                  'Timer end time synced to presets_settings!'
                                );
                                return updated;
                              });
                            }}
                            className="w-full bg-[#0A0401] border border-[#FF5500]/35 rounded-xl px-3.5 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {[
                            { label: '+12 Hours', hrs: 12 },
                            { label: '+24 Hours (1 Day)', hrs: 24 },
                            { label: '+48 Hours (2 Days)', hrs: 48 },
                            { label: '+7 Days', hrs: 168 }
                          ].map((preset) => (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() => {
                                const targetDate = new Date(
                                  Date.now() + preset.hrs * 3600 * 1000
                                );
                                const nextIso = new Date(
                                  targetDate.getTime() -
                                    targetDate.getTimezoneOffset() * 60000
                                )
                                  .toISOString()
                                  .slice(0, 16);
                                setStoreConfig((prev) => {
                                  const updated = {
                                    ...prev,
                                    countdownEndTime: nextIso,
                                    countdownEnabled: true
                                  };
                                  syncSettingsToSupabase(
                                    updated,
                                    `Timer set to ${preset.label} & synced to Supabase!`
                                  );
                                  return updated;
                                });
                              }}
                              className="bg-[#0A0401] hover:bg-[#FF5500]/20 border border-[#FF5500]/35 text-orange-200 text-[11px] font-bold px-2.5 py-1.5 rounded-lg"
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* EXCEL CSV HUB TAB */}
              {bossTab === 'excel_ai' && (
                <div className="bg-[#160B04] border border-[#FF5500]/35 rounded-2xl p-6 space-y-4">
                  <h3 className="text-base font-black text-white">
                    Excel CSV Inventory & Orders Export Hub
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={exportInventoryToExcelCSV}
                      className="bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black px-5 py-3 rounded-xl text-xs flex items-center gap-2"
                    >
                      <Icon name="download" className="w-4 h-4" />
                      <span>Download Inventory CSV ({sneakers.length} Pairs)</span>
                    </button>
                    <button
                      type="button"
                      onClick={exportOrdersToExcelCSV}
                      className="bg-white hover:bg-orange-100 text-black font-black px-5 py-3 rounded-xl text-xs flex items-center gap-2"
                    >
                      <Icon name="sheet" className="w-4 h-4" />
                      <span>Download Orders CSV ({orders.length} Orders)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      )}

      {/* ==========================================
          BOTTOM STORE FOOTER (WITH BOSS MODE BUTTON MOVED TO THE END)
         ========================================== */}
      <footer className="relative z-10 border-t border-[#FF5500]/25 bg-[#090401] mt-16 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF5500] text-black font-black tracking-tight px-3 py-1 rounded text-sm shadow-[0_0_15px_rgba(255,85,0,0.45)]">
              PRESETS
            </div>
            <span className="text-xs text-orange-200/70">
              1-of-1 Authentic Pre-Loved Kicks • Nationwide Delivery in Pakistan
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => {
                setActiveView('policies');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-orange-200/75 hover:text-white underline"
            >
              Return & Exchange Policy
            </button>
            <button
              type="button"
              onClick={() => setReturnModalOpen(true)}
              className="text-orange-200/75 hover:text-white underline"
            >
              Return Pair
            </button>
            <button
              type="button"
              onClick={() => setCancelModalOpen(true)}
              className="text-orange-200/75 hover:text-white underline"
            >
              Cancel Order
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveView('boss');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                activeView === 'boss'
                  ? 'bg-[#FF5500] text-black font-bold shadow-[0_0_15px_rgba(255,85,0,0.5)]'
                  : 'bg-[#1A0D05] border border-[#FF5500]/30 text-[#FF5500] hover:bg-[#FF5500]/15'
              }`}
            >
              <Icon name="lock" className="w-3.5 h-3.5" />
              <span>Boss Mode</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Slide-over Bag Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#120802] border-l border-[#FF5500]/35 h-full flex flex-col justify-between p-5">
            <div className="space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#FF5500]/25 pb-3">
                <h3 className="text-sm font-black text-white">
                  Bag ({cartItems.length})
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-orange-200/70 hover:text-white"
                >
                  <Icon name="x" className="w-4 h-4" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-xs text-orange-200/50 text-center py-8">
                  Your bag is empty.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2.5 bg-[#090401] border border-[#FF5500]/25 p-2.5 rounded-xl"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.images?.[0] || item.image_url || item.image}
                          alt={String(item.name || item.title || '')}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">
                            {String(item.name || item.title || '')}
                          </h4>
                          <span className="text-xs text-[#FF5500] font-black block">
                            {formatPKR(getEffectivePairPrice(item))}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#FF5500] font-bold text-xs px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-[#FF5500]/25 pt-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-orange-200/70">Subtotal</span>
                  <span className="font-black text-white">
                    {formatPKR(orderTotals.discountedProductSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-orange-200/75">
                  <span>Home Delivery</span>
                  <span
                    className={
                      orderTotals.qualifiesForFreeDelivery
                        ? 'text-emerald-400 font-black'
                        : ''
                    }
                  >
                    {orderTotals.qualifiesForFreeDelivery
                      ? 'FREE (Order ≥ Rs. 8,000)'
                      : formatPKR(SHIPPING_FEE)}
                  </span>
                </div>
                <div className="bg-[#090401] border border-[#FF5500]/25 rounded-xl p-2.5 text-[11px] text-orange-200/85 space-y-1">
                  <div className="flex justify-between">
                    <span>Full Prepaid (WhatsApp):</span>
                    <span className="text-[#FF5500] font-black">5% OFF</span>
                  </div>
                  {!cartRequiresPrepaidOnly && (
                    <div className="flex justify-between">
                      <span>COD Policy:</span>
                      <span className="font-bold text-white">
                        {isCodAdvancePolicyActive
                          ? `Rs. ${activeCodDepositAmount} Advance`
                          : 'Rs. 0 Advance'}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('checkout');
                  }}
                  className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black py-3 rounded-xl text-xs shadow-[0_0_20px_rgba(255,85,0,0.4)]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WhatsApp Queries Modal */}
      {queryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <form
            onSubmit={handleSendWhatsAppQuery}
            className="max-w-sm w-full bg-[#160B04] border border-[#FF5500]/40 rounded-2xl p-5 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-white">
                WhatsApp Query
              </span>
              <button type="button" onClick={() => setQueryModalOpen(false)}>
                <Icon name="x" className="w-4 h-4 text-orange-200/70" />
              </button>
            </div>
            <input
              type="text"
              required
              value={queryForm.name}
              onChange={(e) =>
                setQueryForm({ ...queryForm, name: e.target.value })
              }
              placeholder="Your Name"
              className="w-full bg-black border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
            />
            <textarea
              rows={3}
              required
              value={queryForm.question}
              onChange={(e) =>
                setQueryForm({ ...queryForm, question: e.target.value })
              }
              placeholder="Your question..."
              className="w-full bg-black border border-[#FF5500]/30 rounded-xl p-3 text-xs text-white"
            />
            <button
              type="submit"
              className="w-full bg-emerald-500 text-black font-bold py-2.5 rounded-xl text-xs"
            >
              Open WhatsApp
            </button>
          </form>
        </div>
      )}

      {/* WhatsApp Cancellation Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <form
            onSubmit={handleSendWhatsAppCancellation}
            className="max-w-sm w-full bg-[#160B04] border border-[#FF5500]/40 rounded-2xl p-5 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-white">
                Order Cancellation (Using Pair ID)
              </span>
              <button type="button" onClick={() => setCancelModalOpen(false)}>
                <Icon name="x" className="w-4 h-4 text-orange-200/70" />
              </button>
            </div>
            <p className="text-[11px] text-orange-200/75 leading-relaxed">
              Take the <strong className="text-[#FF5500]">Pair ID</strong> from
              the Inspection Page of the sneaker you ordered and enter it below
              to cancel your order.
            </p>
            <input
              type="text"
              required
              value={cancelForm.name}
              onChange={(e) =>
                setCancelForm({ ...cancelForm, name: e.target.value })
              }
              placeholder="Your Name *"
              className="w-full bg-black border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
            />
            <input
              type="tel"
              required
              value={cancelForm.phone}
              onChange={(e) =>
                setCancelForm({ ...cancelForm, phone: e.target.value })
              }
              placeholder="Phone *"
              className="w-full bg-black border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
            />
            <input
              type="text"
              required
              value={cancelForm.orderId}
              onChange={(e) =>
                setCancelForm({ ...cancelForm, orderId: e.target.value })
              }
              placeholder="Enter Pair ID (e.g. 001) *"
              className="w-full bg-black border border-[#FF5500] rounded-xl px-3 py-2 text-xs text-white font-mono"
            />
            <input
              type="text"
              required
              value={cancelForm.reason}
              onChange={(e) =>
                setCancelForm({ ...cancelForm, reason: e.target.value })
              }
              placeholder="Reason for cancellation *"
              className="w-full bg-black border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
            />
            <button
              type="submit"
              className="w-full bg-rose-600 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Send Pair ID Cancellation on WhatsApp
            </button>
          </form>
        </div>
      )}

      {/* WhatsApp Return / Damaged Pair Exchange Modal */}
      {returnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <form
            onSubmit={handleSendWhatsAppReturn}
            className="max-w-md w-full bg-[#160B04] border border-[#FF5500]/50 rounded-2xl p-5 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-black text-white">
                Return / Exchange Damaged Pair
              </span>
              <button type="button" onClick={() => setReturnModalOpen(false)}>
                <Icon name="x" className="w-4 h-4 text-orange-200/70" />
              </button>
            </div>
            <div className="bg-[#0A0401] border border-[#FF5500]/30 rounded-xl p-3 text-[11px] text-orange-100/85 space-y-1 leading-relaxed">
              <p>
                • <strong className="text-[#FF5500]">Eligible Claims:</strong>{' '}
                Only if the pair arrived severely damaged or not as described
                (PRESETS takes 100% responsibility).
              </p>
              <p>
                • <strong className="text-rose-400">No Sizing Returns:</strong>{' '}
                Returns are not accepted for size issues as exact insole inches
                are provided for every sneaker.
              </p>
              <p>
                • <strong className="text-white">How to Submit:</strong> Copy
                the <strong className="text-[#FF5500]">Pair ID</strong> of the
                pair you ordered from its Inspection Page and send it below.
              </p>
            </div>
            <input
              type="text"
              required
              value={returnForm.name}
              onChange={(e) =>
                setReturnForm({ ...returnForm, name: e.target.value })
              }
              placeholder="Your Full Name *"
              className="w-full bg-black border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
            />
            <input
              type="tel"
              required
              value={returnForm.phone}
              onChange={(e) =>
                setReturnForm({ ...returnForm, phone: e.target.value })
              }
              placeholder="Your WhatsApp Phone *"
              className="w-full bg-black border border-[#FF5500]/30 rounded-xl px-3 py-2 text-xs text-white"
            />
            <input
              type="text"
              required
              value={returnForm.pairId}
              onChange={(e) =>
                setReturnForm({ ...returnForm, pairId: e.target.value })
              }
              placeholder="Pair ID of Ordered Sneaker (e.g. 001) *"
              className="w-full bg-black border border-[#FF5500] rounded-xl px-3 py-2 text-xs text-white font-mono"
            />
            <textarea
              rows={3}
              required
              value={returnForm.damageDetails}
              onChange={(e) =>
                setReturnForm({
                  ...returnForm,
                  damageDetails: e.target.value
                })
              }
              placeholder="Describe the severe damage / how it differs from description *"
              className="w-full bg-black border border-[#FF5500]/30 rounded-xl p-3 text-xs text-white"
            />
            <button
              type="submit"
              className="w-full bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-black py-2.5 rounded-xl text-xs"
            >
              Send Return Request with Pair ID on WhatsApp
            </button>
          </form>
        </div>
      )}

      {/* COD Success Modal */}
      {codSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="max-w-md w-full bg-[#160B04] border border-[#FF5500]/50 rounded-2xl p-6 text-center space-y-4 shadow-[0_0_40px_rgba(255,85,0,0.25)]">
            <Icon name="check" className="w-9 h-9 text-[#FF5500] mx-auto" />
            <h3 className="text-lg font-black text-white">
              COD Order Placed (#{getOrderDisplayNumber(codSuccessModal)})
            </h3>
            <p className="text-xs text-orange-100/85 leading-relaxed">
              {isCodAdvancePolicyActive
                ? `Your COD order is logged! As per our active COD policy, please deposit Rs. ${activeCodDepositAmount} advance into JS Bank (Ali Ammar - 03328559003 | IBAN: ${BANK_IBAN}). Remaining balance on delivery: ${formatPKR(
                    codSuccessModal.totals?.payableOnDelivery
                  )}. Soon our team will contact you with a detailed video of your pair and order confirmation.`
                : `Your COD order is placed with Rs. 0 Advance Required! You will pay the full total of ${formatPKR(
                    codSuccessModal.totals?.finalTotalWithShipping
                  )} in cash upon delivery. Soon our team will contact you with a detailed video of your pair and order confirmation.`}
            </p>
            <div className="pt-1">
              <button
                onClick={() => {
                  setCodSuccessModal(null);
                  setActiveView('home');
                }}
                className="w-full bg-[#FF5500] text-black font-black py-2.5 rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <PresetsStoreApp />
    </AppErrorBoundary>
  );
}