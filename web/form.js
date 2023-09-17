import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const resume = document.querySelector("#content")
const formBtn = document.querySelector("#form-button")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  resume.classList.add("placeholder")
  formBtn.classList.add("loading")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return alert(
      "Este vídeo não parece ser um short. Por favor, escolha outro vídeo short."
    )
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")

  resume.textContent = "Obtendo o texto do áudio. Aguarde..."

  const transcription = await server.get("/summary/" + videoID)

  resume.textContent = "Realizando o resumo. Por favor aguarde..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  resume.textContent = summary.data.result
  resume.classList.remove("placeholder")
  formBtn.classList.remove("loading")
})
