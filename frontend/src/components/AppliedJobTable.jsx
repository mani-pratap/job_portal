import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.jobs || {});
  console.log("job ________",allAppliedJobs);
  return (
    <div>
      <Table>
        <TableCaption>A List of your applied job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Apply now, no job found
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJOb) => (
              <TableRow key={appliedJOb._id}>
                <TableCell>
                  {appliedJOb?.createdAt?.split("T")[0] ?? "-"}
                </TableCell>
                <TableCell>{appliedJOb?.job?.title ?? "-"}</TableCell>
                <TableCell>{appliedJOb?.job?.company?.name ?? "-"}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJOb?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJOb?.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}>
                    {appliedJOb?.status.toUpperCase() ?? "-"}
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
