import { browserInstance, serverInstance } from "./instance";

class Client {
  constructor(private readonly instance: typeof browserInstance | typeof serverInstance) {}

  public async getShop(name: string) {
    const { data } = await this.instance.get(`/booking/shop/${name}`);
    return data;
  }

  public async reserveMenuItem(menuItem: any) {
    const { data } = await this.instance.post("/booking/menu", {
      id: menuItem.id,
      quantity: menuItem.quantity,
    });
    return data;
  }

  public async getReservation(code: string) {
    const { data: reservationData } = await this.instance.get(`/booking/reservation/${code}`);
    const shopData = await this.getShop(reservationData.shopId);
    return {
      reservation: reservationData,
      shop: shopData,
    };
  }

  public async login(username: string, password: string) {
    const { data } = await this.instance.post("/user/token", {
      username,
      password,
    });
    return data;
  }

  public async logout(token: string) {
    await this.instance.delete("/user/token/revoke", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public async getUser(token: string) {
    const { data } = await this.instance.get("/booking/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}

export const browserClient = new Client(browserInstance);
export const serverClient = new Client(serverInstance);
