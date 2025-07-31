import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import FilterCard from './FilterCard';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  console.log('jobs', jobs)
  const [loading, setLoading] = useState(true); // FIXED: Added loading state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/job/get', { credentials: 'include', }); // Backend route
        const data = await response.json();

        console.log(data)
        setJobs(data.jobs || data); // Adjust depending on your API response
        // setJobs((prev)=>[...,])
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false); // Always runs
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-1/5'>
            <FilterCard />
          </div>
          <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
            {loading ? (
              <span>Loading...</span>
            ) : jobs.length <= 0 ? (
              <span>No jobs found</span>
            ) : (
              <div className='grid grid-cols-3 gap-4'>
                {jobs.map((item) => (
                  <div key={item.id}>
                    <Job job={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
