import React from "react";
import ClayCard from "@clayui/card";
import { Link } from "react-router-dom";
import { Text } from "@clayui/core";

const ItemCard = ({ description, id, image, title }) => {
  return (
    <ClayCard displayType={"file"}>
      <ClayCard.Body>
        <ClayCard.Description displayType="title">
          <Text size={5}>{title}</Text>
        </ClayCard.Description>

        <ClayCard.Description truncate displayType="text">
          <Text size={3}>{description}</Text>
        </ClayCard.Description>

        <ClayCard.Description displayType="text">
          <Link to={`/details?contentId=${id}`}>
            Read more
          </Link>
        </ClayCard.Description>
      </ClayCard.Body>
    </ClayCard>
  );
};

export default ItemCard;
