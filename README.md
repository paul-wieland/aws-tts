# 🗣️ Text-to-Speech S3 Uploader

A Node.js tool that automates the process of generating speech from text and uploading the audio files to an AWS S3 bucket using Amazon Polly.

---

## 🔧 What It Does

This tool performs the following steps:

1. **Reads** a list of texts that should be synthesized.
2. **Generates speech audio** (MP3) using Amazon Polly.
3. **Uploads** the resulting audio files to a specified S3 bucket.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
  npm install
```

### 2. Run the tool

```bash
    npm run start
```

## ⚠️ Configuration

Before running the tool, you must modify the following variables in the source code:

- **Bucket Name**: Replace `s3BucketName` with the name of your S3 bucket.
- **S3 File Path**: Update `s3PathPrefix` to the path where the audio files should be stored in your S3 bucket.

These changes ensure that the generated MP3 files are uploaded to the correct location in your AWS S3 bucket.

## 🔐 AWS Authentication

> **Note:** You must be logged in with the AWS CLI before running this tool.

## 🛠️ Technologies Used

- **Node.js** with TypeScript
- **Amazon Polly** for speech synthesis
- **AWS S3** for audio storage

## 🚀 Future Work

- [x] Speech synthesis using AWS Polly
- [x] Voice upload to S3 bucket
- [ ] Wrap into lambda and combine it with scheduler
