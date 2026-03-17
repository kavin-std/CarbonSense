export const industryMachineryTemplates = {
  'Automotive': [
    { id: 'm1', name: 'CNC Machine (Drilling)', powerKW: 15, dailyHours: 16, note: 'Indirect emissions via electricity usage' },
    { id: 'm2', name: 'CNC Machine (Milling)', powerKW: 20, dailyHours: 16, note: 'Indirect emissions via electricity usage' },
    { id: 'm3', name: 'CNC Machine (Grinding)', powerKW: 12, dailyHours: 16, note: 'Indirect emissions via electricity usage' },
    { id: 'm4', name: 'Hydraulic Press', powerKW: 45, dailyHours: 8, note: 'Indirect emissions via electricity usage' },
    { id: 'm5', name: 'Injection Molding Machine', powerKW: 30, dailyHours: 24, note: 'High energy continuous operation' },
    { id: 'm6', name: 'Welding Machine', powerKW: 10, dailyHours: 12, note: 'Indirect emissions via electricity usage' },
    { id: 'm7', name: 'Assembly Line Motor', powerKW: 5, dailyHours: 24, note: 'Continuous operation' },
    { id: 'm8', name: 'Paint Booth System', powerKW: 25, dailyHours: 16, note: 'Includes ventilation and heating' },
  ],
  'Textile': [
    { id: 'm1', name: 'Spinning Machine', powerKW: 22, dailyHours: 24, note: 'Continuous operation' },
    { id: 'm2', name: 'Weaving Loom', powerKW: 15, dailyHours: 24, note: 'Continuous operation' },
    { id: 'm3', name: 'Dyeing Machine', powerKW: 40, dailyHours: 16, note: 'High thermal energy requirement' },
    { id: 'm4', name: 'Knitting Machine', powerKW: 10, dailyHours: 24, note: 'Continuous operation' },
    { id: 'm5', name: 'Sewing Machine Array', powerKW: 5, dailyHours: 12, note: 'Indirect emissions via electricity usage' },
    { id: 'm6', name: 'Drying Machine', powerKW: 50, dailyHours: 16, note: 'High thermal energy requirement' },
  ],
  'Food Processing': [
    { id: 'm1', name: 'Industrial Oven', powerKW: 60, dailyHours: 16, note: 'High thermal energy requirement' },
    { id: 'm2', name: 'Industrial Mixer', powerKW: 15, dailyHours: 12, note: 'Indirect emissions via electricity usage' },
    { id: 'm3', name: 'Packaging Machine', powerKW: 8, dailyHours: 16, note: 'Indirect emissions via electricity usage' },
    { id: 'm4', name: 'Refrigeration Unit', powerKW: 35, dailyHours: 24, note: 'Continuous high energy usage' },
    { id: 'm5', name: 'Conveyor Belt System', powerKW: 5, dailyHours: 24, note: 'Continuous operation' },
  ],
  'Electronics': [
    { id: 'm1', name: 'Pick and Place Machine', powerKW: 8, dailyHours: 20, note: 'Precision equipment' },
    { id: 'm2', name: 'Reflow Oven', powerKW: 25, dailyHours: 20, note: 'High thermal energy requirement' },
    { id: 'm3', name: 'Wave Soldering Machine', powerKW: 20, dailyHours: 16, note: 'Thermal energy requirement' },
    { id: 'm4', name: 'Automated Optical Inspection', powerKW: 3, dailyHours: 20, note: 'Low energy usage' },
    { id: 'm5', name: 'Testing Rig', powerKW: 5, dailyHours: 24, note: 'Continuous operation' },
  ],
  'Steel': [
    { id: 'm1', name: 'Electric Arc Furnace', powerKW: 15000, dailyHours: 24, note: 'Extremely high energy consumption' },
    { id: 'm2', name: 'Rolling Mill', powerKW: 5000, dailyHours: 24, note: 'High mechanical energy' },
    { id: 'm3', name: 'Continuous Caster', powerKW: 1000, dailyHours: 24, note: 'Continuous operation' },
    { id: 'm4', name: 'Blast Furnace', powerKW: 8000, dailyHours: 24, note: 'High thermal and chemical energy' },
    { id: 'm5', name: 'Sinter Plant', powerKW: 3000, dailyHours: 24, note: 'Material preparation' },
  ]
};

export const emissionFactors = {
  'Coal Power Plant': 0.95, // kg CO2 per kWh
  'Solar Plant': 0.05,
  'Wind Farm': 0.02,
  'Hydro Plant': 0.03,
  'Grid (Default)': 0.45,
};

export const initialFactories = [
  {
    id: 'f1',
    ownerEmail: 'owner1@example.com',
    name: 'Alpha Auto Works',
    location: 'Detroit, MI',
    type: 'Automotive',
    hasPPA: true,
    ppaSource: 'Solar Plant',
    machines: industryMachineryTemplates['Automotive'].map(m => ({...m, id: `f1-${m.id}`}))
  },
  {
    id: 'f2',
    ownerEmail: 'owner2@example.com',
    name: 'Beta Textiles',
    location: 'Los Angeles, CA',
    type: 'Textile',
    hasPPA: false,
    ppaSource: null,
    machines: industryMachineryTemplates['Textile'].map(m => ({...m, id: `f2-${m.id}`}))
  },
  {
    id: 'f3',
    ownerEmail: 'owner3@example.com',
    name: 'Gamma Foods',
    location: 'Chicago, IL',
    type: 'Food Processing',
    hasPPA: true,
    ppaSource: 'Wind Farm',
    machines: industryMachineryTemplates['Food Processing'].map(m => ({...m, id: `f3-${m.id}`}))
  }
];

// Helper to generate historical data based on current metrics
export const generateHistoricalData = (dailyEnergy, dailyEmissions) => {
  const energyHistory = [];
  const carbonHistory = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  // Add some random variance (±10%)
  days.forEach(day => {
    const variance = 0.9 + (Math.random() * 0.2);
    energyHistory.push({ day, energy: Math.round(dailyEnergy * variance) });
  });

  months.forEach(month => {
    const variance = 0.9 + (Math.random() * 0.2);
    // Monthly is roughly 30 days
    carbonHistory.push({ month, emissions: Math.round(dailyEmissions * 30 * variance) });
  });

  return { energyHistory, carbonHistory };
};
