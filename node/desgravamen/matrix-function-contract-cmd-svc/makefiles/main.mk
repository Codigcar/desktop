SHELL = /bin/bash

MODULE      = product-contract-account-validation
ENVIRONMENT = dev

DOCKER_UID  = $(shell id -u)
DOCKER_GID  = $(shell id -g)
DOCKER_USER = $(shell whoami)

base:
	@docker build -t ${MODULE}:base -f docker/base/Dockerfile .
	@docker build -t ${MODULE}:build --build-arg IMAGE=${MODULE}:base -f docker/build/Dockerfile .

envs:
	@rm -rf app/serverless.yml
	$(eval VPC_ID = $(shell aws ec2 describe-vpcs --query "Vpcs[?Tags[?Key=='Name']|[?Value=='vpc-${ENVIRONMENT}']].VpcId" --output text))
	$(eval SN_ID  = $(shell aws ec2 describe-subnets --query "Subnets[*]|[?VpcId=='${VPC_ID}'].SubnetId" --filters Name=tag-key,Values="Name" Name=tag-value,Values="vpc-${ENVIRONMENT}-private*" --output json))
	$(eval SG_ID  = $(shell aws ec2 describe-security-groups --query "SecurityGroups[?GroupName=='default']|[?VpcId=='${VPC_ID}'].GroupId" --output text))
	$(eval DYNAMODB_ARN = $(shell aws dynamodb describe-table --table-name dyn-${ENVIRONMENT}-contract-eventStore | jq -r .Table.LatestStreamArn))
	$(eval MSK_ARN = $(shell aws kafka list-clusters --query "ClusterInfoList[*]|[?ClusterName=='msk-${ENVIRONMENT}-matrix-01'].ClusterArn" --output text))
	$(eval MSK_SECRET_ARN = $(shell aws secretsmanager describe-secret --secret-id AmazonMSK_${ENVIRONMENT}_01 --query ARN --output text))
	$(eval MSK_BOOTSTRAP_SERVERS = $(shell aws kafka get-bootstrap-brokers --cluster-arn ${MSK_ARN} --output text))
	$(eval MSK_SASL_USERNAME = $(shell aws secretsmanager get-secret-value --secret-id AmazonMSK_${ENVIRONMENT}_01 --query SecretString --output text | jq -r '."username"'))
	$(eval MSK_SASL_PASSWORD = $(shell aws secretsmanager get-secret-value --secret-id AmazonMSK_${ENVIRONMENT}_01 --query SecretString --output text | jq -r '."password"'))
	@cp app/serverless-template.yml app/serverless.yml
	@sed -i 's|{ENVIRONMENT}|${ENVIRONMENT}|g' app/serverless.yml
	@sed -i 's|{MODULE}|${MODULE}|g' app/serverless.yml
	@sed -i "s|{SN_ID_0}|$(shell echo '${SN_ID}' | jq -r .[0])|g" app/serverless.yml
	@sed -i "s|{SN_ID_1}|$(shell echo '${SN_ID}' | jq -r .[1])|g" app/serverless.yml
	@sed -i "s|{SG_ID}|${SG_ID}|g" app/serverless.yml
	@sed -i 's|{DYNAMODB_ARN}|${DYNAMODB_ARN}|g' app/serverless.yml
	@sed -i 's|{MSK_ARN}|${MSK_ARN}|g' app/serverless.yml
	@sed -i 's|{MSK_SECRET_ARN}|${MSK_SECRET_ARN}|g' app/serverless.yml
	@sed -i 's|{MSK_BOOTSTRAP_SERVERS}|${MSK_BOOTSTRAP_SERVERS}|g' app/serverless.yml
	@sed -i 's|{MSK_SASL_USERNAME}|${MSK_SASL_USERNAME}|g' app/serverless.yml
	@sed -i 's|{MSK_SASL_PASSWORD}|${MSK_SASL_PASSWORD}|g' app/serverless.yml

token:
	@rm -rf token.txt
	@aws sts assume-role --role-arn arn:aws:iam::$(shell aws sts get-caller-identity | jq -r .Account):role/github-deploy --role-session-name github-deploy --output json > token.txt

build: token
	$(eval AWS_ACCESS_KEY_ID = $(shell cat token.txt | jq -r .Credentials.AccessKeyId))
	$(eval AWS_SECRET_ACCESS_KEY = $(shell cat token.txt | jq -r .Credentials.SecretAccessKey))
	$(eval AWS_SESSION_TOKEN = $(shell cat token.txt | jq -r .Credentials.SessionToken))
	@echo ''"${DOCKER_USER}"':x:'"${DOCKER_UID}"':'"${DOCKER_GID}"'::/app:/sbin/nologin' > passwd
	@docker run --rm -u "${DOCKER_UID}":"${DOCKER_GID}" -v "${PWD}"/passwd:/etc/passwd:ro -v "${PWD}"/app:/app \
		-e ENVIRONMENT=${ENVIRONMENT} \
		-e ACTION=${ACTION} \
	  -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
	  -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
	  -e AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN} \
	${MODULE}:build
