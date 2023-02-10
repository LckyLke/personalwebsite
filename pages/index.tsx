import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
// pages/index.tsx
import Head from "next/head";
import Wrapper from "../components/Wrapper";
import Profile from "../components/Profile";
import Navigation from "../Navigation";
import { useEffect, useState } from "react";

const Home: React.FC = ({}) => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const fetchData = async () => {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Greet me in a unique way (dont ask any questions)",
        temperature: 0.7,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stream: true,
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Luke Friedrichs | CV</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        {response}
        <Profile />
        <Navigation />
      </Wrapper>
    </>
  );
};

export default Home;
