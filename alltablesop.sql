CREATE TABLE IF NOT EXISTS `gymbd`.`category` (
  `id_category` INT NOT NULL AUTO_INCREMENT,
  `id_gym` INT NULL,
  `name_category` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id_category`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gymbd`.`exercise` (
  `id_exercise` INT NOT NULL AUTO_INCREMENT,
  `id_gym` INT NULL,
  `description` VARCHAR(45) NULL,
  `urlimg` VARCHAR(45) NULL,
  `repeat` INT NULL,
  `category` INT NULL,
  `tags` INT NULL,
  PRIMARY KEY (`id_exercise`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gymbd`.`gym` (
  `id_gym` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `package_selected` INT NULL,
  PRIMARY KEY (`id_gym`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gymbd`.`gymActive` (
  `idgymActive` INT NOT NULL AUTO_INCREMENT,
  `id_gym` INT NULL,
  `lastdatepaid` VARCHAR(45) NULL,
  `expirationdate` VARCHAR(45) NULL,
  PRIMARY KEY (`idgymActive`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gymbd`.`packages` (
  `id_packages` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id_packages`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gymbd`.`rutina_exercise` (
  `id_rutina_exercise` INT NOT NULL AUTO_INCREMENT,
  `id_rutina` INT NULL,
  `id_exercise` INT NULL,
  `daytodo` VARCHAR(45) NULL,
  PRIMARY KEY (`id_rutina_exercise`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gymbd`.`rutinas` (
  `id_rutinas` INT NOT NULL AUTO_INCREMENT,
  `id_gym` INT NULL,
  PRIMARY KEY (`id_rutinas`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gymbd`.`user_rutina` (
  `id_user_rutina` INT NOT NULL AUTO_INCREMENT,
  `id_rutina` INT NULL,
  `id_user` INT NULL,
  PRIMARY KEY (`id_user_rutina`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gymbd`.`tags` (
  `id_tags` INT NOT NULL AUTO_INCREMENT,
  `id_gym` INT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id_tags`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gymbd`.`usuarios` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NULL,
  `last_name` VARCHAR(20) NULL,
  `birthdate` DATETIME NULL,
  `gender` VARCHAR(10) NULL,
  `gym_id` INT NULL,
  `password` VARCHAR(60) NULL,
  `typeuser` VARCHAR(15) NULL,
  `member_active` INT NULL,
  `active_service` INT NULL,
  `email` VARCHAR(40) NULL,
  `token` VARCHAR(40) NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB;

INSERT INTO `usuarios` (`id_user`, `name`, `last_name`, `birthdate`, `gender`, `gym_id`, `password`, `typeuser`, `member_active`,`active_service`, `email`, `token`) VALUES
(1, 'Miguel', 'Vidal', '1992-09-19', 'Male',NULL, 'sha1$866d4787$1$35e2d363f0db5224041c568245780a250560fd3f', 'superadmin', 1,1, 'rivensona@gmail.com', ''),
(2, 'Carlos', 'Plata', '0000-00-00', 'Male', NULL, 'sha1$866d4787$1$35e2d363f0db5224041c568245780a250560fd3f', 'superadmin', 1,1, 'carlosskull@gmail.co', ''),
(3, 'Dany', 'Valenzuela', '0000-00-00', 'Male', NULL, 'sha1$866d4787$1$35e2d363f0db5224041c568245780a250560fd3f', 'superadmin', 1,1, 'dany_phant@gmail.com', ''),
(4, 'Andres', 'Palavicini', '1992-08-21', 'Male', NULL, 'sha1$866d4787$1$35e2d363f0db5224041c568245780a250560fd3f', 'superadmin', 1,1, 'yea@fack.com', '');
