import { isConstructorDeclaration } from "typescript";
import { getData, postData } from "../../Config/api";
import siteConfig from "../../Config/siteConfig";
import { globalConstant } from "../GlobalConstants/globalConstant";
import { apiResponse, res } from "../GlobalTypes/globalTypes";

export const getModuleWiseBaseUrl = (strApiId: string) => {
  return `http://${siteConfig.BASE_URL}/api/v1`;
}

export const checkExpirationOfToken = (code: number) => {
  if (code === 401) return true;
  else return false;
}

export const handleGetDataFromApi = async (url: string) => {
  let res: res = { data: {}, error: "" };
  try {
    await getData(url).then((res: any) => res.json()).then((data: apiResponse) => {
      res.data = data;
      if (data.code === 200 || data.code === 201) return;
      res.error = globalConstant.INTERNAL_SERVER_ERROR;
    }).catch((err) => {
      res.data = undefined;
      res.error = globalConstant.INTERNAL_SERVER_ERROR;
      console.log(err);
    })
  } catch (err) {
    res.data = undefined;
    console.log(err)
  }

  return res;
}

export const handlePostDataFromApi = async (body: any, url: string,) => {
  let res: res = { data: {}, error: "" };
  try {
    await postData(body, url).then((res: any) => res.json()).then((data: apiResponse) => {
      res.data = data;
      if (data.code === 200 || data.code === 201) return;
      res.error = globalConstant.INTERNAL_SERVER_ERROR;
    }).catch((err) => {
      res.data = undefined;
      res.error = globalConstant.INTERNAL_SERVER_ERROR;
      console.log(err);
    })
  } catch (err) {
    res.data = undefined;
    console.log(err)
  }

  return res;
}