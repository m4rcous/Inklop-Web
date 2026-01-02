import React, { useState } from 'react';
import './MessagesPage.css';
import chatCreadoresIcon from "../../../assets/icons/chat_creadores_inklop_icon.svg";
import chatCliperosIcon from "../../../assets/icons/chat_cliperos_jotajoda_icon.svg";
import userChatIcon from "../../../assets/icons/user_chat_icon.svg";


interface Chat {
  id: string;
  campaignName: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  verified?: boolean;
}

interface Message {
  id: string;
  sender: string;
  username: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export const MessagesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');

  // Datos de ejemplo de chats
  const chats: Chat[] = [
    {
      id: '1',
      campaignName: 'Creadores Inklop',
      avatar: chatCreadoresIcon,
      lastMessage: 'Hola a todos, bienvenidos a la mejor app de monetización de contenido. Recuerden...',
      time: '',
      unread: false,
      verified: true,
    },
    {
      id: '2',
      campaignName: 'Cliperos de JotaJoda',
      avatar: chatCliperosIcon,
      lastMessage: 'Mis mapaches, me dejan bien. Muy buenos clips',
      time: '1h',
      unread: true,
    },
  ];

  // Mensajes de ejemplo para el chat seleccionado
  const messages: Message[] = [
    {
      id: '1',
      sender: 'ItzTaina',
      username: '@itztaina',
      content: 'Holaa 👋',
      timestamp: '',
      isOwn: false,
    },
    {
      id: '2',
      sender: 'ItzTaina',
      username: '@itztaina',
      content: 'Hey 👋',
      timestamp: '',
      isOwn: false,
    },
    {
      id: '3',
      sender: 'ClipsPeru',
      username: '@clipsperu',
      content: 'Hola a todos, que emocion esta app. Ya mandé mi primer video, esperemos a monetizar pronto',
      timestamp: '',
      isOwn: false,
    },
    {
      id: '4',
      sender: 'Vadu',
      username: '@vadu',
      content: 'Chicossa alguien me ayuda? no se como clipear',
      timestamp: '',
      isOwn: false,
    },
    {
      id: '5',
      sender: 'Yo',
      username: '',
      content: 'Es facil, pero aqui no es de clips, es contenido ugc',
      timestamp: '',
      isOwn: true,
    },
    {
      id: '6',
      sender: 'Vadu',
      username: '@vadu',
      content: 'okok pero alguien me enseña?',
      timestamp: '',
      isOwn: false,
    },
    {
      id: '7',
      sender: 'ClipsPeru',
      username: '@clipsperu',
      content: 'Siii normal, tienes que sacarle clips a los stramers en Kick, luego descargarlo con sstitlo y subirlo a tiktok siguiendo los requisitos, tienes que editarlo y poner el kick en el video',
      timestamp: '',
      isOwn: false,
    },
  ];

  const filteredChats = chats.filter(chat => {
    if (activeFilter === 'todos') return true;
    if (activeFilter === 'leidos') return !chat.unread;
    if (activeFilter === 'sin-leer') return chat.unread;
    return true;
  });

  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );

  const VerifiedIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b82f6">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const PlusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const ImageIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );

  const MicIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );

  const selectedChatData = chats.find(c => c.id === selectedChat) ?? null;

  return (
    <div className="messages-page">
      {/* Sidebar - Lista de chats */}
      <div className="chats-sidebar">
        <h2 className="chats-title">Mis Chats</h2>

        {/* Buscador */}
        <div className="search-container">
          <SearchIcon />
          <input
            type="text"
            placeholder="Buscar chats"
            className="chats-search"
          />
        </div>

        {/* Filtros */}
        <div className="chats-filters">
          <button
            className={`chat-filter-btn ${activeFilter === 'todos' ? 'active' : ''}`}
            onClick={() => setActiveFilter('todos')}
          >
            Todos
          </button>
          <button
            className={`chat-filter-btn ${activeFilter === 'leidos' ? 'active' : ''}`}
            onClick={() => setActiveFilter('leidos')}
          >
            Leídos
          </button>
          <button
            className={`chat-filter-btn ${activeFilter === 'sin-leer' ? 'active' : ''}`}
            onClick={() => setActiveFilter('sin-leer')}
          >
            Sin leer
          </button>
        </div>

        {/* Lista de chats */}
        <div className="chats-list">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat === chat.id ? 'selected' : ''}`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <img
                    className="chat-avatar"
                    src={chat.avatar}
                    alt={chat.campaignName}
                />
                <div className="chat-info">
                  <div className="chat-name-row">
                    <span className="chat-name">{chat.campaignName}</span>
                    {chat.time && <span className="chat-time">{chat.time}</span>}
                  </div>
                  <p className="chat-preview">{chat.lastMessage}</p>
                </div>
                {chat.unread && <div className="unread-indicator" />}
                <div className="chat-arrow">›</div>
              </div>
            ))
          ) : (
            <div className="empty-chats">
              <p className="empty-chats-title">No hay chats para mostrar</p>
              <p className="empty-chats-subtitle">Crea una campaña y conecta con tu comunidad</p>
            </div>
          )}
        </div>
      </div>

      {/* Panel de conversación */}
      <div className="chat-panel">
        {selectedChatData ? (
          <>
            {/* Header del chat */}
            <div className="chat-header">
              <img
                  className="chat-header-avatar"
                  src={selectedChatData.avatar}
                  alt={selectedChatData.campaignName}
              />
              <div className="chat-header-info">
                <span className="chat-header-name">
                  {selectedChatData.campaignName}
                  {selectedChatData.verified && <VerifiedIcon />}
                </span>
              </div>
            </div>

            {/* Mensajes */}
            <div className="messages-container">
              {messages.map((message) => (
                  <div
                      key={message.id}
                      className={`message-row ${message.isOwn ? "own" : ""}`}
                  >
                    <img
                        className="message-avatar"
                        src={userChatIcon}
                        alt={message.isOwn ? "Yo" : message.sender}
                    />

                    <div className="message-content">
                      {!message.isOwn && (
                          <span className="message-sender">{message.sender}</span>
                      )}

                      <div className={`message-bubble ${message.isOwn ? "own" : ""}`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            {/* Input de mensaje */}
            <div className="message-input-container">
              <button className="input-icon-btn">
                <PlusIcon />
              </button>
              <button className="input-icon-btn">
                <ImageIcon />
              </button>
              <input
                type="text"
                placeholder="Escribe un mensaje"
                className="message-input"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button className="input-icon-btn">
                <MicIcon />
              </button>
            </div>
          </>
        ) : (
          <div className="empty-chat-state">
            <h3 className="empty-state-title">Selecciona un chat</h3>
            <p className="empty-state-text">
              Selecciona una campaña para empezar a conectar con la comunidad
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
