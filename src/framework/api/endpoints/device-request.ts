import { MyApiRequest } from "../my-api";
import {
  DeviceResponse,
  LinkFinishDto,
  LinkStartDto,
  RenameDeviceDto,
} from "../types/device-types";

export function getDeviceModule(request: MyApiRequest) {
  async function linkStart(
    body: LinkStartDto,
  ): Promise<{ token: string; expiresAt: string }> {
    const response = await request("/v1/devices/link/start", "POST", body);
    return response.json();
  }

  async function linkFinish(body: LinkFinishDto): Promise<DeviceResponse> {
    const response = await request("/v1/devices/link/finish", "POST", body);
    return response.json();
  }

  async function renameDevice(
    id: string,
    body: RenameDeviceDto,
  ): Promise<void> {
    await request(`/v1/devices/${id}`, "PATCH", body);
  }

  async function revokeDevice(id: string): Promise<void> {
    await request(`/v1/devices/${id}`, "DELETE");
  }

  return {
    linkStart,
    linkFinish,
    renameDevice,
    revokeDevice,
  };
}
