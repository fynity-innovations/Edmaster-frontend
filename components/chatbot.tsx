"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle, X, Send, Loader2, Sparkles,
  GraduationCap, Globe, Calendar, DollarSign,
  Building2, TrendingUp, Check
} from "lucide-react"
import Image from "next/image" // Added for logo
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import countriesData from "@/data/countries.json"
import universitiesData from "@/data/universities.json"
import coursesData from "@/data/courses_final.json"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

type ConversationState = 
  | "greeting"
  | "collecting_name"
  | "collecting_email"
  | "collecting_phone"
  | "verifying_otp"
  | "verified"
  | "chatting"

const PRESET_PROMPTS = [
  {
    icon: GraduationCap,
    label: "Find courses for me",
    prompt: "I want to find courses that match my profile"
  },
  {
    icon: Globe,
    label: "Study destinations",
    prompt: "What are the best countries to study abroad?"
  },
  {
    icon: Building2,
    label: "Top universities",
    prompt: "Show me top universities for Computer Science"
  },
  {
    icon: DollarSign,
    label: "Scholarship info",
    prompt: "Tell me about scholarships and financial aid"
  },
  {
    icon: Calendar,
    label: "Application deadlines",
    prompt: "When are the application deadlines?"
  },
  {
    icon: TrendingUp,
    label: "Career prospects",
    prompt: "What are career prospects after studying abroad?"
  }
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [conversationState, setConversationState] = useState<ConversationState>("greeting")
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const [showPresets, setShowPresets] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const API_URL = "https://sap-backend-production-e729.up.railway.app"
  // const API_URL = 'http://127.0.0.1:8000'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage("assistant", "👋 Hello! I'm AIGLE, your smart study buddy. I can help you find the perfect courses and universities.\n\nTo get started, may I know your name?")
      setConversationState("collecting_name")
    }
  }, [isOpen, messages.length])

  const addMessage = (role: "user" | "assistant" | "system", content: string) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random(),
      role,
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleSendOTP = async (phone: string) => {
    try {
      setLoading(true)
      
      console.log('Sending OTP to:', phone)
      console.log('User data:', userData)
      
      const response = await fetch(`${API_URL}/api/profile/initiate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: phone
        })
      })

      const data = await response.json()
      console.log('OTP response:', data)

      if (!response.ok) {
        addMessage("assistant", `❌ ${data.message || data.errors?.phone?.[0] || "Failed to send OTP. Please try again."}`)
        setConversationState("collecting_phone")
        return false
      }

      addMessage("assistant", `✅ OTP sent to ${phone}!\n\nPlease enter the 6-digit code:`)
      setConversationState("verifying_otp")
      return true
    } catch (error) {
      console.error('OTP send error:', error)
      addMessage("assistant", "❌ Server error. Please try again later.")
      setConversationState("collecting_phone")
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (otpCode: string) => {
    try {
      setLoading(true)
      
      console.log('Verifying OTP:', otpCode)
      console.log('Phone:', userData.phone)
      
      const response = await fetch(`${API_URL}/api/profile/verify/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: userData.phone,
          otp: otpCode
        })
      })

      const data = await response.json()
      console.log('Verification response:', data)

      if (!response.ok) {
        addMessage("assistant", `❌ ${data.message || "Invalid OTP. Please try again."}`)
        // Stay in verifying_otp state so user can retry
        return false
      }

      addMessage("assistant", `🎉 Verified! Welcome ${userData.name}!\n\nHow can I help you today? You can:\n- Find courses matching your profile\n- Explore universities\n- Learn about countries\n- Ask any question about studying abroad`)
      setConversationState("verified")
      setShowPresets(true)
      return true
    } catch (error) {
      console.error('OTP verification error:', error)
      addMessage("assistant", "❌ Verification failed. Please try again.")
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleAIResponse = async (userMessage: string) => {
    try {
      setLoading(true)

      const contextData = {
        countries: countriesData.slice(0, 20),
        universities: (universitiesData as any[]).slice(0, 30),
        courses: (coursesData as any[]).slice(0, 50),
        userName: userData.name
      }

      const response = await fetch(`${API_URL}/api/chatbot/query/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          context: contextData,
          conversationHistory: messages.slice(-6).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      const data = await response.json()

      if (!response.ok) {
        addMessage("assistant", "I apologize, but I'm having trouble processing your request. Please try rephrasing your question.")
        return
      }

      addMessage("assistant", data.response)

      if (data.suggestFilters) {
        setTimeout(() => {
          addMessage("system", "💡 Would you like me to find courses for you? Visit our AI Profile Evaluator!")
        }, 1000)
      }
    } catch (error) {
      console.error('AI response error:', error)
      addMessage("assistant", "I'm having trouble connecting right now. Please try again in a moment.")
    } finally {
      setLoading(false)
    }
  }

  const handleSend = async () => {
    const messageToSend = input.trim()
    
    if (!messageToSend || loading) return

    console.log('Current state:', conversationState)
    console.log('Message:', messageToSend)

    // Clear input and add user message
    setInput("")
    addMessage("user", messageToSend)
    setShowPresets(false)

    // Handle conversation flow
    switch (conversationState) {
      case "collecting_name":
        setUserData(prev => ({ ...prev, name: messageToSend }))
        addMessage("assistant", `Nice to meet you, ${messageToSend}! 📧\n\nWhat's your email address?`)
        setConversationState("collecting_email")
        break

      case "collecting_email":
        if (!messageToSend.includes("@")) {
          addMessage("assistant", "Please provide a valid email address.")
          return
        }
        setUserData(prev => ({ ...prev, email: messageToSend }))
        addMessage("assistant", `Great! 📱\n\nLastly, what's your phone number? (Include country code, e.g., +1234567890)`)
        setConversationState("collecting_phone")
        break

      case "collecting_phone":
        if (!messageToSend.startsWith("+")) {
          addMessage("assistant", "Please include country code (e.g., +1234567890)")
          return
        }
        const phoneToSave = messageToSend
        setUserData(prev => ({ ...prev, phone: phoneToSave }))
        // Wait for state to update before sending OTP
        setTimeout(async () => {
          await handleSendOTP(phoneToSave)
        }, 100)
        break

      case "verifying_otp":
        if (messageToSend.length !== 6 || !/^\d+$/.test(messageToSend)) {
          addMessage("assistant", "Please enter a valid 6-digit OTP.")
          return
        }
        await handleVerifyOTP(messageToSend)
        break

      case "verified":
      case "chatting":
        setConversationState("chatting")
        await handleAIResponse(messageToSend)
        break

      default:
        console.warn('Unknown conversation state:', conversationState)
        break
    }
  }

  const handlePresetClick = (prompt: string) => {
    setInput(prompt)
    setShowPresets(false)
    // Auto-send after a brief delay
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-indigo-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            /* RESPONSIVE CLASSES ADDED HERE */
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[60] w-full h-full sm:w-[420px] sm:h-[650px] sm:max-h-[90vh] bg-white dark:bg-slate-900 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-indigo-600 p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20">
                  {/* LOGO INTEGRATION */}
                  <Image 
                    src="/edmaster_logo_chatbot.jpeg" // Path to the logo you uploaded
                    alt="AIGLE Logo"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">AIGLE Assistant</h3>
                  <p className="text-[10px] sm:text-xs text-white/80">
                    {conversationState === "verified" || conversationState === "chatting" 
                      ? `Chatting with ${userData.name}` 
                      : "Your Smart Study Buddy"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "system" ? (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 max-w-[85%]">
                      <p className="text-sm text-blue-900 dark:text-blue-100">{message.content}</p>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        message.role === "user"
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <span className="text-[10px] opacity-60 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}

              {/* Preset Prompts - Optimized for mobile tap targets */}
              {showPresets && (conversationState === "verified" || conversationState === "chatting") && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-2 mt-4"
                >
                  {PRESET_PROMPTS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePresetClick(preset.prompt)}
                      disabled={loading}
                      className="p-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    >
                      <preset.icon className="w-4 h-4 text-primary mb-1" />
                      <p className="text-[11px] sm:text-xs font-medium text-slate-900 dark:text-slate-100 leading-tight">
                        {preset.label}
                      </p>
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input - Optimized for mobile keyboards */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pb-safe">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder={
                    conversationState === "collecting_name"
                      ? "Enter your name..."
                      : conversationState === "collecting_email"
                      ? "Enter your email..."
                      : conversationState === "collecting_phone"
                      ? "Enter phone (+1234567890)..."
                      : conversationState === "verifying_otp"
                      ? "Enter 6-digit OTP..."
                      : "Type your message..."
                  }
                  className="flex-1 h-11"
                  disabled={loading}
                  maxLength={conversationState === "verifying_otp" ? 6 : undefined}
                />
                <Button 
                  onClick={handleSend} 
                  disabled={loading || !input.trim()} 
                  size="icon"
                  className="shrink-0 h-11 w-11"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : conversationState === "verifying_otp" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              {conversationState === "verifying_otp" && (
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 text-center">
                  Enter the 6-digit code sent to {userData.phone}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}