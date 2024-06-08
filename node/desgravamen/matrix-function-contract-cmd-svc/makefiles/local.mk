APP_DIR           = app
IMAGE_BUILD       = node:16.16.0-alpine3.16
FUNCTION          = base
UID_LOCAL        ?= $(shell id -u)
GID_LOCAL        ?= $(shell id -g)

install: ##@Global install dependencies.
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-u ${UID_LOCAL}:${GID_LOCAL} \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		${IMAGE_BUILD} \
		yarn install

test: ##@Test source code.
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-u ${UID_LOCAL}:${GID_LOCAL} \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		${IMAGE_BUILD} \
		npm test ${TEST_NAME}

up: ##@Local Start the project
	IMAGE_DEV="$(IMAGE_BUILD)" CONTAINER_NAME="$(MODULE)_$(FUNCTION)" \
		docker-compose -p $(MODULE)_$(FUNCTION) up

down: ##@Local Destroy the project
	@docker-compose -p $(MODULE)_$(FUNCTION) down

invoke: ##@Invoke local function
	docker exec -u ${UID_LOCAL}:${GID_LOCAL} -it $(MODULE)_$(FUNCTION)_backend npm run invoke 