import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../slices/messagesSlice';
import { selectors as channelsSelectors } from '../slices/channelsSlice';

const Messages = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channels);
  // const messages = useSelector((state) => state.messages);
  const messages = useSelector(messagesSelectors.selectAll);
  // console.log('Messages currentChannelId:', currentChannelId);
  const { name: channelName } = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId)) ?? '';
  // console.log('Messages name:', channelName);
  const currentMessages = messages.filter((message) => message.message === currentChannelId);
  const [currentChannel] = channels.filter((channel) => channel.id === currentChannelId);

  const channelTitle = `# ${channelName}`;

  const messagesCountDisplay = `${messages.length} сообщений`;

  const renderMessages = () => messages.map(({ id, body, user }) => (
    <div key={id} className="text-break mb-2">
      <b>{user}</b>
      :
      {' '}
      {body}
    </div>
  ));

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{channelTitle}</b>
        </p>
        <span className="text-muted">{messagesCountDisplay}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {renderMessages()}
      </div>
    </>
  );
};

export default Messages;
