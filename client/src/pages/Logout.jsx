import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../svgs/Loader";
export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleLogout() {
      const result = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(result)) {
        toast.success(result.payload);
        navigate("/");
      } else {
        toast.error(result.payload);
      }
    }
    handleLogout();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center w-full h-screen gap-2">
      <span><Loader color="#181c1e" className="animate-spin w-7" /></span>
      <span className="txt-lg">Please wait...</span>
    </div>
  );
}
