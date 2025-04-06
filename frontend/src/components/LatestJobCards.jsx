import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 sm:p-5 rounded-xl shadow-lg bg-white border border-gray-100 cursor-pointer transition-all hover:shadow-2xl"
    >
      <div className="mb-2">
        <h1 className="font-semibold text-base sm:text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-600">{job.location}</p>
      </div>
      <div className="mb-3">
        <h2 className="font-bold text-lg sm:text-xl mb-1">{job.title}</h2>
        <p className="text-sm sm:text-base text-gray-700 line-clamp-2">{job.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <Badge className="text-blue-700 font-semibold" variant="ghost">
          {job.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-semibold" variant="ghost">
          {job.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="ghost">
          {job.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
