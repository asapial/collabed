// helpers/insertUser.js


export const handleInsertDataLogin = async (data, findTheUser, postTheUser,mongoLoading, setMongoLoading) => {
  const email = data.user?.email;
  console.log("Email:", data);

  const userInfo = {
    email,
    userUid: data.user.uid,
    userRole: "Student",
    image: data.user.photoURL,
    userName: data.user.displayName,
  };

  const foundUser = await findTheUser(email);
  if (!foundUser ) {
    console.log("User not found, inserting new user:", userInfo);
    await postTheUser(email, userInfo);
    setMongoLoading(!mongoLoading)
  }
};

export const handleInsertDataRegister = async (data, findTheUser, postTheUser,mongoLoading, setMongoLoading) => {
  const email = data?.email;
  console.log("Email:", data);

  const userInfo = {
    email,
    userUid: data.uid,
    userRole: "Student",
    image: data.photoURL,
    userName: data.displayName,
  };

  const foundUser = await findTheUser(email);
  if (!foundUser ) {
    console.log("User not found, inserting new user:", userInfo);
    await postTheUser(email, userInfo);
    setMongoLoading(!mongoLoading);
  }
};
