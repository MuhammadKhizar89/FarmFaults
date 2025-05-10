import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, deleteUser, updateUserAvatar } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../svgs/Loader";
import Edit from "../components/account/Edit";
import getRandomDarkColor from "../utils/randomColor";
import useCloudinary from "../hooks/useCloudinary";

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uploadImage, deleteImage } = useCloudinary();

  const { user, loading, uploadingAvatar } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  async function handleDeleteUser() {
    const result = await dispatch(deleteUser());
    if (deleteUser.fulfilled.match(result)) {
      toast.success(result.payload);
      navigate("/");
    } else {
      toast.error(result.payload);
    }
  }

  async function handleUploadAvatar(event) {
    const file = event.target.files[0];
    if (user.avatar !== "N/A") {
      await deleteImage(user.avatar);
    }
    const { success, imageUrl } = await uploadImage(file);
    if (success) {
      const result = await dispatch(updateUserAvatar(imageUrl));
      if (updateUserAvatar.fulfilled.match(result)) {
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(result.payload);
      }
    } else {
      toast.error("Failed to upload image");
    }
  }

  if (loading || !user) {
    return (
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <Loader color="#181C1E" className="w-10 h-10 animate-spin" />
        <h1 className="heading txt py-3">Loading...</h1>
      </div>
    );
  }

  return (
    <main className="bg-primary py-10 w-full">
      <h1 className="promoTest font-semibold text-[36px] mx-2 md:ml-10">
        Account settings
      </h1>

      <div
        className="w-[200px] aspect-square relative rounded-full mx-auto flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: user.avatar === "N/A" ? getRandomDarkColor(user.firstName[0]) : "",
        }}
      >
        {uploadingAvatar && (
          <div className="absolute top-0 bg-black/50 left-0 w-full h-full flex items-center justify-center">
            <Loader color="#fff" className="w-[100px] animate-spin duration-[5000ms]" />
          </div>
        )}
        {user.avatar === "N/A" ? (
          <span className="text-[120px] text-white">{user.firstName[0]}</span>
        ) : (
          <img src={user.avatar} className="w-full h-full object-cover" />
        )}
        <div
          className={`w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 ${
            !uploadingAvatar && "hover:bg-black/50"
          } flex items-center justify-center`}
        >
          {!uploadingAvatar && (
            <>
              <Edit className="w-[100px]" />
              <input
                className="absolute top-0 left-0 w-full h-full opacity-0"
                type="file"
                name="avatar-upload"
                accept="image/*"
                id="avatar-upload"
                onChange={handleUploadAvatar}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-[30px] mt-10 max-w-[728px] justify-center mx-auto px-2 md:px-0">
        <div className="flex flex-col gap-[3.9px] w-[349px]">
          <label htmlFor="first-name" className="poppins text-[13.66px]">
            First Name
          </label>
          <input
            type="text"
            className="w-full bg-transparent border poppins border-tertiary rounded-[5px] p-2 focus:outline-none"
            value={user.firstName}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-[3.9px] w-[349px]">
          <label htmlFor="last-name" className="poppins text-[13.66px]">
            Last Name
          </label>
          <input
            type="text"
            className="w-full bg-transparent border poppins border-tertiary rounded-[5px] p-2 focus:outline-none"
            value={user.lastName}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-[3.9px] w-[349px]">
          <label htmlFor="email-phone" className="poppins text-[13.66px]">
            Email
          </label>
          <input
            type="email"
            className="w-full bg-transparent border poppins border-tertiary rounded-[5px] p-2 focus:outline-none"
            value={user.email}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-[3.9px] w-[349px]">
          <label htmlFor="dob" className="poppins text-[13.66px]">
            Date of birth <span className="text-[10px]">(MM/DD/YY)</span>
          </label>
          <input
            type="text"
            className="w-full bg-transparent border poppins border-tertiary rounded-[5px] p-2 focus:outline-none"
            value={user.dob}
            readOnly
          />
        </div>
        <div className="w-[349px]" />
        <div className="flex flex-col gap-5 items-start w-full mx-auto md:mx-0">
          <button
            onClick={handleDeleteUser}
            className="bg-tertiary w-full md:w-[349px] rounded-[5px] py-3 text-center poppins text-[13.66px] font-semibold text-white"
          >
            {loading ? (
              <Loader color="#fff" className="w-[20px] h-[20px] mx-auto" />
            ) : (
              "Delete Account"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
