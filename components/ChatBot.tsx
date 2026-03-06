"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    link?: string;
    linkText?: string;
}

const suggestionQuestions = [
    {
        id: 'pricing',
        text: "What are the pricing plans?",
        answer: "We offer flexible pricing starting with a Free plan. Pro plans unlock unlimited humanization and advanced features.",
        link: "/#pricing",
        linkText: "View Pricing"
    },
    {
        id: 'tool_info',
        text: "How does the tool work?",
        answer: "ScriptHuman uses advanced linguistics algorithms to rewrite AI text into natural, human-sounding prose that bypasses detectors.",
        link: "/#features",
        linkText: "See Features"
    },
    {
        id: 'security',
        text: "Is my data secure?",
        answer: "Yes, absolutely! We prioritize your privacy. Your content is processed securely in real-time and is never stored or shared.",
        link: "/trust-hub",
        linkText: "Visit Trust Hub"
    }
];

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi there! I'm your ScriptHuman assistant. How can I help you humanize your content today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleSendMessage = async (text: string = inputValue) => {
        if (!text.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            let botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "",
                sender: 'bot',
                timestamp: new Date()
            };

            // Check if it matches a suggestion
            const suggestion = suggestionQuestions.find(q => q.text === text);
            if (suggestion) {
                botResponse.text = suggestion.answer;
                botResponse.link = suggestion.link;
                botResponse.linkText = suggestion.linkText;
            } else {
                // Default random responses
                const botResponses = [
                    "That's a great question! ScriptHuman uses advanced algorithms to refine your text.",
                    "I can verify that for you. Our detection engine runs a 7-layer analysis.",
                    "To get started, try pasting your text in the 'Humanizer' tool above!",
                    "We offer both Free and Pro plans to suit your needs.",
                    "Absolutely! We prioritize your privacy and data security."
                ];
                botResponse.text = botResponses[Math.floor(Math.random() * botResponses.length)];
            }

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-auto bg-white w-[350px] md:w-[380px] h-[550px] rounded-2xl shadow-2xl border border-gray-100 flex flex-col mb-4 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                    <Bot size={18} className="text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm font-display">ScriptHuman Support</h3>
                                    <p className="text-[10px] text-gray-300 dark:text-white flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${msg.sender === 'user'
                                        ? 'bg-orange-100 text-orange-600'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                                    </div>
                                    <div className={`max-w-[85%] flex flex-col items-start gap-2`}>
                                        <div className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-[#E86C45] text-white rounded-2xl rounded-br-none'
                                            : 'bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        {msg.link && msg.linkText && (
                                            <Link
                                                href={msg.link}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg hover:bg-orange-100 transition-colors border border-orange-100"
                                            >
                                                {msg.linkText}
                                                <ChevronRight size={12} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex items-start gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                        <Bot size={12} />
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Suggestions List (Only show if last message is from bot and not typing) */}
                            {!isTyping && messages[messages.length - 1].sender === 'bot' && (
                                <div className="pl-8 flex flex-col gap-2 mt-2">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Suggested Questions</p>
                                    {suggestionQuestions.map((q) => (
                                        <button
                                            key={q.id}
                                            onClick={() => handleSendMessage(q.text)}
                                            className="text-left px-3 py-2 bg-white border border-gray-200 hover:border-orange-300 hover:text-orange-600 rounded-lg text-xs font-medium text-gray-600 transition-colors shadow-sm w-fit"
                                        >
                                            {q.text}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Type a message..."
                                    className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="mt-2 text-center">
                                <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                                    <Sparkles size={8} />
                                    Powered by ScriptHuman AI
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto w-14 h-14 bg-[#E86C45] rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center text-white hover:bg-[#d65a34] transition-colors relative group"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={26} />}

                {/* Notification Dot */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full" />
                )}
            </motion.button>
        </div>
    );
}
