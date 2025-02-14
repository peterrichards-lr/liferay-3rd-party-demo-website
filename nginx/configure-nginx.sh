#!/bin/sh
set -eu

ENV_STR=''

list_env_var_names() {
  ALL_ENV=$(env | sed -e 's/=.*//g')
  for var in $ALL_ENV
  do
    ENV_STR="$ENV_STR"" \$\$""$var"
  done
}

nginx_conf_envsubst() {
  envsubst "$ENV_STR" < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
}

list_env_var_names
nginx_conf_envsubst
exec "$@"