// Mock data for the Wisebook app
// This file contains sample data for development and testing purposes

// Mock content items for the library
export const mockContents = [
  {
    id: 'content-1',
    title: 'Introduction to Artificial Intelligence',
    description: 'Learn the fundamental concepts of AI, from basic algorithms to advanced neural networks.',
    type: 'course',
    duration: '4 hours',
    level: 'Beginner',
    rating: 4.8,
    progress: 0.3,
    xp: 120,
    author: {
      name: 'Dr. Alex Morgan',
      bio: 'AI researcher with 10+ years of experience at leading tech companies.'
    },
    topics: ['AI', 'Machine Learning', 'Neural Networks']
  },
  {
    id: 'content-2',
    title: 'The Future of Quantum Computing',
    description: 'Explore how quantum computing is transforming technology and opening new possibilities.',
    type: 'video',
    duration: '45 minutes',
    level: 'Intermediate',
    rating: 4.7,
    xp: 80,
    topics: ['Quantum Computing', 'Technology Trends', 'Advanced Computing']
  },
  {
    id: 'content-3',
    title: 'Data Science Masterclass',
    description: 'Master the skills needed to become a data scientist, from statistics to machine learning.',
    type: 'course',
    duration: '8 hours',
    level: 'Advanced',
    rating: 4.9,
    xp: 200,
    topics: ['Data Science', 'Statistics', 'Machine Learning', 'Python']
  },
  {
    id: 'content-4',
    title: 'Mindfulness for High Performance',
    description: 'Learn how to incorporate mindfulness practices into your daily routine for increased focus and productivity.',
    type: 'audio',
    duration: '3 hours',
    level: 'Beginner',
    rating: 4.6,
    xp: 90,
    topics: ['Mindfulness', 'Productivity', 'Mental Health']
  },
  {
    id: 'content-5',
    title: 'Digital Marketing Strategies',
    description: 'Discover the latest digital marketing techniques to grow your business and reach new customers.',
    type: 'course',
    duration: '5 hours',
    level: 'Intermediate',
    rating: 4.5,
    xp: 150,
    topics: ['Digital Marketing', 'Business', 'Social Media']
  },
  {
    id: 'content-6',
    title: 'Blockchain Technology Explained',
    description: 'Understand the fundamentals of blockchain and how it is revolutionizing industries.',
    type: 'book',
    duration: '2 hours',
    level: 'Beginner',
    rating: 4.4,
    xp: 100,
    topics: ['Blockchain', 'Cryptocurrency', 'Technology']
  },
  {
    id: 'content-7',
    title: 'Accelerated Learning Techniques',
    description: 'Learn how to learn faster and retain more information with proven cognitive strategies.',
    type: 'course',
    duration: '3 hours',
    level: 'Beginner',
    rating: 4.8,
    xp: 110,
    topics: ['Learning', 'Productivity', 'Cognitive Science']
  },
  {
    id: 'content-8',
    title: 'The Psychology of Decision Making',
    description: 'Explore the cognitive biases that influence our decisions and learn how to make better choices.',
    type: 'book',
    duration: '4 hours',
    level: 'Intermediate',
    rating: 4.7,
    xp: 130,
    topics: ['Psychology', 'Decision Making', 'Cognitive Biases']
  },
  {
    id: 'content-9',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn essential practices to protect your digital assets from cyber threats.',
    type: 'course',
    duration: '6 hours',
    level: 'Intermediate',
    rating: 4.6,
    xp: 160,
    topics: ['Cybersecurity', 'Digital Safety', 'Technology']
  },
  {
    id: 'content-10',
    title: 'Leadership in the Digital Age',
    description: 'Develop the skills needed to lead teams in today\'s rapidly changing technological landscape.',
    type: 'video',
    duration: '90 minutes',
    level: 'Advanced',
    rating: 4.9,
    xp: 170,
    topics: ['Leadership', 'Management', 'Digital Transformation']
  }
];

// Mock learning paths
export const mockPaths = [
  {
    id: 'path-1',
    title: 'Data Science Mastery',
    description: 'Become a data science expert through a structured learning journey from basics to advanced techniques.',
    level: 'Intermediate',
    duration: '12 weeks',
    totalCheckpoints: 12,
    totalXP: 1200,
    icon: 'database',
    popular: true
  },
  {
    id: 'path-2',
    title: 'AI Development Journey',
    description: 'Build your artificial intelligence skills from foundational concepts to implementing complex neural networks.',
    level: 'Advanced',
    duration: '16 weeks',
    totalCheckpoints: 16,
    totalXP: 1600,
    icon: 'cpu'
  },
  {
    id: 'path-3',
    title: 'Digital Marketing Excellence',
    description: 'Master digital marketing strategies across multiple platforms to drive growth and engagement.',
    level: 'Beginner',
    duration: '8 weeks',
    totalCheckpoints: 8,
    totalXP: 800,
    icon: 'trending-up',
    new: true
  },
  {
    id: 'path-4',
    title: 'High Performance Mindset',
    description: 'Develop mental strategies for optimal performance in high-pressure environments.',
    level: 'Intermediate',
    duration: '6 weeks',
    totalCheckpoints: 6,
    totalXP: 600,
    icon: 'activity'
  },
  {
    id: 'path-5',
    title: 'Blockchain Innovation',
    description: 'Learn blockchain technology and how to implement decentralized applications for various industries.',
    level: 'Advanced',
    duration: '10 weeks',
    totalCheckpoints: 10,
    totalXP: 1000,
    icon: 'link'
  }
];

// Mock user stats
export const mockUserStats = {
  level: 8,
  xp: 320,
  xpToNextLevel: 500,
  completedCourses: 12,
  completedPaths: 2,
  dailyStreak: 16,
  totalLearningTime: 42, // hours
  badges: 14,
  achievements: 7
};

// Mock achievements
export const mockAchievements = [
  {
    id: 'achievement-1',
    title: 'First Steps',
    description: 'Completed your first course',
    icon: 'award',
    category: 'Progress',
    xp: 50,
    unlocked: true,
    date: '2023-10-15T14:30:00Z'
  },
  {
    id: 'achievement-2',
    title: 'Knowledge Seeker',
    description: 'Completed 5 courses',
    icon: 'book',
    category: 'Progress',
    xp: 100,
    unlocked: true,
    date: '2023-11-03T09:15:00Z'
  },
  {
    id: 'achievement-3',
    title: 'Wisdom Master',
    description: 'Completed 10 courses',
    icon: 'book-open',
    category: 'Progress',
    xp: 200,
    unlocked: true,
    date: '2023-12-21T16:45:00Z'
  },
  {
    id: 'achievement-4',
    title: 'Consistent Learner',
    description: 'Maintained a 7-day streak',
    icon: 'calendar',
    category: 'Engagement',
    xp: 75,
    unlocked: true,
    date: '2023-10-22T10:00:00Z'
  },
  {
    id: 'achievement-5',
    title: 'Learning Devotee',
    description: 'Maintained a 30-day streak',
    icon: 'calendar',
    category: 'Engagement',
    xp: 150,
    unlocked: false
  },
  {
    id: 'achievement-6',
    title: 'Path Pioneer',
    description: 'Completed your first learning path',
    icon: 'map',
    category: 'Paths',
    xp: 125,
    unlocked: true,
    date: '2023-11-15T20:30:00Z'
  },
  {
    id: 'achievement-7',
    title: 'Path Master',
    description: 'Completed 3 learning paths',
    icon: 'map-pin',
    category: 'Paths',
    xp: 250,
    unlocked: false
  },
  {
    id: 'achievement-8',
    title: 'Community Contributor',
    description: 'Made 5 helpful posts in the community',
    icon: 'users',
    category: 'Community',
    xp: 100,
    unlocked: true,
    date: '2023-12-05T14:20:00Z'
  },
  {
    id: 'achievement-9',
    title: 'Thought Leader',
    description: 'Received 50 likes on your community posts',
    icon: 'thumbs-up',
    category: 'Community',
    xp: 150,
    unlocked: false
  },
  {
    id: 'achievement-10',
    title: 'Quiz Whiz',
    description: 'Scored 100% on 10 quizzes',
    icon: 'check-circle',
    category: 'Performance',
    xp: 200,
    unlocked: false
  }
];

// Mock community posts
export const mockCommunityPosts = [
  {
    id: 'post-1',
    user: {
      name: 'Alex Chen',
      level: 12
    },
    content: 'Just completed the AI Development Path and it was incredible! The practical exercises really helped me understand how to implement neural networks. Highly recommend it to anyone interested in AI.',
    type: 'discussion',
    timestamp: '2023-12-28T14:30:00Z',
    likes: 24,
    comments: [
      {
        id: 'comment-1-1',
        user: {
          name: 'Maya Singh',
          level: 8
        },
        content: 'I am starting that path next week! Any tips?',
        timestamp: '2023-12-28T15:45:00Z'
      },
      {
        id: 'comment-1-2',
        user: {
          name: 'Alex Chen',
          level: 12
        },
        content: 'Definitely focus on the practical exercises and do not rush through the math sections, they are important for later modules!',
        timestamp: '2023-12-28T16:20:00Z'
      }
    ]
  },
  {
    id: 'post-2',
    user: {
      name: 'Jordan Taylor',
      level: 15
    },
    content: 'Has anyone taken the Blockchain Innovation path? I am curious about how practical the content is for real-world applications.',
    type: 'question',
    timestamp: '2023-12-27T10:15:00Z',
    likes: 8,
    comments: []
  },
  {
    id: 'post-3',
    user: {
      name: 'Dr. Sarah Williams',
      level: 20
    },
    content: 'Excited to announce that I will be hosting a live Q&A session next Tuesday on "The Future of AI in Healthcare." Join me to discuss how AI is transforming patient care and medical research!',
    type: 'announcement',
    timestamp: '2023-12-26T09:00:00Z',
    likes: 42,
    comments: [
      {
        id: 'comment-3-1',
        user: {
          name: 'Michael Johnson',
          level: 10
        },
        content: 'Looking forward to this! Will it be recorded for those who cannot attend live?',
        timestamp: '2023-12-26T09:45:00Z'
      }
    ]
  },
  {
    id: 'post-4',
    user: {
      name: 'Priya Patel',
      level: 9
    },
    content: 'The Data Visualization module in the Data Science path has completely changed how I present information! I used the techniques in my work presentation yesterday and my manager was impressed.',
    type: 'discussion',
    timestamp: '2023-12-25T16:20:00Z',
    likes: 19,
    comments: []
  },
  {
    id: 'post-5',
    user: {
      name: 'Carlos Rodriguez',
      level: 11
    },
    content: 'Does anyone have recommendations for resources on quantum computing beyond what is covered in the Future of Quantum Computing video? I am particularly interested in quantum algorithms.',
    type: 'question',
    timestamp: '2023-12-24T13:10:00Z',
    likes: 7,
    comments: [
      {
        id: 'comment-5-1',
        user: {
          name: 'Emma Wilson',
          level: 14
        },
        content: 'Check out the Quantum Algorithms specialization in the Advanced Computing path. It goes much deeper into the topic.',
        timestamp: '2023-12-24T14:30:00Z'
      }
    ]
  }
];

// Mock top users for community
export const mockTopUsers = [
  {
    id: 'user-1',
    name: 'Dr. Sarah Williams',
    level: 20,
    xp: 12500,
    contributions: 48
  },
  {
    id: 'user-2',
    name: 'Jordan Taylor',
    level: 15,
    xp: 8750,
    contributions: 36
  },
  {
    id: 'user-3',
    name: 'Alex Chen',
    level: 12,
    xp: 6200,
    contributions: 29
  },
  {
    id: 'user-4',
    name: 'Emma Wilson',
    level: 14,
    xp: 7800,
    contributions: 25
  },
  {
    id: 'user-5',
    name: 'Carlos Rodriguez',
    level: 11,
    xp: 5500,
    contributions: 22
  }
];

// Mock calendar events
export const mockEvents = [
  {
    id: 'event-1',
    title: 'Live Q&A: Future of AI in Healthcare',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: '11:00 AM',
    type: 'live',
    duration: '1 hour'
  },
  {
    id: 'event-2',
    title: 'Scheduled Learning: Neural Networks',
    date: new Date(),
    time: '3:00 PM',
    type: 'lesson',
    duration: '45 min'
  },
  {
    id: 'event-3',
    title: 'Weekly Quiz: Data Analysis',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: '10:00 AM',
    type: 'quiz',
    duration: '30 min'
  },
  {
    id: 'event-4',
    title: 'Path Checkpoint: Blockchain Basics',
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    time: '2:00 PM',
    type: 'deadline',
    duration: '1 hour'
  },
  {
    id: 'event-5',
    title: 'Community Discussion: Ethical AI',
    date: new Date(new Date().setDate(new Date().getDate() + 4)),
    time: '4:00 PM',
    type: 'discussion',
    duration: '1.5 hours'
  }
];