import getRandomDarkColor from "../../utils/randomColor";

export default function RecentActivity({ imageSrc, username, errorType, points }) {
  return (
    <div className="flex items-center justify-between bg-[#E7DBCA] rounded-xl my-3 p-3 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center space-x-3">
        <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-[#181C1E]/10 flex items-center justify-center">
          {imageSrc === "N/A" ? (
            <div
              style={{ backgroundColor: getRandomDarkColor(username[0]) }}
              className="w-full h-full flex items-center justify-center text-white font-medium"
            >
              {username[0].toUpperCase()}
            </div>
          ) : (
            <img src={imageSrc || "/placeholder.svg"} alt={username} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="text-sm">
          <span className="font-medium">{username}</span> reported <span className="font-medium">{errorType}</span>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <span className="font-bold">{points}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#F9A825" stroke="#181C1E" strokeWidth="1.5" />
          <path d="M12 6V18M6 12H18" stroke="#181C1E" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
