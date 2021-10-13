import Users from './users';
import Channel from './channels';

interface Groups {
  id: number;
  name: string;
  channels: Array<Channel>;
  users: Array<Users>;
  assis: Array<Users>;
}

export default Groups;
