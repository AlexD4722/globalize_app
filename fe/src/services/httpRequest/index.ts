import HttpClient, { ClientMode } from "./HttpClient";

export const JavaClient = new HttpClient(ClientMode.Java);
export const NodeClient = new HttpClient(ClientMode.Node);