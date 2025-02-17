import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import { useFetchRecommendations, useFetchUser } from "../hooks/useFetch";
import Header from "../components/Header";
import { DOCUMENT_TITLE } from "../utils/constants";
import { startAnalyticsScript } from "../utils/analytics-script";

const HomePage = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredValue, setFilteredValue] = useState("");

  const { items, loading } = useFetchRecommendations();
  const { user, loading: loadingUser } = useFetchUser();
  
  useEffect(() => {
    setFilteredItems(
      filteredValue
        ? items.filter(({ title }) =>
          title.toLowerCase().includes(filteredValue)
        )
        : items
    );
  }, [filteredValue, items]);

  useEffect(() => {
    if (!loadingUser && !loading) {
      document.title = DOCUMENT_TITLE;

      startAnalyticsScript(user);
    }
  }, [loadingUser, loading, user]);

  var myCount = 1;
  return (
    <div>
      <Header
        userName={user?.name}
        onChange={({ target: { value } }) => setFilteredValue(value)}
        value={filteredValue}
      />

      <div className="content py-4">
        {loading && (
          <>
            <ClayLoadingIndicator displayType="secondary" size="md" />
          </>
        )}

        {!loading &&
          (items.length ? (
            <div className="container mt-5">
              <div className="row">

                {filteredItems.map(({ contentFields, id, title, description, headline }) => {
                  const subtitleField = { description };

                  myCount++
                  if (myCount <= 10) {
                    return (
                      <div className="col-lg-4 col-md-12" key={id}>
                        <ItemCard
                          description={
                            subtitleField?.description ||
                            "No subtitle available"
                          }
                          id={id}
                          title={title || headline || subtitleField?.description ||
                            "No Title available"}
                        />
                      </div>
                    )
                  } else {
                    return ("")
                  };
                })}
              </div>
            </div>
          ) : (
            <p>No recommendations available for you</p>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
