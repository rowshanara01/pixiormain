"use client";
import { FC, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ModalTriggerButton from "./ui/ModalTriggerButton";
import { Modal, ModalBody } from "./ui/Modal";
import { RiEyeFill } from "react-icons/ri";
import Image from "next/image";
import Swal from "sweetalert2";
import { useModal } from "@/context/ModalContext";

interface ImageCardProps {
  url: string;
  title: string;
}

const ImageCard: FC<ImageCardProps> = ({ url, title }) => {
  const { setRefresh, refresh } = useModal();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (url: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16A34A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const stored = localStorage.getItem("uploadedImages");
        if (stored) {
          const images = JSON.parse(stored);
          const updatedImages = images.filter(
            (img: { title: string; url: string }) => img.url !== url
          );
          localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
          setRefresh(!refresh);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            confirmButtonColor: "#16A34A",
          });
        }
      }
    });
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        className="max-w-2xl w-full h-72 rounded-xl object-full"
        width={0}
        height={0}
        src={url}
        alt={title}
        unoptimized
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black/40 rounded-xl">
          <div className="absolute top-0 right-0 p-2 rounded-lg text-white cursor-pointer">
            <AiFillDelete size={20} onClick={() => handleDelete(url)} />
          </div>
          <Modal>
            <div className="absolute size-fit top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <ModalTriggerButton
                title={"preview"}
                icon={<RiEyeFill />}
                className="bg-white text-black"
              />
            </div>
            <ModalBody>
              <Image
                alt={title}
                src={url}
                width={0}
                height={0}
                className="h-full w-full object-fil rounded-2xl"
                unoptimized
              />
            </ModalBody>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
