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
    <div className="p-4 relative h-[100vh] overflow-y-auto font-primary">
      <div className="w-full bg-white p-4 rounded-lg md:w-fit md:mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Lily.</h1>
          <p className="text-xs mb-2">
            Your AI Assistant. Ask your questions short, long or anything in
            between. The more precise you ask, the better the answer.
          </p>
        </div>

        <div className="md:w-1/2 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full"
          >
            <div>
              <label className="relative block">
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-4"
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
                  className="w-full bg-white rounded-lg border-1 border-neutral-700 py-2 pl-2 pr-3 focus:border-neutral-800 focus:ring-neutral-900"
                  placeholder="Ask me anything..."
                  type="text"
                  {...register("generate", {
                    required: true,
                  })}
                />
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-2 w-full lg:w-6/12 md:mx-auto">
        {response.map((item: string, idx: number) => (
          <div key={idx} className="my-4 w-full md:mx-auto">
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
