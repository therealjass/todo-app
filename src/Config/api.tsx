import siteConfig from "./siteConfig";

function checkUrl(type: string) {
  try {
    let arrUrlSplit: string[] = window?.location?.href.split("/");
    let str = arrUrlSplit.find((item) => item === type);
    if (str) return true;
    else return false;
  } catch (err) {
    console.log(err);
  }
}

export async function postData(data: any, urlPath: string) {
  let accessTokenKey: string | null = '';
  if (checkUrl("admin")) {
    accessTokenKey = localStorage.getItem(siteConfig.ADMIN_ACCESS_TOKEN_KEY);
  } else if (checkUrl("borrower")) {
    accessTokenKey = localStorage.getItem(siteConfig.ACCESS_TOKEN_KEY);
  }
  const res = await fetch(siteConfig.BASE_URL + urlPath, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    //@ts-ignore
    headers: {
      'Content-Type': 'application/json',
      Origin: process.env.ORIGIN,
      authorization:
        'Bearer ' + accessTokenKey,
    },
    body: JSON.stringify(data),
  });

  return await res;
}

export async function getData(urlPath: string) {
  let accessTokenKey: string | null = '';
  if (checkUrl("admin")) {
    accessTokenKey = localStorage.getItem(siteConfig.ADMIN_ACCESS_TOKEN_KEY);
  } else if (checkUrl("borrower")) {
    accessTokenKey = localStorage.getItem(siteConfig.ACCESS_TOKEN_KEY);
  }

  const res = await fetch(siteConfig.BASE_URL + urlPath, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'http://localhost:3000',

      authorization: 'Bearer ' + accessTokenKey,
    },
  });
  return await res;
}

// export async function patchData(data: any, urlPath: string) {
//   const res = await fetch(siteConfig.BASE_URL + urlPath, {
//     method: 'PATCH',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//       Origin: 'http://localhost:3000',
//       authorization:
//         'Bearer ' + localStorage.getItem(siteConfig.ACCESS_TOKEN_KEY),
//     },
//     body: JSON.stringify(data),
//   });
//   return await res;
// }

// export async function putData(data: any, urlPath: string) {
//   const res = await fetch(siteConfig.BASE_URL + urlPath, {
//     method: 'PUT',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//       Origin: 'http://localhost:3000',
//       authorization:
//         'Bearer ' + localStorage.getItem(siteConfig.ACCESS_TOKEN_KEY),
//     },
//     body: JSON.stringify(data),
//   });
//   return await res;
// }
