import React, { SetStateAction, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { useForm } from "react-hook-form";
import { TypeAnimation } from "react-type-animation";
import Loader from "./Loader";
function Hero() {
  const [response, setResponse] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    organization: process.env.NEXT_PUBLIC_ORG_ID,
  });
  const openai = new OpenAIApi(configuration);

  async function onSubmit(data: any) {
    setLoading(true);
    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: data.generate,
      temperature: 0,
      max_tokens: 2048,
    });
    if (res) {
      setLoading(false);
    }
    setResponse((prevValue: any) => [...prevValue, res.data.choices[0].text]);
  }

  return (
    <div className="p-4 relative h-[100vh] overflow-y-auto">
      <div className="absolute bottom-4 inset-x-4 p-4 my-4 mx-auto rounded-lg bg-white md:inset-x-10 lg:relative lg:w-1/3 lg:inset-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <div>
            <label className="relative block">
              <button
                type="submit"
                className="absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <svg
                  className="h-5 w-5 fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                >
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
              </button>
              <input
                className="w-full bg-white placeholder:font-italitc border border-slate-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none"
                placeholder="Ask me anything..."
                type="text"
                {...register("generate", {
                  required: true,
                })}
              />
            </label>
          </div>
        </form>
        <p className="text-center mt-2 text-sm font-mono">
          Maintained by Kenneth Pole.
        </p>
      </div>
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold mb-2">Lily</h1>
        <p className="text-sm font-semibold mb-2">Your AI Assistant.</p>
        <p className="text-sm mb-2">
          Ask your questions short, long or anything in between. The more
          precise you ask, the better the answer.
        </p>
      </div>
      <div className="h-[70vh] overflow-y-auto">
        {response.map((item: string, idx: number) => (
          <div key={idx} className="p-2 w-full md:w-11/12 md:mx-auto lg:w-1/2">
            <TypeAnimation
              sequence={[item]}
              speed={50}
              cursor={false}
              className="bg-white p-2 rounded-lg"
            />
          </div>
        ))}
        {loading && <Loader />}
      </div>
    </div>
  );
}

export default Hero;
