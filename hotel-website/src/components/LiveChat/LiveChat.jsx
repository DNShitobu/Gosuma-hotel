import { useState } from 'react';
import './LiveChat.css';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can we help you today?", sender: 'agent', time: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "I want to book a room",
    "What rooms are available?",
    "What are your rates?",
    "Cancel my booking"
  ];

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const userMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      time: new Date()
    };
    setMessages([...messages, userMsg]);
    setNewMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const agentMsg = {
        id: messages.length + 2,
        text: getAutoResponse(newMessage),
        sender: 'agent',
        time: new Date()
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 1500);
  };

  const getAutoResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('book')) return "Great! You can use our booking form above to reserve a room. Would you like help with anything else?";
    if (lower.includes('price') || lower.includes('rate')) return "Our room rates start from $80/night. You can see all prices in our Rooms section.";
    if (lower.includes('cancel')) return "To cancel your booking, please provide your confirmation number and we'll assist you.";
    if (lower.includes('available')) return "Yes, we have rooms available! Please check our Rooms section for current availability.";
    return "Thank you for your message. A team member will be with you shortly. For urgent matters, call us at +233 30 276 0531.";
  };

  const handleQuickReply = (text) => {
    setNewMessage(text);
  };

  return (
    <>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
        <span className="chat-badge">1</span>
      </button>

      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <h4>Airport View Hotel Support</h4>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-text">{msg.text}</div>
                <div className="message-time">
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message agent typing">
                <span>●</span><span>●</span><span>●</span>
              </div>
            )}
          </div>

          <div className="quick-replies">
            {quickReplies.map((reply, i) => (
              <button key={i} onClick={() => handleQuickReply(reply)}>{reply}</button>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
