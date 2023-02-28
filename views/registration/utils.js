import AsyncStorage  from '@react-native-async-storage/async-storage' ;



export const getUsers = async () => {
    const users = await AsyncStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };
  
export const addUser = async (user) => {
    const users = await getUsers();
    let exists = users.some(u => u.email === user.email);
    if (exists) {
        console.log(`User ${user.email} already exists`);
        return false;
    }
    users.push(user);
    try{
      await AsyncStorage.setItem('users', JSON.stringify(users));
      console.log(`User ${user} registered`);
    }catch{
      console.log(`User ${user} did not register`);
      return false;
    }
    return true;
};

export const getUser = async (email) => {
    const users = await getUsers();
    return users.find(user => user.email === email);
}


export const verifyUser = async (email, password) => {
    const users = await getUsers();
    const user = users.find((u) => u.email === email);
    if (user && user.password === password) {
      return true;
    }
    return false;
  };

export const resetUsers = async () => {
  try{
    await AsyncStorage.removeItem('users');
  }catch{
    return false;
  }
  return true;
}