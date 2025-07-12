// routes
export const HOMEPAGE_ROUTE = '/'
export const PORTFOLIO_ROUTE = '/portfolio'
export const PROFILE_ROUTE = '/profile'
export const SETTINGS_ROUTE = '/settings'
export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'
export const MARKET_ROUTE = '/market'
export const TRADE_ROUTE = '/trade'

// money
export const MAX_USD = 1000000;

// time
export const months = [
  { name: "January", number: 1 },
  { name: "February", number: 2 },
  { name: "March", number: 3 },
  { name: "April", number: 4 },
  { name: "May", number: 5 },
  { name: "June", number: 6 },
  { name: "July", number: 7 },
  { name: "August", number: 8 },
  { name: "September", number: 9 },
  { name: "October", number: 10 },
  { name: "November", number: 11 },
  { name: "December", number: 12 },
  ];
  export const days = Array.from({ length: 31 }, (_, i) => i + 1);
  export const years = Array.from({ length: 107 }, (_, i) => 1900 + i)
