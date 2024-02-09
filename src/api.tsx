import { TLogin } from "./types/types";

export const API_URL = "https://dogsapi.origamid.dev/json/";

type PHOTOS_GETProps = {
  page?: number;
  total: number;
  user?: number | string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TOKEN_POST = (body: TLogin) => {
  return {
    url: API_URL + "jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

export const TOKEN_VALIDATE_POST = (token: string) => {
  return {
    url: API_URL + "api/user",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
};

export const USER_GET = (token: string) => {
  return {
    url: API_URL + "api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
};

export const USER_POST = (body: TLogin) => {
  return {
    url: API_URL + "api/user",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

export const PHOTO_POST = (formData: FormData, token: string) => {
  return {
    url: API_URL + "api/photo",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    },
  };
};

export const PHOTOS_GET = ({ page, total, user }: PHOTOS_GETProps) => {
  return {
    url: `${API_URL}api/photo/?_page=${page}&_total=${total}&_user=${user}`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  };
};

export const PHOTO_GET = (id: number | string) => {
  return {
    url: `${API_URL}api/photo/${id}`,
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const COMMENT_POST = (id: number, body: {}) => {
  return {
    url: `${API_URL}api/comment/${id}`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    },
  };
};

export const PHOTO_DELETE = (id: number) => {
  return {
    url: `${API_URL}api/photo/${id}`,
    options: {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    },
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const PASSWORD_LOST = (body: {}) => {
  return {
    url: `${API_URL}api/password/lost`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const PASSWORD_RESET = (body: {}) => {
  return {
    url: `${API_URL}api/password/reset`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

export const STATS_GET = () => {
  return {
    url: `${API_URL}api/stats`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    },
  };
};
// https://dog.ceo/api/breeds/image/random
//randomizar fotos
