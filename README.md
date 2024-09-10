# AWS CloudFront ResizeImage

Generate image thumbnails with AWS Lambda.

## How it works

To load thumbnail for any image in the bucket use a prefix `generated/<WIDTH>x<HEIGHT>`. For example to load `images/test.jpg` image with maximum width set to 400 and maximum height set to 400 use `generated/400x400/images/test.jpg` path.

The solution is using `generated` prefix / folder, so that there can be two behaviors created in CloudFront distribution. One is public and anyone can request files from it. The second is private and signed URL is needed to get file.

This allows to return thumbnails with cache control header and user does not need to refetch them everytime. And in the same time it restricts to fetch original image without signed URL.

#### CloudFront functions

`RestrictPathDimensions` function checks if width and height combination in requested path is allowed. If not, it returns a redirect to the original image. This function is associated with public distribution.

#### Lambda (Edge) function

`ResizeImage` function checks if resource allready exists. If yes, it returns original response. If not, it parses path, extracts width and height, generates resized image, stores it in `generated` folder and returns modified response.

## Links

* [Resizing Images with Amazon CloudFront & Lambda@Edge | AWS CDN Blog](https://aws.amazon.com/blogs/networking-and-content-delivery/resizing-images-with-amazon-cloudfront-lambdaedge-aws-cdn-blog/)
* [Authorizing requests with Lambda@Edge](https://dev.to/aws-builders/authorizing-requests-with-lambdaedge-mjm)
* [Deploy Node.js Lambda functions with .zip file archives](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html#nodejs-package-create-dependencies)
* [Error: Could not load the "sharp" module using the linux-x64 runtime on AWS Lambda](https://github.com/lovell/sharp/issues/4001)

## License

[MIT license](./LICENSE)
