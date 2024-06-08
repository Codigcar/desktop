-- -----------------------------------------------------
-- CARGA INICIAL DE DATA DE PRUEBA
-- -----------------------------------------------------



INSERT INTO `usuario` (`cod_usuario`, `tipo_documento`, `nro_documento`, `nombres`, `apellido_paterno`, `apellido_materno`, `email`, `cod_pais_nro_celular`, `nro_celular`, `contrasenia_cifrada`, `estado`, `fecha_hora_registro`, `registrado_por`, `fecha_hora_activacion`, `activado_por`) VALUES
('jperez', 'DNI', '10101010', 'Juan', 'Perez', 'Perez', 'jperez@abc.com', '51', '999999998', '$2a$10$LfjXdICyQEK2bz8h49E5N.jOYjVFvUuQaUYRP55yVHo3qFq6t1s6m', 'ACTIVO', SYSDATE(), 'ADMIN', SYSDATE(), 'ADMIN'),
('mlopez', 'DNI', '10101011', 'Maria', 'Lopez', 'mlopez', 'mlopez@abc.com', '51', '999999999', '$2a$10$LfjXdICyQEK2bz8h49E5N.jOYjVFvUuQaUYRP55yVHo3qFq6t1s6m', 'ACTIVO', SYSDATE(), 'ADMIN', SYSDATE(), 'ADMIN');

INSERT INTO `client` (`id`, `client_id`, `nombre`, `tipo_autenticacion`, `tipo_autorizacion`, `credencial_secreta`, `credencial_secreta_cifrada`, `estado`, `scopes`, `client_settings`, `token_settings`, `fecha_hora_registro`, `registrado_por`,  `horas_duracion_token`, `redirect_uri`, `fecha_hora_activacion`, `activado_por`) VALUES
('e54addba-fcb9-4afc-a461-23b6cacc37b0', 'portal-abc', 'Portal Web ABC',  'client_secret_basic', 'authorization_code,client_credentials', 'acbjKWmR0RHCTuSDiQJVrXQRSazYZ1Ec', '$2a$10$qEA8jMKpjGEdERxN/mauee/4907SGSE1/RC7kAvd9EojkASMhGS3G', 'ACTIVO', 'openid,POR_DEFINIR', 'require-authorization-consent', 'POR_DEFINIR', SYSDATE(), 'ADMIN', 8, 'http://127.0.0.1:4200/auth,http://localhost:4200/auth', SYSDATE(), 'ADMIN');
