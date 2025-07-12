import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="w-full overflow-x-auto rounded-2xl shadow-md bg-white p-4">
      <Table>
        <TableCaption className="text-muted-foreground pb-4">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold text-sm">Date</TableHead>
            <TableHead className="font-semibold text-sm">Job Role</TableHead>
            <TableHead className="font-semibold text-sm">Company</TableHead>
            <TableHead className="text-right font-semibold text-sm">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                You haven&apos;t applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((item) => (
              <TableRow
                key={item._id}
                className="transition-colors hover:bg-muted/20"
              >
                <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="font-medium">{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`rounded-xl text-xs px-3 py-1 ${
                      item?.status === "rejected"
                        ? "bg-red-500"
                        : item?.status === "accepted"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {item?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
