-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `authorization`
-- -----------------------------------------------------

CREATE TABLE authorization (
    id varchar(255) NOT NULL,
    registered_client_id varchar(255) NOT NULL,
    principal_name varchar(255) NOT NULL,
    authorization_grant_type varchar(255) NOT NULL,
    authorized_scopes varchar(1000) NOT NULL,
    attributes varchar(4000) DEFAULT NULL,
    state varchar(500) DEFAULT NULL,
    authorization_code_value varchar(4000) DEFAULT NULL,
    authorization_code_issued_at timestamp DEFAULT NULL,
    authorization_code_expires_at timestamp DEFAULT NULL,
    authorization_code_metadata varchar(2000) DEFAULT NULL,
    access_token_value varchar(4000) DEFAULT NULL,
    access_token_issued_at timestamp DEFAULT NULL,
    access_token_expires_at timestamp DEFAULT NULL,
    access_token_metadata varchar(2000) DEFAULT NULL,
    access_token_type varchar(255) DEFAULT NULL,
    access_token_scopes varchar(1000) DEFAULT NULL,
    refresh_token_value varchar(4000) DEFAULT NULL,
    refresh_token_issued_at timestamp DEFAULT NULL,
    refresh_token_expires_at timestamp DEFAULT NULL,
    refresh_token_metadata varchar(2000) DEFAULT NULL,
    oidc_id_token_value varchar(4000) DEFAULT NULL,
    oidc_id_token_issued_at timestamp DEFAULT NULL,
    oidc_id_token_expires_at timestamp DEFAULT NULL,
    oidc_id_token_metadata varchar(2000) DEFAULT NULL,
    oidc_id_token_claims varchar(2000) DEFAULT NULL,
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table `authorization_consent`
-- -----------------------------------------------------

CREATE TABLE authorization_consent (
    registered_client_id varchar(255) NOT NULL,
    principal_name varchar(255) NOT NULL,
    authorities varchar(1000) NOT NULL,
    PRIMARY KEY (registered_client_id, principal_name)
);

-- -----------------------------------------------------
-- Table `client`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `client` (
  `id` VARCHAR(45) NOT NULL,
  `client_id` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `tipo_autenticacion` VARCHAR(45) NOT NULL,
  `tipo_autorizacion` VARCHAR(45) NOT NULL,
  `credencial_secreta` VARCHAR(100) NOT NULL,
  `credencial_secreta_cifrada` CHAR(68) NOT NULL,
  `estado` VARCHAR(20) NOT NULL,
  `scopes` VARCHAR(200) NOT NULL,
  `client_settings` VARCHAR(200) NOT NULL,
  `token_settings` VARCHAR(200) NOT NULL,
  `fecha_hora_registro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `registrado_por` VARCHAR(45) NOT NULL,
  `horas_duracion_token` INT NOT NULL,
  `redirect_uri` VARCHAR(1000) NULL,
  `fecha_hora_activacion` DATETIME NOT NULL,
  `activado_por` VARCHAR(45) NOT NULL,
  `fecha_hora_inactivacion` DATETIME NULL,
  `inactivado_por` VARCHAR(45) NULL,
  UNIQUE INDEX `client_id_UNIQUE` (`client_id` ASC) VISIBLE,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuario` (
  `cod_usuario` VARCHAR(45) NOT NULL,
  `tipo_documento` VARCHAR(10) NOT NULL,
  `nro_documento` VARCHAR(45) NOT NULL,
  `nombres` VARCHAR(45) NOT NULL,
  `apellido_paterno` VARCHAR(45) NOT NULL,
  `apellido_materno` VARCHAR(45) NULL,
  `email` VARCHAR(100) NOT NULL,
  `cod_pais_nro_celular` VARCHAR(10) NOT NULL,
  `nro_celular` VARCHAR(20) NOT NULL,
  `contrasenia_cifrada` CHAR(68) NOT NULL,
  `estado` VARCHAR(20) NOT NULL,
  `registrado_por` VARCHAR(45) NOT NULL,
  `fecha_hora_registro` DATETIME NOT NULL,
  `fecha_hora_activacion` DATETIME NOT NULL,
  `activado_por` VARCHAR(45) NOT NULL,
  `fecha_hora_inactivacion` DATETIME NULL,
  `inactivado_por` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_usuario`))
ENGINE = InnoDB;





SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
