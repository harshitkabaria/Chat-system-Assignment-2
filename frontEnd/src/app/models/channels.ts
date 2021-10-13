import Users from './users';

interface Channels {
  id: number;
  group:number;
  name: string;
  users: Array<Users>;
}

export default Channels;
