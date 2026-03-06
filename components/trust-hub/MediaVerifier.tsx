"use client";

import { useState } from "react";
import { Upload, FileImage, FileVideo, Sparkles, X, Smartphone, Camera, User, Bot, Download, AlertCircle } from "lucide-react";
import { AIMediaDetector } from "@/lib/trust-hub/ai-media-detector";
import { MediaAnalysisResult } from "@/lib/trust-hub/media-types";
import MediaAnalysisResultDisplay from "./MediaAnalysisResult";

interface MediaVerifierProps {
    isPremium?: boolean;
    onUpgrade?: () => void;
}

export default function MediaVerifier({ isPremium = false, onUpgrade }: MediaVerifierProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<MediaAnalysisResult | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [contentType, setContentType] = useState<'phone' | 'professional' | 'selfie' | 'ai' | 'download' | null>(null);
    const [strictMode, setStrictMode] = useState(true);

    const handleFile = (selectedFile: File) => {
        if (!isPremium && onUpgrade) {
            onUpgrade();
            return;
        }
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
        if (!validTypes.includes(selectedFile.type)) {
            alert('Please upload an image (JPEG, PNG, WebP) or video (MP4, WebM)');
            return;
        }

        const maxSize = selectedFile.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
        if (selectedFile.size > maxSize) {
            alert(`File too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
            return;
        }

        setFile(selectedFile);
        setResult(null);
        setContentType(null);

        if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target?.result as string);
            reader.readAsDataURL(selectedFile);
        } else if (selectedFile.type.startsWith('video/')) {
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isPremium) return;
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (!isPremium && onUpgrade) {
            onUpgrade();
            return;
        }

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!isPremium && onUpgrade) {
            onUpgrade();
            return;
        }
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (!isPremium && onUpgrade) {
            onUpgrade();
            return;
        }
        if (!file || !contentType) return;

        setIsAnalyzing(true);
        try {
            const detector = new AIMediaDetector();
            if (file.type.startsWith('image/')) {
                const analysisResult = await detector.detectImage(file, contentType, strictMode);
                setResult(analysisResult);
            } else {
                alert('Video analysis is under development. Please upload an image for now.');
                setIsAnalyzing(false);
                return;
            }
        } catch (error) {
            console.error('Analysis error:', error);
            alert('Failed to analyze media. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setContentType(null);
    };

    const contentTypes = [
        { id: 'phone' as const, icon: Smartphone, label: 'Phone Camera', desc: 'Mobile photo (may lack metadata)' },
        { id: 'professional' as const, icon: Camera, label: 'Professional Camera', desc: 'DSLR/Mirrorless with EXIF' },
        { id: 'selfie' as const, icon: User, label: 'Selfie', desc: 'Front camera or portrait' },
        { id: 'ai' as const, icon: Bot, label: 'AI Generated', desc: 'Suspected AI image' },
        { id: 'download' as const, icon: Download, label: 'Downloaded/Screenshot', desc: 'Saved from web or social media' },
    ];

    return (
        <div className="space-y-8 relative">

            {/* Strict Mode Toggle - Full Width Above */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                        <input
                            type="checkbox"
                            checked={strictMode}
                            onChange={(e) => setStrictMode(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 flex items-center gap-2">
                            {strictMode ? '🔒' : '🔓'} Strict Mode {strictMode ? 'ON' : 'OFF'}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-white mb-2">
                            {strictMode ? (
                                <>
                                    <strong className="text-emerald-700">ENABLED:</strong> Any image without camera EXIF metadata will be automatically flagged as AI-generated. Recommended for detecting modern AI tools.
                                </>
                            ) : (
                                <>
                                    <strong className="text-amber-700">DISABLED:</strong> Uses pixel analysis combined with metadata. May miss professional AI images but won&apos;t false-flag real photos that lost metadata.
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid Layout: Media Analysis (Left 2/3) + Disclaimer (Right 1/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Media Analysis Section - Left (2/3 width) */}
                <div className="lg:col-span-2">
                    <div className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/60 p-8 shadow-xl h-full">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                    <Sparkles size={20} />
                                </div>
                                <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">Media Analysis</h2>
                            </div>
                            {file && (
                                <button
                                    onClick={handleReset}
                                    className="text-sm text-gray-500 dark:text-white hover:text-gray-700 flex items-center gap-1"
                                >
                                    <X size={16} /> Clear
                                </button>
                            )}
                        </div>

                        {!file ? (
                            <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => {
                                    if (!isPremium && onUpgrade) {
                                        onUpgrade();
                                    }
                                }}
                                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${dragActive
                                    ? 'border-emerald-500 bg-emerald-50/50'
                                    : 'border-gray-300 bg-gray-50 hover:border-emerald-400'
                                    } ${!isPremium ? 'cursor-pointer' : ''}`}
                            >
                                <Upload className="mx-auto mb-4 text-gray-400 dark:text-white" size={48} />
                                <p className="text-lg font-bold text-gray-700 dark:text-white mb-2">Drop your media here</p>
                                <p className="text-sm text-gray-500 dark:text-white mb-4">or click to browse</p>
                                <label
                                    onClick={(e) => {
                                        if (!isPremium && onUpgrade) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onUpgrade();
                                        }
                                    }}
                                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                                    <FileImage size={18} />
                                    Choose File
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/jpeg,image/jpg,image/png,image/webp,video/mp4,video/webm"
                                        onChange={handleChange}
                                    />
                                </label>
                                <p className="text-xs text-gray-400 dark:text-white mt-4">
                                    Supports: JPEG, PNG, WebP, MP4, WebM (max 10MB for images, 50MB for videos)
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Preview */}
                                <div className="bg-gray-100 rounded-2xl p-4 flex items-center justify-center h-64 overflow-hidden">
                                    {preview ? (
                                        file.type.startsWith('image/') ? (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="max-h-full max-w-full object-contain rounded-lg"
                                            />
                                        ) : (
                                            <video
                                                src={preview}
                                                controls
                                                className="max-h-full max-w-full rounded-lg"
                                            />
                                        )
                                    ) : (
                                        <div className="text-gray-400 dark:text-white">Loading preview...</div>
                                    )}
                                </div>

                                {/* File Info */}
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    {file.type.startsWith('image/') ? (
                                        <FileImage className="text-emerald-600" size={24} />
                                    ) : (
                                        <FileVideo className="text-emerald-600" size={24} />
                                    )}
                                    <div className="flex-1">
                                        <p className="font-bold text-sm text-gray-900 dark:text-white">{file.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-white">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>

                                {/* Content Type Selector */}
                                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                        <Sparkles className="text-emerald-600" size={20} />
                                        What type of image is this?
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-white mb-4">
                                        Select the source to optimize analysis accuracy
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {contentTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => setContentType(type.id)}
                                                className={`group flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${contentType === type.id
                                                    ? 'border-emerald-500 bg-white shadow-lg scale-[1.02] ring-2 ring-emerald-100'
                                                    : 'border-gray-200 bg-white/50 hover:border-emerald-300 hover:bg-white hover:shadow-md'
                                                    }`}
                                            >
                                                <div className={`p-2.5 rounded-lg transition-all ${contentType === type.id
                                                    ? 'bg-emerald-100 text-emerald-600'
                                                    : 'bg-gray-100 text-gray-500 dark:text-white group-hover:bg-emerald-50 group-hover:text-emerald-500'
                                                    }`}>
                                                    <type.icon size={18} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-semibold text-sm text-gray-900 dark:text-white">{type.label}</div>
                                                    <div className="text-xs text-gray-500 dark:text-white mt-0.5 leading-tight">{type.desc}</div>
                                                </div>
                                                {contentType === type.id && (
                                                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Analyze Button */}
                                {!result && (
                                    <button
                                        onClick={handleAnalyze}
                                        disabled={isAnalyzing || !contentType}
                                        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${isAnalyzing || !contentType
                                            ? 'bg-gray-100 text-gray-400 dark:text-white cursor-not-allowed'
                                            : 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]'
                                            }`}
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <Sparkles className="animate-spin w-5 h-5" />
                                                Analyzing Media...
                                            </>
                                        ) : (
                                            <>
                                                Run 7-Layer Analysis
                                                <Sparkles className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Disclaimer Section - Right (1/3 width) */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 h-full sticky top-4">
                        <div className="flex gap-2.5 mb-3">
                            <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                            <h3 className="font-bold text-gray-900 dark:text-white text-base">Detection Limitations</h3>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-white mb-3 leading-relaxed">
                            Browser-based detection works best for obvious AI artifacts. Modern AI tools create highly realistic images that are difficult to detect without server-side ML.
                        </p>
                        <div className="bg-white/70 rounded-lg p-3 space-y-1.5">
                            <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">For Best Results:</p>
                            <ul className="text-xs text-gray-700 dark:text-white space-y-1 ml-0.5 leading-relaxed">
                                <li className="flex items-start gap-1.5"><span className="flex-shrink-0">✅</span><span>Use <strong>Strict Mode</strong> for suspected AI</span></li>
                                <li className="flex items-start gap-1.5"><span className="flex-shrink-0">✅</span><span>Select <strong>&quot;AI Generated&quot;</strong> type</span></li>
                                <li className="flex items-start gap-1.5"><span className="flex-shrink-0">✅</span><span>Missing camera metadata = AI</span></li>
                                <li className="flex items-start gap-1.5"><span className="flex-shrink-0">⚠️</span><span>60-70% accuracy for pro AI</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            {result && <MediaAnalysisResultDisplay result={result} />}
        </div>
    );
}
