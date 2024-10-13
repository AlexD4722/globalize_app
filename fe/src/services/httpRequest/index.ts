import HttpClient, { ClientMode } from "./httpClient";

export const JavaClient = new HttpClient(ClientMode.Java);
export const NodeClient = new HttpClient(ClientMode.Node);