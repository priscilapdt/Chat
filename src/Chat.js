import { useCallback, useEffect, useRef, useState } from "react";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { AiOutlineSend } from "react-icons/ai";
const moment = require("moment");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const randomMessageTimer = useRef(null);
  const buttonAction = useRef(null);

  const handleSubmit = (e) => {
    setMessages([
      ...messages,
      {
        message,
        type: "sent",
        time: moment().format("HH:mm"),
      },
    ]);
    setMessage("");
  };

  useEffect(() => {
    function startTimer() {
      randomMessageTimer.current = setInterval(() => {
        setMessages([
          ...messages,
          {
            message: faker.company.buzzPhrase(),
            type: "received",
            time: moment().format("HH:mm"),
          },
        ]);
      }, 30000);
    }

    startTimer();
    return () => clearInterval(randomMessageTimer.current);
  }, [messages]);

  const keyUpHandler = useCallback((e) => {
    if (e.key === "Enter") {
      buttonAction.current.click();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);
    return () => document.removeEventListener("keyup", keyUpHandler);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document
      .getElementsByClassName("messages")[0]
      .scrollTo(0, document.getElementsByClassName("messages")[0].scrollHeight);
  }, [messages]);

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div className={msg.type} key={index}>
            <div className="message">
              {msg.message}
              <span className="time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="form">
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          ref={buttonAction}
          disabled={!message || !message.trim()}
        >
          <span className="hide-mobile">Send message</span>
          <span className="show-mobile">
            <AiOutlineSend />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Chat;
