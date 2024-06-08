#!/usr/bin/env bash

BRAND=$SCHEMA
APP_TYPE=$([ "$PLATFORM" == "ios" ] && echo "IPA" || echo "APK")
VERSION_NAME=$([ "$PLATFORM" == "ios" ] && echo "$IOS_VERSION_NUMBER" || echo "$ANDROID_VERSION_NAME")

BODY="{
    \"comment_text\": \"✅ $APP_TYPE de $BRAND publicado bajo la versión $VERSION_NAME ($VERSION_CODE).\",
    \"notify_all\": false
}"

LAST_FOUND_TASK_ID=$(echo "$CI_MERGE_REQUEST_TITLE" | grep -o "#[[:alnum:]]\+" | tail -1)
CLICKUP_TASK_ID=${LAST_FOUND_TASK_ID#*#}

if [ -n "${CLICKUP_TASK_ID}" ]; then
  curl -X POST "https://api.clickup.com/api/v2/task/${CLICKUP_TASK_ID}/comment?custom_task_ids=&team_id=" \
    --header "Authorization:${CLICKUP_API_TOKEN}" \
    --header "Content-Type: application/json" \
    --data-binary "${BODY}"

  echo "New comment created for task #${CLICKUP_TASK_ID}"
  exit
fi

echo "No comment was created because no task was found"
