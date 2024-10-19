'use client'

import { useEffect } from 'react'

// Extend the Window interface to include the embeddedChatbotConfig property
declare global {
  interface Window {
    embeddedChatbotConfig?: {
      chatbotId: string
      domain: string
    }
  }
}

// Extend the HTMLScriptElement interface to include custom properties
interface ChatbotScriptElement extends HTMLScriptElement {
  chatbotId?: string
  domain?: string
}

const TheChatbot: React.FC = () => {
  useEffect(() => {
    // Add the chatbot configuration
    window.embeddedChatbotConfig = {
      chatbotId: 'XCtzi1Dc-MU1ftiQ2WI5p',
      domain: 'www.chatbase.co',
    }

    // Create and add the script element
    const script: ChatbotScriptElement = document.createElement('script')
    script.src = 'https://www.chatbase.co/embed.min.js'
    script.chatbotId = 'XCtzi1Dc-MU1ftiQ2WI5p'
    script.domain = 'www.chatbase.co'
    script.defer = true

    document.body.appendChild(script)

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null
}

export default TheChatbot
