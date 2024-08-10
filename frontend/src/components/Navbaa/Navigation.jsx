import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { IoIosHome } from "react-icons/io";
import { FiActivity } from "react-icons/fi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { MdOutlineContactSupport } from "react-icons/md";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => (
  <motion.ul className="ul" variants={variants}>
    
      <MenuItem icon={<IoIosHome/> } link={'/'} i={"Home"} />
      <MenuItem icon={<FiActivity/> } link={'/activity'} i={"Your Activities"}  />
      <MenuItem icon={<FaCloudUploadAlt/> } link={'/add/notes'} i={"Share Files"} />
      <MenuItem icon={ <RiRobot2Line/>} link={'/chatbot'} i={"Try AI"} />
      <MenuItem icon={<MdOutlineContactSupport/> } link={'/'} i={"Contact"} />
   
  </motion.ul>
);

const itemIds = ["Home","Your Activity","Share Files","Try AI","Contact"];