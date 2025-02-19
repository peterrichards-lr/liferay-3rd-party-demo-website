# 3rd Party Demo Website

This demo showcases how content can be surfaced via Liferay DXP's headless APIs

## Configuration

An appropriate .env file needs to be created. The .env.example provides more information on what this file needs to include. The values within this file assume Liferay is being used as the OAuth2 authentication server but they can easily be changed to accommodate another OAuth2 provider.

## Liferay Configuration

A new OAuth2 application needs to be created in Liferay. More information on this feature can be found on Liferay Learn - https://learn.liferay.com/w/dxp/headless-delivery/using-oauth2/creating-oauth2-applications

### OAuth2 Profile

Here is a summary of the required configuration

| Field | Value |
| ----- | ----- |
| Name | 3rd Party Application |
| Website URL | http://localhost:3000/ |
| Callback URIs | http://localhost:3000/ |
| Client Authentication Method | None |
| Client Profile | User Agent Application |
| PKCE Extended Authorization Code | Checked |
| JWT_BEARER | Checked |
| Trusted Application | Checked |
| Token Introspection | Unchecked |

The OAuth2 application should resemble the following screenshot

![OAuth 2 - Profile](docs/OAuth2%20Profile.png)

### OAuth2 Scopes

Here is a summary of the required scopes

| Scope |
| ----- |
| Liferay.Headless.Admin.User.everything.read |
| Liferay.Headless.Delivery.everything.read |

The OAuth2 scopes should resemble the following screenshot

![OAuth 2 - Scopes](docs/OAuth2%20Scopes.png)

### OAuth2 Permissions

Here is a summary of the required permissions

| Permission | Role(s) |
| ----- | ------ |
| Delete | Owner |
| Permissions | Owner |
| Update | Owner |
| Create Token | Owner, User |
| Revoke Token | Owner |
| View | Owner |

The OAuth2 permissions shoudl resemble the following screenshot

![OAuth 2 - Permissions](docs/OAuth2%20Permissions.png)

## Docker

This example builds different docker images for production and development. The development image uses a Node based image while the production image hosts the production optimised site using NGINX.

The docker build for development expects a .env.development and the production image expects a .env.production.

Either environment can be stood up using docker compose as follows:

`docker compose -f ./compose-dev.yaml up -d`
`
`docker compose -f ./compose-prod.yaml up -d`
