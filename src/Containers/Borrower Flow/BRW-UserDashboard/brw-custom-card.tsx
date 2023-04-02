import React from 'react'
import { Box, Card, CardContent, CardMedia, Grid, InputLabel, TextField, Typography } from "@mui/material";

import { FormattedMessage } from "react-intl";
import messages from "../BRW-ApplyLoan/Intl/brw-apply-loan-intl";
import infoLogo from "../../../Assets/Img/info.png"


type Iprops = {
  companyDocs?: string,
  KeyManagementPersons?: string,
  bussinesPlan?: string,
  companyName?: string,
  statusText: string,
  statusColor?: string,
  phoneNumber?: string,
  officialEmailId?: string,
  country?: string,
  state?: string,
  companyAddress?: string,
  tradeLicence?: string,
  vatNumber?: string,
  moaDoc?: string,
  businessSegment?: string,
  fundRequired?: string,
  financialDocument?: string,
  companyNameAML?: string,
  VATNumberLookup?: string,
  UAECompanyLookup?: string
}




function BRWcustomCard(props: Iprops) {
  const {
    companyName,
    statusColor,
    statusText,
    phoneNumber,
    officialEmailId,
    country,
    state,
    companyAddress,
    tradeLicence,
    vatNumber,
    moaDoc,
    companyDocs,
    bussinesPlan,
    KeyManagementPersons,
    businessSegment,
    fundRequired,
    financialDocument } = props
  return (
    <>
      <Card sx={{ padding: "16px", borderRadius: "18px", border: "1px solid #DBE0FF" }} elevation={0} variant="outlined" >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }} >
            <Box>
              {
                companyName && <InputLabel className='bashboard-inputLabel' >
                  <FormattedMessage
                    {...messages.businessLoanApplyCompanyNameLabel}
                  />
                </InputLabel>
              }
              {
                companyName && <Typography className='dashboard-compant-name-text'>
                  {companyName}
                </Typography>
              }
            </Box>


            <Box sx={{ display: "flex", alignItems: "center" }} >
              {/* {
                companyName && (<Typography sx={{ color: `${statusColor}`, fontSize: "16px", fontWeight: 500 }} >
                  {companyName}
                </Typography>)
              } */}
              {
                companyDocs && (<Typography sx={{ color: `${statusColor}`, fontSize: "16px", fontWeight: 500 }} >
                  {companyDocs}
                </Typography>)
              }
              {
                KeyManagementPersons && (<Typography sx={{ color: `${statusColor}`, fontSize: "16px", fontWeight: 500 }} >
                  {KeyManagementPersons}
                </Typography>)
              }

              {
                statusText && (<Typography sx={{ color: `${statusColor}`, fontSize: "16px", fontWeight: 500 }} >
                  {statusText}
                </Typography>)
              }

              <img src={infoLogo} alt="info" style={{ width: "20px", height: "20px", marginLeft: "16px" }} />

            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", padding: "16px 0 16px 0" }} >
            <Box>
              {
                phoneNumber && <InputLabel className='bashboard-inputLabel' >
                  <FormattedMessage
                    {...messages.businessLoanApplyPhoneLabel}
                  />
                </InputLabel>
              }
              {
                phoneNumber && <Typography className='dashboard-text'  >
                  {phoneNumber}
                </Typography>
              }
            </Box>
            <Box>

              {
                officialEmailId && <InputLabel className='bashboard-inputLabel'>
                  <FormattedMessage
                    {...messages.businessLoanApplyEmailLabel}
                  />
                </InputLabel>
              }
              {
                officialEmailId && <Typography variant='h5' >
                  {officialEmailId}
                </Typography>
              }
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", padding: "0 0 16px 0" }} >
            <Box>
              {
                country && <InputLabel className='bashboard-inputLabel'>
                  <FormattedMessage
                    {...messages.businessLoanApplyCountryLabel}
                  />
                </InputLabel >
              }

              {
                country && <Typography className='dashboard-text' >
                  {country}
                </Typography>
              }
            </Box>
            <Box>
              {
                state && <InputLabel className='bashboard-inputLabel'>
                  <FormattedMessage
                    {...messages.businessLoanApplyStateLabel}
                  />
                </InputLabel>
              }
              {
                state && <Typography className='dashboard-text' >
                  {state}
                </Typography>
              }
            </Box>
          </Box>

          <Box sx={{ display: "flex" }} >
            <Box>
              {
                companyAddress && <InputLabel className='bashboard-inputLabel'>
                  <FormattedMessage
                    {...messages.businessLoanApplyCompanyAddressLabel}
                  />
                </InputLabel>
              }
              {
                companyAddress && <Typography className='dashboard-text' >
                  {companyAddress}
                </Typography>
              }
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", padding: "16px 0 16px 0" }} >
            <Box>
              {
                tradeLicence && <InputLabel className='bashboard-inputLabel' >
                  <FormattedMessage
                    {...messages.businessLoanApplyTradeLicenceLabel}
                  />
                </InputLabel>
              }
              {
                tradeLicence && <Typography className='dashboard-text'  >
                  {tradeLicence}
                </Typography>
              }
            </Box>
            <Box>
              {
                vatNumber && <InputLabel className='bashboard-inputLabel'>
                  <FormattedMessage
                    {...messages.businessLoanApplyVatNumberLabel}
                  />
                </InputLabel>
              }
              {
                vatNumber && <Typography className='dashboard-text' >
                  {vatNumber}
                </Typography>
              }
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", padding: "16px 0 16px 0" }} >
            <Box>
              {
                businessSegment && <InputLabel className='bashboard-inputLabel' >
                  <FormattedMessage
                    {...messages.businessLoanApplyBusinessSegmentLabel}
                  />
                </InputLabel>
              }
              {
                businessSegment && <Typography className='dashboard-text'  >
                  {businessSegment}
                </Typography>
              }
            </Box>
            <Box>
              {
                fundRequired && <InputLabel className='bashboard-inputLabel'>
                  Fund Required
                </InputLabel>
              }
              {
                fundRequired && <Typography className='dashboard-text' >
                  {fundRequired}
                </Typography>
              }
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }} >

            {
              KeyManagementPersons && (
                <Box sx={{ padding: "16px", background: "#f2f2f2", maxWidth: "370px", width: "300px", borderRadius: "18px" }} >
                  <Typography variant='h6' >Mr. Abhishek Gupta </Typography>
                  <Typography >CEO & Founder </Typography>
                  <Typography  >+971-2229451 </Typography>
                  <Typography  >abhishek@aptek.com</Typography>
                </Box>
              )
            }
            {
              KeyManagementPersons && (
                <Box sx={{ padding: "16px", background: "#f2f2f2", maxWidth: "370px", width: "300px", borderRadius: "18px" }} >
                  <Typography variant='h6' >Mr. Abhishek Gupta </Typography>
                  <Typography >CEO & Founder </Typography>
                  <Typography  >+971-2229451 </Typography>
                  <Typography  >abhishek@aptek.com</Typography>
                </Box>
              )
            }
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default BRWcustomCard