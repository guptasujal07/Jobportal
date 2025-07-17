import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

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
                  <Link to="/profile">View Profile</Link>
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
