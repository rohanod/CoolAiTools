import json

html = """<a href="https://ashawkey-lgm.hf.space">Image 3D Rotation</a>
<a href="https://enzostvs-lora-studio.hf.space">Lora Studio</a>
<a href="https://jbilcke-hf-illustrateur-cloud.hf.space">Asset Generator</a>
<a href="https://prodia-fast-stable-diffusion.hf.space">Stable Diffusion Web-UI</a>
<a href="https://huggingfacem4-screenshot2html.hf.space">Screenshot2HTML</a>
<a href="https://databricks-dbrx-instruct.hf.space">DBRX Instruct (Zero Shot Prompting)</a>
<a href="https://ysharma-codegemma.hf.space">Code Gemma</a>
<a href="https://cohereforai-c4ai-command-r-plus.hf.space">CMD R +</a>
<a href="https://mykolal-stabledesign.hf.space">Stable Design</a>
<a href="https://mlabonne-chessllm.hf.space">LLM Chess Fight</a>
<a href="https://marcosv-instructir.hf.space">Change image using AI</a>
<a href="https://ylacombe-longform-musicgen.hf.space">Long Form MusicGen</a>
<a href="https://segmind-segmind-stable-diffusion.hf.space">Segmind Stable Diffusion</a>
<a href="https://miaohaiyuan-groqchatbot.hf.space">Really Fast Chatbot powered by GROQ</a>
<a href="https://unity-ml-agents-soccertwos.static.hf.space">AIs fighting in football/soccer</a>
<a href="https://hysts-shap-e.hf.space/?">Shape-E</a>
<a href="https://skytnt-midi-composer.hf.space/?">Midi Composer</a>
<a href="https://kakaobrain-karlo.hf.space/?">Karlo - unCLIP model by KakaoBrain</a>
<a href="https://vumichien-generate-human-motion.hf.space/?">Human Motion Animation</a>
<a href="https://wine-ineff-minecraftskin-diffusion.hf.space/?">Minecraft Skin diffusion</a>
<a href="https://pixart-alpha-pixart-lcm.hf.space/?">PixArt-LCM 1024px</a>
<a href="https://radames-real-time-sd-turbo.hf.space/?">Real-Time Stable Diffusion</a>
<a href="https://suno-bark.hf.space/?">suno-bark</a>
<a href="https://jbilcke-hf-ai-bedtime-story.hf.space/?">Bedtime story Generator</a>
<a href="https://fal-ai-realtime-stable-diffusion-local.hf.space/?">Realtime Sketch Diffusion</a>
<a href="https://yntec-printingpress.hf.space/?">Top 663 Blitz Diffusion Models</a>
<a href="https://shizuku-ai-streamdiffusion-realtime-txt2img.hf.space/?">Real-Time text diffusion</a>
<a href="https://coqui-voice-chat-with-mistral.hf.space">Ai Voice Chat</a>
<a href="https://huggingface.co/chat/">HuggingChat</a>
<a href="https://fffiloni-video-to-music.hf.space">Video to Background Music</a>
<a href="https://radames-gradio-request-get-client-ip.hf.space">Ip Checker</a>
<a href="https://presidio-presidio-demo.hf.space">De-Identifier</a>
<a href="https://docparser-text-captcha-breaker.hf.space">Captcha Reader</a>
<a href="https://gustproof-sd-prompts.hf.space">Stable Diffusion prompts</a>
<a href="https://allknowingroger-image-models-test174.hf.space">SD Models</a>
<a href="https://aigorithm-aicomicsbook.hf.space">Comic Maker</a>
<a href="https://latent-consistency-lcm-lora-for-sdxl.hf.space">SDXL in 4 steps with Latent Consistency LoRAs</a>
<a href="https://tencentarc-t2i-adapter-sdxl-sketch.hf.space">Doodly - T2I-Adapter-SDXL Sketch</a>
<a href="https://sayakpaul-cartoonizer-demo-onnx.hf.space">Image Cartoonizer</a>
<a href="https://nanom-syntactic-tree.hf.space">Syntactic Tree Generator</a>
<a href="https://visakh7843-sheet-music-generator.hf.space">Sheet Music Generator</a>
<a href="https://gstaff-monstergenv2.hf.space">Monster Generator</a>
<a href="https://multimodalart-lora-roulette.hf.space">Lora Roulette</a>
<a href="https://smakamali-summarize-youtube.hf.space">Youtube Video Summarizer</a>
<a href="https://multimodalart-stable-cascade.hf.space">Stable Cascade</a>
<a href="https://openskyml-fast-sdxl-stable-diffusion-xl.hf.space">Fast SDXL</a>
<a href="https://google-sdxl.hf.space">Google Fast SDXL</a>
<a href="https://facebook-musicgen.hf.space">MusicGen</a>
<a href="https://ap123-illusiondiffusion.hf.space">Illusion Diffusion</a>
<a href="https://coqui-xtts.hf.space">XTTS Voice Cloning</a>
<a href="https://styletts2-styletts2.hf.space">Style TTS</a>
<a href="https://pixart-alpha-pixart-alpha.hf.space">PixArt-a</a>
<a href="https://tonyassi-text-to-image-story-teller.hf.space">Text to Image Story Teller</a>
<a href="https://cyranicus-dalle-3-xl.hf.space">DALL.E 3 XL</a>
<a href="https://enzostvs-guess-the-image.hf.space">Guess the Image: which one is the good one?</a>
<a href="https://surn-unlimitedmusicgen.hf.space">UnlimitedMusicGen</a>
<a href="https://shi-labs-versatile-diffusion.hf.space">Versatile Diffusion</a>
<a href="https://phenomenon1981-dreamlikeart-diffusion-1-0.hf.space">Dreamlike Diffusion 1.0</a>
<a href="https://awacke1-image-to-line-drawings.hf.space">Image to Line Drawings</a>
<a href="https://multimodalart-mariogpt.hf.space/">Mario GPT</a>
"""

# html = input("Enter the HTML: ")

links = []
for line in html.splitlines():
    start_href = line.find("href=")
    start_title = line.find(">")
    end_title = line.find("</a>")
    url = line[start_href+6:start_title-1]
    title = line[start_title+1:end_title]
    links.append(json.dumps({"title": title, "url": url}))

print(",\n".join(links))