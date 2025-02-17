import { useEffect, useState } from "react";
import {
  getUserFromLocalStorage,
  setUserOnLocalStorage
} from "../utils/storage";
import axios from "axios";
import { LIFERAY_HEADLESS_DELIVERY_ENDPOINT, LIFERAY_HEADLESS_ADMIN_USER_ENDPOINT, LIFERAY_SITE_ID, LIFERAY_CONTENT_SET_PROVIDER_KEY } from "../utils/constants";
import { AuthContext } from "react-oauth2-code-pkce";
import { useContext } from "react";
import { useQuery } from "./useQuery";

export const useFetchRecommendations = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loading: loadingUser, item } = useFetchUser();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token && !loadingUser) {
      setLoading(false);
      return;
    }
    const fetchRecommendation = async () => {
      await axios({
        url: `${LIFERAY_HEADLESS_DELIVERY_ENDPOINT}/sites/${LIFERAY_SITE_ID}/content-set-providers/by-key/${LIFERAY_CONTENT_SET_PROVIDER_KEY}/content-set-elements`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          Authorization:
            `Bearer ${token}`
        }
      }).then((response) => {
        const data = response.data;
        const itemsContent = data.items.map((item) => item.content);

        setItems(itemsContent);
        setLoading(false);
      }).catch((error) => {
        setItems([]);
        setLoading(false);
        console.log("ERROR: " + error);
      })
    };

    if (!loadingUser) {
      fetchRecommendation();
    }
  }, [item, loadingUser, token]);

  return { items, loading };
};

export const useFetchRecommendationItem = () => {
  const contentId = useQuery("contentId");
  const { items, loading } = useFetchRecommendations();

  return {
    item: items.find(({ id }) => contentId === String(id)),
    loading: loading,
  };
};

export const useFetchUser = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      await axios({
        url: `${LIFERAY_HEADLESS_ADMIN_USER_ENDPOINT}/my-user-account`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          Authorization:
            `Bearer ${token}`
        }
      }).then((response) => {
        const data = response.data;
        setUser(data);
        setLoading(false);

        setUserOnLocalStorage(data);
      }).catch((error) => {
        setLoading(false);
        console.log("ERROR: " + error);
      })
    };

    const userFromLocalStorage = getUserFromLocalStorage();

    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
      setLoading(false);
    } else {
      fetchUser();
    }
  }, [token]);

  return {
    user,
    loading,
  };
};
