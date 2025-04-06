import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFun = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  };

  const daysAgo = daysAgoFun(job?.createdAt);

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out">
      {/* Top Row: Time and Bookmark */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">
          {daysAgo === 0 ? "Today" : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12 border">
          <AvatarImage
            src={job?.company?.logo}
            alt={job?.company?.name}
            className="object-cover"
          />
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{job.company.name}</h2>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {job.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge className="text-blue-700 font-medium" variant="ghost">
          {job.position} Position{job.position > 1 ? "s" : ""}
        </Badge>
        <Badge className="text-[#F83002] font-medium" variant="ghost">
          {job.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-medium" variant="ghost">
          ₹{job.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex justify-around gap-1 mt-4">
        <Button
          variant="default"
          className="px-3"
          onClick={() => navigate(`/description/${job._id}`)}
        >
          View Details
        </Button>
        <Button className="bg-[#7209b7] text-white px-3 hover:bg-[#5e0c99]">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
