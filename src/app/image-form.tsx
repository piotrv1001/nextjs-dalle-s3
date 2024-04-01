import { generateImage } from "./generate-image";
import { uploadImage } from "./upload-image";

export default function ImageForm() {

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const prompt = formData.get("prompt")?.valueOf();
    // prompt: string | Object | undefined
    if(!prompt || typeof prompt !== "string") return;

    const base64Image = await generateImage(prompt);
    if(!base64Image) return;

    await uploadImage(base64Image);
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-y-4 w-full md:w-1/2 p-2">
      <label htmlFor="prompt">Describe the image</label>
      <input type="text" name="prompt" id="prompt" className="border rounded-md p-2" />
      <button type="submit" className="rounded-md bg-black text-white p-2">Generate</button>
    </form>
  )
}