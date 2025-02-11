import { getUserIdFromLocalStorage, setUserIdOnLocalStorage } from "./storage";

export function startAnalyticsScript(user, callback) {
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

  init("https://analytics-js-cdn.liferay.com/", function () {
    const previousUserId = getUserIdFromLocalStorage();

    window.Analytics.create({
      channelId: "732043482232844728",
      dataSourceId: "732043451765905677",
      endpointUrl: "https://osbasahpublisher-ac-internal.lfr.cloud",
      projectId: "asah00278b90d86242a3b1b457de70430167",
    });

    if (user && previousUserId !== String(user?.id)) {
      setUserIdOnLocalStorage(user.id);

      window.Analytics.setIdentity({
        email: user?.emailAddress,
        name: user?.name,
      });
    }

    window.Analytics.send("pageViewed", "Page");

    callback && callback();
  });
}

export function trackAnalyticsScript(user, callback) {
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

  init("https://analytics-js-cdn.liferay.com/", function () {
    const previousUserId = getUserIdFromLocalStorage();

    window.Analytics.create({
      channelId: "732043482232844728",
      dataSourceId: "732043451765905677",
      endpointUrl: "https://osbasahpublisher-ac-internal.lfr.cloud",
      projectId: "asah00278b90d86242a3b1b457de70430167",
    });

    if (user && previousUserId !== String(user?.id)) {
      setUserIdOnLocalStorage(user.id);

      window.Analytics.setIdentity({
        email: user?.emailAddress,
        name: user?.name,
      });
    }

    window.Analytics.track("reactLogin", {"user":user});

    callback && callback();
  });
}
export function trackAnalyticsDocScript(user, docTitle, docId, callback) {
  const previousUserId = getUserIdFromLocalStorage();
  if (user && previousUserId !== String(user?.id)) {
    setUserIdOnLocalStorage(user.id);

    window.Analytics.setIdentity({
      email: user?.emailAddress,
      name: user?.name,
    });
  }
  window.Analytics.track("reactDownloadDoc", {"docTitle":docTitle});
  window.Analytics.send('documentDownloaded', 'Document', {'groupId': 32495,'fileEntryId': docId,'title':docTitle,'fileEntryVersion':'1.0'});
  callback && callback();

}
