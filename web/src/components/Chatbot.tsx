// components/Chatbot.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { messages, input, handleInputChange, handleSubmit } = useChat({api: '/api/openai'});
    const chatContainer = useRef<HTMLDivElement>(null);

    const scroll = () => {
        const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current as HTMLDivElement
        if (scrollHeight >= scrollTop + offsetHeight) {
            chatContainer.current?.scrollTo(0, scrollHeight + 200);
        }
    }

    useEffect(() => {
        scroll();
    }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container" ref={chatContainer}>
      <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
        <div className="chat-header" onClick={toggleChat}>
          <span>How Can We Help?</span>
        </div>
        {isOpen && (
          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className="chat-message">
                {msg.content}
              </div>
            ))}
            <div className="chat-input">
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="What do you need help with?" onChange={handleInputChange} value={input} />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .chatbot-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        .chat-window {
          width: 300px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: max-height 0.3s ease;
        }
        .closed {
          max-height: 50px;
        }
        .open {
          max-height: 400px;
        }
        .chat-header {
          padding: 10px;
          background: #007bff;
          color: white;
          cursor: pointer;
          border-radius: 8px 8px 0 0;
        }
        .chat-body {
          padding: 10px;
          border-top: 1px solid #ddd;
        }
        .chat-message {
          margin-bottom: 10px;
        }
        .chat-input {
          display: flex;
        }
        .chat-input input {
          flex: 1;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
