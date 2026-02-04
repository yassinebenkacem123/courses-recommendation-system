import { FaStar, FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CoursCard = ({
  id,
  title,
  description,
  rate,
  reviews,
  price,
  imageUrl,
  totalHours,
  publicationDate,
  instructor,
}) => {
  const navigate = useNavigate();

  return (
    <div
      key={id}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md m-4 cursor-pointer"
      onClick={() => {
        if (id) {
          navigate(`/courses/${id}`);
        }
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-black shadow-sm">
          ${price}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="mb-2 line-clamp-1 text-xl font-bold text-gray-800 transition-colors">
          {title}
        </h2>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Rating */}
        <div className="mb-4 flex items-center gap-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < Math.round(rate) ? "fill-current" : "text-gray-200"}
              />
            ))}
          </div>
          <span className="ml-1 text-sm font-semibold text-gray-700">{rate}</span>
          <span className="text-xs text-gray-400">({reviews} reviews)</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-xs text-gray-700">
              {instructor && (
                <span className="font-medium">{instructor}</span>
              )}
              <span className="text-[10px] uppercase tracking-wider text-gray-400">
                Instructor
              </span>
            </div>

            <div className="flex flex-col items-end text-[10px] uppercase tracking-wider text-gray-400">
              <div className="flex items-center gap-1">
                <FaRegClock size={10} />
                <span>{totalHours ? `${totalHours} hrs` : ""}</span>
              </div>
              {publicationDate && (
                <span>{new Date(publicationDate).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursCard;