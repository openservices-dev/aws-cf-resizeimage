# AWS CloudFront ResizeImage

Generate image thumbnails with AWS Lambda.

## How it works

There are two functions handling the process. First function takes `path` and `querystring` and modify the request so it points to thumbnail. The second function checks if thumbnail already exists. If yes, it lets the CloudFront to load it from S3 bucket and return it to the user. If not, it loads the original image form S3 bucket, resize it, store it in the S3 bucket and returns the content.

For example there is `image.jpg` somewhere in folder structure. To load the original image, the url looks like this `/example/folder/image.jpg`. To load a thumbnail with maximum width and height set to `400`, the url looks like this `/example/folder/image.jpg?d=400x400`. The first function updates the request so the final url points to thumbnail `/example/folder/400x400/image.jpg`.

The first function can be used as CloudFront function, or with some little changes as Lambda function. Second function can be used just as Lambda function.

First function can be used either as CloudFront Function or as Lambda function.

## Links

* [Resizing Images with Amazon CloudFront & Lambda@Edge | AWS CDN Blog](https://aws.amazon.com/blogs/networking-and-content-delivery/resizing-images-with-amazon-cloudfront-lambdaedge-aws-cdn-blog/)
* [Authorizing requests with Lambda@Edge](https://dev.to/aws-builders/authorizing-requests-with-lambdaedge-mjm)
* [Deploy Node.js Lambda functions with .zip file archives](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html#nodejs-package-create-dependencies)
* [Error: Could not load the "sharp" module using the linux-x64 runtime on AWS Lambda](https://github.com/lovell/sharp/issues/4001)


## License

[MIT license](./LICENSE)
