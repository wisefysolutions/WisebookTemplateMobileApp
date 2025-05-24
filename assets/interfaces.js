// SVG Interface Elements for the Wisebook App
// These are SVG-based UI elements for the futuristic interface

// Function to generate SVG string for HUD elements
export const generateHudSVG = (options) => {
  const {
    width = 100,
    height = 100,
    color = '#7B4DFF',
    glowColor = 'rgba(123, 77, 255, 0.5)',
    strokeWidth = 2,
    type = 'corner'
  } = options;
  
  // Define different HUD element types
  const hudElements = {
    // Corner element (for containers)
    corner: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path d="M${width * 0.2} ${strokeWidth} L${strokeWidth} ${strokeWidth} L${strokeWidth} ${height * 0.2}" 
              stroke="${color}" stroke-width="${strokeWidth}" fill="none" filter="url(#glow)" />
        <circle cx="${width * 0.1}" cy="${height * 0.1}" r="${strokeWidth}" fill="${color}" />
      </svg>
    `,
    
    // Header bar
    header: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.2" />
            <stop offset="50%" stop-color="${color}" stop-opacity="0.1" />
            <stop offset="100%" stop-color="${color}" stop-opacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect x="0" y="0" width="${width}" height="${height}" fill="url(#headerGradient)" />
        <path d="M${strokeWidth} ${height/2} L${width * 0.1} ${height/2} M${width * 0.15} ${height/2} L${width * 0.2} ${height/2}" 
              stroke="${color}" stroke-width="${strokeWidth}" filter="url(#glow)" />
        <path d="M${width - strokeWidth} ${height/2} L${width * 0.9} ${height/2} M${width * 0.85} ${height/2} L${width * 0.8} ${height/2}" 
              stroke="${color}" stroke-width="${strokeWidth}" filter="url(#glow)" />
      </svg>
    `,
    
    // Button background
    button: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${color}" />
            <stop offset="100%" stop-color="${glowColor}" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect x="${strokeWidth}" y="${strokeWidth}" width="${width - 2 * strokeWidth}" height="${height - 2 * strokeWidth}" 
              rx="${height / 2}" fill="url(#buttonGradient)" />
        <path d="M${width * 0.8} ${height * 0.8} L${width * 0.9} ${height * 0.8} M${width * 0.75} ${height * 0.9} L${width * 0.75} ${height * 0.85}" 
              stroke="white" stroke-width="${strokeWidth}" stroke-opacity="0.6" />
      </svg>
    `,
    
    // Card background
    card: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.1" />
            <stop offset="100%" stop-color="${color}" stop-opacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect x="${strokeWidth}" y="${strokeWidth}" width="${width - 2 * strokeWidth}" height="${height - 2 * strokeWidth}" 
              rx="10" fill="url(#cardGradient)" stroke="${color}" stroke-width="${strokeWidth}" />
        <path d="M${width * 0.1} ${height * 0.1} L${width * 0.2} ${height * 0.1}" 
              stroke="${color}" stroke-width="${strokeWidth}" filter="url(#glow)" />
        <path d="M${width * 0.9} ${height * 0.9} L${width * 0.8} ${height * 0.9} M${width * 0.9} ${height * 0.85} L${width * 0.9} ${height * 0.8}" 
              stroke="${color}" stroke-width="${strokeWidth}" filter="url(#glow)" />
      </svg>
    `,
    
    // Decorative element
    decoration: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path d="M${width * 0.1} ${height * 0.5} L${width * 0.9} ${height * 0.5}" 
              stroke="${color}" stroke-width="${strokeWidth}" stroke-dasharray="${width * 0.05}, ${width * 0.025}" />
        <circle cx="${width * 0.9}" cy="${height * 0.5}" r="${strokeWidth * 2}" fill="${color}" filter="url(#glow)" />
        <circle cx="${width * 0.1}" cy="${height * 0.5}" r="${strokeWidth * 2}" fill="${color}" filter="url(#glow)" />
      </svg>
    `,
    
    // Progress bar
    progress: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${color}" />
            <stop offset="100%" stop-color="${glowColor}" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect x="${strokeWidth}" y="${height/2 - height*0.15}" width="${width - 2 * strokeWidth}" height="${height * 0.3}" 
              rx="${height * 0.15}" fill="rgba(255,255,255,0.1)" />
        <rect x="${strokeWidth}" y="${height/2 - height*0.15}" width="${(width - 2 * strokeWidth) * 0.6}" height="${height * 0.3}" 
              rx="${height * 0.15}" fill="url(#progressGradient)" filter="url(#glow)" />
        <circle cx="${(width - 2 * strokeWidth) * 0.6 + strokeWidth}" cy="${height/2}" r="${height * 0.2}" 
                fill="${color}" filter="url(#glow)" />
      </svg>
    `,
    
    // Scanner effect
    scanner: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="scannerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${color}" stop-opacity="0" />
            <stop offset="50%" stop-color="${color}" stop-opacity="0.5" />
            <stop offset="100%" stop-color="${color}" stop-opacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${width}" height="${height}" fill="none" />
        <rect x="0" y="${height * 0.4}" width="${width}" height="${height * 0.2}" fill="url(#scannerGradient)">
          <animate attributeName="y" from="${-height * 0.2}" to="${height}" dur="2s" repeatCount="indefinite" />
        </rect>
        <line x1="0" y1="${height * 0.5}" x2="${width}" y2="${height * 0.5}" stroke="${color}" stroke-width="${strokeWidth}">
          <animate attributeName="y1" from="${-height * 0.2 + height * 0.5}" to="${height + height * 0.5}" dur="2s" repeatCount="indefinite" />
          <animate attributeName="y2" from="${-height * 0.2 + height * 0.5}" to="${height + height * 0.5}" dur="2s" repeatCount="indefinite" />
        </line>
      </svg>
    `,
    
    // Circle indicator
    circleIndicator: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)/2 - strokeWidth*2}" 
                stroke="${color}" stroke-width="${strokeWidth}" fill="none" />
        <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)/2 - strokeWidth*2}" 
                stroke="${color}" stroke-width="${strokeWidth}" fill="none" 
                stroke-dasharray="${2 * Math.PI * (Math.min(width, height)/2 - strokeWidth*2)}" 
                stroke-dashoffset="${2 * Math.PI * (Math.min(width, height)/2 - strokeWidth*2) * 0.25}"
                filter="url(#glow)" />
        <circle cx="${width/2}" cy="${height/2}" r="${strokeWidth*2}" fill="${color}" filter="url(#glow)" />
      </svg>
    `
  };
  
  // Return the requested HUD element
  return hudElements[type] || hudElements.corner;
};

// Predefined interface elements
export const interfaceElements = {
  // Corner elements for containers
  topLeftCorner: generateHudSVG({ 
    width: 40, 
    height: 40, 
    type: 'corner' 
  }),
  
  topRightCorner: generateHudSVG({ 
    width: 40, 
    height: 40, 
    type: 'corner' 
  }),
  
  bottomLeftCorner: generateHudSVG({ 
    width: 40, 
    height: 40, 
    type: 'corner' 
  }),
  
  bottomRightCorner: generateHudSVG({ 
    width: 40, 
    height: 40, 
    type: 'corner' 
  }),
  
  // Header bar
  headerBar: generateHudSVG({ 
    width: 300, 
    height: 40, 
    type: 'header' 
  }),
  
  // Button background
  buttonBackground: generateHudSVG({ 
    width: 200, 
    height: 50, 
    type: 'button' 
  }),
  
  // Card background
  cardBackground: generateHudSVG({ 
    width: 300, 
    height: 200, 
    type: 'card' 
  }),
  
  // Decorative element
  decorationLine: generateHudSVG({ 
    width: 100, 
    height: 20, 
    type: 'decoration' 
  }),
  
  // Progress bar
  progressBar: generateHudSVG({ 
    width: 200, 
    height: 40, 
    type: 'progress' 
  }),
  
  // Scanner effect
  scannerEffect: generateHudSVG({ 
    width: 300, 
    height: 300, 
    type: 'scanner' 
  }),
  
  // Circle indicator
  circleIndicator: generateHudSVG({ 
    width: 100, 
    height: 100, 
    type: 'circleIndicator' 
  })
};

// Generate loading animation SVG
export const generateLoadingSpinner = (color = '#7B4DFF', size = 100) => {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.5)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 5}" 
              stroke="rgba(255,255,255,0.1)" 
              stroke-width="4" 
              fill="none" />
              
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 5}" 
              stroke="url(#spinnerGradient)" 
              stroke-width="4" 
              stroke-linecap="round"
              stroke-dasharray="${Math.PI * (size - 10)}" 
              stroke-dashoffset="${Math.PI * (size - 10) * 0.75}"
              fill="none" 
              filter="url(#glow)">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="0 ${size/2} ${size/2}" 
          to="360 ${size/2} ${size/2}" 
          dur="1.5s" 
          repeatCount="indefinite" />
      </circle>
      
      <!-- Decorative elements -->
      <circle cx="${size/2}" cy="${size/2}" r="${size/10}"
              fill="${color}"
              filter="url(#glow)">
        <animate 
          attributeName="opacity" 
          values="0.3;1;0.3" 
          dur="1.5s" 
          repeatCount="indefinite" />
      </circle>
      
      <path d="M${size*0.2} ${size*0.5} L${size*0.3} ${size*0.5}" 
            stroke="${color}" 
            stroke-width="2" 
            filter="url(#glow)">
        <animate 
          attributeName="opacity" 
          values="1;0.3;1" 
          dur="1.5s" 
          repeatCount="indefinite" />
      </path>
      
      <path d="M${size*0.7} ${size*0.5} L${size*0.8} ${size*0.5}" 
            stroke="${color}" 
            stroke-width="2" 
            filter="url(#glow)">
        <animate 
          attributeName="opacity" 
          values="0.3;1;0.3" 
          dur="1.5s" 
          repeatCount="indefinite" />
      </path>
    </svg>
  `;
};

// Generate HUD frame for containers
export const generateHudFrame = (width = 300, height = 200, color = '#7B4DFF', strokeWidth = 2) => {
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <!-- Top-left corner -->
      <path d="M${width * 0.15} ${strokeWidth} L${strokeWidth} ${strokeWidth} L${strokeWidth} ${height * 0.15}" 
            stroke="${color}" stroke-width="${strokeWidth}" fill="none" filter="url(#glow)" />
      
      <!-- Top-right corner -->
      <path d="M${width - width * 0.15} ${strokeWidth} L${width - strokeWidth} ${strokeWidth} L${width - strokeWidth} ${height * 0.15}" 
            stroke="${color}" stroke-width="${strokeWidth}" fill="none" filter="url(#glow)" />
      
      <!-- Bottom-left corner -->
      <path d="M${strokeWidth} ${height - height * 0.15} L${strokeWidth} ${height - strokeWidth} L${width * 0.15} ${height - strokeWidth}" 
            stroke="${color}" stroke-width="${strokeWidth}" fill="none" filter="url(#glow)" />
      
      <!-- Bottom-right corner -->
      <path d="M${width - strokeWidth} ${height - height * 0.15} L${width - strokeWidth} ${height - strokeWidth} L${width - width * 0.15} ${height - strokeWidth}" 
            stroke="${color}" stroke-width="${strokeWidth}" fill="none" filter="url(#glow)" />
      
      <!-- Decorative dots at corners -->
      <circle cx="${width * 0.05}" cy="${height * 0.05}" r="${strokeWidth}" fill="${color}" />
      <circle cx="${width * 0.95}" cy="${height * 0.05}" r="${strokeWidth}" fill="${color}" />
      <circle cx="${width * 0.05}" cy="${height * 0.95}" r="${strokeWidth}" fill="${color}" />
      <circle cx="${width * 0.95}" cy="${height * 0.95}" r="${strokeWidth}" fill="${color}" />
    </svg>
  `;
};

// Generate decorative hexagon pattern background
export const generateHexagonPattern = (width = 300, height = 200, color = '#7B4DFF', opacity = 0.1) => {
  const hexSize = 30;
  const hexagons = [];
  
  for (let row = 0; row < Math.ceil(height / (hexSize * 1.5)); row++) {
    for (let col = 0; col < Math.ceil(width / (hexSize * Math.sqrt(3))); col++) {
      const x = col * hexSize * Math.sqrt(3) + (row % 2 === 0 ? 0 : hexSize * Math.sqrt(3) / 2);
      const y = row * hexSize * 1.5;
      
      if (x < width && y < height) {
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
          const angle = (60 * i - 30) * Math.PI / 180;
          hexPoints.push(`${x + hexSize * Math.cos(angle)},${y + hexSize * Math.sin(angle)}`);
        }
        
        hexagons.push(`<polygon points="${hexPoints.join(' ')}" fill="${color}" fill-opacity="${opacity}" stroke="${color}" stroke-opacity="${opacity * 2}" stroke-width="1" />`);
      }
    }
  }
  
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${hexagons.join('\n')}
    </svg>
  `;
};
