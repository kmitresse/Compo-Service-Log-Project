interface Data {
  id?: number;
}

class InvalidData extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Invalid data";
  }
}

export default Data;
export { InvalidData };
