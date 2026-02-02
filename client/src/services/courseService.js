const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const UNSPLASH_CLIENT_ID = import.meta.env.VITE_UNSPLASH_CLIENT_ID || 'lqFJOKxR8LkdIN32skR4sSkh0GbRsCEEQLuzhBxrfgE';

const isValidCourse = (course) => {
    if (!course || typeof course !== 'object') return false;

    const hasTitle = typeof course.title === 'string' && course.title.trim() !== '';
    const hasCategoryOrTopic =
        (typeof course.category === 'string' && course.category.trim() !== '') ||
        (typeof course.subcategory === 'string' && course.subcategory.trim() !== '') ||
        (typeof course.topic === 'string' && course.topic.trim() !== '');
    const hasPrice = typeof course.price === 'string' && course.price.trim() !== '';
    const hasLevel = typeof course.level === 'string' && course.level.trim() !== '';

    return hasTitle && hasCategoryOrTopic && hasPrice && hasLevel;
};

const CATEGORY_KEYWORD_MAP = {
    'Business Finance': 'business',
    'Finance & Accounting': 'finance',
    'Entrepreneurship': 'startup',
    'Management': 'office',
    'Business': 'business',
    'Marketing': 'marketing',
    'Sales': 'business meeting',
    'Development': 'coding',
    'Web Development': 'computer programming',
    'Data Science': 'data analytics',
    'Mobile Development': 'mobile app',
    'Programming Languages': 'coding',
    'Database Design & Development': 'database',
    'Software Testing': 'technology',
    'Software Engineering': 'software',
    'IT & Software': 'technology',
    'Design': 'creative design',
    'Graphic Design & Illustration': 'graphic design',
    'Web Design': 'web design',
    'User Experience Design': 'ux design',
    'Game Design': 'video game',
    '3D & Animation': 'animation',
    'Fashion Design': 'fashion',
    'Architectural Design': 'architecture',
    'Personal Development': 'self improvement',
    'Productivity': 'productivity',
    'Leadership': 'leadership',
    'Career Development': 'career',
    'Parenting & Relationships': 'family',
    'Health & Fitness': 'fitness',
    'Yoga': 'yoga',
    'Mental Health': 'wellness',
    'Nutrition & Diet': 'healthy food',
    'Sports': 'sports',
    'Music': 'music',
    'Instruments': 'musical instrument',
    'Music Production': 'music studio',
    'Photography & Video': 'photography',
    'Arts & Crafts': 'art',
    'Teaching & Academics': 'education',
    'Teacher Training': 'classroom',
    'Math': 'mathematics',
    'Science': 'science',
    'Engineering': 'engineering',
    'Humanities': 'books',
    'Language': 'language learning',
    'Digital Marketing': 'digital marketing',
    'Content Marketing': 'content creation',
    'Social Media Marketing': 'social media',
    'Lifestyle': 'lifestyle',
    'Travel': 'travel',
    'Gaming': 'gaming',
    'Home Improvement': 'home',
    'Pet Care & Training': 'pets',
};

const extractGenericKeyword = (topic) => {
    const topicLower = topic.toLowerCase();

    if (topicLower.includes('mba') || topicLower.includes('business school')) {
        return 'business education';
    }

    if (
        topicLower.includes('python') ||
        topicLower.includes('java') ||
        topicLower.includes('javascript') ||
        topicLower.includes('c++')
    ) {
        return 'programming';
    }

    if (
        topicLower.includes('react') ||
        topicLower.includes('angular') ||
        topicLower.includes('vue') ||
        topicLower.includes('django')
    ) {
        return 'web development';
    }

    if (topicLower.includes('testing') || topicLower.includes('qa')) {
        return 'software quality';
    }

    if (
        topicLower.includes('aws') ||
        topicLower.includes('azure') ||
        topicLower.includes('cloud')
    ) {
        return 'cloud computing';
    }

    if (
        topicLower.includes('data') ||
        topicLower.includes('analytics') ||
        topicLower.includes('sql')
    ) {
        return 'data analysis';
    }

    if (
        topicLower.includes('machine learning') ||
        topicLower.includes('ai') ||
        topicLower.includes('artificial intelligence')
    ) {
        return 'artificial intelligence';
    }

    if (
        topicLower.includes('photoshop') ||
        topicLower.includes('illustrator') ||
        topicLower.includes('figma')
    ) {
        return 'graphic design';
    }

    if (topicLower.includes('seo') || topicLower.includes('sem')) {
        return 'digital marketing';
    }

    if (
        topicLower.includes('stock') ||
        topicLower.includes('investing') ||
        topicLower.includes('trading')
    ) {
        return 'finance';
    }

    return null;
};

export const generateUnsplashQuery = (course) => {
    if (course.topic) {
        let topicStr = Array.isArray(course.topic) ? course.topic[0] : course.topic;
        topicStr = topicStr.split(',')[0].trim();

        const genericKeyword = extractGenericKeyword(topicStr);
        if (genericKeyword) {
            return genericKeyword;
        }

        const wordCount = topicStr.split(' ').length;
        if (wordCount <= 2 && topicStr.length <= 20) {
            return topicStr.toLowerCase();
        }
    }

    if (course.category && CATEGORY_KEYWORD_MAP[course.category]) {
        return CATEGORY_KEYWORD_MAP[course.category];
    }

    if (course.subcategory && CATEGORY_KEYWORD_MAP[course.subcategory]) {
        return CATEGORY_KEYWORD_MAP[course.subcategory];
    }

    if (course.category) {
        const firstWord = course.category.split(/[&\s]+/)[0].toLowerCase();
        if (firstWord.length > 3) {
            return firstWord;
        }
    }

    return 'learning';
};

const fetchUnsplashImage = async (course) => {
    const queries = [
        generateUnsplashQuery(course),
        course.category
            ? CATEGORY_KEYWORD_MAP[course.category] ||
            course.category.split(/[&\s]+/)[0].toLowerCase()
            : null,
        'education',
        'learning',
    ].filter((q) => q);

    const uniqueQueries = [...new Set(queries)];

    for (let i = 0; i < uniqueQueries.length; i++) {
        try {
            const query = uniqueQueries[i];

            const response = await fetch(
                `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
                    query,
                )}&orientation=landscape`,
                {
                    headers: {
                        Authorization: `Client-ID ${UNSPLASH_CLIENT_ID}`,
                    },
                },
            );

            if (!response.ok) {
                continue;
            }

            const data = await response.json();

            if (data && data.urls && data.urls.regular) {
                return data.urls.regular;
            }
        } catch (error) {
            
        }
    }

    return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80';
};

export const fetchFeaturedCourses = async () => {
    const res = await fetch(`${API_BASE_URL}/courses`);

    if (!res.ok) {
        throw new Error('Failed to fetch courses');
    }

    const data = await res.json();

    const validCourses = Array.isArray(data) ? data.filter(isValidCourse) : [];

    const coursesWithImages = [];
    for (let i = 0; i < validCourses.length; i++) {
        const course = validCourses[i];

        if (i > 0) {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        const imageUrl = await fetchUnsplashImage(course);

        const minutes = Number(course.content_length_min) || 0;
        const totalHours = minutes > 0 ? Math.round(minutes / 60) : null;

        coursesWithImages.push({
            id: course.id || course._id,
            title: course.title,
            description:
                course.headline || course.description_clean || course.description,
            rate: parseFloat(course.avg_rating) || 0,
            reviews: Number(course.num_reviews) || 0,
            price: course.price,
            imageUrl,
            totalHours,
            publicationDate: course.published_time || course.last_update_date,
            instructor: course.instructor,
        });
    }

    return coursesWithImages;
};

export const getApiBaseUrl = () => API_BASE_URL;
