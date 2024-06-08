sam.init:
	sam init \
		--output-dir "$(PWD)/app"

sam.start-api:
	sam local start-api \
		--template "$(PWD)/app/template.yaml" \
		--host 0.0.0.0 \
		--debug

sam.generate-event:
	sam local generate-event apigateway http-api-proxy > $(PWD)/app/events/$(EVENT_NAME).json

sam.invoke:
	sam local invoke -e $(PWD)/app/events/$(EVENT_NAME).json \
		--template "$(PWD)/app/template.yaml" \
		--docker-network matrix-local \
		--debug \
		$(FUNCTION_ID)
