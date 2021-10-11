const getInfo = async (
  user,
  email,
  password,
  name,
  setUser,
  token,
  history
) => {
  try {
    if (email !== "" || password !== "" || name !== "") {
      
      setUser({
        email,
        password,
        name,
        token,
      });

      // setUser(email, password, name, token);
    }
  } catch (error) {
    console.log("error", error);
    if (error.response?.status === "403") {
      localStorage.removeItem("token");
      history.push("/");
    }
  }
};

export default getInfo;
