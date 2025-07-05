import React from 'react';
import LatestJobCards from './LatestJobCards';

const randomJobs = [
  { id: 1, title: 'Frontend Developer', company: 'Google' },
  { id: 2, title: 'Backend Developer', company: 'Amazon' },
  { id: 3, title: 'Full Stack Engineer', company: 'Meta' },
  { id: 4, title: 'UI/UX Designer', company: 'Netflix' },
  { id: 5, title: 'DevOps Engineer', company: 'Flipkart' },
  { id: 6, title: 'Data Scientist', company: 'Microsoft' },
  { id: 7, title: 'QA Engineer', company: 'Adobe' },
];

const LatestJobs = () => {
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'>
        <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
      </h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          randomJobs.slice(0, 6).map((item) => (
            <LatestJobCards key={item.id} job={item} />
          ))
        }
      </div>
    </div>
  );
};

export default LatestJobs;
