build-code: ##@Build app files.
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		${IMAGE_BUILD} \
		yarn build:prod

zip: ##@Zip app for S3 uploading.
	mkdir -p app/build
	cp -R app/dist/* app/build
	ls -al app/build
	cd app/build && zip -rq ../../app.zip *

upload: ##@Upload zipped code to S3.
	aws s3 cp app.zip s3://s3-${{github.event.inputs.environment}}-matrix-artifactory-01/artifactory-setdni/

remove: ##@Global install dependencies.
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-u ${UID_LOCAL}:${GID_LOCAL} \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		${IMAGE_BUILD} \
		npm run remove:dev