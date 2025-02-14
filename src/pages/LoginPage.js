import React, { useState } from "react";
import ClayForm, { ClayInput } from "@clayui/form";
import ClayButton from "@clayui/button";
import { Option, Picker, Text } from "@clayui/core";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import { Link } from "react-router-dom";
import { useFetchUsers } from "../hooks/useFetch";
import { setBasicAuthOnLocalStorage, setUserIdOnLocalStorage } from "../utils/storage";
import { trackAnalyticsScript } from "../utils/analytics-script";
import { DOCUMENT_TITLE, IMAGE_PATH } from "../utils/constants";
import { resetLocalStorage } from "../utils/storage";

const LoginPage = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { items: users, loadingUsers } = useFetchUsers();

  const isLinkEnabled = password.trim() !== "";

  const filteredUsers = users.filter(
    (user) =>
      user.emailAddress === "christian.carter@clarityvisionsolutions.com" ||
      user.emailAddress === "capeloj@hotmail.com" ||
      user.emailAddress === "walter.douglas@clarityvisionsolutions.com" ||
      user.emailAddress === "adrienn.kocsis@liferay.com" ||
      user.emailAddress === "ian.miller@clarityvisionsolutions.com" ||
      user.emailAddress === "harper.roberts@clarityvisionsolutions.com" ||
      user.emailAddress === "terrence.wheatley@somedistributor.com" ||
      user.emailAddress === "admin@clarityvisionsolutions.com" ||
      user.emailAddress === "clara.murphy@clarityvisionsolutions.com"
  );

  document.title = DOCUMENT_TITLE;

  return (
    <div className="login">
      <ClayForm.Group className="sheet">
        <div className="text-center mb-4 position-relative">
          <img
            src={`${IMAGE_PATH}logo-full-name-vector_clarity.svg`}
            alt="logo"
          />
        </div>

        <label
          className="mb-3 text-uppercase"
          htmlFor="picker"
          id="picker-label"
        >
          <Text size={4}>Login</Text>
        </label>

        {loadingUsers && <ClayLoadingIndicator className="mb-4" />}

        {!loadingUsers && (
          <Picker
            selectedKey={selectedUserId}
            className="mb-3"
            aria-labelledby="picker-label"
            id="picker"
            items={filteredUsers}
            onSelectionChange={(id) => {
              setSelectedUserId(id);
              const user = users.find(user => String(user.id) === id);
              setSelectedUser(user);
            }}
          >
            {({ name, id }) => <Option key={id}>{name}</Option>}
          </Picker>
        )}

        <ClayInput
          disabled={loadingUsers}
          id="basicInputText"
          placeholder="Type password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <div className="text-center mt-3">
          <Link
            onClick={() => {
              resetLocalStorage();
              setUserIdOnLocalStorage(selectedUserId);
              trackAnalyticsScript(selectedUser);
              setBasicAuthOnLocalStorage(selectedUser.emailAddress, password);
            }}
            className="login-link"
            to={isLinkEnabled ? `/home?userId=${selectedUserId}` : ""}
          >
            <ClayButton
              block
              className="mr-2"
              displayType="primary"
              disabled={!isLinkEnabled}
            >
              Login
            </ClayButton>
          </Link>
        </div>
      </ClayForm.Group>
    </div>
  );
};

export default LoginPage;
