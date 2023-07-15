import axios from "axios";
import { userError } from "./alert";
import { googleProvider, auth } from "./firebase";

const backendPath = process.env.NEXT_PUBLIC_BACKEND_URL;
export const register = async (
  username,
  email,
  password,
  setLoading = (l) => {}
) => {
  try {
    const user = await axios.post(`${backendPath}/connect/register`, {
      name: username,
      email: email,
      password: password,
    });
    return user.data;
  } catch (error) {
    if (error.response) {
      setLoading(false);

      return userError("Error", error.response.data);
    }
    userError("Error", error.message);
  }
};

export const login = async (email, password, setLoading = (l) => {}) => {
  try {
    const user = await axios.post(`${backendPath}/connect/login`, {
      email: email,
      password: password,
    });
    return user.data;
  } catch (error) {
    if (error.response) {
      setLoading(false);
      return userError("Error", error.response.data);
    }
    setLoading(false);
    userError("Error", error.message);
  }
};

export const loginWithGoogle = async (setLoading = (l) => {}) => {
  try {
    const { user } = await auth.signInWithPopup(googleProvider);
    const userInfo = await axios.post(`${backendPath}/connect/register-with-google`, {
      email: user.email,
      name: user.displayName,
      googleAuthId: user.uid
    });
    return userInfo.data;
  } catch (error) {
    if (error.response) {
      setLoading(false);
      return userError("Error", error.response.data);
    }
    setLoading(false);
    userError("Error", error.message);
  }
}

export const getUserInfo = async (authToken) => {
  try {
    const user = await axios.get(`${backendPath}/connect/me`, {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    return user.data;
  } catch (error) {
    if (error.response) {
      return userError("Error", error.response.data);
    }
    userError("Error", error.message);
  }
}

export const checkAuthToHome = async (authToken) => {
  try {
    const auth = authToken;
    if(!auth) return { props: {} }
    const user = await getUserInfo(auth);
    if(user) {
      return {
        redirect: {
          destination: '/home',
          permanent: false,
        },
      }
    }
    return { props: { removeCookie: true } }
  } catch (error) {
    return { props: {
      removeCookie: true,
      error: error.message
    }}
  }
}

export const checkWantToLogin = async (authToken, isSetPasswordPage=false) => {
  try {
    const auth = authToken;
    if(!auth) return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
    const user = await getUserInfo(auth);
    if(!user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    if(user.canSetPassword && !isSetPasswordPage){
      return {
        redirect: {
          destination: '/set-password',
          permanent: false,
        },
      }
    }
    if(!user.canSetPassword && isSetPasswordPage){
      return {
        redirect: {
          destination: '/home',
          permanent: false,
        },
      }
    }
    return { props: { user: user } }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

export const linkGoogle = async (authToken, email, setLoading = (l) => {}) => {
  try {
    setLoading(true);
    const userGoogle = await auth.signInWithPopup(googleProvider);
    if(userGoogle.user.email !== email) {
      setLoading(false);
      return userError("Error", "Google email is not match");
    }
    const user = await axios.post(`${backendPath}/connect/link-google`, {
      googleAuthId: userGoogle.user.uid
    }, {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    setLoading(false);
    return user.data;
  } catch (error) {
    setLoading(false);
    if (error.response) {
      return userError("Error", error.response.data);
    }
    userError("Error", error.message);
  }
}

export const setPassword = async (authToken, password, setLoading = (l) => {}) => {
  try {
    setLoading(true);
    const user = await axios.post(`${backendPath}/connect/set-password`, {
      password: password
    }, {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    setLoading(false);
    return user.data;
  } catch (error) {
    setLoading(false);
    if (error.response) {
      return userError("Error", error.response.data);
    }
    userError("Error", error.message);
  }
}

export const updateProfile = async (authToken, username, setLoading = (l) => {}) => {
  try {
    setLoading(true);
    const user = await axios.put(`${backendPath}/user`, {
      username: username
    }, {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    setLoading(false);
    return user.data;
  } catch (error) {
    setLoading(false);
    if (error.response) {
      return userError("Error", error.response.data);
    }
    userError("Error", error.message);
  }
}