import OpenAI from 'openai';
import { mockContents, mockUserStats, mockPaths } from '../data/mockData';

// Initialize OpenAI client
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || 'sk-demo-key',
  dangerouslyAllowBrowser: true // Enable browser usage
});

// Helper function to get user's learning history and preferences
const getUserLearningProfile = async (userId) => {
  try {
    // In a real app, this would come from an API call to the backend
    // For now, we're using mock data and enhancing it
    
    // Get completed and in-progress content
    const completedContent = mockContents.slice(0, 3);
    const inProgressContent = mockContents.slice(5, 7);
    
    // Get user stats from mock data
    const userStats = { ...mockUserStats };
    
    // Get enrolled paths
    const enrolledPaths = mockPaths.slice(0, 2);
    
    return {
      profile: {
        skillLevel: userStats.level < 5 ? 'beginner' : userStats.level < 15 ? 'intermediate' : 'advanced',
        interests: ['AI', 'Data Science', 'Productivity', 'Design Thinking'],
        learningStyle: 'visual', // This would be determined from user preferences
        availableTime: '30min-1hr', // This would come from user settings
        careerGoals: ['Data Scientist', 'Machine Learning Engineer'],
        preferredFormats: ['video', 'interactive']
      },
      history: {
        completedContent: completedContent.map(c => c.id),
        inProgressContent: inProgressContent.map(c => c.id),
        enrolledPaths: enrolledPaths.map(p => p.id),
        strengths: ['Python', 'Statistics'], 
        areasForImprovement: ['Deep Learning', 'Data Visualization'],
        completionRate: userStats.completionRate || 75,
        averageSessionTime: 25, // minutes
        lastActive: new Date().toISOString()
      },
      behavior: {
        preferredStudyTime: 'evening',
        engagementMetrics: {
          videoCompletionRate: 0.8,
          quizSuccessRate: 0.7,
          exerciseCompletionRate: 0.65
        },
        socialInteractions: userStats.communityPoints || 120,
        feedbackProvided: userStats.reviewsGiven || 5
      }
    };
  } catch (error) {
    console.error('Error fetching user learning profile:', error);
    // Return fallback profile if there's an error
    return {
      profile: {
        skillLevel: 'intermediate',
        interests: ['AI', 'Data Science', 'Productivity'],
        preferredFormats: ['video', 'reading']
      },
      history: {
        completedContent: ['content-3', 'content-5'],
        inProgressContent: ['content-7'],
      },
      behavior: {
        preferredStudyTime: 'evening'
      }
    };
  }
};

// Get personalized content recommendations for a user
export const getRecommendedContent = async (userId) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (process.env.OPENAI_API_KEY) {
      try {
        const userProfile = await getUserLearningProfile(userId);
        
        // Call OpenAI API to get personalized recommendations
        const response = await openai.chat.completions.create({
          // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are WISEAI, an intelligent learning assistant that provides highly personalized content recommendations.
              
Your goal is to help users progress in their learning journey by suggesting the most relevant and engaging content based on their profile, learning history, and behavior patterns.

For each recommendation, provide:
1. The content ID
2. A personalized reason why this content would benefit the user
3. A suggestion for the best time to engage with this content
4. How it connects to their interests or career goals

Respond with a JSON object in this format:
{
  "recommendedContent": [
    {
      "id": "content-id",
      "reason": "This content will help you master X which is critical for your goal of becoming a Y",
      "bestTimeToEngage": "morning/evening/weekends",
      "connectionToGoals": "This builds directly on your interest in Z and will help you develop skills in A"
    }
  ],
  "learningInsight": "A personalized insight about their learning patterns",
  "suggestedLearningGoal": "A suggested short-term learning goal"
}`
            },
            {
              role: "user",
              content: JSON.stringify({
                userProfile,
                availableContent: mockContents.map(c => ({
                  id: c.id,
                  title: c.title,
                  type: c.type,
                  description: c.description,
                  duration: c.duration,
                  difficulty: c.difficulty,
                  topics: c.topics || [],
                  prerequisites: c.prerequisites || []
                }))
              })
            }
          ],
          response_format: { type: "json_object" }
        });
        
        // Parse the AI response
        const aiRecommendation = JSON.parse(response.choices[0].message.content);
        
        // Extract recommended content IDs
        const recommendedIds = aiRecommendation.recommendedContent.map(rec => rec.id);
        
        // Get the full content objects with AI reasoning
        const recommendations = recommendedIds.map(id => {
          const content = mockContents.find(c => c.id === id);
          const aiReasoning = aiRecommendation.recommendedContent.find(r => r.id === id);
          
          if (content && aiReasoning) {
            return {
              ...content,
              reason: 'personalized',
              aiReasoning: {
                explanation: aiReasoning.reason,
                bestTime: aiReasoning.bestTimeToEngage,
                relevance: aiReasoning.connectionToGoals
              }
            };
          }
          return null;
        }).filter(Boolean);
        
        // Include the AI learning insights in the first recommendation
        if (recommendations.length > 0) {
          recommendations[0].learningInsight = aiRecommendation.learningInsight;
          recommendations[0].suggestedGoal = aiRecommendation.suggestedLearningGoal;
        }
        
        // Fill with trending content if not enough recommendations
        if (recommendations.length < 3) {
          const trending = mockContents
            .filter(c => !recommendations.some(r => r.id === c.id))
            .sort(() => 0.5 - Math.random()) // Shuffle 
            .slice(0, 5 - recommendations.length)
            .map(c => ({ ...c, reason: 'trending' }));
          
          return [...recommendations, ...trending];
        }
        
        return recommendations;
      } catch (error) {
        console.error('Error getting AI recommendations:', error);
        // Fall back to enhanced recommendations if OpenAI API call fails
        return getEnhancedRecommendations(userId);
      }
    } else {
      // If no API key is available, use enhanced recommendation logic
      return getEnhancedRecommendations(userId);
    }
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

// Enhanced recommendation logic without AI
const getEnhancedRecommendations = async (userId) => {
  try {
    const userProfile = await getUserLearningProfile(userId);
    const recommendations = [];
    
    // Get user interests
    const userInterests = userProfile.profile.interests || [];
    
    // Content based on interests
    const interestBasedContent = mockContents
      .filter(content => {
        // Check if content topics match user interests
        const contentTopics = content.topics || [];
        return contentTopics.some(topic => 
          userInterests.some(interest => 
            topic.toLowerCase().includes(interest.toLowerCase())
          )
        );
      })
      .slice(0, 2)
      .map(content => ({
        ...content,
        reason: 'interest-based',
        explanation: `Matches your interest in ${
          content.topics.find(topic => 
            userInterests.some(interest => 
              topic.toLowerCase().includes(interest.toLowerCase())
            )
          )
        }`
      }));
    
    recommendations.push(...interestBasedContent);
    
    // Add popular/trending content
    const popular = mockContents
      .filter(c => !recommendations.some(r => r.id === c.id))
      .slice(0, 1)
      .map(content => ({
        ...content,
        reason: 'popular',
        explanation: 'Trending in the community'
      }));
    
    recommendations.push(...popular);
    
    // Add content based on skill level
    const skillLevel = userProfile.profile.skillLevel || 'intermediate';
    const skillBasedContent = mockContents
      .filter(c => {
        const contentLevel = c.difficulty || 'intermediate';
        // Match content slightly above user's level for growth
        if (skillLevel === 'beginner') return contentLevel === 'beginner' || contentLevel === 'intermediate';
        if (skillLevel === 'intermediate') return contentLevel === 'intermediate' || contentLevel === 'advanced';
        return contentLevel === 'advanced';
      })
      .filter(c => !recommendations.some(r => r.id === c.id))
      .slice(0, 1)
      .map(content => ({
        ...content,
        reason: 'skill-appropriate',
        explanation: `Matches your ${skillLevel} skill level`
      }));
    
    recommendations.push(...skillBasedContent);
    
    // Add new content
    const newContent = mockContents
      .filter(c => !recommendations.some(r => r.id === c.id))
      .slice(0, 5 - recommendations.length)
      .map(content => ({
        ...content,
        reason: 'new',
        explanation: 'Recently added to the platform'
      }));
    
    recommendations.push(...newContent);
    
    return recommendations;
  } catch (error) {
    console.error('Error in enhanced recommendations:', error);
    // Fallback to basic recommendations
    return getBasicRecommendations();
  }
};

// Basic recommendation logic as a last resort
const getBasicRecommendations = () => {
  const recommendations = [];
  
  // Add some popular content
  const popular = mockContents
    .slice(0, 2)
    .map(content => ({
      ...content,
      reason: 'popular',
      explanation: 'Highly rated by learners'
    }));
  recommendations.push(...popular);
  
  // Add some new content
  const newContent = mockContents
    .slice(4, 6)
    .map(content => ({
      ...content,
      reason: 'new',
      explanation: 'Recently added to the platform'
    }));
  recommendations.push(...newContent);
  
  return recommendations;
};
