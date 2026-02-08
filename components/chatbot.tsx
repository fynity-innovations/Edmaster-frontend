// Chatbot.tsx (updated to handle program level)
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, RefreshCw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  redirectUrl?: string
  buttonText?: string
}

interface Session {
  session_id: string | null;
  step: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [session, setSession] = useState<Session>({ session_id: null, step: 'greeting' })
  const router = useRouter()

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleSend("") // Send empty message to get greeting
    }
  }, [isOpen, messages.length])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://uconnect-backend-026s.onrender.com'}/api/chat/`
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          session_id: session.session_id
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()
      
      // Update session state
      setSession({
        session_id: data.session_id,
        step: data.step
      })

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.reply,
        sender: "bot",
      }
      
      // Add redirect URL and button text if available
      if (data.redirect_url) {
        botMessage.redirectUrl = data.redirect_url
        botMessage.buttonText = data.button_text || "View Courses"
      }

      setMessages((prev) => [...prev, botMessage])
      
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `⚠️ ${error instanceof Error ? error.message : 'Connection error. Please try again.'}`,
          sender: "bot",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleResendOTP = async () => {
    if (!session.session_id) return
    
    setIsTyping(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000'}/api/resend-otp/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: session.session_id
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()
      
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: data.message,
        sender: "bot",
      }])
      
    } catch (error) {
      console.error("Resend OTP error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `⚠️ Failed to resend code. ${error instanceof Error ? error.message : 'Please try again.'}`,
          sender: "bot",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleRedirect = (url: string) => {
    // Close the chatbot
    setIsOpen(false)
    // Navigate to the URL
    router.push(url)
  }

  const getQuickReplies = () => {
    if (session.step === 'preferences_collected') {
      return ["Search again"]
    } else if (session.step === 'otp') {
      return ["Resend code"]
    }
    return []
  }

  const handleQuickReply = (reply: string) => {
    if (reply === "Resend code") {
      handleResendOTP()
    } else {
      handleSend(reply)
    }
  }

  const getInputPlaceholder = () => {
    switch (session.step) {
      case 'name':
        return "Enter your name..."
      case 'email':
        return "Enter your email address..."
      case 'otp':
        return "Enter 6-digit verification code..."
      case 'collect_country':
        return "Which country would you like to study in?"
      case 'collect_duration':
        return "What duration are you looking for?"
      case 'collect_level':  // NEW: Add placeholder for program level
        return "What program level? (e.g., Bachelor's, Master's, PhD)"
      case 'collect_course':
        return "What course or field of study are you interested in?"
      default:
        return "Type your message..."
    }
  }

  const getInputMaxLength = () => {
    return session.step === 'otp' ? 6 : undefined
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
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] rounded-2xl overflow-hidden shadow-2xl border border-border bg-background flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">StudyGlobal Assistant</h3>
                  <p className="text-xs text-primary-foreground/80">
                    {session.step === 'verified' || session.step?.startsWith('collect_') || session.step === 'preferences_collected' ? 'Course Finder' : 'Authentication Required'}
                  </p>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex flex-col", message.sender === "user" && "items-end")}
                >
                  <div className={cn("flex items-end gap-2", message.sender === "user" && "flex-row-reverse")}>
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
                        "max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap",
                        message.sender === "bot"
                          ? "bg-secondary text-secondary-foreground rounded-bl-md"
                          : "bg-primary text-primary-foreground rounded-br-md",
                      )}
                    >
                      {message.text}
                    </div>
                  </div>
                  
                  {/* Redirect Button */}
                  {message.redirectUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-2 ml-10"
                    >
                      <Button
                        onClick={() => handleRedirect(message.redirectUrl!)}
                        className="gap-2 bg-primary hover:bg-primary/90"
                      >
                        {message.buttonText} <ExternalLink className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}
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
            {getQuickReplies().length > 0 && (
              <div className="px-4 py-2 border-t border-border bg-background">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {getQuickReplies().map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className={cn(
                        "flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                        reply === "Resend code" 
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      {reply === "Resend code" && <RefreshCw className="w-3 h-3 mr-1 inline" />}
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-background">
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
                  placeholder={getInputPlaceholder()}
                  maxLength={getInputMaxLength()}
                  className="flex-1 px-4 py-2 text-sm rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-primary hover:bg-primary/90"
                  disabled={!input.trim() || isTyping}
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