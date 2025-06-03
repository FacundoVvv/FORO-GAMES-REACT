import React from "react";
import { HiX, HiOutlineDocumentText } from "react-icons/hi";

export const ModalCard = ({selectedPost, closeModal}) => {
    if(!selectedPost) return null;
  
    return (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 shadow-2xl relative animate-fadeIn border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition text-2xl"
            >
              <HiX />
            </button>
    
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <HiOutlineDocumentText className="text-purple-600 text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedPost.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedPost.author.name} •{" "}
                  {new Date(selectedPost.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
    
            {/* Content */}
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
              {selectedPost.description}
            </div>
          </div>
        </div>
      );
}