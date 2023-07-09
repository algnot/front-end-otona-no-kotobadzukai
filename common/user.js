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

export const checkWantToLogin = async (authToken) => {
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
