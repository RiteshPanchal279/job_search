import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Job<span className="text-[#ff230f]">Hunter</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-6 font-medium text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-[#ff230f] transition">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-[#ff230f] transition">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#ff230f] transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#ff230f] transition">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-[#ff230f] transition">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#ff230f] hover:bg-[#e0663d] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 py-2 items-center">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user.profile.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  {user.role === "student" && (
                    <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-[#ff230f] transition">
                      <User2 className="w-4 h-4" />
                      View Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-sm border-t">
          <ul className="flex flex-col gap-3 font-medium text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" onClick={() => setMenuOpen(false)}>Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
                </li>
                <li>
                  <Link to="/browse" onClick={() => setMenuOpen(false)}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {!user ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-[#ff230f] hover:bg-[#e0663d] text-white">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {user.role === "student" && (
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    <Button variant="ghost" className="w-full flex gap-2 justify-start">
                      <User2 className="w-4 h-4" /> View Profile
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={() => {
                    logoutHandler();
                    setMenuOpen(false);
                  }}
                  variant="ghost"
                  className="w-full flex gap-2 justify-start text-red-600"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
