"use client";
import React, { useState } from "react";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { RiImageAddFill } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useModal } from "@/context/ModalContext";
const { Dragger } = Upload;

const UploadFiles: React.FC = () => {
  const [images, setImages] = useState<{ title: string; url: string }[]>([]);
  const { setOpen, setRefresh, refresh } = useModal();

  const uploadToCloudinary = async (file: File) => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "Image_gallery"
    );
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dbrceqag4"
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    setImages((prev) => [
      ...prev,
      { title: data.original_filename, url: data.secure_url },
    ]);
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    beforeUpload(file) {
      uploadToCloudinary(file);
    },
  };

  const handleSubmit = () => {
    if (!images.length) return toast.error("Please upload at least one image");
    const existingImages = JSON.parse(
      localStorage.getItem("uploadedImages") || "[]"
    );
    localStorage.setItem(
      "uploadedImages",
      JSON.stringify([...existingImages, ...images])
    );
    setRefresh(!refresh);
    toast.success("Images uploaded successfully");
    setOpen(false);
    setImages([]);
  };

  return (
    <React.Fragment>
      <Dragger
        showUploadList={false}
        style={{
          border: "2px dashed #80EEB4",
          fontFamily: "var(--font-nunito)",
        }}
        {...props}
      >
        <RiImageAddFill className="text-3xl mx-auto mb-1" />
        <p>Click or drag file to this area to upload</p>
        <p className="font-medium">or</p>
        <Upload {...props}>
          <Button
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              "&:hover": { opacity: "0.8" },
              textTransform: "capitalize",
              fontWeight: "semibold",
              padding: "4px 16px",
              fontFamily: "var(--font-nunito)",
            }}
          >
            <MdOutlineFileUpload className="text-xl" /> Click to Upload
          </Button>
        </Upload>
      </Dragger>

      <div className="mt-7 flex justify-end">
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: "var(--primary-color)",
            color: "white",
            "&:hover": { opacity: "0.8" },
            textTransform: "capitalize",
            fontWeight: "semibold",
            padding: "4px 16px",
            fontFamily: "var(--font-nunito)",
          }}
        >
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
};

export default UploadFiles;
