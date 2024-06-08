#!/usr/bin/env bash

echo $CI_JOB_STAGE
echo $TARGET_NAME
BRAND=$TARGET_NAME

if [[ $CI_JOB_STAGE == "store_internal_distribution" ]]; then
  sort -u -t '=' -k 1,1 "${SRCROOT}/Packages/${BRAND}/.env.production" "${SRCROOT}/../.env.production" > "${SRCROOT}/../.env"
  cp "${SRCROOT}/Packages/${BRAND}/GoogleService-Info-Prod.plist" "${SRCROOT}/GoogleService-Info.plist"
else
  sort -u -t '=' -k 1,1 "${SRCROOT}/Packages/${BRAND}/.env.staging" "${SRCROOT}/../.env.staging" > "${SRCROOT}/../.env"
  cp "${SRCROOT}/Packages/${BRAND}/GoogleService-Info-Debug.plist" "${SRCROOT}/GoogleService-Info.plist"
fi
