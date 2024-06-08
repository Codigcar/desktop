# Flyway Migration

Create the project as Spring Starter Project and in the configuration select the option Flyway Migrations

In case you have already a created project

In the pom.xml file, add the flyway dependency [Flyway Core](https://mvnrepository.com/artifact/org.flywaydb/flyway-core)

## Configure Application Properties

Use the property `spring.flyway.locations=classpath:/db/migration,classpath:/db/testdata` 


