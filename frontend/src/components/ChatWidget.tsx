import { useState } from 'react';
import styles from '../styles/app.module.css';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Hi, I'm your HR assistant. Ask me about leave, payroll, or policies."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) {
      return;
    }

    const userMessage = { id: Date.now(), role: 'user' as const, content: input.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content, history: nextMessages })
      });
      const data = await response.json();
      setMessages([...nextMessages, { id: Date.now() + 1, role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages([...nextMessages, { id: Date.now() + 2, role: 'assistant', content: 'The assistant is unavailable right now. Please try again shortly.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <>
      <button className={styles.chatLauncher} onClick={() => setIsOpen((value) => !value)}>
        Ask HR
      </button>
      {isOpen ? (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <strong>HR Assistant</strong>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
          <div className={styles.chatBody}>
            {messages.map((message) => (
              <div key={message.id} className={`${styles.chatBubble} ${message.role === 'user' ? styles.chatBubbleUser : styles.chatBubbleAssistant}`}>
                {message.content}
              </div>
            ))}
            {isTyping ? <div className={`${styles.chatBubble} ${styles.chatBubbleAssistant}`}>Typing...</div> : null}
          </div>
          <div className={styles.chatInputRow}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about HR topics"
            />
            <button onClick={() => void sendMessage()}>Send</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ChatWidget;
