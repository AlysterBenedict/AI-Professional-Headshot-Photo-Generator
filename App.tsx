
import React, { useState, useCallback, useRef } from 'react';
import { HeadshotStyle } from './types';
import { STYLES } from './constants';
import { generateHeadshot } from './services/geminiService';

const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const Spinner: React.FC = () => (
  <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
);

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onImageUpload(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex flex-col items-center justify-center w-full max-w-lg h-80 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon />
          <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
        </div>
        <input ref={inputRef} id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} disabled={isLoading} />
      </div>
    </div>
  );
};

interface StyleSelectorProps {
  onStyleSelect: (style: HeadshotStyle) => void;
  isLoading: boolean;
  selectedStyleId?: string | null;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ onStyleSelect, isLoading, selectedStyleId }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-200">2. Choose Your Style</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style)}
            disabled={isLoading}
            className={`relative p-2 border-2 rounded-lg overflow-hidden transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedStyleId === style.id && isLoading ? 'border-blue-500' : 'border-gray-600 hover:border-blue-500'
            }`}
          >
            <img src={style.thumbnailUrl} alt={style.name} className="w-full h-24 object-cover rounded-md" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-semibold text-center text-sm">{style.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<{ file: File, url: string } | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(null);

  const handleImageUpload = (file: File) => {
    handleReset();
    setOriginalImage({ file, url: URL.createObjectURL(file) });
  };

  const handleGenerateHeadshot = useCallback(async (style: HeadshotStyle) => {
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);
    setSelectedStyle(style);

    try {
      const resultUrl = await generateHeadshot(originalImage.file, style.prompt);
      setGeneratedImageUrl(resultUrl);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
      setSelectedStyle(null);
    }
  }, [originalImage]);

  const handleReset = () => {
    setOriginalImage(null);
    setGeneratedImageUrl(null);
    setIsLoading(false);
    setError(null);
    setSelectedStyle(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            AI Headshot Photographer
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            Upload a selfie, choose a style, and get a professional headshot in seconds.
          </p>
        </header>

        {!originalImage && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-gray-200">1. Upload Your Selfie</h2>
            <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
          </div>
        )}

        {originalImage && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-200">1. Your Photo</h2>
                <div className="relative">
                  <img src={originalImage.url} alt="User selfie" className="rounded-lg w-full object-contain max-h-[400px]" />
                  <button onClick={handleReset} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors text-sm">
                    Start Over
                  </button>
                </div>
              </div>
              <StyleSelector onStyleSelect={handleGenerateHeadshot} isLoading={isLoading} selectedStyleId={selectedStyle?.id} />
            </div>

            {/* Right Column */}
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-gray-200">3. Your AI Headshot</h2>
              <div className="bg-gray-800 rounded-lg aspect-square w-full flex items-center justify-center border-2 border-gray-700">
                {isLoading ? (
                  <div className="text-center">
                    <Spinner />
                    <p className="mt-4 text-gray-300">Generating with {selectedStyle?.name}...</p>
                    <p className="text-sm text-gray-500">This can take a moment.</p>
                  </div>
                ) : generatedImageUrl ? (
                  <img src={generatedImageUrl} alt="Generated headshot" className="rounded-lg w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-gray-500">
                    <p>Your generated headshot will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

      </div>
       <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Gemini. For demonstration purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
