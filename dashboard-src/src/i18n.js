// All user-facing strings for both locales, plus locale-aware formatters.
// Language and currency are independent: a French reader may want USD prices.

export const LOCALES = { en: 'en-CA', fr: 'fr-CA' };

export const STRINGS = {
  en: {
    appTitle: 'Canadian Food Price Dashboard',
    appSubtitle:
      'Explore how retail food prices in Canada evolved between 2021 and 2025, and compare products for any given month.',
    syntheticNotice:
      'Synthetic dataset generated with AI, modeled on Statistics Canada food-price trends. These are not real measurements.',
    language: 'Language',
    currency: 'Currency',
    trendTitle: 'Price evolution over time',
    trendDesc:
      'Monthly average retail price of the selected product. Add a second product to compare their trajectories.',
    compareTitle: 'Product comparison for one month',
    compareDesc:
      'Average retail price of all eight products in the selected month, sorted from most to least expensive.',
    product: 'Product',
    compareWith: 'Compare with',
    none: 'None',
    from: 'From',
    to: 'To',
    month: 'Month',
    year: 'Year',
    kpiBasket: 'Basket of 8 products',
    kpiBasketHint: 'total price, {month}',
    kpiChange: '12-month basket change',
    kpiChangeHint: '{month} vs. one year earlier',
    kpiRiser: 'Fastest-rising product',
    kpiRiserHint: '12-month price change, {month}',
    perUnit: { kg: 'per kg', '4L': 'per 4 L', dozen: 'per dozen', '675g': 'per 675 g loaf' },
    products: {
      tomatoes: 'Tomatoes',
      potatoes: 'Potatoes',
      bananas: 'Bananas',
      chicken: 'Chicken breast',
      beef: 'Ground beef',
      milk: 'Milk (4 L)',
      eggs: 'Eggs (dozen)',
      bread: 'Bread (675 g)',
    },
    footerCourse: 'SEG3525 — Devoir 5 · Designed and built by Mahdi Hassoun',
    footerSource:
      'Synthetic data inspired by Statistics Canada, “Monthly average retail prices for selected products”.',
    backToPortfolio: '← Back to portfolio',
  },
  fr: {
    appTitle: 'Tableau de bord des prix alimentaires canadiens',
    appSubtitle:
      'Explorez l’évolution des prix de détail des aliments au Canada entre 2021 et 2025, et comparez les produits pour un mois donné.',
    syntheticNotice:
      'Données synthétiques générées par IA, modelées sur les tendances des prix alimentaires de Statistique Canada. Ce ne sont pas des mesures réelles.',
    language: 'Langue',
    currency: 'Devise',
    trendTitle: 'Évolution du prix dans le temps',
    trendDesc:
      'Prix de détail moyen mensuel du produit sélectionné. Ajoutez un deuxième produit pour comparer leurs trajectoires.',
    compareTitle: 'Comparaison des produits pour un mois',
    compareDesc:
      'Prix de détail moyen des huit produits pour le mois sélectionné, triés du plus cher au moins cher.',
    product: 'Produit',
    compareWith: 'Comparer avec',
    none: 'Aucun',
    from: 'De',
    to: 'À',
    month: 'Mois',
    year: 'Année',
    kpiBasket: 'Panier de 8 produits',
    kpiBasketHint: 'prix total, {month}',
    kpiChange: 'Variation du panier sur 12 mois',
    kpiChangeHint: '{month} c. un an plus tôt',
    kpiRiser: 'Produit en plus forte hausse',
    kpiRiserHint: 'variation du prix sur 12 mois, {month}',
    perUnit: { kg: 'par kg', '4L': 'par 4 L', dozen: 'par douzaine', '675g': 'par pain de 675 g' },
    products: {
      tomatoes: 'Tomates',
      potatoes: 'Pommes de terre',
      bananas: 'Bananes',
      chicken: 'Poitrine de poulet',
      beef: 'Bœuf haché',
      milk: 'Lait (4 L)',
      eggs: 'Œufs (douzaine)',
      bread: 'Pain (675 g)',
    },
    footerCourse: 'SEG3525 — Devoir 5 · Conçu et réalisé par Mahdi Hassoun',
    footerSource:
      'Données synthétiques inspirées de Statistique Canada, « Prix de détail moyens mensuels pour certains produits ».',
    backToPortfolio: '← Retour au portfolio',
  },
};

export function makeFormatters(lang, currency) {
  const locale = LOCALES[lang];
  const money = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const moneyShort = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const percent = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: 'exceptZero',
  });
  const monthLong = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const monthShort = new Intl.DateTimeFormat(locale, { month: 'short', year: '2-digit' });
  const monthOnly = new Intl.DateTimeFormat(locale, { month: 'long' });
  return { money, moneyShort, percent, monthLong, monthShort, monthOnly };
}
