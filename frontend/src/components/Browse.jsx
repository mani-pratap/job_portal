import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import Footer from "./shared/Footer";

const Browse = () => {
  const randomJobs = [1, 2, 3,4,5,6,7,8 ];
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-semibold my-10 mx-auto text-lg" >Search Results ({randomJobs.length})</h1>
       <div className="grid grid-cols-3 gap-4">
         {randomJobs.map((item, index) => {
          return <Job />;
        })}
       </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Browse;
