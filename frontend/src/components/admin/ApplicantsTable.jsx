import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortListStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <Table>
        <TableCaption className="text-gray-500 ">
          A list of your recently applied users
        </TableCaption>

        <TableRow className="bg-gray-50">
          <TableHead className="font-bold text-gray-700 text-md">Full Name</TableHead>
          <TableHead className="font-bold text-gray-700">Email</TableHead>
          <TableHead className="font-bold text-gray-700">Contact</TableHead>
          <TableHead className="font-bold text-gray-700">Resume</TableHead>
          <TableHead className="font-bold text-gray-700">Date</TableHead>
          <TableHead className="text-right font-semibold text-gray-700">
            Action
          </TableHead>
        </TableRow>

        <TableBody>
          {applicants?.applications?.slice().reverse().map((user) => (
            <TableRow
              key={user._id}
              className="hover:bg-gray-50 transition duration-200"
            >
              <TableCell className="font-medium">
                {user?.applicant?.fullname || "NA"}
              </TableCell>
              <TableCell>{user?.applicant?.email || "NA"}</TableCell>
              <TableCell>{user?.applicant?.phoneNumber || "NA"}</TableCell>
              <TableCell>
                {user?.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 hover:underline"
                    href={user.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.applicant.profile.resumeOriginalName || "View Resume"}
                  </a>
                ) : (
                  <span className="text-gray-500">NA</span>
                )}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {user?.applicant?.createdAt?.split("T")[0] || "NA"}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="hover:text-purple-600 transition">
                    <MoreHorizontal className="w-5 h-5" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 p-2 space-y-1 border shadow-lg">
                    {shortListStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, user?._id)}
                        className={`cursor-pointer px-2 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100 ${
                          status === "Accepted" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {status}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
