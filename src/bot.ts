import config from './config/options';
import { LaytonClient } from './utils/LaytonClient';

const client = new LaytonClient(config);
void client.start(); 
