import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4">
        
        
        <div>
          <h1 className="text-2xl font-bold">
            job<span className="text-[#F83002]">portal</span>
          </h1>
        </div>

        
        <div className="flex items-center gap-6 ml-auto">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to="/" className="text-gray-700 hover:text-black transition">Home</Link></li>
            <li><Link to="/jobs" className="text-gray-700 hover:text-black transition">Jobs</Link></li>
            <li><Link to="/browse" className="text-gray-700 hover:text-black transition">Browse</Link></li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="hover:bg-[#6A38C2]/90 hover:text-white transition-colors duration-200"
              >
                <Link to="/signup">Signup</Link>
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.avatar || 'https://github.com/shadcn.png'}
                    alt={user?.name || 'user'}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-44 p-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-sm"
                >
                  <User2 className="w-4 h-4" />
                  View Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-sm text-red-500 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
