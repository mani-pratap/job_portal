import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl border border-gray-100 bg-white">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-gray-400 text-sm">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae
          hic voluptates alias ipsum? Lorem ipsum dolor sit amet consectetur
          adipisicing.
        </p>
      </div>
      <div className="flex items-center mt-4 gap-2">
        <Badge variant="ghost" className="text-blue-400 font-bold">
          12 positions
        </Badge>
        <Badge variant="ghost" className="text-blue-800 font-bold">
          Part Time
        </Badge>
        <Badge variant="ghost" className="text-blue-600 font-bold">
          12 LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button>Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
