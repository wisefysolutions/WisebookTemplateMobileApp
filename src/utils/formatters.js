// Format a date to display in a readable format
export const formatDate = (date) => {
  if (!date) return '';
  
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Format a time to display in a readable format
export const formatTime = (date) => {
  if (!date) return '';
  
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleTimeString(undefined, options);
};

// Format a duration from minutes to a readable format
export const formatDuration = (minutes) => {
  if (!minutes || isNaN(minutes)) return '0 min';
  
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }
  
  return `${hours} hr${hours > 1 ? 's' : ''} ${remainingMinutes} min`;
};

// Format a number to include commas for thousands
export const formatNumber = (number) => {
  if (number === undefined || number === null) return '0';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format a percentage
export const formatPercentage = (value, decimals = 0) => {
  if (value === undefined || value === null) return '0%';
  return `${(value * 100).toFixed(decimals)}%`;
};

// Format a file size in bytes to a readable format
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format a timestamp to a relative time (e.g., "2 hours ago")
export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return '';
  
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) {
    return 'just now';
  }
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}d ago`;
  }
  
  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks}w ago`;
  }
  
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}mo ago`;
  }
  
  const years = Math.floor(days / 365);
  return `${years}y ago`;
};

// Format a name to get initials
export const getInitials = (name) => {
  if (!name) return '';
  
  const names = name.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

// Format a name to title case
export const toTitleCase = (str) => {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Format a string to truncate with ellipsis if too long
export const truncate = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  
  return str.slice(0, length) + '...';
};

// Format a level to display with proper ordinal suffix
export const formatLevel = (level) => {
  if (!level) return '1st Level';
  
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = level % 100;
  const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  
  return `${level}${suffix} Level`;
};

// Format XP with abbreviations for large numbers
export const formatXP = (xp) => {
  if (xp < 1000) return `${xp} XP`;
  if (xp < 1000000) return `${(xp / 1000).toFixed(1)}K XP`;
  return `${(xp / 1000000).toFixed(1)}M XP`;
};

// Format a phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

// Format an email address to partially mask it
export const maskEmail = (email) => {
  if (!email) return '';
  
  const [username, domain] = email.split('@');
  if (!domain) return email;
  
  const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
  return `${maskedUsername}@${domain}`;
};
