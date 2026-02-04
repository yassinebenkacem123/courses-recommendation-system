import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaStar, FaRegClock, FaUserFriends, FaChalkboardTeacher } from 'react-icons/fa'
import CoursCard from '../components/sections/featuredCourses/CoursCard'
import {
    fetchCourseById,
    fetchCourseRecommendationsById,
} from '../services/courseService'

const CourseDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [course, setCourse] = useState(null)
    const [relatedCourses, setRelatedCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return

        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                const mainCourse = await fetchCourseById(id)
                if (!mainCourse) {
                    throw new Error('Course not found')
                }
                setCourse(mainCourse)

                try {
                    const recs = await fetchCourseRecommendationsById(id, 6)
                    setRelatedCourses(recs.filter((c) => String(c.id) !== String(id)))
                } catch (innerErr) {
                    console.error(innerErr)
                }
            } catch (err) {
                console.error(err)
                setError(err.message || 'Failed to load course details')
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [id])

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center px-15">
                <div className="text-lg text-gray-500">Loading course details...</div>
            </section>
        )
    }

    if (error || !course) {
        return (
            <section className="min-h-screen flex flex-col items-center justify-center gap-4 px-15">
                <p className="text-lg text-red-500 text-center">{error || 'Course not found'}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="main-bg-color font-medium text-black rounded-full px-6 py-2 flex items-center gap-2"
                >
                    <FaArrowLeft />
                    Go Back
                </button>
            </section>
        )
    }

    const isPaidLabel = (() => {
        const raw = course.isPaidRaw
        if (raw === undefined || raw === null) return null
        const val = String(raw).toLowerCase()
        if (['true', '1', 'yes'].includes(val)) return 'Paid'
        if (['false', '0', 'no'].includes(val)) return 'Free'
        return null
    })()

    return (
        <section className="min-h-screen py-12 px-15 flex flex-col gap-10">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-4 w-fit"
            >
                <FaArrowLeft />
                Back
            </button>

            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="relative aspect-video overflow-hidden">
                            <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="h-full w-full object-cover"
                            />
                            {course.price && (
                                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-1 text-sm font-bold text-black shadow-sm">
                                    ${course.price}
                                </div>
                            )}
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <div className="flex flex-wrap items-center gap-3">
                                {course.category && (
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                                        {course.category}
                                    </span>
                                )}
                                {course.level && (
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                                        {course.level}
                                    </span>
                                )}
                                {isPaidLabel && (
                                    <span className="px-3 py-1 rounded-full bg-gray-900 text-xs font-medium text-white">
                                        {isPaidLabel}
                                    </span>
                                )}
                                {course.language && (
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                                        {course.language}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                                {course.title}
                            </h1>

                            <p className="text-base text-gray-600 leading-relaxed">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar
                                                key={index}
                                                className={index < Math.round(course.rate || 0) ? 'fill-current' : 'text-gray-200'}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-1 font-semibold text-gray-800">{course.rate?.toFixed?.(1) || course.rate}</span>
                                    {course.reviews !== undefined && (
                                        <span className="text-xs text-gray-400">({course.reviews} reviews)</span>
                                    )}
                                </div>

                                {course.totalHours && (
                                    <div className="flex items-center gap-1">
                                        <FaRegClock size={12} />
                                        <span>{course.totalHours} hours of content</span>
                                    </div>
                                )}

                                {course.numLectures && (
                                    <div className="flex items-center gap-1">
                                        <span>{course.numLectures} lectures</span>
                                    </div>
                                )}

                                {course.numSubscribers && (
                                    <div className="flex items-center gap-1">
                                        <FaUserFriends size={12} />
                                        <span>{course.numSubscribers} learners</span>
                                    </div>
                                )}
                            </div>

                            {course.topic && (
                                <div className="mt-2 text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">Topic:</span> {course.topic}
                                </div>
                            )}

                            {course.publicationDate && (
                                <div className="mt-1 text-xs text-gray-400">
                                    Published on{' '}
                                    {new Date(course.publicationDate).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col gap-3">
                        {course.instructor && (
                            <div className="flex items-center gap-3">
                                <div className="h-11 w-11 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
                                    <FaChalkboardTeacher />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs uppercase tracking-wide text-gray-400">Instructor</span>
                                    <span className="text-base font-medium text-gray-900">{course.instructor}</span>
                                </div>
                            </div>
                        )}

                        {course.course_url && (
                            <button
                                onClick={() => window.open(course.course_url, '_blank', 'noopener,noreferrer')}
                                className="mt-2 main-bg-color font-medium text-black rounded-full px-6 py-2 text-sm"
                            >
                                View on Original Platform
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {relatedCourses && relatedCourses.length > 0 && (
                <div className="max-w-6xl w-full mx-auto flex flex-col gap-6 mt-4">
                    <div className="flex flex-col items-start gap-2">
                        <h2 className="text-2xl font-semibold">Related Courses</h2>
                        <p className="text-sm text-gray-500">
                            Recommended using our title-based course recommendation model.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {relatedCourses.map((c) => (
                            <CoursCard
                                key={c.id}
                                id={c.id}
                                title={c.title}
                                description={c.description}
                                rate={c.rate}
                                reviews={c.reviews}
                                price={c.price}
                                imageUrl={c.imageUrl}
                                totalHours={c.totalHours}
                                publicationDate={c.publicationDate}
                                instructor={c.instructor}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default CourseDetails