-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `producto_dim`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `producto_dim` (
  `id_producto` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `precio` VARCHAR(45) NOT NULL,
  `marca` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_producto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sucursal_dim`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sucursal_dim` (
  `id_sucursal` INT NOT NULL,
  `departamento` VARCHAR(45) NOT NULL,
  `provincia` VARCHAR(45) NOT NULL,
  `distrito` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_sucursal`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vendedor_dim`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vendedor_dim` (
  `id_vendedor` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `sexo` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_vendedor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tiempo_dim`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiempo_dim` (
  `id_tiempo` INT NOT NULL,
  `fecha` DATE NOT NULL,
  `dia` INT NOT NULL,
  `dia_nombre` VARCHAR(45) NOT NULL,
  `mes` INT NOT NULL,
  `mes_nombre` VARCHAR(45) NOT NULL,
  `anio` INT NOT NULL,
  `ultimo_dia_mes` TINYINT NOT NULL,
  PRIMARY KEY (`id_tiempo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventas_fact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ventas_fact` (
  `idventas_fact` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `id_sucursal` INT NOT NULL,
  `id_vendedor` INT NOT NULL,
  `id_tiempo` INT NOT NULL,
  `unidades_vendidas` INT NOT NULL,
  `importe_venta` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idventas_fact`),
  INDEX `fk_ventas_fact_producto_dim_idx` (`id_producto` ASC) VISIBLE,
  INDEX `fk_ventas_fact_sucursal_dim1_idx` (`id_sucursal` ASC) VISIBLE,
  INDEX `fk_ventas_fact_vendedor_dim1_idx` (`id_vendedor` ASC) VISIBLE,
  INDEX `fk_ventas_fact_tiempo_dim1_idx` (`id_tiempo` ASC) VISIBLE,
  CONSTRAINT `fk_ventas_fact_producto_dim`
    FOREIGN KEY (`id_producto`)
    REFERENCES `producto_dim` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ventas_fact_sucursal_dim1`
    FOREIGN KEY (`id_sucursal`)
    REFERENCES `sucursal_dim` (`id_sucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ventas_fact_vendedor_dim1`
    FOREIGN KEY (`id_vendedor`)
    REFERENCES `vendedor_dim` (`id_vendedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ventas_fact_tiempo_dim1`
    FOREIGN KEY (`id_tiempo`)
    REFERENCES `tiempo_dim` (`id_tiempo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
