import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../slices/messagesSlice';
import { selectors as channelsSelectors } from '../slices/channelsSlice';

const Messages = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  // console.log('channels', channels);
  // console.log('currentChannelId', currentChannelId);
  // console.log('Current Channel', currentChannel);
  // console.log('messages', messages);
  // console.log('Current messages', currentMessages);
  // console.log('Messages Count Display', messagesCountDisplay);

  const createMessage = (message) => (
    <div className="text-break mb-2">
      <b>{message.username}</b>
      :
      {' '}
      {message.body}
    </div>
  );

  const messagesCountDisplay = `${currentMessages.length} сообщений`;

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {currentChannel?.name}
          </b>
        </p>
        <span className="text-muted">{messagesCountDisplay}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {currentMessages.map((message) => (
          <div className="text-break mb-2" key={message.id}>
            {createMessage(message)}
          </div>
        ))}
      </div>
    </>
  );
};

export default Messages;
