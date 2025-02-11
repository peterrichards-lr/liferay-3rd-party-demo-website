import { useEffect, useState } from "react";
import {
  getUsersFromLocalStorage,
  setUsersOnLocalStorage,
} from "../utils/storage";
import { useQuery } from "./useQuery";

export const useFetchRecommendations = () => {
  const userId = useQuery("userId");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loading: loadingUser, item } = useFetchUser(userId);
  
  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await fetch(
          `https://webserver-lctclaritytemplate-prd.lfr.cloud/o/headless-delivery/v1.0/sites/32495/content-set-providers/by-key/com.liferay.analytics.machine.learning.internal.recommendation.info.collection.provider.UserContentRecommendationInfoItemCollectionProvider/content-set-elements`,
          {
            headers: {
              //Authorization: `Basic ${btoa(`${item.alternateName}:test`)}`,
              Authorization: `Basic ${btoa(`${item.emailAddress}:test`)}`,
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
          `https://webserver-lctclaritytemplate-prd.lfr.cloud/o/headless-admin-user/v1.0/user-accounts`,
          {
            headers: {
              Authorization:
                // "Basic YWRtaW5AY2xhcml0eXZpc2lvbnNvbHV0aW9ucy5jb206R2FydG5lck1RMjQ=",
                `Basic ${btoa(`test@liferay.com:test`)}`,
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
