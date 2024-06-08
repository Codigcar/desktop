# MATRIX FUNCTION CONTRACT CMD SVC

Este repositorio contiene todas las funciones Lambda relacionadas al dominio de contrato de MATRIX.

## Características generales
- TypeScript 4.7.4
- esbuild 0.15.3
- aws powertools
- Terraform

## Lambdas

### lmb-env-contract_authorizer:
Función lambda que busca una oferta relacionada a un cliente y procede a crear el evento de contrato.
- Handler: dist/functions/authorizer/handler.handler
- API: /me/offer/{offerId}/contract
- Method: POST
- Environment variables:
  - COGNITO_USER_POOL_ID: **********
  - POWERTOOLS_SERVICE_NAME: ms-app-poc-svc_listen-topic
  - PRODUCT_OFFER_TABLE_NAME: dyn-dev-matrix-product-offers-01
  - CONTRACT_EVENT_STORE_TABLE_NAME: dyn-dev-matrix-contract-events-01
- DynamoDB:
  - Table: dyn-dev-matrix-product-offers-01
  - Permissions:
    - "dynamodb:Query"
    - "dynamodb:Put"
  - Table: dyn-dev-matrix-contract-events-01
  - Permissions:
    - "dynamodb:Query"
    - "dynamodb:Put"

### lmb-env-create_customer_requested:
Función lambda que recibe la confirmación de aceptación de oferta. Verifica si el cliente no ha sido creado y procede a enviar el mensaje para creación de cliente.
- Handler: dist/functions/create-customer-requested/handler.handler
- Environment variables:
  - CONTRACT_EVENT_STORE_TABLE_NAME: dyn-dev-matrix-contract-events-01
  - CUSTOMER_EVENT_STORE_TABLE_NAME: dyn-dev-matrix-customer-events-01
  - SECRETS_MANAGER_MSK_NAME: AmazonMSK_sm-dev-matrix-msk-01
  - MSK_TOPIC_OFFER_AUTHORIZED: com.gcredicorp.matrix.contract.offer-authorized.v1
  - MSK_TOPIC_CUSTOMER_REQUESTED: com.gcredicorp.matrix.customer.creation-requested.v1
  - MSK_BROKERS: **********
  - MSK_CLIENT_ID: lmb-contract-cmd_create-customer-requested-client
- DynamoDB:
  - Table: dyn-dev-matrix-contract-events-01
  - Permissions:
    - "dynamodb:Query"
    - "dynamodb:Put"
  - Table: dyn-dev-matrix-customer-events-01
  - Permissions:
    - "dynamodb:Query"
- Kafka:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topic: arn:aws:kafka:us-east-1:459873824842:topic/msk-dev-matrix-01/com.gcredicorp.matrix.contract.offer-authorized.v1
  - Permissions:
    - kafka-cluster:Connect
    - kafka-cluster:DescribeGroup
    - kafka-cluster:WriteData
    - kafka-cluster:AlterGroup
    - kafka-cluster:DescribeTopic
    - kafka-cluster:ReadData
    - kafka-cluster:DescribeClusterDynamicConfiguration
    - kafka:DescribeCluster
    - kafka:GetBootstrapBrokers
    - kafka:ListScramSecrets
- MskEvent:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topics:
    - com.gcredicorp.matrix.contract.offer-authorized.v1

### lmb-env-customer_created:
Función lambda que recibe un mensaje de un topic msk con la confirmación de creación del cliente, y guarda el evento.
- Handler: dist/functions/customer-created/handler.handler
- Environment variables:
  - CONTRACT_EVENT_STORE_TABLE_NAME: dyn-dev-matrix-contract-events-01
  - MSK_TOPIC_CUSTOMER_CREATED: com.gcredicorp.matrix.customer.created.v1
  - MSK_TOPIC_CUSTOMER_VALIDATED: com.gcredicorp.matrix.contract.customer-validated.v1
  - MSK_BROKERS: **********
  - MSK_CLIENT_ID: lmb-contract-cmd_create-customer-requested-client
- DynamoDB:
  - Table: dyn-dev-matrix-contract-events-01
  - Permissions:
    - "dynamodb:Query"
    - "dynamodb:Put"
- Kafka:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topic: arn:aws:kafka:us-east-1:459873824842:topic/msk-dev-matrix-01/com.gcredicorp.matrix.customer.created.v1
  - Permissions:
    - kafka-cluster:Connect
    - kafka-cluster:DescribeGroup
    - kafka-cluster:WriteData
    - kafka-cluster:AlterGroup
    - kafka-cluster:DescribeTopic
    - kafka-cluster:ReadData
    - kafka-cluster:DescribeClusterDynamicConfiguration
    - kafka:DescribeCluster
    - kafka:GetBootstrapBrokers
    - kafka:ListScramSecrets
- MskEvent:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topics:
    - com.gcredicorp.matrix.customer.created.v1

### lmb-env-create_card_requested:
Función lambda que verifica si el cliente tiene un evento de contrato creado y procede a enviar el mensaje para creación de tarjeta y cuenta.
- Handler: dist/functions/create-card-requested/handler.handler
- Environment variables:
  - CONTRACT_EVENT_STORE_TABLE_NAME: dyn-dev-matrix-contract-events-01
  - SECRETS_MANAGER_MSK_NAME: AmazonMSK_sm-dev-matrix-msk-01
  - MSK_TOPIC_CUSTOMER_VALIDATED: com.gcredicorp.matrix.contract.customer-validated.v1
  - MSK_TOPIC_CARD_REQUESTED: com.gcredicorp.matrix.card.requested.v1
  - MSK_BROKERS: **********
  - MSK_CLIENT_ID: lmb-contract-cmd_create-card-requested-client
- DynamoDB:
  - Table: dyn-dev-matrix-contract-events-01
  - Permissions:
    - "dynamodb:Query"
    - "dynamodb:Put"
- Kafka:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topic: arn:aws:kafka:us-east-1:459873824842:topic/msk-dev-matrix-01/com.gcredicorp.matrix.card.requested.v1
  - Permissions:
    - kafka-cluster:Connect
    - kafka-cluster:DescribeGroup
    - kafka-cluster:WriteData
    - kafka-cluster:AlterGroup
    - kafka-cluster:DescribeTopic
    - kafka-cluster:ReadData
    - kafka-cluster:DescribeClusterDynamicConfiguration
    - kafka:DescribeCluster
    - kafka:GetBootstrapBrokers
    - kafka:ListScramSecrets
- MskEvent:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topics:
    - com.gcredicorp.matrix.contract.customer-validated.v1

### lmb-env-account_created:
Función lambda que recibe el evento de creación de cuenta del servicio card-register-agg y crea el evento en el contracts event store.
- Handler: dist/functions/account-created/handler.handler
- Environment variables:
  - CONTRACT_EVENT_STORE_TABLE_NAME: dyn-dev-matrix-contract-events-01
  - MSK_TOPIC_ACCOUNT_CREATED: com.gcredicorp.matrix.account.created.v1
  - MSK_BROKERS: **********
  - MSK_CLIENT_ID: lmb-contract-cmd_account-created-client
- DynamoDB:
  - Table: dyn-dev-matrix-contract-events-01
  - Permissions:
    - "dynamodb:Query"
    - "dynamodb:Put"
- MskEvent:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topics:
    - com.gcredicorp.matrix.account.created.v1

### lmb-env-card_emitted:
Función lambda que recibe el evento de creación de cuenta del servicio card-register-agg y crea el evento en el contracts event store.
- Handler: dist/functions/card-emitted/handler.handler
- Environment variables:
  - CONTRACT_EVENT_STORE_TABLE_NAME: dyn-dev-matrix-contract-events-01
  - MSK_TOPIC_CARD_EMITTED: com.gcredicorp.matrix.card.emitted.v1
  - MSK_BROKERS: **********
  - MSK_CLIENT_ID: lmb-contract-cmd_card-emitted-client
- DynamoDB:
  - Table: dyn-dev-matrix-contract-events-01
  - Permissions:
    - "dynamodb:Query"
    - "dynamodb:Put"
- MskEvent:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topics:
    - com.gcredicorp.matrix.card.emitted.v1

### lmb-env-document_requested:
Función lambda que recibe la confirmación de aceptación de oferta y envía el mensaje para creación de documento.
- Handler: dist/functions/document-requested/handler.handler
- Environment variables:
  - PRODUCT_OFFER_TABLE_NAME: dyn-dev-matrix-product-offers-01
  - BUCKET_DOCUMENTSRV: dev-documentsrv-sup-deploymentbucket
  - SECRETS_MANAGER_MSK_NAME: AmazonMSK_sm-dev-matrix-msk-01
  - MSK_TOPIC_OFFER_AUTHORIZED: com.gcredicorp.matrix.contract.offer-authorized.v1
  - MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED: com.gcredicorp.matrix.document-template.render-requested.v1
  - MSK_BROKERS: **********
  - MSK_CLIENT_ID: lmb-contract-cmd_document-requested-client
- DynamoDB:
  - Table: dyn-dev-matrix-product-offers-01
  - Permissions:
    - "dynamodb:Query"
- Kafka:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topic: arn:aws:kafka:us-east-1:459873824842:topic/msk-dev-matrix-01/com.gcredicorp.matrix.contract.offer-authorized.v1
  - Permissions:
    - kafka-cluster:Connect
    - kafka-cluster:DescribeGroup
    - kafka-cluster:WriteData
    - kafka-cluster:AlterGroup
    - kafka-cluster:DescribeTopic
    - kafka-cluster:ReadData
    - kafka-cluster:DescribeClusterDynamicConfiguration
    - kafka:DescribeCluster
    - kafka:GetBootstrapBrokers
    - kafka:ListScramSecrets
- MskEvent:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topics:
    - com.gcredicorp.matrix.contract.offer-authorized.v1

### lmb-env-document_created:
Función lambda que recibe el evento de emisión generación de documento y crea el evento en el contracts event store.
- Handler: dist/functions/document-created/handler.handler
- Environment variables:
  - CONTRACT_EVENT_STORE_TABLE_NAME: dyn-dev-matrix-contract-events-01
  - MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED: com.gcredicorp.matrix.document-template.render-completed.v1
  - MSK_BROKERS: **********
  - MSK_CLIENT_ID: lmb-contract-cmd_document-created-client
- DynamoDB:
  - Table: dyn-dev-matrix-contract-events-01
  - Permissions:
    - "dynamodb:Query"
    - "dynamodb:Put"
- MskEvent:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topics:
    - com.gcredicorp.matrix.document-template.render-completed.v1

### lmb-env-offer_acquisition_completed:
Función lambda que recibe un mensaje de 3 topics msk (account, card y document) y guarda el evento de contratación realizada.
- Handler: dist/functions/offer-acquisition-completed/handler.handler
- Environment variables:
  - CONTRACT_EVENT_STORE_TABLE_NAME: dyn-dev-matrix-contract-events-01
  - PRODUCT_OFFER_TABLE_NAME: dyn-dev-matrix-product-offers-01
  - MSK_BROKERS: **********
  - MSK_CLIENT_ID: lmb-contract-cmd_offer-acquisition-completed-client
  - MSK_TOPIC_ACCOUNT_CREATED: com.gcredicorp.matrix.contract.account-created.v1
  - MSK_TOPIC_CARD_EMITTED: com.gcredicorp.matrix.contract.card-emitted.v1
  - MSK_TOPIC_DOCUMENT_CREATED: com.gcredicorp.matrix.contract.document-created.v1

- DynamoDB:
  - Table: dyn-dev-matrix-product-offers-01
  - Permissions:
    - "dynamodb:Query"
    - "dynamodb:Put"
  - Table: dyn-dev-matrix-contract-events-01
  - Permissions:
    - "dynamodb:Query"
    - "dynamodb:Put"
- Kafka:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topic: arn:aws:kafka:us-east-1:459873824842:topic/msk-dev-matrix-01/com.gcredicorp.matrix.contract.account-created.v1
  - Permissions:
    - kafka-cluster:Connect
    - kafka-cluster:DescribeGroup
    - kafka-cluster:WriteData
    - kafka-cluster:AlterGroup
    - kafka-cluster:DescribeTopic
    - kafka-cluster:ReadData
    - kafka-cluster:DescribeClusterDynamicConfiguration
    - kafka:DescribeCluster
    - kafka:GetBootstrapBrokers
    - kafka:ListScramSecrets
  - Topic: arn:aws:kafka:us-east-1:459873824842:topic/msk-dev-matrix-01/com.gcredicorp.matrix.contract.card-emitted.v1
  - Permissions:
    - kafka-cluster:Connect
    - kafka-cluster:DescribeGroup
    - kafka-cluster:WriteData
    - kafka-cluster:AlterGroup
    - kafka-cluster:DescribeTopic
    - kafka-cluster:ReadData
    - kafka-cluster:DescribeClusterDynamicConfiguration
    - kafka:DescribeCluster
    - kafka:GetBootstrapBrokers
    - kafka:ListScramSecrets
  - Topic: arn:aws:kafka:us-east-1:459873824842:topic/msk-dev-matrix-01/com.gcredicorp.matrix.contract.document-created.v1
  - Permissions:
    - kafka-cluster:Connect
    - kafka-cluster:DescribeGroup
    - kafka-cluster:WriteData
    - kafka-cluster:AlterGroup
    - kafka-cluster:DescribeTopic
    - kafka-cluster:ReadData
    - kafka-cluster:DescribeClusterDynamicConfiguration
    - kafka:DescribeCluster
    - kafka:GetBootstrapBrokers
    - kafka:ListScramSecrets
- MskEvent:
  - Cluster: arn:aws:kafka:us-east-1:459873824842:cluster/msk-dev-matrix-01/135c34df-6f7e-4357-8192-a066188e6992-25
  - Topics:
    - com.gcredicorp.matrix.contract.account-created.v1
    - com.gcredicorp.matrix.contract.card-emitted.v1
    - com.gcredicorp.matrix.contract.document-created.v1

## Instalación

Requerimientos:
  - Docker >= 20.10.17 (client & compose)
  - AWS CLI >= 2.6.2
  - AWS SAM >= 1.56.1

Para su uso en local:

1. Instalar librerías:

        make install

2. Ejecutar funciones lambda (compilación en tiempo real - watch):

        make up

3. Levantar API Local:

        make sam.start-api

4. Invocar evento:

        make sam.invoke EVENT_NAME=nombre_evento FUNCTION_ID=nombre_funcion  
        
