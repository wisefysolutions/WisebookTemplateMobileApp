import { mockContents, mockPaths, mockUserStats, mockAchievements, mockCommunityPosts, mockTopUsers, mockEvents } from '../data/mockData';

// Simulated API delay
const apiDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch content for the library
export const fetchLibraryContent = async () => {
  try {
    await apiDelay();
    return mockContents;
  } catch (error) {
    console.error('Error fetching library content:', error);
    throw error;
  }
};

// Fetch details for a specific content item
export const fetchContentDetails = async (contentId) => {
  try {
    await apiDelay();
    const content = mockContents.find(c => c.id === contentId);
    
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }
    
    // Return content with additional details
    return {
      ...content,
      fullDetails: true,
      modules: content.type === 'course' ? generateModules(contentId, 5) : null,
      learningPoints: [
        'Master key concepts and practical applications',
        'Develop critical thinking and problem-solving skills',
        'Apply knowledge in real-world scenarios',
        'Gain insights from industry experts'
      ],
      author: {
        name: 'Dr. Alex Johnson',
        bio: 'Leading expert in this field with over 15 years of experience in research and education.'
      }
    };
  } catch (error) {
    console.error('Error fetching content details:', error);
    throw error;
  }
};

// Fetch recent content for home screen
export const fetchRecentContent = async () => {
  try {
    await apiDelay();
    return mockContents.slice(0, 5);
  } catch (error) {
    console.error('Error fetching recent content:', error);
    throw error;
  }
};

// Fetch content that user has started but not completed
export const fetchContinueLearning = async (userId) => {
  try {
    await apiDelay();
    return mockContents
      .filter(content => Math.random() > 0.7) // Simulate some content being in progress
      .slice(0, 3)
      .map(content => ({
        ...content,
        progress: Math.random() * 0.9 // Random progress between 0 and 90%
      }));
  } catch (error) {
    console.error('Error fetching continue learning content:', error);
    throw error;
  }
};

// Update progress for a specific content
export const markContentProgress = async (contentId, userId, progress) => {
  try {
    await apiDelay();
    return { success: true, contentId, userId, progress };
  } catch (error) {
    console.error('Error updating content progress:', error);
    throw error;
  }
};

// Fetch all learning paths
export const fetchLearningPaths = async () => {
  try {
    await apiDelay();
    return mockPaths;
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    throw error;
  }
};

// Fetch paths that the user is enrolled in
export const fetchEnrolledPaths = async (userId) => {
  try {
    await apiDelay();
    return mockPaths
      .filter(path => Math.random() > 0.6) // Simulate some paths being enrolled
      .slice(0, 2)
      .map(path => ({
        ...path,
        enrolled: true,
        progress: Math.random(),
        completedCheckpoints: Math.floor(Math.random() * path.totalCheckpoints),
        xpEarned: Math.floor(Math.random() * path.totalXP)
      }));
  } catch (error) {
    console.error('Error fetching enrolled paths:', error);
    throw error;
  }
};

// Fetch details for a specific path
export const fetchPathDetails = async (pathId) => {
  try {
    await apiDelay();
    const path = mockPaths.find(p => p.id === pathId);
    
    if (!path) {
      throw new Error(`Path with ID ${pathId} not found`);
    }
    
    // Generate checkpoints for the path
    const checkpoints = Array(path.totalCheckpoints).fill(0).map((_, index) => ({
      id: `checkpoint-${pathId}-${index}`,
      title: `Checkpoint ${index + 1}: ${getCheckpointTitle(index)}`,
      description: 'This checkpoint covers essential concepts and practical applications to enhance your understanding.',
      xp: Math.floor(Math.random() * 30) + 10,
      completed: index < 2, // First two checkpoints are completed
      type: index % 2 === 0 ? 'content' : 'quiz',
      contentType: ['video', 'book', 'course'][Math.floor(Math.random() * 3)],
      duration: `${Math.floor(Math.random() * 30) + 10} min`,
      questions: index % 2 === 0 ? null : Math.floor(Math.random() * 10) + 5,
      contentId: mockContents[Math.floor(Math.random() * mockContents.length)].id
    }));
    
    // Return path with additional details
    return {
      ...path,
      fullDetails: true,
      checkpoints,
      enrolled: Math.random() > 0.5,
      progress: 0.2,
      completedCheckpoints: 2,
      skills: [
        'Critical Thinking',
        'Problem Solving',
        'Data Analysis',
        'Communication',
        'Technical Proficiency'
      ],
      achievements: [
        {
          id: 'path-beginner',
          title: 'Path Beginner',
          icon: 'award',
          xp: 50,
          unlocked: true
        },
        {
          id: 'path-intermediate',
          title: 'Path Intermediate',
          icon: 'award',
          xp: 100,
          unlocked: false
        },
        {
          id: 'path-expert',
          title: 'Path Expert',
          icon: 'award',
          xp: 150,
          unlocked: false
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching path details:', error);
    throw error;
  }
};

// Enroll a user in a path
export const enrollInPath = async (pathId, userId) => {
  try {
    await apiDelay();
    return { success: true, pathId, userId };
  } catch (error) {
    console.error('Error enrolling in path:', error);
    throw error;
  }
};

// Fetch user statistics
export const fetchUserStats = async (userId) => {
  try {
    await apiDelay();
    return mockUserStats;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

// Fetch user achievements
export const fetchUserAchievements = async (userId) => {
  try {
    await apiDelay();
    return mockAchievements;
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    throw error;
  }
};

// Fetch community posts
export const fetchCommunityPosts = async () => {
  try {
    await apiDelay();
    return mockCommunityPosts;
  } catch (error) {
    console.error('Error fetching community posts:', error);
    throw error;
  }
};

// Create a new community post
export const createPost = async (postData) => {
  try {
    await apiDelay();
    return {
      id: `post-${Date.now()}`,
      ...postData,
      likes: 0,
      comments: [],
      user: {
        name: 'You',
        level: 5
      }
    };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Fetch top users for community leaderboard
export const fetchTopUsers = async () => {
  try {
    await apiDelay();
    return mockTopUsers;
  } catch (error) {
    console.error('Error fetching top users:', error);
    throw error;
  }
};

// Fetch upcoming events for calendar
export const getUpcomingEvents = async (userId, date) => {
  try {
    await apiDelay();
    const selectedDate = new Date(date);
    // Filter events for the selected date
    return mockEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === selectedDate.getDate() &&
             eventDate.getMonth() === selectedDate.getMonth() &&
             eventDate.getFullYear() === selectedDate.getFullYear();
    });
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
};

// Helper function to generate modules for a course
const generateModules = (contentId, count) => {
  return Array(count).fill(0).map((_, index) => ({
    id: `module-${contentId}-${index}`,
    title: `Module ${index + 1}: ${getModuleTitle(index)}`,
    description: 'Learn essential concepts and practical applications through interactive lessons.',
    duration: `${Math.floor(Math.random() * 30) + 10} min`,
    completed: index < 2, // First two modules are completed
    locked: index > 2, // Modules after the third are locked
    xp: Math.floor(Math.random() * 20) + 10
  }));
};

// Helper function to generate module titles
const getModuleTitle = (index) => {
  const titles = [
    'Introduction to Fundamentals',
    'Core Concepts and Principles',
    'Advanced Techniques',
    'Practical Applications',
    'Case Studies and Examples',
    'Future Trends and Innovations'
  ];
  return titles[index % titles.length];
};

// Helper function to generate checkpoint titles
const getCheckpointTitle = (index) => {
  const titles = [
    'Understanding the Basics',
    'Applying Core Principles',
    'Mastering Advanced Concepts',
    'Analyzing Real-world Scenarios',
    'Building Your Portfolio',
    'Final Assessment'
  ];
  return titles[index % titles.length];
};
