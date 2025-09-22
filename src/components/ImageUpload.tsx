"use client";

import { useState, useRef } from "react";
import { FiX, FiImage } from "react-icons/fi";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (base64: string) => void;
  alt: string;
  onAltChange: (alt: string) => void;
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  alt,
  onAltChange,
  className = "",
}: ImageUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
        );
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error("File too large. Maximum size is 5MB.");
      }

      // Convert file to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        onChange(base64String);

        // Auto-generate alt text from filename if not provided
        if (!alt) {
          const fileName = file.name.split(".")[0];
          onAltChange(fileName.replace(/[-_]/g, " "));
        }
        setIsProcessing(false);
      };

      reader.onerror = () => {
        throw new Error("Failed to read file");
      };

      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process file");
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = () => {
    onChange("");
    onAltChange("");
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200
          ${
            value
              ? "border-gray-300"
              : "border-gray-400 hover:border-orange-500 hover:bg-orange-50"
          }
          ${isProcessing ? "pointer-events-none opacity-50" : "cursor-pointer"}
        `}
        onClick={() => !value && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isProcessing}
        />

        {value ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <Image
                src={value}
                alt={alt || "Uploaded image"}
                width={200}
                height={150}
                className="rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
              >
                <FiX className="w-3 h-3" />
              </button>
            </div>
            <div className="text-sm text-gray-600">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-orange-600 hover:text-orange-700 underline"
                disabled={isProcessing}
              >
                Replace image
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 text-gray-400">
              {isProcessing ? (
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FiImage className="w-12 h-12" />
              )}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isProcessing ? "Processing..." : "Upload an image"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, WebP up to 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Alt Text Input */}
      {value && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Alt Text *
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => onAltChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Describe the image for accessibility"
            required
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
