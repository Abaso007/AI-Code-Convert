import { CodeBlock } from '@/components/CodeBlock';
import { LanguageSelect,languages } from '@/components/LanguageSelect';
import { NaturalLanguageSelect,naturalLanguages } from '@/components/NaturalLanguageSelect';
import { TextBlock } from '@/components/TextBlock';
import { TranslateBody } from '@/types/types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AdsBottom } from '@/components/AdsBottom';

export default function Home() {
  const [option, setOption] = useState('');
  const [title, setTitle] = useState('Code Converter(Generator | Translator)');
  const [subtitle, setSubtitle] = useState('Code Converter AI | Convert Code or Natural Language To Programming Language Code');
  const [inputLanguage, setInputLanguage] = useState<string>('Natural Language');
  const [outputLanguage, setOutputLanguage] = useState<string>('-- Select --');
  const [outputNaturalLanguage, setOutputNaturalLanguage] = useState<string>('English');
  const [inputCode, setInputCode] = useState<string>('');
  const [convertBtnName, setConvertBtnName] = useState<string>('Generate');
  const [outputCode, setOutputCode] = useState<string>(`# Usage instructions:
Enter your question or code in the input box below, then click the button you want to execute.

## For example input: sum code in java;
Here's a simple Java program that calculates and prints the sum:
\`\`\`java
int sum = 0;
for (int i = 1; i <= 10; i++) {
  sum += i;
}
System.out.println("The sum is: " + sum);
\`\`\``);
  const [loading, setLoading] = useState<boolean>(false);
  const [userConvert, setUserConvert] = useState<boolean>(false);
  const [userAsk, setUserAsk] = useState<boolean>(false);
  const [userDebug, setUserDebug] = useState<boolean>(false);
  const [userOptimize, setUserOptimize] = useState<boolean>(false);
  const [userExplain, setUserExplain] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);

  const resetOtherOption = () => {
	  setUserConvert(false);
	  setUserAsk(false);
	  setUserDebug(false);
	  setUserOptimize(false);
	  setUserExplain(false);
  };

  const handleTranslate = async (userAsk: boolean, option: string) => {
	// window.scrollTo(0, 180);
    const maxCodeLength = 30000;
	
	if (!inputCode) {
	  alert('Please enter some code.');
	  return;
	}
	
	if(outputLanguage === '-- Select --') {
	   alert('Please select the program languages you want to.');
	   return;
	}

    if (inputLanguage === outputLanguage) {
      alert('Please select different languages.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();
    const body: TranslateBody = {
      inputLanguage,
      outputLanguage,
      inputCode,
	  option,
	  outputNaturalLanguage
    };

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      alert('Please try again later.');
      return;
    }

    const data = response.body;

    if (!data) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      code += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(code);
	resetOtherOption();
  };

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  useEffect(() => {
	  if(inputLanguage === 'Natural Language') {
		  setConvertBtnName('Convert');
	  } else {
		  setConvertBtnName('Convert');
	  }
  }, [inputLanguage]);

  return (
    <>
      <Head>
        <title>AI Code Converter | AI Code Translator | AI Code Generator</title>
        <meta name="description" content="Use AI To Convert Code Or Generate Code From One Language To Another. AI Code Translator. Translate Code From Any Language To Another With A Click."/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="keywords" content="AI Code Converter,Code Convert AI, Code Generate AI,Code Translator,AICodeHelper,free,online" />
		<link rel="canonical" href="https://www.aicodeconvert.com" />
        <link rel="icon" href="/code.png" />
      </Head>
	  <div className="h-100 flex justify-between items-center pl-2 pr-2 md:pl-10 md:pr-10 pt-2 bg-[#0E1117]">
	      <div className="flex items-center">
	          <svg width="40" height="40" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
	              <path fill="#3b82f6" d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 0 0 308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 0 0-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"/>
	          </svg>
	          <h1 className="text-white font-bold text-2xl ml-1">
	              <a href="https://aicodeconvert.com">AICodeConvert.com</a>
	          </h1>
	      </div>
	      <div className="flex items-center hidden md:block lg:block">
			  <a href="https://blog.aicodeconvert.com" className="text-blue-500 text font-semibold mr-1 md:mr-4 lg:mr-4">Blog</a>
	          <a href="#about" className="text-white text font-semibold mr-1 md:mr-4 lg:mr-4">About Us</a>
	          <a href="#contact" className="text-white text font-semibold mr-1 md:mr-4 lg:mr-4">Contact</a>
	      </div>
	  </div>
	  <div className="flex flex-col items-center justify-center bg-[#0E1117] text-white">
	    <h2 className="text-xl md:text-4xl font-bold"><span className="text-blue-500">AI</span> {title}</h2>
	    <h3 className="mt-2 md:mt-5 text md:text-xl text-center leading-2">{subtitle}</h3>
	  </div>
	  <AdsBottom />
      <div className="flex h-full items-center justify-center bg-[#0E1117] text-neutral-100 px-2">
        <div className="flex-row items-center justify-center w-full md:w-3/5 lg:w-3/5">
          <div className="flex h-full flex-col justify-center">
            <div>
				<div className="mt-5 flex space-x-2">
					<div className="text-center text-xl font-bold">TO</div>
					<div className="flex-1">
						<LanguageSelect
						  language={outputLanguage}
						  onChange={(value) => {
							setOutputLanguage(value);
							setOutputCode('');
						  }}
						/>
					</div>
					<div>
						<NaturalLanguageSelect
						  language={outputNaturalLanguage}
						  onChange={(value) => {
							setOutputNaturalLanguage(value);
						  }}
						/>
					</div>
				</div>
				<CodeBlock code={outputCode} />
			</div>
			<div className="mt-8 flex flex-col justify-center">
              <LanguageSelect
                language={inputLanguage}
                onChange={(value) => {
                  setInputLanguage(value);
                  setHasTranslated(false);
                }}
              />
              <TextBlock
                text={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            </div>
			<div className="mt-2 flex items-center space-x-1 flex-wrap justify-center text-neutral-100">
			  <button
			    className="mt-2 w-[110px] cursor-pointer rounded-full bg-[#4c81ec] px-4 py-2 font-bold hover:bg-blue-600 active:bg-blue-700"
			    onClick={() => {
					setOption('convert');
					setUserConvert(true);
					handleTranslate(false, 'convert');
				}}
			    disabled={loading}
			  >
			    {loading && userConvert ? 'Loading' : convertBtnName}
			  </button>
			  <button
			    className="mt-2 w-[110px] cursor-pointer rounded-full bg-[#6269e7] hover:bg-blue-600 px-4 py-2 font-bold"
			    onClick={() => {
					setOption('ask');
					setUserAsk(true);
					handleTranslate(true, 'ask');
				}}
			    disabled={loading}
			  >
			    {loading && userAsk ? 'Loading' : 'Ask'}
			  </button>
			  <button
			    className="mt-2 w-[110px] cursor-pointer rounded-full bg-[#6156ff] hover:bg-blue-600 px-4 py-2 font-bold"
			    onClick={() => {
			  					setOption('debug');
			  					setUserDebug(true);
			  					handleTranslate(true, 'debug');
			  				}}
			    disabled={loading}
			  >
			    {loading && userDebug ? 'Loading' : 'Debug'}
			  </button>
			  <button
			    className="mt-2 w-[110px] cursor-pointer rounded-full bg-[#8262ec] hover:bg-[#9b5eed] to-red-400 px-4 py-2 font-bold"
			    onClick={() => {
					setOption('optimize');
					setUserOptimize(true);
					handleTranslate(true, 'optimize');
				}}
			    disabled={loading}
			  >
			    {loading && userOptimize ? 'Loading' : 'Optimize'}
			  </button>
			  <button
			    className="mt-2 w-[110px] cursor-pointer rounded-full bg-[#9b5eed] hover:bg-[#c856e5] px-4 py-2 font-bold"
			    onClick={() => {
					setOption('explain');
					setUserExplain(true);
					handleTranslate(true, 'explain');
				}}
			    disabled={loading}
			  >
			    {loading && userExplain ? 'Loading' : 'Explain'}
			  </button>
			  <a href="https://ko-fi.com/audi_guzz" className="mt-2 px-2 bg-[#f6db4b] cursor-pointer rounded-full mr-4 py-1">
			  	<div className="flex justify-center items-center">
			  		<p className="ml-2 mr-2 text-black font-bold">Buy me a Coffee</p>
			  		<svg width="30" height="30" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
			  		    <path fill="#eab308" d="M208 80H32a8 8 0 0 0-8 8v48a96.3 96.3 0 0 0 32.54 72H32a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16h-24.54a96.59 96.59 0 0 0 27-40.09A40 40 0 0 0 248 128v-8a40 40 0 0 0-40-40Zm24 48a24 24 0 0 1-17.2 23a95.78 95.78 0 0 0 1.2-15V97.38A24 24 0 0 1 232 120ZM112 56V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Zm32 0V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Zm-64 0V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Z"/>
			  		</svg>
			  	</div>
			  </a>
			</div>
        </div>
        </div>
	  </div>
	  <div className="pl-6 pr-6 mt-10 md:pl-20 md:pr-20 bg-[#0E1117]">
		<div id="about" className="text-white">
		  <div className="text-2xl">About Us</div>
		  <ul className="mt-4 list-disc list-inside">
		    <li className="mb-2">AICodeConvert(AI Code Converter | Code Converter AI) simplifies coding with AI by integrating AI Code Translator and AI Code Generator. </li>
		    <li className="mb-2">It efficiently translates existing code into different programming languages (AI Code Translator) and automatically generates high-quality code snippets and templates (AI Code Generator). </li>
			<li className="mb-2">This powerful combination makes AICodeConvert an indispensable tool for developers, 
					providing a convenient and intelligent coding experience.</li>
		    <li className="mb-2">All for free(AI Code Convert | AI Code Converter).</li>
			<li className="mb-2">Your Best AI Code Helper.</li>
		  </ul>
		</div>
		<div id="contact" className="text-white pt-4">
		  <div className="text-2xl">Contact</div>
		  <div className="flex justify-start items-center mb-2 space-y-2 mt-2 flex-wrap">
			<a href="https://ko-fi.com/audi_guzz" className="px-2 bg-[#f6db4b] cursor-pointer rounded-full mr-4 py-1">
				<div className="flex justify-center items-center">
					<p className="ml-2 mr-2 text-black font-bold">Buy me a Coffee</p>
					<svg width="30" height="30" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
					    <path fill="#eab308" d="M208 80H32a8 8 0 0 0-8 8v48a96.3 96.3 0 0 0 32.54 72H32a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16h-24.54a96.59 96.59 0 0 0 27-40.09A40 40 0 0 0 248 128v-8a40 40 0 0 0-40-40Zm24 48a24 24 0 0 1-17.2 23a95.78 95.78 0 0 0 1.2-15V97.38A24 24 0 0 1 232 120ZM112 56V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Zm32 0V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Zm-64 0V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Z"/>
					</svg>
				</div>
			</a>
		  	<a href="https://twitter.com/AUDI_GUZZ" className="text-gray cursor-pointer mr-4">
		  		<svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
		  		    <path fill="#ffffff" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645c0 138.72-105.583 298.558-298.558 298.558c-59.452 0-114.68-17.219-161.137-47.106c8.447.974 16.568 1.299 25.34 1.299c49.055 0 94.213-16.568 130.274-44.832c-46.132-.975-84.792-31.188-98.112-72.772c6.498.974 12.995 1.624 19.818 1.624c9.421 0 18.843-1.3 27.614-3.573c-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319c-28.264-18.843-46.781-51.005-46.781-87.391c0-19.492 5.197-37.36 14.294-52.954c51.655 63.675 129.3 105.258 216.365 109.807c-1.624-7.797-2.599-15.918-2.599-24.04c0-57.828 46.782-104.934 104.934-104.934c30.213 0 57.502 12.67 76.67 33.137c23.715-4.548 46.456-13.32 66.599-25.34c-7.798 24.366-24.366 44.833-46.132 57.827c21.117-2.273 41.584-8.122 60.426-16.243c-14.292 20.791-32.161 39.308-52.628 54.253z"/>
		  		</svg>
		  	</a>
			<a href="https://www.producthunt.com/products/aicodeconvert#aicodeconvert" target="_blank">
				<img src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=540327&theme=light" 
					alt="AICodeConvert - Generate&#0032;Code&#0032;or&#0032;Natural&#0032;Language&#0032;To&#0032;Another&#0032;Language&#0032;Code | Product Hunt" 
					width="200" height="45" />
			</a>
		  </div>
		  <div>
			Mail: enqueueit@gmail.com
		  </div>
		</div>
	  </div>
	  <div className="bg-[#0E1117] text-center text-white text-sm pt-10">
	  	AI Code Convert Copyright © <span className="text-blue-500">aicodeconvert.com</span>
	  </div>
	  <div className="bg-[#0E1117] pt-1 pb-1 text-center text-white text-sm">
		<a href="https://ailandingpagegenerator.com">AI Landing Page Generator</a> | <a href="https://base64.kr">Base64.kr</a> | <a href="https://aicomicfactory.com">AI Comic Factory </a> 
		| <a href="https://illusiondiffusion.net"> Illusion Diffusion</a> | <a href="https://aicoderhelper.com">AI Coder Helper</a>
	  </div>
    </>
  );
}
