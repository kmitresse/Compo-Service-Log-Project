interface Data {
  input: any[];
  output: any[];
}

type DataConstructor<T extends Data> = new (...args: any[]) => T;

export default Data;
export { DataConstructor };
