"use client";
import { useEffect, useState } from "react";
import { Modal, ModalBody } from "@/components/ui/Modal";
import { VanishInput } from "@/components/ui/VanishInput";
import ImageCard from "@/components/ImageCard";
import ModalTriggerButton from "@/components/ui/ModalTriggerButton";
import UploadFiles from "@/components/UploadFiles";
import { useModal } from "@/context/ModalContext";
import { CiImageOn } from "react-icons/ci";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MagnifyingGlass } from "react-loader-spinner";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import lottieAnimation from "@/assets/AnimationEmpty.json";
import dynamic from "next/dynamic";

const GallerySection = () => {
  const placeholders = [
    "Upload your image here",
    "Search your image gallery",
    "Preview image before upload",
    "Drag and drop image",
  ];
  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [ImagesShow, setImagesShow] = useState<number>(1);
  const imagesPerPage = 8;
  const { refresh } = useModal();
  const [images, setImages] = useState<{ url: string; title: string }[]>([]);
  const [displayedData, setDisplayedData] = useState<
    { url: string; title: string }[]
  >([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm("");
  };

  const totalPages = Math.ceil(
    images.filter((img) => img.title.toLowerCase().includes(searchTerm))
      .length / imagesPerPage
  );

  useEffect(() => {
    setLoading(true);
    const savedImages = JSON.parse(
      localStorage.getItem("uploadedImages") || "[]"
    );
    setImages(savedImages);
    setLoading(false);
  }, [refresh]);

  useEffect(() => {
    setLoading(true);
    const startIndex = (ImagesShow - 1) * imagesPerPage;
    const endIndex = ImagesShow * imagesPerPage;
    const filteredImages = images.filter((img) =>
      img.title.toLowerCase().includes(searchTerm)
    );
    setDisplayedData(filteredImages.slice(startIndex, endIndex));
    setLoading(false);
  }, [images, ImagesShow, searchTerm]);

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <VanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <Modal>
          <ModalTriggerButton
            title="Upload"
            icon={<CiImageOn />}
            className="bg-white border border-[var(--primary-color)] text-[var(--primary-color)]"
          />
          <ModalBody>
            <UploadFiles />
          </ModalBody>
        </Modal>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#16A34A"
          />
        </div>
      ) : displayedData.length === 0 ? (
        <div className="flex flex-col items-center">
          <Lottie
            animationData={lottieAnimation}
            loop
            className="w-full h-72"
            autoplay
          />
          <div className="text-center -mt-5">
            <h2 className="text-xl font-bold pb-1">No images found</h2>
            <p>Try uploading some images to get started.</p>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-8">
          {displayedData.map((image, index) => (
            <ImageCard key={index} url={image?.url} title={image.title} />
          ))}
        </div>
      )}

      {/* pagination */}
      <div className="flex justify-center mt-4 xl:mt-0 gap-4">
        <button
          onClick={() => {
            if (ImagesShow > 1) setImagesShow((prev) => prev - 1);
          }}
          className={`${
            ImagesShow === 1 ? "bg-[#16A34A66]" : "bg-[#16A34A33]"
          }  border-[#16A34A] border-2 rounded-full p-2`}
        >
          <GrFormPrevious className="text-xl text-[#16A34A]" />
        </button>
        <button
          onClick={() => {
            if (ImagesShow < totalPages) setImagesShow((prev) => prev + 1);
          }}
          className={`${
            ImagesShow === totalPages ? "bg-[#16A34A66]" : "bg-[#16A34A33]"
          }  border-[#16A34A] border-2 rounded-full p-2`}
        >
          <GrFormNext className="text-xl text-[#16A34A]" />
        </button>
      </div>
    </section>
  );
};

export default GallerySection;
