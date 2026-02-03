import React, { useEffect, useState } from 'react'
import CoursCard from './CoursCard'
import { FiArrowUpRight } from "react-icons/fi";
import { fetchFeaturedCourses, fetchRecommendedCourses } from '../../../services/courseService'

const FeaturedCourses = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [noExactMatch, setNoExactMatch] = useState(false)

    useEffect(() => {
        const loadCourses = async () => {
            try {
                let filters = null
                if (typeof window !== 'undefined') {
                    const stored = window.localStorage.getItem('courseFilters')
                    if (stored) {
                        try {
                            filters = JSON.parse(stored)
                        } catch {
                            filters = null
                        }
                    }
                }

                const coursesData = filters
                    ? await fetchRecommendedCourses(filters)
                    : await fetchFeaturedCourses()

                if (filters && (!coursesData || coursesData.length === 0)) {
                    const fallbackCourses = await fetchFeaturedCourses()
                    setCourses(fallbackCourses)
                    setNoExactMatch(true)
                } else {
                    setCourses(coursesData)
                    setNoExactMatch(false)
                }
            } catch (err) {
                console.error(err)
                setError(err.message || 'Something went wrong while loading courses')
            } finally {
                setLoading(false)
            }
        }

        loadCourses()
    }, [])

    return (
        <section className='min-h-screen mt-20 items-center py-10 flex flex-col gap-7'>
            <div className='w-full flex items-center justify-center'>
                <button className='px-2 font-medium w-50 py-2 text-lg border border-gray-400 rounded-full'>
                    Our Courses
                </button>
            </div>

            <div className='flex flex-col items-center gap-4'>
                <h1 className='text-6xl text-center font-medium'>
                    Courses Designed for a Fast-Changing World
                </h1>
                <p className='text-wrap text-center mt-3 text-gray-500/80 font-thin text-xl w-[80%]'>
                    Stay ahead with content that evolves with industry trends and demands,
                    delivered by experts who know what skills you actually need.
                    Dive into courses crafted by industry leaders.
                </p>
            </div>

            {loading && (
                <div className='mt-10 text-lg text-gray-500'>Loading courses...</div>
            )}

            {error && !loading && (
                <div className='mt-10 text-lg text-red-500'>
                    {error}
                </div>
            )}

            {!loading && !error && noExactMatch && courses.length > 0 && (
                <div className='mt-6 text-base text-gray-500 text-center max-w-xl'>
                    We couldn&apos;t find any courses that exactly match what you&apos;re looking for,
                    so here are some popular courses you might like instead.
                </div>
            )}

            {!loading && !error && courses.length === 0 && (
                <div className='mt-10 text-lg text-gray-500 text-center max-w-xl'>
                    We couldn&apos;t load any courses at the moment. Please try again later.
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

            <div className='flex items-center'>
                <button className="main-bg-color font-medium text-2xl text-black rounded-full px-7 py-4">
                    Load More Courses
                </button>
                <button className='rounded-full main-bg-color p-5 text-black'>
                    <FiArrowUpRight size={27} />
                </button>
            </div>
        </section>
    )
}

export default FeaturedCourses