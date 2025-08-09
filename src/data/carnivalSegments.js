// AUST CSE Carnival Segments Data
// Updated: August 9, 2025

export const carnivalSegments = {
  prelims: [
    {
      id: 'prelim-math-olympiad',
      title: 'Math Olympiad Competition',
      type: 'Onsite',
      date: 'August 20, 2025',
      time: 'TBA',
      description: 'Test your mathematical prowess in this challenging preliminary round.',
      category: 'Academic',
      image: '/src/assets/images/segments/24 Math Olympiad Competition.jpg',
      registration: {
        deadline: 'August 18, 2025',
        fee: 'Free',
        teamSize: 'Individual'
      }
    },
    {
      id: 'prelim-hackathon',
      title: 'Hackathon',
      type: 'Onsite',
      date: 'August 21, 2025',
      time: 'TBA',
      description: 'Build innovative solutions in this intensive preliminary hackathon.',
      category: 'Development',
      image: '/src/assets/images/segments/27 Hackathon.jpg',
      registration: {
        deadline: 'August 19, 2025',
        fee: 'Free',
        teamSize: '3-4 members'
      }
    },
    {
      id: 'prelim-programming-contest',
      title: 'Programming Contest',
      type: 'Online',
      date: 'August 22, 2025',
      time: 'TBA',
      description: 'Solve algorithmic challenges in this online preliminary contest.',
      category: 'Programming',
      image: '/src/assets/images/segments/28 Programming Contest.jpg',
      registration: {
        deadline: 'August 20, 2025',
        fee: 'Free',
        teamSize: 'Individual'
      }
    }
  ],
  mainSegments: [
    {
      id: 'uiux-competition',
      title: 'UI/UX Competition',
      type: 'Online',
      date: 'August 23, 2025',
      time: 'TBA',
      description: 'Design intuitive and beautiful user interfaces and experiences.',
      category: 'Design',
      image: '/src/assets/images/segments/23 UIUX Competition.jpg',
      registration: {
        deadline: 'August 21, 2025',
        fee: 'TBA',
        teamSize: '1-3 members'
      }
    },
    {
      id: 'math-olympiad',
      title: 'Math Olympiad Competition',
      type: 'Onsite',
      date: 'August 24, 2025',
      time: 'TBA',
      description: 'Advanced mathematical problem-solving competition for the main event.',
      category: 'Academic',
      image: '/src/assets/images/segments/24 Math Olympiad Competition.jpg',
      registration: {
        deadline: 'August 22, 2025',
        fee: 'TBA',
        teamSize: 'Individual'
      }
    },
    {
      id: 'capture-the-flag',
      title: 'Capture The Flag Competition',
      type: 'Onsite',
      date: 'August 25, 2025',
      time: 'TBA',
      description: 'Test your cybersecurity skills in this exciting CTF challenge.',
      category: 'Security',
      image: '/src/assets/images/segments/25 Capture The Flag Competition.jpg',
      registration: {
        deadline: 'August 23, 2025',
        fee: 'TBA',
        teamSize: '2-4 members'
      }
    },
    {
      id: 'quiz-competition',
      title: 'Quiz Competition',
      type: 'Onsite',
      date: 'August 26, 2025',
      time: 'TBA',
      description: 'General knowledge and technical quiz competition.',
      category: 'Academic',
      image: '/src/assets/images/segments/26 Quiz Competition.jpg',
      registration: {
        deadline: 'August 24, 2025',
        fee: 'TBA',
        teamSize: '3-4 members'
      }
    },
    {
      id: 'main-hackathon',
      title: 'Hackathon',
      type: 'Onsite',
      date: 'August 27, 2025',
      time: 'TBA',
      description: 'The main hackathon event with industry-relevant challenges.',
      category: 'Development',
      image: '/src/assets/images/segments/27 Hackathon.jpg',
      registration: {
        deadline: 'August 25, 2025',
        fee: 'TBA',
        teamSize: '3-4 members'
      }
    },
    {
      id: 'chess-competition',
      title: 'Chess Competition',
      type: 'Onsite',
      date: 'August 28, 2025',
      time: 'TBA',
      description: 'Strategic chess tournament for all skill levels.',
      category: 'Sports',
      image: '/src/assets/images/segments/28 Chess Competition.jpg',
      registration: {
        deadline: 'August 26, 2025',
        fee: 'TBA',
        teamSize: 'Individual'
      }
    },
    {
      id: 'esports-tournaments',
      title: 'E-Sports Tournaments',
      type: 'Onsite',
      date: 'August 28, 2025',
      time: 'TBA',
      description: 'Competitive gaming tournaments across multiple titles.',
      category: 'Sports',
      image: '/src/assets/images/segments/28 E-Sports Tournaments.jpg',
      registration: {
        deadline: 'August 26, 2025',
        fee: 'TBA',
        teamSize: 'Varies by game'
      }
    },
    {
      id: 'main-programming-contest',
      title: 'Programming Contest',
      type: 'Onsite',
      date: 'August 29, 2025',
      time: 'TBA',
      description: 'The main programming contest with advanced algorithmic challenges.',
      category: 'Programming',
      image: '/src/assets/images/segments/28 Programming Contest.jpg',
      registration: {
        deadline: 'August 27, 2025',
        fee: 'TBA',
        teamSize: 'Individual'
      }
    }
  ]
};

// Helper functions
export const getAllSegments = () => [
  ...carnivalSegments.prelims,
  ...carnivalSegments.mainSegments
];

export const getSegmentById = (id) => {
  return getAllSegments().find(segment => segment.id === id);
};

export const getSegmentsByCategory = (category) => {
  return getAllSegments().filter(segment => segment.category === category);
};

export const getSegmentsByType = (type) => {
  return getAllSegments().filter(segment => segment.type === type);
};

export const getUpcomingSegments = () => {
  const now = new Date();
  return getAllSegments().filter(segment => {
    const segmentDate = new Date(segment.date.split(' - ')[0]); // Handle date ranges
    return segmentDate >= now;
  }).sort((a, b) => {
    const dateA = new Date(a.date.split(' - ')[0]);
    const dateB = new Date(b.date.split(' - ')[0]);
    return dateA - dateB;
  });
};

export default carnivalSegments;
