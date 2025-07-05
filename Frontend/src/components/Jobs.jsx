import React from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import FilterCard from './FilterCard';

const jobsArray = [
  { id: 1, title: 'Frontend Developer', company: 'Google' },
  { id: 2, title: 'Backend Developer', company: 'Amazon' },
  { id: 3, title: 'Fullstack Engineer', company: 'Meta' },
];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-1/5'>
            <FilterCard />
          </div>
          {jobsArray.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
              <div className='grid grid-cols-3 gap-4'>
                {jobsArray.map((item) => (
                  <div key={item.id}>
                    <Job job={item} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
