import { getUserFromLocalStorage, setUserOnLocalStorage } from "./storage";
import { LIFERAY_AC_CHANNEL_ID, LIFERAY_AC_DATA_SOURCE_ID, LIFERAY_AC_ENDPOINT, LIFERAY_AC_PROJECT_ID, LIFERAY_AC_SCRIPT_URL, LIFERAY_SITE_ID } from "./constants";

function init(u, c, a, m, o, l) {
  o = "script";
  l = document;
  a = l.createElement(o);
  m = l.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = u;
  a.onload = c;
  m.parentNode.insertBefore(a, m);
}

const waitUntil = (condition, checkInterval = 100) => {
  return new Promise(resolve => {
    let interval = setInterval(() => {
      if (!condition()) return;
      clearInterval(interval);
      resolve();
    }, checkInterval)
  })
}

const isAnalyticsReady = () => window?.Analytics?.version != null;

const initialiseAnalytics = async () => {
  if (!isAnalyticsReady()) {
    init(LIFERAY_AC_SCRIPT_URL, () => {
      window.Analytics.create({
        channelId: LIFERAY_AC_CHANNEL_ID,
        dataSourceId: LIFERAY_AC_DATA_SOURCE_ID,
        endpointUrl: LIFERAY_AC_ENDPOINT,
        projectId: LIFERAY_AC_PROJECT_ID,
      });
    });

    await waitUntil(isAnalyticsReady);
  }
}

const updateIdentity = (user) => {
  const previousUser = getUserFromLocalStorage();
  if (user && previousUser && String(previousUser?.id) !== String(user?.id)) {
    console.log('identity has changed');
    setUserOnLocalStorage(user);
    window.Analytics.setIdentity({
      email: user?.emailAddress,
      name: user?.name,
    });
  } else {
    console.log('identity has NOT changed');
  }
}

export const startAnalyticsScript = async (user, callback) => {
  console.log(`startAnalyticsScript()`, user, callback)
  await initialiseAnalytics();
  updateIdentity(user);

  window.Analytics.send("pageViewed", "Page");

  callback && callback();
}

export const trackAnalyticsScript = async (user, callback) => {
  console.log(`trackAnalyticsScript()`, user, callback)
  await initialiseAnalytics();
  updateIdentity(user);

  window.Analytics.track("reactLogin", { "user": user?.id });

  callback && callback();
}
export const trackAnalyticsDocScript = async (user, docTitle, docId, docVersion, callback) => {
  console.log(`trackAnalyticsDocScript()`, user, docTitle, docId, callback)
  await initialiseAnalytics();
  updateIdentity(user);

  window.Analytics.track("reactDownloadDoc", { "docTitle": docTitle });

  window.Analytics.send('documentDownloaded', 'Document', { 'groupId': LIFERAY_SITE_ID, 'fileEntryId': docId, 'title': docTitle, 'fileEntryVersion': docVersion });

  callback && callback();
}