interface ICreateUsersDTO 
{
  name: string;
  password: string;
  email: string;
  isAdmin?: boolean;
  id?: string;
  avatar?: string;
}

export { ICreateUsersDTO };
