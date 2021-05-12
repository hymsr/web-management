import COS from 'cos-js-sdk-v5';

const cos = new COS({
  SecretId: 'AKID3sSpSqx592MSLLJ6lAKFuFMG3d08lhfP',
  SecretKey: 'eEcnskON6fEXcEcnqeDl4A2fJp7A0byW',
});

const opera = {
  upload: (file, filename): Promise<any> => {
    return new Promise((resolve, reject) => {
      cos.putObject({
        Bucket: 'asset-1302726404', /* 必须 */
        Region: 'ap-guangzhou',    /* 必须 */
        Key: filename,              /* 必须 */
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
      }, function(err, data) {
        if (err) reject(err);
        resolve(data); 
      });
    })
  }
};

export default opera;