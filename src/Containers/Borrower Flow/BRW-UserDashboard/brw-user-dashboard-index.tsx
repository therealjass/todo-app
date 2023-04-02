import { useEffect, useState } from "react";

/**Components imports */
import BRWScoreCard from "./brw-score-card";
import BRWcustomCard from "./brw-custom-card";
import NavBar from "../../../Components/navbar";

/**Images imports */
import minus from "../../../Assets/Img/Minus.png";
import infoIcon from "../../../Assets/Img/info.png";
import ExpandIcon from "../../../Assets/Img/expandIcon.svg";

/**MUI imports */
import { Box } from "@mui/system";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Grid, Paper, Toolbar, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userBusinessLoanDataAction } from "../../../Store/Borrower Flow/BRW-ApplyLoan/apply-loan-action";
import { USER_DOCUMENTS_STATUS } from "../../../Utils/GlobalConstants/globalConstant";
import { apiResponse, res } from "../../../Utils/GlobalTypes/globalTypes";
import { handleGetDataFromApi } from "../../../Utils/GlobalFunctions/globalFunctions";
import siteConfig from "../../../Config/siteConfig";
// import plus from "../../../Assets/Img/plus.svg";

type kmp = {
  id: number
  person_name: string,
  person_type: string,
  person_email: string
}
type financialDocuments = {
  id: number
  documents: string
}

type userStatusForAdmin = {
  id: number,
  status: string
}

type basics = {
  id: number;
  name: string
}

type country = {
  id: number;
  country: string
}

type state = {
  id: number;
  state: string
}

type userBusinessLoanDataTypes = {
  id: number,
  company_name: string,
  phone_no: string,
  official_email_id: string,
  company_address: string,
  company_type: number | null,
  country_id: country,
  state_id: state,
  is_aml_agree: boolean,
  vat_number: string,
  moa_doc: string,
  trade_licence: string,
  business_segment: string,
  fund_required: string,

  company_detail_status_from_admin: number | null;
  company_docs_status_from_admin: number | null;
  key_management_persons_status_from_admin: number | null;
  business_plan_status_from_admin: number | null;

  key_management_persons: kmp[],
  user_status_for_admin: userStatusForAdmin,
  financial_documents: financialDocuments[],

  score: number | null;
  loan_number: string;
  loan_type: basics
}
const BrwUserDashboardMain = () => {
  const dispatch: any = useDispatch();

  const g_userBusinessLoanData = useSelector((state: any) => state?.applyLoanReducer?.userBusinessLoanData);


  const [error, setError] = useState<string>("");
  const [userBusinessLoanData, setUserBusinessLoanData] = useState<userBusinessLoanDataTypes>()

  const [expandClick, setExpandClick] = useState(false);
  const [expandClick2, setExpand2Click] = useState(false);
  const [expandClick3, setExpand3Click] = useState(false);
  const [expandClick4, setExpand4Click] = useState(false);
  const [expandClick5, setExpand5Click] = useState(false);

  useEffect(() => {
    initiate();
  }, [])

  const initiate = async () => {
    dispatch(userBusinessLoanDataAction());
    // let res: res = await handleGetDataFromApi(siteConfig.APPLYLOAN_GET_BUSINESS_PLAN_DATA_WRT_USER)
    // let
    // console.log(res, "res 88888888888")
  }

  useEffect(() => {

    let strError: string = g_userBusinessLoanData?.error;
    if (strError && strError.length) {
      setError(strError);
      return;
    }

    let objUserBusinessLoanData: userBusinessLoanDataTypes = g_userBusinessLoanData?.data;
    if (objUserBusinessLoanData?.id) {
      setUserBusinessLoanData(objUserBusinessLoanData);
    }
  }, [g_userBusinessLoanData])


  return <>
    <NavBar />
    <Toolbar />
    <Box p={2} pl={4} sx={{ display: "flex", alignItems: "center", background: "#CBDEFF", }} >
      <img src={infoIcon} width="20px" height={20} alt="infoIcon" style={{ marginRight: "16px" }} />  <Typography sx={{ color: "#3751FF" }} >Your application is under progress.</Typography>
    </Box>
    <Box p={3} >
      <Grid container spacing={3} >
        <Grid item xs={12} sm={5} >
          <BRWScoreCard />
        </Grid>
        <Grid item xs={12} sm={7} >
          <BRWcustomCard
            // companyName={userBusinessLoanData?.company_name || ""}
            companyName={"Company Details"}
            statusText={(userBusinessLoanData?.user_status_for_admin?.id === USER_DOCUMENTS_STATUS.NEW ? "Processing" : userBusinessLoanData?.user_status_for_admin?.status) || ""}
            statusColor="#3751FF"
            phoneNumber={userBusinessLoanData?.phone_no || ""}
            officialEmailId={userBusinessLoanData?.official_email_id || ""}
            country={userBusinessLoanData?.country_id?.country || ""}
            state={userBusinessLoanData?.state_id?.state || ""}
            companyAddress={userBusinessLoanData?.company_address || ""}
          />
          {/* <BRWcustomCard
            companyName="Amtek Auto LLP"
            statusText="Under Progress"
            statusColor="#3751FF"
            phoneNumber="+971-04-3379972"
            officialEmailId="amtek@amteck.com"
            country="Emirates" state="Dubai"
            companyAddress="744 Graham Greens, Abu Dhabi Emirate, Al Dhafrah Region"
          /> */}
        </Grid>
      </Grid>
    </Box>
    <Box p={3} pt={0} >
      <Grid container spacing={3} >
        <Grid item xs={12} sm={5} >
          <BRWcustomCard
            companyDocs="Company Docs"
            tradeLicence={userBusinessLoanData?.trade_licence || ""}
            vatNumber={userBusinessLoanData?.trade_licence || ""}
            statusText={(userBusinessLoanData?.user_status_for_admin?.id === USER_DOCUMENTS_STATUS.NEW ? "Processing" : userBusinessLoanData?.user_status_for_admin?.status) || ""}
            statusColor="#3751FF"
            moaDoc={userBusinessLoanData?.moa_doc || ""}
          />
        </Grid>
        <Grid item xs={12} sm={7} >
          <BRWcustomCard
            KeyManagementPersons={`Key Management Persons (${userBusinessLoanData?.key_management_persons ? userBusinessLoanData?.key_management_persons.length : 0})`}
            statusText={(userBusinessLoanData?.user_status_for_admin?.id === USER_DOCUMENTS_STATUS.NEW ? "Processing" : userBusinessLoanData?.user_status_for_admin?.status) || ""}
            statusColor="#3751FF"
          />
        </Grid>
      </Grid>
    </Box>
    <Box p={3} pt={0} >
      <Grid container spacing={3} >
        <Grid item xs={12} sm={4} >
          <BRWcustomCard
            bussinesPlan="Bussines Plan"
            businessSegment={userBusinessLoanData?.business_segment || ""}
            fundRequired={userBusinessLoanData?.fund_required || ""}
            statusText={(userBusinessLoanData?.user_status_for_admin?.id === USER_DOCUMENTS_STATUS.NEW ? "Processing" : userBusinessLoanData?.user_status_for_admin?.status) || ""}
            statusColor="#3751FF"
          />
        </Grid>
        <Grid item xs={12} sm={8} >
          <BRWcustomCard
            companyNameAML="LL Private LTD"
            VATNumberLookup="77843647SHDTFD3"
            UAECompanyLookup="LL Private LTD"
            statusText="Under Progress"
            statusColor="#3751FF"
          />
        </Grid>

        <Grid item xs={12}>
          <Box p={3} sx={{ minHeight: "200px", borderRadius: "12px" }} component={Paper} elevation={0} >
            <Box mb={2} >
              <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#3751FF" }}  >FAQ’S</Typography>
            </Box>
            <Box>
              <div>
                <Accordion sx={{ background: "#F0F0F0" }} onClick={() => setExpandClick(!expandClick)} >
                  <AccordionSummary
                    expandIcon={
                      expandClick ?
                        <IconButton>
                          <img src={minus} alt="" className="expand-minimize-icon" />
                        </IconButton> : <IconButton>
                          {/* <img src={plus} alt="" /> */}
                          <img src={ExpandIcon} alt="" />
                        </IconButton>
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>1. What is Credit Score?</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ background: "#fff" }} >
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ background: "#F0F0F0" }} onClick={() => setExpand2Click(!expandClick2)} >
                  <AccordionSummary
                    expandIcon={expandClick2 ?
                      <IconButton>
                        <img src={minus} alt="" className="expand-minimize-icon" />
                      </IconButton> : <IconButton>
                        <img src={ExpandIcon} alt="" />
                      </IconButton>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>2. What do I need to use Score Card?</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ background: "#fff" }}  >
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion sx={{ background: "#F0F0F0" }} onClick={() => setExpand3Click(!expandClick3)}>
                  <AccordionSummary
                    expandIcon={expandClick3 ?
                      <IconButton>
                        <img src={minus} alt="" className="expand-minimize-icon" />
                      </IconButton> : <IconButton>
                        <img src={ExpandIcon} alt="" />
                      </IconButton>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>3. How the dispute works?</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ background: "#fff" }}  >
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>


                <Accordion sx={{ background: "#F0F0F0" }} onClick={() => setExpand4Click(!expandClick4)}>
                  <AccordionSummary
                    expandIcon={expandClick4 ?
                      <IconButton>
                        <img src={minus} alt="" className="expand-minimize-icon" />
                      </IconButton> : <IconButton>
                        <img src={ExpandIcon} alt="" />
                      </IconButton>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>4. What are the main use cases?</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ background: "#fff" }}  >
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>


                <Accordion sx={{ background: "#F0F0F0" }} onClick={() => setExpand5Click(!expandClick5)}>
                  <AccordionSummary
                    expandIcon={expandClick5 ?
                      <IconButton>
                        <img src={minus} alt="" className="expand-minimize-icon" />
                      </IconButton> : <IconButton>
                        <img src={ExpandIcon} alt="" />
                      </IconButton>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>5. Question 5</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ background: "#fff" }}  >
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>

  </>
}

export default BrwUserDashboardMain;