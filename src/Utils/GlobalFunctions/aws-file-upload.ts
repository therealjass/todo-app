import { S3Client, S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import siteConfig from '../../Config/siteConfig';

export async function uploadImages(file: File) {
  console.log('upload file', file);

  const s3_url = siteConfig.S3_BUCKET_BASE_URL + file?.name;
  const formData = new FormData();
  //@ts-ignore
  formData.append('file', file[0]);

  console.log('formdata  ', formData);

  const target = { Bucket: 'simply-simple', Key: file.name, Body: file, mode: 'cors', }; // name of the s3 user
  const creds = {
    accessKeyId: 'AKIAWYURQ4AWF7XLPC5V',
    secretAccessKey: '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',
  };

  try {
    const parallelUploads3 = new Upload({
      client: new S3Client({ region: 'ap-south-1', credentials: creds }),
      leavePartsOnError: false, // optional manually handle dropped parts
      params: target
    });

    await parallelUploads3.on('httpUploadProgress', progress => {
      console.log('progress : ', progress);
    });

    await parallelUploads3.done();
    return s3_url;
  } catch (e) {
    console.log(e);
  }
}
