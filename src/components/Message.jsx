import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Message = ({ email }) => {
  const navigate = useNavigate();
  const openMail = () => {
    navigate(`/inbox/${email.id}`);
  };
  
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };


  return (
    <div onClick={openMail} className="flex items-start justify-between border-b border-gray-200 px-4 py-2 text-sm cursor-pointer  hover:shadow-md hover:translate-y-1 hover:bg-rose-100 transition-all duration-1000 ease-in-out">
        <div className="flex items-center gap-3">
            <div className="flex-none text-gray-300">
                <MdCropSquare className="w-5 h-5" /> 
                {/* {improve} */}
            </div>
            <div className="flex-none text-gray-300">
                <RiStarLine className="w-5 h-5" />
            </div>
        </div>
        <div className="flex-1 ml-4 flex items-center">
            <p className="text-black font-bold  w-64">{email?.to}</p>
            <p className="text-gray-600 truncate inline-block w-[35rem]"><strong>{email?.subject}</strong>-{stripHtml(email?.message)}</p>
        </div>
        <div className="flex-none text-gray-400 text-sm">
            <p>{email?.createdAt}</p>
        </div>
    </div>
  );
};

export default Message;
