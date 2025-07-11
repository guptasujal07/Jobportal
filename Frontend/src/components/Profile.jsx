import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { Mail, Contact, Pen } from 'lucide-react'
import { useSelector } from 'react-redux'
import AppliedJobTable from './AppliedJobTable'
import { Button } from './ui/button'
import UpdateProfileDialog from './UpdateProfileDialog'

const Profile = () => {
  const { user } = useSelector(store => store.auth);
  const isResume = !!user?.profile?.resume;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
        </div>

        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email || "NA"}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber || "NA"}</span>
          </div>
        </div>

        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-1 flex-wrap'>
            {
              user?.profile?.skills?.length
                ? user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                : <span>NA</span>
            }
          </div>
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold">Resume</Label>
          {
            isResume
              ? <a
                  target='_blank'
                  href={user.profile.resume}
                  className='text-blue-500 hover:underline cursor-pointer'
                >
                  {user.profile.resumeOriginalName || "View Resume"}
                </a>
              : <span>NA</span>
          }
        </div>
      </div>

      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
