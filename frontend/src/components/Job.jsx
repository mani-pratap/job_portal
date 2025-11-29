import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = job._id;

  const daysAgoFuntion = (mongodbTime) => {
    // console.log("mongo ---> ",mongodbTime, typeof(mongodbTime))
    const createdAt = new Date(mongodbTime);
    // console.log(createdAt, typeof(createdAt));
    const currentTime = new Date();

    const timeDiffrence = currentTime - createdAt;
    // console.log(timeDiffrence)
    return Math.floor(timeDiffrence / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-xl border border-gray-100 bg-white">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {" "}
          {daysAgoFuntion(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFuntion(job?.createdAt)} days Ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-gray-400 text-sm">{job?.description}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">position : {job?.position}</p>
      </div>
      <div className="flex items-center mt-4 gap-2">
        <Badge variant="ghost" className="text-blue-400 font-bold">
          {job?.position}
        </Badge>
        <Badge variant="ghost" className="text-blue-800 font-bold">
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className="text-blue-600 font-bold">
          {job?.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/jobs/description/${jobId}`)}>
          Details
        </Button>
        <Button>Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
