import React, { useEffect, useState } from 'react'
import CoursCard from '../components/sections/featuredCourses/CoursCard'
import { fetchModelRecommendations } from '../services/courseService'

const Courses = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hasSearched, setHasSearched] = useState(false)

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [level, setLevel] = useState('')
    const [topic, setTopic] = useState('')

    const categories = [
        'Design',
        'Development',
        'Business',
        'Office Productivity',
        'Marketing',
        'Teaching & Academics',
        'IT & Software',
        'Personal Development',
        'Lifestyle',
        'Health & Fitness',
        'Photography & Video',
        'Music',
        'Finance & Accounting',
    ]

    const levels = ['Beginner', 'Intermediate', 'Advanced']

    const topics = ['WordPress', 'Adobe Premiere', 'Microsoft Access', 'Excel', 'Java', 'Web Design']

    const loadRecommendations = async (opts) => {
        setLoading(true)
        setError(null)
        try {
            const recs = await fetchModelRecommendations({
                q: opts.search,
                category: opts.category,
                level: opts.level,
                topic: opts.topic,
                limit: 9,
            })
            setCourses(recs)
        } catch (err) {
            console.error(err)
            setError(err.message || 'Something went wrong while loading recommendations')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let initialFilters = {}
        if (typeof window !== 'undefined') {
            const stored = window.localStorage.getItem('courseFilters')
            if (stored) {
                try {
                    initialFilters = JSON.parse(stored) || {}
                } catch {
                    initialFilters = {}
                }
            }
        }

        setCategory(initialFilters.category || '')
        setLevel(initialFilters.level || '')
        setTopic(initialFilters.topic || '')
    }, [])

    return (
        <section className='min-h-screen  items-center py-10 flex flex-col gap-7 px-15'>

            <div className='flex flex-col items-center gap-4 w-full max-w-5xl'>
                <h1 className='text-6xl text-center font-medium'>
                    Find The Right Course For You
                </h1>
                <p className='text-wrap text-center mt-3 text-gray-500/80 font-thin text-xl w-[80%]'>
                    Search by keywords and refine by category, level and topic to get
                    personalized recommendations from our course library.
                </p>

                <form
                    className='w-full flex flex-col gap-4 mt-4'
                    onSubmit={(e) => {
                        e.preventDefault()
                        setHasSearched(true)
                        if (typeof window !== 'undefined') {
                            window.localStorage.setItem(
                                'courseFilters',
                                JSON.stringify({ category, level, topic })
                            )
                        }
                        loadRecommendations({ search, category, level, topic })
                    }}
                >
                    <div className='flex flex-col md:flex-row gap-4 w-full'>
                        <input
                            type='text'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='What do you want to learn? (e.g. Photoshop, Java, Excel)'
                            className='flex-1 rounded-full border border-gray-300 px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                        />
                        <button
                            type='submit'
                            className='main-bg-color cursor-pointer font-medium text-lg text-black rounded-full px-8 py-3'
                        >
                            Search
                        </button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white'
                        >
                            <option value=''>All categories</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>

                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className='rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white'
                        >
                            <option value=''>Any level</option>
                            {levels.map((l) => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>

                        <select
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className='rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white'
                        >
                            <option value=''>All topics</option>
                            {topics.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                </form>

                {!hasSearched && !loading && !error && (
                    <div className='mt-2 text-sm text-gray-500 bg-gray-100 border border-dashed border-gray-300 rounded-xl px-4 py-3 max-w-xl text-center'>
                        Enter a keyword and adjust the filters, then click <span className='font-medium'>Search</span> to see your recommended courses.
                    </div>
                )}
            </div>

            {loading && (
                <div className='mt-10 text-lg text-gray-500'>Loading your recommendations...</div>
            )}

            {error && !loading && (
                <div className='mt-10 text-lg text-red-500'>{error}</div>
            )}

            {!loading && !error && hasSearched && courses.length === 0 && (
                <div className='mt-10 text-lg text-gray-500 text-center max-w-xl'>
                    No courses matched your search. Try changing your
                    keywords or filters.
                </div>
            )}

            {!loading && !error && courses.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {courses.map((course) => (
                        <CoursCard
                            key={course.id}
                            id={course.id}
                            title={course.title}
                            description={course.description}
                            rate={course.rate}
                            reviews={course.reviews}
                            price={course.price}
                            imageUrl={course.imageUrl}
                            totalHours={course.totalHours}
                            publicationDate={course.publicationDate}
                            instructor={course.instructor}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default Courses