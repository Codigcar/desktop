import { FC, useEffect, useRef } from 'react';
import { IUserData } from '@interfaces/user';

interface IMessage {
  id: number;
  from_user_uuid: string;
  message: string;
}

interface IProps {
  messages: IMessage[];
  fromUser: IUserData | undefined;
}

const MessageBox: FC<IProps> = ({ messages, fromUser }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages]);

  return (
    <div className="message-box">
      {messages.map((msj: IMessage) => (
        <div
          className={`message-row ${
            msj.from_user_uuid === fromUser?.user_uuid
              ? 'message-user'
              : 'message-contact'
          }`}
          key={msj.id}
        >
          <div className="message">{msj.message}</div>
        </div>
      ))}

      {messages.length > 0 && <div ref={messagesEndRef} />}
    </div>
  );
};

export default MessageBox;
