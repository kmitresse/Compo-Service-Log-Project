import { Drop_mode, Status_mode } from "./enums";

interface Data {
  action: Drop_mode | Status_mode;
  data: Array<Object>;
}

// class Data {
//   action: Drop_mode | Status_mode;
//   data: object[];
// }

function Is_Data(data: Data): boolean {
  return (
    "action" in data &&
    (Object.values(Drop_mode).includes(
      (data.action as string).toUpperCase() as Drop_mode,
    ) ||
      Object.values(Status_mode).includes(
        (data.action as string).toUpperCase() as Status_mode,
      )) &&
    "data" in data &&
    Array.isArray(data.data)
  );
}

export { Data, Is_Data };
