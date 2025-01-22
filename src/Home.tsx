import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GradientBar from "./components/GradientBar";
import { useAccount } from "wagmi";
import { useModal } from "connectkit";
import {
  baseURL,
  CUSTOM_SCHEMAS,
  EASContractAddress,
  getAddressForENS,
  getAttestation,
  submitSignedAttestation,
} from "./utils/utils";
import {
  EAS,
  SchemaEncoder,
  SchemaRegistry,
  AttestationShareablePackageObject,
} from "@ethereum-attestation-service/eas-sdk";
import invariant from "tiny-invariant";
import { ethers } from "ethers";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
import { useSigner } from "./utils/wagmi-utils";

const Title = styled.div`
  color: #163a54;
  font-size: 22px;
  font-family: Montserrat, sans-serif;
`;

const Container = styled.div`
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const MetButton = styled.div`
  border-radius: 10px;
  border: 1px solid #cfb9ff;
  background: #4caf50;
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  color: #fff;
  font-size: 18px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  cursor: pointer;
`;

const SubText = styled(Link)`
  display: block;
  cursor: pointer;
  text-decoration: underline;
  color: #ababab;
  margin-top: 20px;
`;

const InputContainer = styled.div`
  position: relative;
  height: 90px;
`;

const EnsLogo = styled.img`
  position: absolute;
  left: 14px;
  top: 28px;
  width: 30px;
`;

const InputBlock = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  border: 1px solid rgba(19, 30, 38, 0.33);
  background: rgba(255, 255, 255, 0.5);
  color: #131e26;
  font-size: 18px;
  font-family: Chalkboard, sans-serif;
  padding: 20px 10px;
  text-align: center;
  margin-top: 12px;
  box-sizing: border-box;
  width: 100%;
`;

const WhiteBox = styled.div`
  box-shadow: 0 4px 33px rgba(168, 198, 207, 0.15);
  background-color: #fff;
  padding: 36px;
  max-width: 590px;
  border-radius: 10px;
  margin: 40px auto 0;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const eas = new EAS(EASContractAddress);

function Home() {
  const { status, address: myAddress } = useAccount();
  const modal = useModal();

  const [title, setTitle] = useState("");
  const [score, setScore] = useState("");
  const [percentage, setPercentage] = useState("");
  const [question, setTotalQuestionNo] = useState("");
  const [answer, setTotalAnswer] = useState("");
  const [issuer, setIssuerName] = useState("");
  const [duration, setDuration] = useState("");
  const [outcome, setOutcome] = useState("");
  const [address, setAddress] = useState("");

  const signer = useSigner();
  const [attesting, setAttesting] = useState(false);
  const [ensResolvedAddress, setEnsResolvedAddress] = useState("Dakh.eth");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const addressParam = searchParams.get("address");
    if (addressParam) {
      setAddress(addressParam);
    }
  }, []);

  useEffect(() => {
    async function checkENS() {
      if (address.includes(".eth")) {
        const tmpAddress = await getAddressForENS(address);

        if (tmpAddress) {
          setEnsResolvedAddress(tmpAddress);
        } else {
          setEnsResolvedAddress("");
        }
      } else {
        setEnsResolvedAddress("");
      }
    }
    checkENS();
  }, [address]);

  // ---------------------------------------------

  useEffect(() => {
    const PercentageParam = searchParams.get("percentage");
    if (PercentageParam) {
      setPercentage(PercentageParam);
    }
  }, []);
  useEffect(() => {
    const TotalQuestionNoParam = searchParams.get("question");
    if (TotalQuestionNoParam) {
      setTotalQuestionNo(TotalQuestionNoParam);
    }
  }, []);
  useEffect(() => {
    const TotalAnswerParam = searchParams.get("question");
    if (TotalAnswerParam) {
      setTotalAnswer(TotalAnswerParam);
    }
  }, []);
  useEffect(() => {
    const IssuerNameParam = searchParams.get("issuer");
    if (IssuerNameParam) {
      setIssuerName(IssuerNameParam);
    }
  }, []);
  useEffect(() => {
    const DurationParam = searchParams.get("duration");
    if (DurationParam) {
      setDuration(DurationParam);
    }
  }, []);

  useEffect(() => {
    const OutcomeParam = searchParams.get("duration");
    if (OutcomeParam) {
      setOutcome(OutcomeParam);
    }
  }, []);

  useEffect(() => {
    async function checkENS() {
      if (address.includes(".eth")) {
        const tmpAddress = await getAddressForENS(address);
        if (tmpAddress) {
          setEnsResolvedAddress(tmpAddress);
        } else {
          setEnsResolvedAddress("");
        }
      } else {
        setEnsResolvedAddress("");
      }
    }

    checkENS();
  }, [address]);
  return (
    <Container>
      <GradientBar />
      <WhiteBox>
        <Title>
          I <b>attest</b> that I have successfully completed the assesment with
          the following details
        </Title>

        <InputContainer>
          <InputBlock
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            placeholder={"Address/ENS"}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {ensResolvedAddress && <EnsLogo src={"/ens-logo.png"} />}
        </InputContainer>
        <InputContainer>
          <InputBlock
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            placeholder={"Course Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputBlock
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            placeholder={"Score"}
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputBlock
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            placeholder={"Percentage"}
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputBlock
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            placeholder={"No of Total Questions"}
            value={question}
            onChange={(e) => setTotalQuestionNo(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputBlock
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            placeholder={"No of Correct Answers"}
            value={answer}
            onChange={(e) => setTotalAnswer(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputBlock
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            placeholder={"Issuer Name"}
            value={issuer}
            onChange={(e) => setIssuerName(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputBlock
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            placeholder={"Duration"}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputBlock
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            placeholder={"Outcome(pass/fail)"}
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
          />
        </InputContainer>
        {/* ------------------------------------------------------ */}
        {/* <InputContainer>
          <InputBlock
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            placeholder={"Issuer Name"}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </InputContainer> */}
        <MetButton
          onClick={async () => {
            if (status !== "connected") {
              modal.setOpen(true);
            } else {
              setAttesting(true);
              try {
                const schemaEncoder = new SchemaEncoder(
                  "string Course_Title,uint256 Score,string Percentage,uint256 No_of_Questions,uint256 No_of_Correct_Answers,string Issuer_Name,string Duration,string Outcome"
                );
                const encoded = schemaEncoder.encodeData([
                  // { name: "metIRL", type: "bool", value: true },
                  { name: "Course_Title", value: title, type: "string" },
                  { name: "Score", value: score, type: "uint256" },
                  { name: "Percentage", value: percentage, type: "string" },
                  { name: "No_of_Questions", value: question, type: "uint256" },
                  {
                    name: "No_of_Correct_Answers",
                    value: answer,
                    type: "uint256",
                  },
                  { name: "Issuer_Name", value: issuer, type: "string" },
                  { name: "Duration", value: duration, type: "string" },
                  { name: "Outcome", value: outcome, type: "string" },
                ]);

                invariant(signer, "signer must be defined");
                eas.connect(signer);

                // const eas = new EAS(EASContractAddress)

                const offchain = await eas.getOffchain();
                const recipient = ensResolvedAddress
                  ? ensResolvedAddress
                  : address;

                // ---------------ONCHAIN ATTESTATION---------------
                console.log("about to attest");
                const tx = await eas.attest({
                  data: {
                    recipient: address,
                    data: encoded,
                    // refUID: ethers.ZeroHash,
                    revocable: true,
                    expirationTime: BigInt(0),
                  },
                  schema:
                    "0x4115978e1c57c94083a43ade8224d82453a72d50aa06cfb817bb17d0c155367c",
                });
                console.log("attested");
                const uid = await tx.wait();

                const attestation = await getAttestation(uid);
                console.log(uid);
                console.log("attested maybe");
                // Update ENS names
                await Promise.all([
                  axios.get(`${baseURL}/api/getENS/${address}`),
                  axios.get(`${baseURL}/api/getENS/${recipient}`),
                ]);
                console.log(address);
                console.log(uid);
                console.log(attestation);
                if (uid) {
                  window.open(
                    `https://sepolia.easscan.org/attestation/view/${attestation?.id}`
                  );
                }
              } catch (e) {
                console.log(e);
              }
              console.log(address);
              console.log(answer);

              setAttesting(false);
            }
          }}
        >
          {attesting
            ? "Attesting..."
            : status === "connected"
            ? "Make attestation"
            : "Connect wallet"}
        </MetButton>
        {status === "connected" && (
          <>
            <SubText to={"/qr"}>Show my QR code</SubText>
            {/* <SubText to={"/connections"}>Connections</SubText> */}
          </>
        )}
      </WhiteBox>
    </Container>
  );
}

export default Home;
