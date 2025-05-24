// SVG Badge Assets for the Wisebook App
// These are SVG-based achievement and level badges that can be used throughout the app

// Function to generate SVG string for badges
export const generateBadgeSVG = (options) => {
  const {
    color = '#7B4DFF',
    secondaryColor = '#4A148C',
    icon = 'award',
    size = 100,
    progress = 1,
    text = '',
    isLocked = false
  } = options;
  
  // Calculate dimensions
  const radius = size / 2;
  const strokeWidth = size / 20;
  const iconSize = size * 0.4;
  const fontSize = size / 5;
  
  // Define icon paths
  const iconPaths = {
    award: 'M12 15c3 0 6-2 6-6s-3-6-6-6-6 2-6 6 3 6 6 6z M8.59 16.34l3.41 6.66 3.41-6.66C14.59 16.12 13.32 16 12 16s-2.59.12-3.41.34z',
    book: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20',
    map: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z M9 3v15 M15 6v15',
    star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    'check-circle': 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M9 11l3 3L22 4',
    compass: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z',
    brain: 'M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 4.5 17a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2.96-2.44 M14.5 4a2.5 2.5 0 0 0-2.45 2H12A2.5 2.5 0 0 0 9.5 2.04 M4.5 19.94a2.5 2.5 0 0 0 2.45-2H7a2.5 2.5 0 0 0 2.5 2.46 M14.5 4A2.5 2.5 0 0 1 17 6.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1-2.96 2.44 M14.5 22a2.5 2.5 0 0 0 2.45-2H17a2.5 2.5 0 0 0 2.5-2.46 M20 9.5a2.5 2.5 0 0 0-2.45-2H17a2.5 2.5 0 0 0-2.5-2.46',
    users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
  };
  
  // Get the path for the selected icon, defaulting to award if not found
  const iconPath = iconPaths[icon] || iconPaths.award;
  
  // Define the badge SVG
  const circleDasharray = 2 * Math.PI * (radius - strokeWidth / 2);
  const circleDashoffset = circleDasharray * (1 - progress);
  
  // Create the locked overlay if the badge is locked
  const lockedOverlay = isLocked ? `
    <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" fill="rgba(0,0,0,0.7)" />
    <path d="M${size/2-size/6} ${size/2-size/10} v-${size/10} a${size/10} ${size/10} 0 0 1 ${size/3} 0 v${size/10} M${size/2-size/8} ${size/2} h${size/4} v${size/5} h-${size/4} z" 
          fill="none" stroke="white" stroke-width="${strokeWidth/2}" />
    <text x="${size/2}" y="${size/2+size/4}" font-family="sans-serif" font-size="${fontSize}" text-anchor="middle" fill="white">LOCKED</text>
  ` : '';
  
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="100%" stop-color="${secondaryColor}" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <!-- Badge background -->
      <circle cx="${radius}" cy="${radius}" r="${radius - strokeWidth / 2}" fill="url(#badgeGradient)" />
      
      <!-- Progress ring -->
      <circle cx="${radius}" cy="${radius}" r="${radius - strokeWidth / 2}" 
              stroke="rgba(255, 255, 255, 0.3)" 
              stroke-width="${strokeWidth}" 
              fill="none" />
              
      <circle cx="${radius}" cy="${radius}" r="${radius - strokeWidth / 2}" 
              stroke="white" 
              stroke-width="${strokeWidth}" 
              stroke-dasharray="${circleDasharray}" 
              stroke-dashoffset="${circleDashoffset}"
              stroke-linecap="round"
              transform="rotate(-90 ${radius} ${radius})"
              fill="none" 
              filter="url(#glow)" />
      
      <!-- Icon -->
      <g transform="translate(${(size - iconSize) / 2}, ${(size - iconSize) / 2}) scale(${iconSize / 24})">
        <path d="${iconPath}" fill="white" stroke="white" stroke-width="0.5" />
      </g>
      
      <!-- Text -->
      ${text ? `<text x="${size/2}" y="${size-size/8}" font-family="sans-serif" font-size="${fontSize}" text-anchor="middle" fill="white">${text}</text>` : ''}
      
      <!-- Locked overlay -->
      ${lockedOverlay}
      
      <!-- Decorative elements -->
      <circle cx="${size * 0.8}" cy="${size * 0.2}" r="${size * 0.05}" fill="rgba(255, 255, 255, 0.5)" />
      <path d="M${size * 0.1} ${size * 0.75} l${size * 0.08} 0" stroke="rgba(255, 255, 255, 0.5)" stroke-width="${strokeWidth / 2}" />
    </svg>
  `;
};

// Predefined badges for common achievements
export const achievementBadges = {
  // Progress badges
  firstCourse: {
    svg: generateBadgeSVG({ 
      color: '#7B4DFF', 
      secondaryColor: '#4A148C', 
      icon: 'award', 
      text: 'First Course' 
    }),
    title: 'First Steps',
    description: 'Completed your first course'
  },
  
  fiveCourses: {
    svg: generateBadgeSVG({ 
      color: '#7B4DFF', 
      secondaryColor: '#4A148C', 
      icon: 'book', 
      text: '5 Courses' 
    }),
    title: 'Knowledge Seeker',
    description: 'Completed 5 courses'
  },
  
  tenCourses: {
    svg: generateBadgeSVG({ 
      color: '#7B4DFF', 
      secondaryColor: '#4A148C', 
      icon: 'book', 
      text: '10 Courses' 
    }),
    title: 'Wisdom Master',
    description: 'Completed 10 courses'
  },
  
  // Streak badges
  weekStreak: {
    svg: generateBadgeSVG({ 
      color: '#FF9800', 
      secondaryColor: '#F57C00', 
      icon: 'award', 
      text: '7 Days' 
    }),
    title: 'Consistent Learner',
    description: 'Maintained a 7-day streak'
  },
  
  monthStreak: {
    svg: generateBadgeSVG({ 
      color: '#FF9800', 
      secondaryColor: '#F57C00', 
      icon: 'award', 
      text: '30 Days' 
    }),
    title: 'Learning Devotee',
    description: 'Maintained a 30-day streak'
  },
  
  // Path badges
  firstPath: {
    svg: generateBadgeSVG({ 
      color: '#2196F3', 
      secondaryColor: '#1976D2', 
      icon: 'map', 
      text: 'First Path' 
    }),
    title: 'Path Pioneer',
    description: 'Completed your first learning path'
  },
  
  threePaths: {
    svg: generateBadgeSVG({ 
      color: '#2196F3', 
      secondaryColor: '#1976D2', 
      icon: 'map', 
      text: '3 Paths' 
    }),
    title: 'Path Master',
    description: 'Completed 3 learning paths'
  },
  
  // Community badges
  communityContributor: {
    svg: generateBadgeSVG({ 
      color: '#4CAF50', 
      secondaryColor: '#388E3C', 
      icon: 'users', 
      text: 'Contributor' 
    }),
    title: 'Community Contributor',
    description: 'Made 5 helpful posts in the community'
  },
  
  thoughtLeader: {
    svg: generateBadgeSVG({ 
      color: '#4CAF50', 
      secondaryColor: '#388E3C', 
      icon: 'users', 
      text: 'Leader' 
    }),
    title: 'Thought Leader',
    description: 'Received 50 likes on your community posts'
  },
  
  // Locked badge example
  lockedBadge: {
    svg: generateBadgeSVG({ 
      color: '#9E9E9E', 
      secondaryColor: '#616161', 
      icon: 'star', 
      isLocked: true 
    }),
    title: 'Locked Badge',
    description: 'Complete the required tasks to unlock'
  }
};

// Level badges
export const levelBadges = {
  beginner: generateBadgeSVG({ 
    color: '#2196F3', 
    secondaryColor: '#1976D2', 
    icon: 'star', 
    text: 'Level 1-5' 
  }),
  
  intermediate: generateBadgeSVG({ 
    color: '#7B4DFF', 
    secondaryColor: '#4A148C', 
    icon: 'star', 
    text: 'Level 6-15' 
  }),
  
  advanced: generateBadgeSVG({ 
    color: '#FF9800', 
    secondaryColor: '#F57C00', 
    icon: 'star', 
    text: 'Level 16-25' 
  }),
  
  expert: generateBadgeSVG({ 
    color: '#F44336', 
    secondaryColor: '#D32F2F', 
    icon: 'star', 
    text: 'Level 26+' 
  })
};

// Helper function to get a level badge based on user level
export const getLevelBadge = (level) => {
  if (level < 6) return levelBadges.beginner;
  if (level < 16) return levelBadges.intermediate;
  if (level < 26) return levelBadges.advanced;
  return levelBadges.expert;
};

// Generate a custom badge with progress
export const getProgressBadge = (icon, progress, text) => {
  return generateBadgeSVG({
    color: '#7B4DFF',
    secondaryColor: '#4A148C',
    icon,
    progress,
    text
  });
};
