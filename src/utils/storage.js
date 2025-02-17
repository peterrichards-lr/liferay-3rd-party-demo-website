const RECOMMENDATIONS_KEY = "LIFERAY_RECOMMENDATIONS";
const USER_KEY = "LIFERAY_USER";

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

export const setUserOnLocalStorage = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
};

export const clearStorage = () => {
  localStorage.clear();
}