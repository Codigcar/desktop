-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema exampledb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema exampledb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `exampledb` DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci ;
USE `exampledb` ;

-- -----------------------------------------------------
-- Table `exampledb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exampledb`.`usuario` (
  `id` INT NOT NULL,
  `edad` INT NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `sueldo` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exampledb`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exampledb`.`account` (
  `account_number` INT NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `id_usuario` INT NOT NULL,
  `password` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`account_number`),
  INDEX `fk-id_usuario-usuario-account_idx` (`id_usuario` ASC),
  CONSTRAINT `fk-id_usuario-account-usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `exampledb`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
