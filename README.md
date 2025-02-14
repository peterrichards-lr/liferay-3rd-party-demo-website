# 3rd Party Demo Website

This demo showcases how content can be surfaced via Liferay DXP's headless APIs

**This example currently uses Basic Auth but the intention is to replace this with OAuth2**

## Configuration

An appropriate .env file needs to be created. The .env.example provides more information on what this file needs to include.

## Docker

This example builds different docker images for production and development. The development image uses a Node based image while the production image hosts the production optimised site using NGINX.

The docker build for development expects a .env.development and the production image expects a .env.production.

Either environment can be stood up using docker compose as follows:

`docker compose -f ./compose-dev.yaml up -d`
`
`docker compose -f ./compose-prod.yaml up -d`