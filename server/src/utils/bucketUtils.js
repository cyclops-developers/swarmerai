/*
 *  Copyright 2019 Laguro, Inc. 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

const getFileUrl = (bucketName, key) =>
  `https://${bucketName}.s3.amazonaws.com/${key}`;

export const listBucket = async bucketName => {
  const fileUrls = [];

  let response = await s3
    .listObjectsV2({
      Bucket: bucketName,
    })
    .promise();

  fileUrls.push(...response.Contents.map(x => getFileUrl(bucketName, x.Key)));

  while (response.NextContinuationToken) {
    response = await s3
      .listObjectsV2({
        Bucket: bucketName,
        ContinuationToken: response.NextContinuationToken,
      })
      .promise();
    fileUrls.push(...response.Contents.map(x => getFileUrl(bucketName, x.Key)));
  }

  return fileUrls;
};
