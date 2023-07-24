type Method = "POST" | "PUT";

export const getPostPutRequestInit = <P>(
  method: Method,
  payload: P
): RequestInit => {
  return {
    method,
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(payload),
  };
};

export const getGetDeleteRequesInit = (
  method: "GET" | "DELETE"
): RequestInit => {
  return {
    method,
  };
};

export const deleteUndefinedfromObject = (payload: { [key: string]: any }) => {
  for (const key in payload) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      const element = payload[key];
      if (element === undefined) {
        delete payload[key];
      }
    }
  }
};
type HasIdProperty<T> = T extends { id: number } ? T : never;
type IsEqualTwoObjectArrayParam<T extends { id: number }> = {
  objectArray1: HasIdProperty<T>[];
  objectArray2: HasIdProperty<T>[];
};
export const isEqualTwoObjectArray = <T extends { id: number }>({
  objectArray1,
  objectArray2,
}: IsEqualTwoObjectArrayParam<T>) => {
  const objectArray1Ids = objectArray1.map((oa1) => oa1.id).sort();
  const objectArray2Ids = objectArray2.map((oa2) => oa2.id).sort();

  return JSON.stringify(objectArray1Ids) === JSON.stringify(objectArray2Ids);
};
