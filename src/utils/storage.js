const RECOMMENDATIONS_KEY = "LIFERAY_RECOMMENDATIONS";
const USERS_KEY = "LIFERAY_USERS";
const USER_ID_KEY = "LIFERAY_USER_ID";
const USER_BASIC_AUTH_KEY = "LIFERAY_USER_BASIC_AUTH";

export const resetLocalStorage = () => {
  localStorage.clear();
}

export const setRecommendationsOnLocalStorage = (userId, items) => {
  localStorage.setItem(
    `${RECOMMENDATIONS_KEY}_${userId}`,
    JSON.stringify(items)
  );
};

export const getRecommendationsFromLocalStorage = (userId) => {
  const recommendations = localStorage.getItem(
    `${RECOMMENDATIONS_KEY}_${userId}`
  );

  return recommendations ? JSON.parse(recommendations) : null;
};

export const setUsersOnLocalStorage = (items) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(items));
};

export const getUsersFromLocalStorage = () => {
  const users = localStorage.getItem(USERS_KEY);

  return users ? JSON.parse(users) : null;
};

export const setUserIdOnLocalStorage = (userId) => {
  localStorage.setItem(USER_ID_KEY, userId);
};

export const getUserIdFromLocalStorage = () => {
  const userId = localStorage.getItem(USER_ID_KEY);

  return userId;
};

export const setBasicAuthOnLocalStorage = (username, password) => {
  localStorage.setItem(USER_BASIC_AUTH_KEY, btoa(`${username}:${password}`));
};

export const getBasicAuthFromLocalStorage = () => {
  return localStorage.getItem(USER_BASIC_AUTH_KEY);
};
