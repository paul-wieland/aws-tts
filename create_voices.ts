import {
  Engine,
  OutputFormat,
  PollyClient,
  SynthesizeSpeechCommand,
  TextType,
  VoiceId,
} from "@aws-sdk/client-polly";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const pollyClient = new PollyClient({ region: "eu-central-1" });
const s3Client = new S3Client({ region: "eu-central-1" });
// Place here your bucket name and s3-path of the generated voices
const s3BucketName = "bucket-name";
const s3PathPrefix = "s3-path";

class Text {
  constructor(
    readonly id: string,
    readonly text: string,
  ) {}
}

async function getTexts(): Promise<Text[]> {
  // Place here your custom data source (e.g. fetching API or reading a file)
  return [new Text("hello_world_voice", "Hello World")];
}

async function generateSpeechAndUploadToS3(text: Text): Promise<void> {
  try {
    const audio = await generateSpeechAudio(text);
    await uploadAudioToS3(audio, text);
  } catch (error) {
    console.error(`Error generating speech for word "${text.text}":`, error);
  }
}

async function generateSpeechAudio(text: Text): Promise<Uint8Array> {
  const input = {
    OutputFormat: OutputFormat.MP3,
    Engine: Engine.GENERATIVE,
    Text: text.text,
    TextType: TextType.TEXT,
    VoiceId: VoiceId.Daniel,
  };

  const command = new SynthesizeSpeechCommand(input);
  const pollyResponse = await pollyClient.send(command);

  if (!pollyResponse.AudioStream) {
    throw new Error("No AudioStream returned from Polly.");
  }

  return await pollyResponse.AudioStream.transformToByteArray();
}

async function uploadAudioToS3(audio: Uint8Array, text: Text): Promise<void> {
  const s3Params = {
    Bucket: s3BucketName,
    Key: `${s3PathPrefix}${text.id}.mp3`,
    Body: audio,
    ContentType: "audio/mpeg",
  };

  const s3Command = new PutObjectCommand(s3Params);
  await s3Client.send(s3Command);
  console.log(`File for word "${text.text}" successfully uploaded!`);
}

async function processTasks() {
  const texts = await getTexts();
  for (const text of texts) {
    await generateSpeechAndUploadToS3(text);
  }
}

processTasks();
