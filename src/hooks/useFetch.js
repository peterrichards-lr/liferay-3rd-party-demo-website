import { useEffect, useState } from "react";
import {
  getUsersFromLocalStorage,
  setUsersOnLocalStorage,
  getBasicAuthFromLocalStorage
} from "../utils/storage";
import { useQuery } from "./useQuery";
import { LIFERAY_HEADLESS_DELIVERY_ENDPOINT, LIFERAY_HEADLESS_ADMIN_USER_ENDPOINT, LIFERAY_SITE_ID, LIFERAY_CONTENT_SET_PROVIDER_KEY, LIFERAY_CLIENT_ID, LIFERAY_CLIENT_SECRET } from "../utils/constants";

export const useFetchRecommendations = () => {
  const userId = useQuery("userId");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loading: loadingUser, item } = useFetchUser(userId);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await fetch(
          `${LIFERAY_HEADLESS_DELIVERY_ENDPOINT}/sites/${LIFERAY_SITE_ID}/content-set-providers/by-key/${LIFERAY_CONTENT_SET_PROVIDER_KEY}/content-set-elements`,
          {
            headers: {
              Authorization: `Basic ${getBasicAuthFromLocalStorage()}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          const itemsContent = data.items.map((item) => item.content);

          setItems(itemsContent);
          setLoading(false);
        } else {
          setItems([]);
          setLoading(false);

          throw new Error();
        }
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };

    if (!loadingUser) {
      fetchRecommendation();
    }
  }, [item, loadingUser, userId]);

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

export const useFetchUsers = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${LIFERAY_HEADLESS_ADMIN_USER_ENDPOINT}/user-accounts`,
          {
            headers: {
              Authorization:
                `Basic ${btoa(`${LIFERAY_CLIENT_ID}:${LIFERAY_CLIENT_SECRET}`)}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setItems(data.items);
          setLoading(false);

          setUsersOnLocalStorage(data.items);
        } else {
          setLoading(false);

          throw new Error();
        }
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };

    const usersFromLocalStorage = getUsersFromLocalStorage();

    if (usersFromLocalStorage) {
      setItems(usersFromLocalStorage);
      setLoading(false);
    } else {
      fetchUsers();
    }
  }, []);

  return {
    items,
    loading,
  };
};

export const useFetchUser = (userId) => {
  const { items, loading } = useFetchUsers();

  return { loading, item: items.find(({ id }) => String(id) === userId) };
};
