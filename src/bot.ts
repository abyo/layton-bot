import config from './config/options';
import { PlaceClient } from './utils/LaytonClient';

const client = new PlaceClient(config);
void client.start(); 