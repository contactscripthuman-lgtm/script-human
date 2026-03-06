"use client";

import { useState, useRef, useEffect} from"react";
import { motion, AnimatePresence} from"framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot, HelpCircle} from"lucide-react";
import TypingEffect from"@/components/writing-room/TypingEffect";
import { findAnswer} from"@/lib/chatbot/logic";

// Interface for messages
interface Message {
    id: string;
    text: string;
    sender:"user" |"bot";
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id:"1",
            text:"Hello! I'm ScriptBot. How can I help you today?",
            sender:"bot"
       }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior:"smooth"});
   };

    useEffect(() => {
        scrollToBottom();
   }, [messages, isTyping]);

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chat-widget', handleOpenChat);
        return () => window.removeEventListener('open-chat-widget', handleOpenChat);
   }, []);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender:"user"
       };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate network delay for"thinking"
        setTimeout(() => {
            const answer = findAnswer(userMessage.text);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: answer,
                sender:"bot"
           };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
       }, 1000);
   };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key ==="Enter") {
            handleSend();
       }
   };

    const suggestions = [
       "What is Writing Room?",
       "How much does it cost?",
       "Is it safe?",
       "Contact Support"
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 font-[family-name:var(--font-metro)]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20}}
                        animate={{ opacity: 1, scale: 1, y: 0}}
                        exit={{ opacity: 0, scale: 0.9, y: 20}}
                        className="bg-white rounded-2xl shadow-2xl w-[350px] md:w-[400px] h-[500px] flex flex-col overflow-hidden border border-gray-100 mb-4"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-1.5 rounded-full">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm font-display">ScriptBot Support</h3>
                                    <p className="text-[10px] text-white/80 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender ==="user" ?"justify-end" :"justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender ==="user"
                                            ?"bg-orange-500 text-white rounded-br-none"
                                            :"bg-white text-gray-800 dark:text-white shadow-sm border border-gray-100 rounded-bl-none"
                                           }`}
                                    >
                                        {msg.sender ==="bot" ? (
                                            <TypingEffect text={msg.text} speed={10} />
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-bl-none flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions (Only show provided lists if chat empty or bot just spoke) */}
                        {!isTyping && messages[messages.length - 1].sender ==="bot" && (
                            <div className="px-4 pb-2 bg-gray-50 flex flex-col gap-2 overflow-y-auto max-h-[150px] no-scrollbar">
                                {suggestions.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setInput(s)}
                                        className="w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-500 dark:text-white hover:border-orange-200 hover:text-orange-500 hover:bg-orange-50 transition-colors shadow-sm"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask a question..."
                                    className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-shadow"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="text-[10px] text-center text-gray-300 dark:text-white mt-2 flex items-center justify-center gap-1">
                                <Sparkles size={10} /> Powered by ScriptHuman Logic Engine
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0}}
                    animate={{ scale: 1}}
                    whileHover={{ scale: 1.1}}
                    whileTap={{ scale: 0.9}}
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center text-white relative group"
                >
                    <MessageCircle size={28} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    </span>

                    {/* Tooltip on hover */}
                    <div className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Need help? Chat with us!
                    </div>
                </motion.button>
            )}
        </div>
    );
}
