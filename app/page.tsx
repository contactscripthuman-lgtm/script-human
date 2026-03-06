import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesGrid from "@/components/FeaturesGrid";
import StopDetectingSection from "@/components/StopDetectingSection";
import HomeTestimonials from "@/components/HomeTestimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import TrustHubPromo from "@/components/TrustHubPromo";
import TruthVsTech from "@/components/TruthVsTech";
import WebToolPromo from "@/components/WebToolPromo";
import SpecializedToolsPromo from "@/components/SpecializedToolsPromo";
import MediaVerifierPromo from "@/components/MediaVerifierPromo";

const faqItems = [
  {
    question: "How does ScriptHuman work?",
    answer: "ScriptHuman uses advanced algorithms to analyze and humanize AI-generated content, making it indistinguishable from human writing while maintaining authenticity and bypassing AI detectors."
  },
  {
    question: "Is my content secure?",
    answer: "Yes! We take privacy seriously. Your content is processed securely and is never stored or shared. All processing happens in real-time and data is immediately deleted after processing."
  },
  {
    question: "What's the difference between Free and Pro?",
    answer: "Free users get basic humanization features with limited usage. Pro users get unlimited access, priority processing, advanced customization options, API access, and premium support."
  },
  {
    question: "Can I use this for academic writing?",
    answer: "While our tool can help improve writing quality, we strongly encourage ethical use. Always follow your institution's guidelines and use our tool as a writing assistant, not a replacement for original work."
  },
  {
    question: "How accurate is the AI detection?",
    answer: "Our Media Verifier achieves 90%+ accuracy for obvious AI content and 60-70% for professional AI-generated images. We use a 7-layer detection system that analyzes metadata, noise patterns, textures, and more."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      <StopDetectingSection />
      <FeaturesGrid />
      <TruthVsTech />
      <TrustHubPromo />
      <WebToolPromo />
      <SpecializedToolsPromo />
      <HomeTestimonials />
      <MediaVerifierPromo />
      <Pricing />
      <FAQ items={faqItems} theme="orange" />
    </div>
  );
}
