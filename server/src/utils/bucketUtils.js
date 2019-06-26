import AWS from 'aws-sdk'

const s3 = new AWS.S3()

const getFileUrl = (bucketName, key) =>
  `https://${bucketName}.s3.amazonaws.com/${key}`

export const listBucket = async bucketName => {
  const fileUrls = []

  let response = await s3
    .listObjectsV2({
      Bucket: bucketName,
      MaxKeys: 1,
    })
    .promise()
  fileUrls.push(...response.Contents.map(x => getFileUrl(bucketName, x.Key)))

  while (response.NextContinuationToken) {
    response = await s3
      .listObjectsV2({
        Bucket: bucketName,
        ContinuationToken: response.NextContinuationToken,
      })
      .promise()
    fileUrls.push(...response.Contents.map(x => getFileUrl(bucketName, x.Key)))

    return fileUrls
  }
}
