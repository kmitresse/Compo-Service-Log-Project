import { Drop_mode, Status_mode } from "./DMN_enums";

export interface Data {
  action: Drop_mode | Status_mode;
  data: Array<Object>;
}

export function Is_Data(data: Data): data is Data {
  return (
    "action" in data &&
    (Object.values(Drop_mode).includes(
      (data.action as string).toUpperCase() as Drop_mode
    ) ||
      Object.values(Status_mode).includes(
        (data.action as string).toUpperCase() as Status_mode
      )) &&
    "data" in data &&
    Array.isArray(data.data)
  );
}
