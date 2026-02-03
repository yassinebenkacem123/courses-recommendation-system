const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY || '0Y3Zo2sbUjRCwILWxDMuIrzdKfXyAGpQiiGAJuBcNoItzeY4Myr5s5Ei';

const HAS_PEXELS_KEY =
    typeof PEXELS_API_KEY === 'string' &&
    PEXELS_API_KEY.trim().length > 0;

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

export const generateImageQuery = (course) => {
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

const fetchPexelsImage = async (course) => {
    if (!HAS_PEXELS_KEY) {
        return 'https://images.pexels.com/photos/4145199/pexels-photo-4145199.jpeg?auto=compress&cs=tinysrgb&w=800';
    }
    const queries = [
        generateImageQuery(course),
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
                `https://api.pexels.com/v1/search?query=${encodeURIComponent(
                    query,
                )}&orientation=landscape&per_page=30`,
                {
                    headers: {
                        Authorization: PEXELS_API_KEY,
                    },
                },
            );

            if (!response.ok) {
                if (response.status === 403 || response.status === 401) {
                    break;
                }
                continue;
            }

            const data = await response.json();

            if (data && Array.isArray(data.photos) && data.photos.length > 0) {
                const photos = data.photos;

                const keyString = String(
                    course.id ||
                    course._id ||
                    course.title ||
                    query,
                );

                let hash = 0;
                for (let j = 0; j < keyString.length; j++) {
                    const chr = keyString.charCodeAt(j);
                    hash = (hash << 5) - hash + chr;
                    hash |= 0;
                }

                const index = Math.abs(hash) % photos.length;
                const photo = photos[index];

                if (photo && photo.src && (photo.src.landscape || photo.src.large || photo.src.medium)) {
                    return (
                        photo.src.landscape ||
                        photo.src.large ||
                        photo.src.medium
                    );
                }
            }
        } catch (error) {

        }
    }

    return 'https://images.pexels.com/photos/4145199/pexels-photo-4145199.jpeg?auto=compress&cs=tinysrgb&w=800';
};

const buildCoursesUrl = (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.category) {
        params.append('category', filters.category);
    }
    if (filters.level) {
        params.append('level', filters.level);
    }
    if (filters.topic) {
        params.append('topic', filters.topic);
    }
    if (filters.language) {
        params.append('language', filters.language);
    }
    if (filters.is_paid) {
        params.append('is_paid', filters.is_paid);
    }
    if (typeof filters.max_price === 'number') {
        params.append('max_price', String(filters.max_price));
    }
    if (typeof filters.limit === 'number') {
        params.append('limit', String(filters.limit));
    }

    const queryString = params.toString();
    return queryString ? `${API_BASE_URL}/courses?${queryString}` : `${API_BASE_URL}/courses`;
};

const buildRecommendationsUrl = (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.q) {
        params.append('q', filters.q);
    }
    if (filters.category) {
        params.append('category', filters.category);
    }
    if (filters.level) {
        params.append('level', filters.level);
    }
    if (filters.topic) {
        params.append('topic', filters.topic);
    }
    if (typeof filters.limit === 'number') {
        params.append('limit', String(filters.limit));
    }

    const queryString = params.toString();
    return queryString ? `${API_BASE_URL}/recommendations?${queryString}` : `${API_BASE_URL}/recommendations`;
};

const transformCoursesWithImages = async (data) => {
    const validCourses = Array.isArray(data) ? data.filter(isValidCourse) : [];

    const coursesWithImages = [];
    for (let i = 0; i < validCourses.length; i++) {
        const course = validCourses[i];

        if (i > 0) {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        const imageUrl = await fetchPexelsImage(course);

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

export const fetchFeaturedCourses = async () => {
    const res = await fetch(buildCoursesUrl({ limit: 20 }));

    if (!res.ok) {
        throw new Error('Failed to fetch courses');
    }

    const data = await res.json();
    return transformCoursesWithImages(data);
};

export const fetchRecommendedCourses = async (filters = {}) => {
    const res = await fetch(buildCoursesUrl(filters));

    if (!res.ok) {
        throw new Error('Failed to fetch courses');
    }

    const data = await res.json();
    return transformCoursesWithImages(data);
};

export const fetchModelRecommendations = async (filters = {}) => {
    const res = await fetch(buildRecommendationsUrl(filters));

    if (!res.ok) {
        throw new Error('Failed to fetch recommended courses');
    }

    const data = await res.json();
    return transformCoursesWithImages(data);
};

export const getApiBaseUrl = () => API_BASE_URL;
