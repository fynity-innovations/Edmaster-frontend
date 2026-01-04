"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I'm your StudyGlobal assistant. How can I help you with your study abroad journey today?",
    sender: "bot",
  },
]

const quickReplies = ["Find universities", "Visa requirements", "Scholarship info", "Application process"]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        sender: "bot",
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    if (lowerQuery.includes("university") || lowerQuery.includes("find")) {
      return "I'd be happy to help you find universities! You can use our AI-powered University Recommender tool, or tell me your preferred country and field of study, and I'll suggest some options."
    }
    if (lowerQuery.includes("visa")) {
      return "Visa requirements vary by country. Our Visa Advisor tool can provide detailed guidance based on your nationality and destination. Would you like me to direct you there?"
    }
    if (lowerQuery.includes("scholarship")) {
      return "There are many scholarships available for international students! Our platform can match you with scholarships based on your profile. Would you like to explore scholarship opportunities?"
    }
    if (lowerQuery.includes("application")) {
      return "The application process typically involves: 1) Choosing your program, 2) Preparing documents, 3) Writing your SOP, 4) Submitting applications, 5) Applying for visa. Our team can guide you through each step!"
    }
    return "Thank you for your question! Our team of experts can provide detailed guidance on this topic. Would you like to schedule a free consultation or explore our AI tools for instant answers?"
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-lg",
          "hover:shadow-xl transition-shadow",
          isOpen && "hidden",
        )}
        aria-label="Open chat"
      >
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
          <MessageCircle className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] rounded-2xl overflow-hidden shadow-2xl border border-border glass flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">StudyGlobal Assistant</h3>
                  <p className="text-xs text-primary-foreground/80">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/95">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex items-end gap-2", message.sender === "user" && "flex-row-reverse")}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      message.sender === "bot"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    {message.sender === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div
                    className={cn(
                      "max-w-[75%] px-4 py-3 rounded-2xl text-sm",
                      message.sender === "bot"
                        ? "bg-secondary text-secondary-foreground rounded-bl-md"
                        : "bg-primary text-primary-foreground rounded-br-md",
                    )}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 0.6,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-border bg-background/95">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="flex-shrink-0 px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background/95">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 text-sm rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-primary hover:bg-primary/90"
                  disabled={!input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
