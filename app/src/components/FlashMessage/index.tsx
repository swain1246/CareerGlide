import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';

// Custom wrapper function with default configurations
const flashMessage = (content: string, type: NoticeType = 'info', duration: number = 3): void => {
  message.destroy(); // Clear old messages
  message[type]({ content, duration }); // Show new message with default configurations
};

export default flashMessage;
