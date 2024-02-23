import { Fragment, useContext, useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import myContext from "../../context/data/myContext";
import {
  AiOutlineShareAlt,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillGithub,
  AiFillFacebook,
  AiFillTwitterCircle
} from "react-icons/ai";

export default function ShareDialogBox() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const context = useContext(myContext);
  const { mode } = context;
  return (
    <Fragment>
      <div className="ml-auto">
        <AiOutlineShareAlt
          onClick={handleOpen}
          style={{ color: mode === "dark" ? "white" : "black" }}
          size={20}
        />
      </div>
      {/* Dialog  */}
      <Dialog
        className=" relative right-[1em] w-[25em]  md:right-0 md:w-0 lg:right-0 lg:w-0"
        open={open}
        handler={handleOpen}
        style={{
          background: mode === "light" ? "#2f3542" : "#2f3542",
          color: mode === "dark" ? "white" : "black",
        }}
      >
        {/* DialogBody  */}
        <DialogBody>
          <div className="flex justify-center flex-wrap  sm:mx-auto sm:mb-2 -mx-2  mt-4 mb-2 ">
            {/* main  */}
            <div className="">
              <div className="flex gap-3">
                {/* Linkedin Icon  */}
                <div className="">
                  <a href="https://www.linkedin.com/in/peace-fuse-1332842b6/" target="_blank" rel="noopener noreferrer">
                    <AiFillLinkedin
                      size={35}
                      style={{
                        color: mode === "dark" ? "white" : "white",
                      }}
                    />
                  </a>
                </div>

                {/* Twitter Icon  */}
                <div className="https://twitter.com/FusePeace2024" target="_blank" rel="noopener noreferrer">
                  <a href="">
                    <AiFillTwitterCircle
                      size={35}
                      style={{
                        color: mode === "dark" ? "white" : "white",
                      }}
                    />
                  </a>
                </div>

                {/* Facebook Icon  */}
                <div className="">
                  <a href="https://www.facebook.com/profile.php?id=61556807274425" target="_blank" rel="noopener noreferrer">
                    <AiFillFacebook
                      size={35}
                      style={{
                        color: mode === "dark" ? "white" : "white",
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className=" text-center">
            <h1 className=" text-gray-600">Share your complaint</h1>
          </div>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}
