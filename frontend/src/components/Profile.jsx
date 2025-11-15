import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const skills = ["html", "CSS", "JavaScript", "React.js"];
const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile Image"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setOpen(true)}>
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-4">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
          <label className="text-md font-semibold">Resume</label>
          {isResume ? (
            <a
              target="blank"
              href="http://youtube.com"
              className="text-blue-500 w-full hover:underline cursor-pointer">
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>N/A</span>
          )}
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl my-8">
          <h1 className="font-bold capitalize text-2xl">Applied jobs</h1>
          {/* applied job table */}
          <AppliedJobTable />
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
