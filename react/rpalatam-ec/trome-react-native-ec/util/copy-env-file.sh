#!/usr/bin/env bash

echo $CI_JOB_STAGE

if [[ $CI_JOB_STAGE == "store_internal_distribution" ]]; then
  base64 -d $release_keystore > android/app/release.keystore
  cp ".env.production" ".env"
else
  base64 -d $debug_keystore > android/app/release.keystore
  cp ".env.staging" ".env"
fi
