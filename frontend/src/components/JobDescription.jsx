import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  APPLICATION_API_END_POINT,
  JOBS_API_END_POINT,
} from "@/utils/constant";
import { toast } from "sonner";
import { Briefcase, MapPin, CalendarDays, Users, DollarSign } from "lucide-react";

const JobDescription = () => {
  const params = useParams();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const jobId = params.id;

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="bg-blue-100 text-blue-700 font-medium hover:bg-blue-100">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="bg-orange-100 text-orange-700 font-medium hover:bg-orange-100">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 font-medium hover:bg-purple-100">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={!isApplied ? applyJobHandler : null}
          disabled={isApplied}
          className={`rounded-xl px-6 py-2 font-semibold shadow transition-all ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 space-y-5 border border-gray-100">
        <div className="flex items-center gap-3 text-gray-700">
          <Briefcase className="h-5 w-5" />
          <span className="font-semibold">Role:</span>
          <span>{singleJob?.title}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <MapPin className="h-5 w-5" />
          <span className="font-semibold">Location:</span>
          <span>{singleJob?.location}</span>
        </div>
        <div className="text-gray-700">
          <p className="font-semibold flex gap-2 items-center mb-1">
            <span>Description:</span>
          </p>
          <p className="text-gray-800 leading-relaxed">{singleJob?.description}</p>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <CalendarDays className="h-5 w-5" />
          <span className="font-semibold">Experience:</span>
          <span>{singleJob?.experiance} yrs</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <DollarSign className="h-5 w-5" />
          <span className="font-semibold">Salary:</span>
          <span>{singleJob?.salary} LPA</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Users className="h-5 w-5" />
          <span className="font-semibold">Applicants:</span>
          <span>{singleJob?.applications?.length}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <CalendarDays className="h-5 w-5" />
          <span className="font-semibold">Posted on:</span>
          <span>{singleJob?.createdAt?.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
