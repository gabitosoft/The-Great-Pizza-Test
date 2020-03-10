export class Pizza {

  constructor(name: string, price: number, description: string) {
    this._id = '';
    this._name = name;
    this._price = price;
    this._description = description;
  }

  private _id : string;
  public get id() : string {
    return this._id;
  }
  public set id(v : string) {
    this._id = v;
  }

  private _name : string;
  public get name() : string {
    return this._name;
  }
  public set name(v : string) {
    this._name = v;
  }

  private _price : number;
  public get price() : number {
    return this._price;
  }
  public set price(v : number) {
    this._price = v;
  }

  private _description : string;
  public get description() : string {
    return this._description;
  }
  public set description(v : string) {
    this._description = v;
  }
}
