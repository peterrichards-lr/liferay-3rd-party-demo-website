import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetchRecommendationItem, useFetchUser } from "../hooks/useFetch";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import { DOCUMENT_TITLE, LIFERAY_HOST_BASE_URL, LIFERAY_FILE_ENTRY_VERSION } from "../utils/constants";
import Header from "../components/Header";
import { startAnalyticsScript } from "../utils/analytics-script";
import { trackAnalyticsDocScript } from "../utils/analytics-script";

const DetailsPage = () => {
  const { item, loading: loadingItem } = useFetchRecommendationItem();
  const imageField = item?.image?.contentUrl
  const content = item?.articleBody || item?.description
  const urlDocument = item?.contentUrl

  const { user, loading: loadingUser } = useFetchUser();

  useEffect(() => {
    if (!loadingUser && !loadingItem) {
      document.title = `${DOCUMENT_TITLE} - ${item?.title}`;

      startAnalyticsScript(user);
    }
  }, [loadingUser, user, item?.title, loadingItem]);

  function formatContent(content, url) {
    const regex = /src=["']([^"']+)["']/;

    const match = content?.match(regex);

    if (match && match[1]) {
      const resultString = content.replace(match[0], `src="${url}${match[1]}"`);

      return resultString;
    } else {
      return content;
    }
  }

  return (
    <>
      <Header showFilter={false} userName={user?.name} />

      <div className="content pb-4">
        {!loadingItem ? (
          <>
            <div
              data-analytics-asset-id={item.id}
              data-analytics-asset-title={item.title}
              data-analytics-asset-type="web-content"
            >
              {imageField && (
                <div className="content-full__image">
                  <img src={LIFERAY_HOST_BASE_URL + imageField} alt="content" />
                </div>
              )}

              <div className="container pt-4">
                <div className="row">
                  <div className="col col-12">
                    <h1 className="mb-4">{item.title || item.headline}</h1>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatContent(content, LIFERAY_HOST_BASE_URL),
                      }}
                    />
                  </div>
                </div>
                {(urlDocument) && (
                  <div className="row">
                    <div className="col col-12">
                      <a href={LIFERAY_HOST_BASE_URL + urlDocument} onClick={() => { trackAnalyticsDocScript(user, item.title, item.id, LIFERAY_FILE_ENTRY_VERSION) }}>Download</a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col col-12">
                  <Link to={`/`}>Back to home</Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <ClayLoadingIndicator
            displayType="secondary"
            size="md"
            className="mt-4"
          />
        )}
      </div>
    </>
  );
};

export default DetailsPage;
