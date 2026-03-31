'use client';

import { useEffect, useState } from 'react';
import { RefreshCw, Copy, Check, AlertCircle, Edit3, ArrowRight, X, PenTool } from 'lucide-react';

declare var chrome: any;

export default function SidePanel() {
  const [inputText, setInputText] = useState('');
  const [humanizedText, setHumanizedText] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [mood, setMood] = useState('professional');
  const [userTier, setUserTier] = useState('free');
  const [usage, setUsage] = useState(0);

  const closeIframe = () => {
    if (typeof window !== 'undefined') {
      window.parent.postMessage({ action: 'close_scripthuman_iframe' }, '*');
    }
  };

  useEffect(() => {
    // Check if we have text from the content script
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.session) {
      chrome.storage.session.get(['selectedText'], (result: any) => {
        if (result.selectedText) {
          setInputText(result.selectedText);
          chrome.storage.session.remove('selectedText');
        }
      });
      chrome.storage.session.onChanged.addListener((changes: any) => {
          if (changes.selectedText && changes.selectedText.newValue) {
              setInputText(changes.selectedText.newValue);
          }
      });
    }

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['userTier', 'daily_usage', 'usage_reset_date'], (data: any) => {
          const today = new Date().toISOString().split('T')[0];
          let currentUsage = data.daily_usage || 0;
          if (data.usage_reset_date !== today) {
              currentUsage = 0;
              chrome.storage.local.set({ daily_usage: 0, usage_reset_date: today });
          }
          setUsage(currentUsage);
          setUserTier(data.userTier || 'free');
      });
    }
  }, []);

  const handleHumanize = async () => {
    const wordCount = inputText.trim().split(/\s+/).length;
    if (!inputText.trim()) {
      setError("Please paste some text to humanize.");
      return;
    }
    
    // Check Limits
    if (userTier === 'free' && usage + wordCount > 1000) {
      setError("You've reached your daily free limit of 1000 words. Please upgrade to Pro on the web tool!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHumanizedText('');
    setScore(null);

    try {
      const response = await fetch('https://www.scripthuman.com/api/humanize-iterative', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          mood: mood,
          toolType: 'persona'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to humanize text');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setHumanizedText(data.humanizedText);
      setScore(data.score);

      // Update Usage
      const newUsage = usage + wordCount;
      setUsage(newUsage);
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set({ daily_usage: newUsage });
      }

      // Auto-copy
      try {
        await navigator.clipboard.writeText(data.humanizedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error("Failed to copy automatically", err);
      }

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!humanizedText) return;
    navigator.clipboard.writeText(humanizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground w-full p-4 selection:bg-primary-100 selection:text-primary-900">
      
      {/* Promo Banner */}
      <a href="https://www.scripthuman.com" target="_blank" rel="noopener noreferrer" className="block w-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary text-xs font-semibold text-center py-2 mb-4 rounded-lg flex items-center justify-center gap-1">
        Visit ScriptHuman Web Tool for more features <ArrowRight className="w-3 h-3" />
      </a>

      {/* Header */}
      <header className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary p-2 rounded-lg">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">ScriptHuman</h1>
            <p className="text-xs text-gray-500">AI Bypass & Humanizer</p>
          </div>
        </div>
        <button onClick={closeIframe} className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" title="Close Panel">
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Input Section */}
      <section className="flex flex-col gap-3">
        <label className="text-sm font-semibold flex items-center justify-between">
          <span>Original Text</span>
          <select 
            className="text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-2 py-1 outline-none"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="academic">Academic</option>
            <option value="storytelling">Storytelling</option>
          </select>
        </label>
        
        <textarea 
          placeholder="Paste text here or select text on any page..."
          className="w-full resize-none rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all min-h-[120px]"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button 
          onClick={handleHumanize}
          disabled={isLoading || !inputText}
          className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Humanizing...
            </>
          ) : (
            <>
              ✨ Humanize Text
            </>
          )}
        </button>

        {error && (
          <div className="flex flex-col gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-100 dark:border-red-500/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
            {error.includes("upgrade") && (
              <a href="https://www.scripthuman.com/#pricing" target="_blank" rel="noopener noreferrer" className="ml-6 flex items-center gap-1 font-semibold text-primary hover:text-primary-600 underline text-xs">
                View Pro Plans <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

      </section>

      {/* Output Section */}
      {humanizedText && (
        <section className="flex flex-col gap-3 mt-6 border-t pt-6 border-gray-100 dark:border-white/10">
          
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-secondary-600 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              Humanized Result
            </h2>
            {score !== null && (
              <div className="text-xs font-bold px-2 py-1 rounded-full bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400 border border-secondary-200 dark:border-secondary-800">
                Trust Score: {score.toFixed(0)}%
              </div>
            )}
          </div>

          <div className="relative group flex flex-col">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative w-full h-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-xl flex flex-col overflow-hidden shadow-sm">
              <div className="p-4 text-sm leading-relaxed">
                {humanizedText}
              </div>
              
              <div className="p-2 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-black/20 flex justify-between items-center">
                <p className="text-xs text-gray-500 font-medium ml-2">
                  {copied ? "Auto-copied to clipboard!" : ""}
                </p>
                <button 
                  onClick={copyToClipboard}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-md transition-colors text-gray-600 dark:text-gray-300"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-secondary-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Verified Certificate CTA */}
          {score !== null && score >= 75 && (
            <a href="https://www.scripthuman.com/trust-hub" target="_blank" rel="noopener noreferrer" className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-secondary-500 to-emerald-500 hover:from-secondary-600 hover:to-emerald-600 text-white font-medium shadow-sm transition-all flex items-center justify-center gap-2 text-sm">
              <Check className="w-4 h-4" />
              Get Your Verified Certificate
            </a>
          )}

          {/* Grammar Warning and Button */}
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center px-2">
              Please check grammar and don&apos;t use AI tools for that.
            </p>
            <button 
              onClick={() => {
                if (chrome?.storage?.local) {
                  chrome.storage.local.set({ extensionGrammarText: humanizedText }, () => {
                    window.open('https://www.scripthuman.com/writing-room?tool=grammar&loadExtension=true', '_blank');
                  });
                } else {
                  window.open('https://www.scripthuman.com/writing-room?tool=grammar', '_blank');
                }
              }}
              className="w-full py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 dark:bg-black/20 dark:border-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 font-medium shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
            >
              <PenTool className="w-4 h-4 text-primary-500" />
              Grammar Fixing
            </button>
          </div>
        </section>
      )}

    </div>
  );
}
