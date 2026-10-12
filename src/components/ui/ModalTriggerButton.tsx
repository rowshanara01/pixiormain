import React from "react";
import { ModalTrigger } from "./Modal";
import { cn } from "@/utils/cn";

interface IProps {
  title: string;
  icon: React.ReactNode;
  className: string;
}

const ModalTriggerButton: React.FC<IProps> = ({ title, icon, className }) => {
  return (
    <ModalTrigger
      className={cn(
        "cursor-pointer flex justify-center group/modal-btn",
        className
      )}
    >
      <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 font-bold">
        {title}
      </span>
      <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-20">
        {icon}
      </div>
    </ModalTrigger>
  );
};

export default ModalTriggerButton;
