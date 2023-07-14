type Method = "POST" | "PUT";

export const getPostPutRequestInit = (
  method: Method,
  payload: Object
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
