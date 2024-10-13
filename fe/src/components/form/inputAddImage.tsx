import React, { useState, useRef } from "react";
import clsx from "clsx";
import Button from "../button/classic-button";
type AddImageProps = {
    setPicture: (url: File) => void;

};
export default function AddImage({ setPicture }: AddImageProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [imageError, setImageError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file));
      setImageError(null);
      setPicture(file);
    } else {
      setImageError("Please select an image.");
    }
  };

  const handleSubmit = () => {
    const picture = imageURL;
    console.log("Picture URL:", picture);
  };

  return (
    <div>
      <ul>
        <li>
          <h5 className="text-lg text-textUnfocus mb-5">
            You'll need 1 photo to get started
          </h5>
          {imageError && (
            <div className="mt-3 text-red-500 font-medium flex items-center border border-red-500 rounded-lg p-3 mb-5 elevation-shadow-2">
              <span>{imageError}</span>
            </div>
          )}
          <div
            className={clsx(
              `w-full min-h-[200px] border border-borderDefault rounded-xl bg-slate-100 p-10`,
              !image && "flex items-center justify-center"
            )}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={inputRef}
            />
            {!image && (
              <Button
                type="button"
                intent={"primary"}
                rounded={"regular"}
                onClick={() => {
                  inputRef.current!.click();
                }}
              >
                Add image
              </Button>
            )}
            {image && (
              <div className="flex flex-col items-center">
                <img
                  src={imageURL}
                  alt="Uploaded"
                  className="max-w-full max-h-[400px] rounded-lg mt-5"
                />
                <Button
                  type="button"
                  intent={"secondary"}
                  rounded={"regular"}
                  onClick={() => {
                    inputRef.current!.click();
                  }}
                >
                  Change image
                </Button>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
