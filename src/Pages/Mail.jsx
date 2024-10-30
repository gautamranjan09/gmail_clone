import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { BiArchiveIn } from "react-icons/bi";
import { IoMdArrowBack, IoMdMore } from "react-icons/io";
import {
  MdDeleteOutline,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdOutlineWatchLater,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

const Mail = () => {
  const selectedMailPath = useSelector((state) => state.navSlice.selectedMailPath);
  const navigate = useNavigate();
  const{ id } = useParams();
  const { emails } = useSelector((state) => state.appSlice);

  // Find the product based on the productId
  const selectedEmail = emails.find((email) => email.id === id);

  const deteteMailById = async (id) => {
    try {
      await deleteDoc(doc(db, "emails" , id));
      navigate(`/${selectedMailPath}`);
    } catch (error) {
      console.log(error);
    }
  }
 
  const iconsButton = [
    { icon: <IoMdArrowBack size={"20px"} />, function:()=>navigate(`/${selectedMailPath}`)},
    { icon: <BiArchiveIn size={"20px"} /> },
    { icon: <MdOutlineReport size={"20px"} /> },
    { icon: <MdDeleteOutline size={"20px"} />, function: ()=> deteteMailById(id) },
    { icon: <MdOutlineMarkEmailUnread size={"20px"} /> },
    { icon: <MdOutlineWatchLater size={"20px"} /> },
    { icon: <MdOutlineAddTask size={"20px"} /> },
    { icon: <MdOutlineDriveFileMove size={"20px"} /> },
    { icon: <IoMdMore size={"20px"} /> },
  ];

  useEffect(() => {
    if (!selectedEmail) {
      // If the selected email does not exist, navigate to inbox
      navigate(`/${selectedMailPath}`);
    }
  },[selectedEmail, navigate])

  if (!selectedEmail) {
    // // If the selected email does not exist, navigate to inbox
    // navigate("/inbox");
    return null; // Prevent rendering the rest of the component
  }
 
  return (
    <div className="flex-1 bg-white/70 rounded-2xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-1 text-gray-700 py-2">
          {iconsButton.map((item, index) => (
            <div
              key={index}
              onClick={item.function}
              style={{ '--delay': `${index * 300}ms` }}
              className="p-2 rounded-full hover:bg-teal-300/30 cursor-pointer transition-all duration-1000 ease-in-out animate-slideIn opacity-0 [animation-delay:var(--delay)]"
            >
              {item.icon}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 animate-slideIn">
            <button className="rounded-full p-1 hover:bg-teal-300/30 transition-all duration-1000 ease-in-out"> <MdKeyboardArrowLeft size={'24px'}/></button>
            <button className="rounded-full p-1 hover:bg-teal-300/30 transition-all duration-1000 ease-in-out"> <MdKeyboardArrowRight size={'24px'}/></button>
        </div>
      </div>
      <div className="h-[78vh] overflow-y-auto p-4 animate-fadeIn">
        <div className="flex items-center justify-between bg-transparent gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">{selectedEmail?.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2">{(selectedMailPath === "inbox" && "inbox") || (selectedMailPath === "sent" && "sent")}</span>
          </div>
          <div className="flex-none text-gray-500 my-5 text-sm">
            <p>{selectedEmail?.createdAt}</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-gray-600">{(selectedMailPath === "inbox" && "from:") || (selectedMailPath === "sent" && "to:")}</span>
          <h1 className="font-medium text-lg text-black">{(selectedMailPath === "inbox" && selectedEmail?.from) || (selectedMailPath === "sent" && selectedEmail?.to)}</h1>
        </div>
        <div className="my-10 custom-list">
          {/* <p>{selectedEmail?.message}</p> */}
          <div
            className="formatted-content"
            dangerouslySetInnerHTML={{ __html: selectedEmail.message }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Mail;
