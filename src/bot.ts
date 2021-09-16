import config from './config/options';
import { PlaceClient } from './utils/PlaceClient';

const client = new PlaceClient(config);
void client.start(); 