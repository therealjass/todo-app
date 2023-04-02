const siteConfig = Object.freeze({
  /**KEYS*/
  X_API_KEY: "ffuLdSFQZ53751vd0Rrvi3H2im5Tq0oR4CYkNifo",
  GOOGLE_OAUTH_CLIENT_ID: "823267183036-k02hrr39426mgjc3ud146iov09e80dgf.apps.googleusercontent.com",
  S3_BUCKET_BASE_URL: "http://simplysimple.s3-website.ap-south-1.amazonaws.com",

  /**Base URL */
  BASE_URL: "http://localhost:8101/api/v1", //local Server
  // BASE_URL: "http://166.0.148.48:8101/api/v1", //live  Server

  /**Content-types */
  CONTENT_TYPE_APPLICATION_JSON: "application/json",
  CONTENT_TYPE_APPLICATION_X_WWW_FORM_URLENCODED: "application/x-www-form-urlencoded",

  /**Local storage keys */
  IS_ADMIN: "is_admin",
  USER_INFO: "user_info",
  USER_NAME: "user_name",
  USER_EMAIL: "user_email",
  ACCESS_TOKEN_KEY: "access_token",
  ADMIN_ACCESS_TOKEN_KEY: "admin_access_token_key",
  CONTACT_NUMBER: "contact_number",

  // AUTHENTICATION_URL: "/auth",
  // METADATA_URL: "/metadata",
  // APPLYLOAN_URL: "/applyloan",
  // ADMIN_USER_MANAGEMENT: "/admin/user-management",
  // ADMIN_REQUESTS: "/admin/requests",


  GET_EXTRACTED_DATA: "/get_extracted_data",

  /**API'S*/
  //Authentication
  AUTHENTICATION_REGISTER: "/auth/register",
  AUTHENTICATION_LOGIN: "/auth/login",

  //APPLYLOAN
  APPLYLOAN_TYPES: "/applyloan/get_apply_loan_type",
  APPLYLOAN_HEADINGS: "/applyloan/get_apply_loan_headings",
  APPLYLOAN_SAVE_APPLY_LOAN_DATA: "/applyloan/save_apply_loan_data",
  APPLYLOAN_GET_BUSINESS_PLAN_DATA_WRT_USER: "/applyloan/get_business_plan_data_wrt_user",
  APPLYLOAN_SUBMIT_AND_VERIFY_ALL_FIELDS: "/applyloan/submit_and_verify_all_fields",

  //Metadata



})

export default siteConfig