export const calculateCarbon = (energy, ppaType) => {
  const factors = {
    coal: 0.82,
    solar: 0.05,
    wind: 0.02,
    hydro: 0.03,
  };

  return energy * factors[ppaType];
};