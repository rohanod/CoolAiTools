import json

html = """<a href="https://databricks-dbrx-instruct.hf.space">DBRX Instruct (Zero Shot Prompting)</a>
    <a href="https://ysharma-codegemma.hf.space">Code Gemma</a>
    <a href="https://cohereforai-c4ai-command-r-plus.hf.space">CMD R +</a>
    <a href="https://mykolal-stabledesign.hf.space">Stable Design</a>
    <a href="https://mlabonne-chessllm.hf.space">LLM Chess Fight</a>
    <a href="https://marcosv-instructir.hf.space">Change image using AI</a>
    <a href="https://ylacombe-longform-musicgen.hf.space">Long Form MusicGen</a>
    <a href="https://segmind-segmind-stable-diffusion.hf.space">Segmind Stable Diffusion</a>
    <a href="https://miaohaiyuan-groqchatbot.hf.space">Really Fast Chatbot powered by GROQ</a>
"""

links = []
for line in html.splitlines():
    start_href = line.find("href=")
    start_title = line.find(">")
    end_title = line.find("</a>")
    url = line[start_href+6:start_title-1]
    title = line[start_title+1:end_title]
    links.append(json.dumps({"title": title, "url": url}))

print(",\n".join(links))