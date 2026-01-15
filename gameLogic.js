// Game constants and logic helpers

export const ACTIONS = {
  IDLE: { 
    id: 'idle', 
    label: 'Float in Void', 
    rate: 1, 
    desc: 'Regenerate 1 Gold/Hr',
    color: '#888'
  },
  MINE: { 
    id: 'mine', 
    label: 'Mine Asteroids', 
    rate: 10, 
    desc: 'Earn 10 Gold/Hr',
    color: '#e67e22' 
  },
  RESEARCH: { 
    id: 'research', 
    label: 'Nebula Research', 
    rate: 5, 
    desc: 'Earn 5 Gold + XP',
    color: '#3498db' 
  },
  PARTY: { 
    id: 'party', 
    label: 'Galactic Rave', 
    rate: 20, 
    desc: 'High Energy Cost, High Reward',
    color: '#e91e63' 
  }
};

export const INITIAL_STATE = {
  energy: 24, // Hours of energy
  lastCheckin: Date.now(),
  currentAction: 'idle',
  gold: 0,
  level: 1,
  inventory: [], // Cards, trophies
  xp: 0
};

// Calculate what happened since last login
export function calculateOfflineProgress(userRecord) {
  const now = Date.now();
  const lastCheckin = userRecord.last_checkin ? new Date(userRecord.last_checkin).getTime() : now;
  
  // Time passed in hours (float)
  const diffMs = now - lastCheckin;
  const hoursPassed = diffMs / (1000 * 60 * 60);

  // User has max 24 hours of energy storage capacity for actions
  // But also regens energy at a rate of 24h per 24h (1 per hour)
  // Logic: The time passed consumes energy if active, but checking in restores it.
  
  // Let's simplify: Energy is a tank. You burn it performing actions.
  // You refill it by checking in (Reset to 24 on checkin).
  
  const previousEnergy = userRecord.energy || 24;
  
  // Effective time is the minimum of time passed or energy remaining
  const effectiveHours = Math.min(hoursPassed, previousEnergy);
  
  const actionId = userRecord.current_action || 'idle';
  const action = ACTIONS[actionId.toUpperCase()] || ACTIONS.IDLE;
  
  const goldEarned = Math.floor(effectiveHours * action.rate * 100); // Multiplier for satisfaction
  const xpEarned = Math.floor(effectiveHours * 50);
  
  // Roll for drops based on time passed
  const drops = [];
  // 10% chance per hour to find a card
  const rolls = Math.floor(effectiveHours);
  for(let i=0; i<rolls; i++) {
    if(Math.random() < 0.1) {
      drops.push({ type: 'card', id: `card_${Math.floor(Math.random() * 100)}`, name: 'Space Cat Card' });
    }
  }

  return {
    hoursPassed,
    effectiveHours,
    goldEarned,
    xpEarned,
    drops,
    actionName: action.label,
    remainingEnergy: Math.max(0, previousEnergy - effectiveHours)
  };
}