import 'reflect-metadata';
import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Container as InversifyContainer } from 'inversify';
import TYPES from './types';
import { I2CService } from "../services/I2CService";
import { SecretManagerClient } from "../clients/SecretManagerClient";
import { Validator } from "../utils/Validator";

const container = new InversifyContainer();

/* AWS SDK */
container.bind<SecretsManagerClient>(TYPES.SecretsManagerClient).toConstantValue(new SecretsManagerClient({}));

/* Configuration */
container.bind<string>(TYPES.i2cSecretId).toConstantValue(process.env.I2C_CREDENTIAL);

/* Components */
container.bind<I2CService>(TYPES.I2CService).to(I2CService);
container.bind<Validator>(TYPES.Validator).to(Validator);
container.bind<SecretManagerClient>(TYPES.SecretManagerClient).to(SecretManagerClient);

export default container;

